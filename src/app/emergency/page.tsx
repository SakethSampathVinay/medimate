
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEmergencyContacts, EmergencyContact, mockFirstAidGuides, FirstAidGuide } from '@/lib/mock-data';
import { Siren, PhoneCall, ShieldAlert, PlayCircle, HelpCircle, ChevronRight } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export default function EmergencyPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="bg-destructive/10 border-destructive shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center text-destructive">
              <Siren className="mr-3 h-8 w-8" />
              Emergency Assistance
            </CardTitle>
            <CardDescription className="text-destructive/80">
              Quick access to emergency contacts and first aid guides. In case of a life-threatening emergency, call your local emergency number immediately.
            </CardDescription>
          </CardHeader>
        </Card>

        <section>
          <h2 className="font-headline text-2xl font-semibold mb-4 flex items-center">
            <PhoneCall className="mr-2 h-6 w-6 text-primary" /> Emergency Contacts
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockEmergencyContacts.map(contact => (
              <Card key={contact.id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ShieldAlert className="mr-2 h-5 w-5 text-accent" /> {contact.type}
                  </CardTitle>
                  <CardDescription>{contact.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{contact.number}</p>
                </CardContent>
                <CardContent className="p-0 px-6 pb-6">
                   <Button asChild className="w-full">
                    <a href={`tel:${contact.number}`}>
                      <PhoneCall className="mr-2 h-4 w-4" /> Call Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-semibold mb-4 flex items-center">
            <HelpCircle className="mr-2 h-6 w-6 text-primary" /> First Aid Guides
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {mockFirstAidGuides.map(guide => (
              <AccordionItem key={guide.id} value={guide.id} className="border bg-card rounded-lg shadow-md">
                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <span className='font-headline'>{guide.title}</span>
                    <Badge variant="outline">{guide.category}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {(guide.videoUrl || guide.imageUrl) && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                        {guide.videoUrl ? (
                          <>
                            {/* Using image as video placeholder */}
                            <Image 
                              src={guide.imageUrl || 'https://placehold.co/400x225.png'} 
                              alt={guide.title} 
                              fill
                              className="object-cover"
                              data-ai-hint={guide.dataAiHint || "first aid"}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <PlayCircle className="h-16 w-16 text-white/80" />
                            </div>
                          </>
                        ) : guide.imageUrl ? (
                          <Image 
                            src={guide.imageUrl} 
                            alt={guide.title} 
                            fill
                            className="object-cover"
                            data-ai-hint={guide.dataAiHint || "first aid"}
                          />
                        ) : null}
                      </div>
                    )}
                    <h4 className="font-medium text-base mb-2">Steps:</h4>
                    <ul className="space-y-2">
                      {guide.steps.map((step, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </AppLayout>
  );
}
