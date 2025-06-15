
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { analyzeMedicalImage, AnalyzeMedicalImageOutput } from '@/ai/flows/analyze-medical-image';
import { analyzeSymptoms, AnalyzeSymptomsOutput } from '@/ai/flows/analyze-symptoms';
import { Bot, ImageIcon, Send, User, AlertTriangle, CheckCircle, Loader2, Info, Sparkles, ShieldAlert, PillIcon, Stethoscope, HelpCircle } from 'lucide-react';
import React, { useState, useRef, ChangeEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'error';
  content: string | React.ReactNode;
  imagePreview?: string;
}

export default function HealthAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertFileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!inputText.trim() && !imageFile) return;

    const userMessageContent = inputText.trim();
    const userMessageId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMessageId,
      type: 'user',
      content: userMessageContent || (imageFile ? "Uploaded an image for analysis." : "Issue description:"),
      imagePreview: imagePreview || undefined,
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    setInputText('');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
    setIsLoading(true);

    try {
      if (imageFile) {
        const photoDataUri = await convertFileToDataUri(imageFile);
        const result = await analyzeMedicalImage({
          photoDataUri,
          description: userMessageContent || 'Analyze this medical image.',
        });
        setMessages(prev => [...prev, { id: Date.now().toString() + '-ai', type: 'ai', content: <AIImageAnalysisResponse data={result} /> }]);
      } else if (userMessageContent) {
        const result = await analyzeSymptoms({ symptoms: userMessageContent });
        setMessages(prev => [...prev, { id: Date.now().toString() + '-ai', type: 'ai', content: <AISymptomAnalysisResponse data={result} /> }]);
      }
    } catch (error) {
      console.error("AI Analysis Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during analysis.";
      setMessages(prev => [...prev, { id: Date.now().toString() + '-error', type: 'error', content: `Error: ${errorMessage}` }]);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <CardHeader className="pb-4">
          <CardTitle className="font-headline text-3xl">AI Health Analysis</CardTitle>
          <CardDescription>
            Describe your symptoms or upload a medical image for a preliminary AI-powered analysis.
            <br />
            <span className="font-semibold text-destructive-foreground bg-destructive/80 px-2 py-1 rounded-md inline-flex items-center mt-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              This is not a substitute for professional medical advice. Always consult a doctor.
            </span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-lg shadow-inner">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl w-full p-3 rounded-lg shadow ${
                msg.type === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 
                msg.type === 'ai' ? 'bg-card text-card-foreground border mr-auto' : 
                'bg-destructive text-destructive-foreground mr-auto'
              }`}>
                <div className="flex items-start gap-2 mb-2">
                  {msg.type === 'ai' && <Bot className="h-6 w-6 text-accent flex-shrink-0" />}
                  {msg.type === 'user' && <User className="h-6 w-6 text-primary-foreground flex-shrink-0" />}
                  {msg.type === 'error' && <AlertTriangle className="h-6 w-6 text-destructive-foreground flex-shrink-0" />}
                  <span className="font-headline text-base">
                    {msg.type === 'user' ? 'You' : msg.type === 'ai' ? 'MediMate AI Analysis' : 'Error'}
                  </span>
                </div>
                {typeof msg.content === 'string' ? <p className="text-sm whitespace-pre-wrap">{msg.content}</p> : msg.content}
                {msg.imagePreview && (
                  <Image src={msg.imagePreview} alt="Uploaded preview" width={200} height={200} className="mt-2 rounded-md max-w-xs" />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xl p-3 rounded-lg shadow bg-card text-card-foreground border">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 text-accent animate-spin" />
                  <span className="font-semibold text-sm">MediMate AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 border-t bg-background">
          {imagePreview && (
            <div className="mb-2 flex items-center gap-2">
              <Image src={imagePreview} alt="Preview" width={60} height={60} className="rounded" />
              <Button variant="ghost" size="sm" onClick={() => { setImageFile(null); setImagePreview(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}>Remove Image</Button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your symptoms or add details for the image..."
              className="flex-grow resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button onClick={handleSubmit} disabled={isLoading || (!inputText.trim() && !imageFile)}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="space-y-1 border-l-2 border-accent pl-3 py-1">
    <h5 className="font-semibold text-sm flex items-center text-accent">
      <Icon className="h-4 w-4 mr-1.5" />
      {title}
    </h5>
    <div className="text-xs text-muted-foreground">{children}</div>
  </div>
);

const ListItems: React.FC<{ items: string[] | undefined }> = ({ items }) => {
  if (!items || items.length === 0) return <p>Not specified.</p>;
  return (
    <ul className="list-disc list-inside space-y-0.5">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
};

const OtcSuggestions: React.FC<{ suggestions: AnalyzeMedicalImageOutput['otcMedicationSuggestions'] | undefined }> = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0 || (suggestions.length === 1 && suggestions[0].medication.toLowerCase().includes("not applicable"))) {
    return <p>No specific OTC suggestions applicable or professional advice needed first.</p>;
  }
  return (
    <ul className="space-y-1.5">
      {suggestions.map((s, i) => (
        <li key={i} className="border-t border-border/50 pt-1 first:border-t-0">
          <strong>{s.medication}:</strong> {s.usageCautions}
        </li>
      ))}
    </ul>
  );
};

const AIImageAnalysisResponse: React.FC<{ data: AnalyzeMedicalImageOutput }> = ({ data }) => (
  <div className="space-y-3 text-sm">
    {data.imageInterpretation && (
      <Section title="Image Interpretation" icon={Sparkles}>
        <p>{data.imageInterpretation}</p>
      </Section>
    )}
    {data.possibleConditions && data.possibleConditions.length > 0 && (
      <Section title="Possible Conditions" icon={HelpCircle}>
        <ListItems items={data.possibleConditions} />
      </Section>
    )}
    {data.commonCausesForFindings && data.commonCausesForFindings.length > 0 && (
      <Section title="Common Causes for Findings" icon={Info}>
        <ListItems items={data.commonCausesForFindings} />
      </Section>
    )}
    {data.simpleHomeRemedies && data.simpleHomeRemedies.length > 0 && (
      <Section title="Simple Home Remedies" icon={CheckCircle}>
        <ListItems items={data.simpleHomeRemedies} />
      </Section>
    )}
    {data.otcMedicationSuggestions && (
      <Section title="Over-the-Counter Suggestions" icon={PillIcon}>
        <OtcSuggestions suggestions={data.otcMedicationSuggestions} />
      </Section>
    )}
    {data.warningSignsBasedOnImage && data.warningSignsBasedOnImage.length > 0 && (
      <Section title="Warning Signs (Seek Medical Attention)" icon={ShieldAlert}>
        <ListItems items={data.warningSignsBasedOnImage} />
      </Section>
    )}
    {data.doctorConsultationRecommendation && (
      <Section title="Doctor Consultation Recommendation" icon={Stethoscope}>
        <p>{data.doctorConsultationRecommendation}</p>
      </Section>
    )}
    {data.specialistReferral && (
      <Section title="Specialist Referral Suggestion" icon={User}>
        <p>{data.specialistReferral}</p>
      </Section>
    )}
    <p className="text-xs text-muted-foreground pt-2 border-t mt-3">
      <AlertTriangle className="h-3 w-3 inline mr-1" />
      This AI provides general information, not medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.
    </p>
  </div>
);

const AISymptomAnalysisResponse: React.FC<{ data: AnalyzeSymptomsOutput }> = ({ data }) => (
  <div className="space-y-3 text-sm">
     {data.possibleConditions && data.possibleConditions.length > 0 && (
      <Section title="Possible Conditions" icon={HelpCircle}>
        <ListItems items={data.possibleConditions} />
      </Section>
    )}
    {data.commonCauses && data.commonCauses.length > 0 && (
      <Section title="Common Causes" icon={Info}>
        <ListItems items={data.commonCauses} />
      </Section>
    )}
     {data.simpleHomeRemedies && data.simpleHomeRemedies.length > 0 && (
      <Section title="Simple Home Remedies" icon={CheckCircle}>
        <ListItems items={data.simpleHomeRemedies} />
      </Section>
    )}
    {data.otcMedicationSuggestions && (
      <Section title="Over-the-Counter Suggestions" icon={PillIcon}>
        <OtcSuggestions suggestions={data.otcMedicationSuggestions} />
      </Section>
    )}
    {data.warningSigns && data.warningSigns.length > 0 && (
       <Section title="Warning Signs (Seek Medical Attention)" icon={ShieldAlert}>
        <ListItems items={data.warningSigns} />
      </Section>
    )}
    {data.doctorConsultationRecommendation && (
      <Section title="Doctor Consultation Recommendation" icon={Stethoscope}>
        <p>{data.doctorConsultationRecommendation}</p>
      </Section>
    )}
    {data.specialistReferral && (
      <Section title="Specialist Referral Suggestion" icon={User}>
        <p>{data.specialistReferral}</p>
      </Section>
    )}
     <p className="text-xs text-muted-foreground pt-2 border-t mt-3">
      <AlertTriangle className="h-3 w-3 inline mr-1" />
      This AI provides general information, not medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.
    </p>
  </div>
);


    