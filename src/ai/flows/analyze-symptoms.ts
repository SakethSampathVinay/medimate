// 'use server';
/**
 * @fileOverview An AI agent that analyzes user-described symptoms and suggests possible conditions and next steps.
 *
 * - analyzeSymptoms - A function that handles the symptom analysis process.
 * - AnalyzeSymptomsInput - The input type for the analyzeSymptoms function.
 * - AnalyzeSymptomsOutput - The return type for the analyzeSymptoms function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSymptomsInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the symptoms experienced by the user.'),
});
export type AnalyzeSymptomsInput = z.infer<typeof AnalyzeSymptomsInputSchema>;

const AnalyzeSymptomsOutputSchema = z.object({
  possibleConditions: z.array(z.string()).describe('A list of possible, general health conditions based on the symptoms. This is not a diagnosis.'),
  commonCauses: z.array(z.string()).describe('Common causes or factors related to the described symptoms.'),
  simpleHomeRemedies: z.array(z.string()).describe('Simple, general home care advice or remedies that might help alleviate discomfort. State if not applicable or if symptoms warrant professional advice instead.'),
  otcMedicationSuggestions: z.array(z.object({
    medication: z.string().describe("General type of over-the-counter medication (e.g., 'Antacid', 'Pain reliever'). Do not suggest specific brand names."),
    usageCautions: z.string().describe('Important cautions for using this type of OTC medication (e.g., "Follow package instructions", "Do not exceed recommended dosage", "Consult pharmacist if you have other conditions or take other medications."_')
  })).describe('Suggestions for general types of over-the-counter medications, including usage cautions. State if not applicable or if professional advice is needed before taking any medication.'),
  warningSigns: z.array(z.string()).describe('Warning signs or red flags that indicate the user should seek emergency medical attention.'),
  doctorConsultationRecommendation: z.string().describe('A clear recommendation on whether a doctor should be consulted (e.g., "Consult a doctor for proper diagnosis and treatment.", "Monitor symptoms; consult a doctor if they worsen or persist.", "Emergency medical attention is advised if warning signs are present.").'),
  specialistReferral: z.string().optional().describe('Optionally, the type of medical specialist to consider seeing (e.g., "General Practitioner", "Dermatologist", "Gastroenterologist").')
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(input: AnalyzeSymptomsInput): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSymptomsPrompt',
  input: {schema: AnalyzeSymptomsInputSchema},
  output: {schema: AnalyzeSymptomsOutputSchema},
  prompt: `You are MediMate AI, a virtual medical assistant trained to provide structured, general health information and not medical diagnoses.
Your responses must help populate the structured output fields as defined.
Based on the user's symptoms: {{{symptoms}}}, provide information for each field.

Your information should cover:
- possibleConditions: General health conditions related to the symptoms. This is not a diagnosis.
- commonCauses: Common factors for these symptoms.
- simpleHomeRemedies: General home care advice. State if not applicable or if symptoms warrant professional advice instead.
- otcMedicationSuggestions: General types of OTC medications (e.g., 'Antacid', 'Pain reliever') with crucial usage cautions. Do not suggest specific brand names. State if not applicable or professional advice is needed.
- warningSigns: Red flags requiring emergency attention.
- doctorConsultationRecommendation: Clear advice on consulting a doctor. If symptoms are vague, chronic, life-threatening, or complex, state that this situation is beyond your scope as a virtual assistant and strongly recommend doctor consultation, explaining why. In such cases, for fields like home remedies or OTC, you may state "Requires professional medical evaluation."
- specialistReferral (optional): Type of specialist if applicable.

Never guess or make bold claims. Maintain a friendly, helpful, concise, safe, and educational tone.
It is crucial to remember that your advice is not a substitute for professional medical care.
`,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsFlow',
    inputSchema: AnalyzeSymptomsInputSchema,
    outputSchema: AnalyzeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
