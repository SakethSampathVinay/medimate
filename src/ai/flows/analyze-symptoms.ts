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
  possibleConditions: z.array(z.string()).describe('A list of possible medical conditions that could be causing the symptoms.'),
  nextSteps: z.array(z.string()).describe('Recommended next steps for the user to take, such as consulting a doctor or getting specific tests.'),
  confidenceLevel: z
    .number()
    .min(0)
    .max(1)
    .describe('A number between 0 and 1 indicating the confidence level of the analysis.'),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(input: AnalyzeSymptomsInput): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSymptomsPrompt',
  input: {schema: AnalyzeSymptomsInputSchema},
  output: {schema: AnalyzeSymptomsOutputSchema},
  prompt: `You are an AI health assistant. A user will describe their symptoms, and you will provide a preliminary analysis.

  Based on the symptoms, suggest possible medical conditions (possibleConditions) that could be the cause. Also, suggest recommended next steps (nextSteps) for the user, such as consulting a doctor or getting specific tests.  Include a confidenceLevel representing the likelihood of your assessment being correct.  The lower the level, the more uncertain the assessment is.

  Symptoms: {{{symptoms}}}`,
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
