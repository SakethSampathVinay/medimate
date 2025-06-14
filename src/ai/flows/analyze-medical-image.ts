'use server';

/**
 * @fileOverview AI agent that analyzes medical images and provides preliminary analysis.
 *
 * - analyzeMedicalImage - A function that handles the medical image analysis process.
 * - AnalyzeMedicalImageInput - The input type for the analyzeMedicalImage function.
 * - AnalyzeMedicalImageOutput - The return type for the analyzeMedicalImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMedicalImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A medical image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('Additional description of the image or symptoms.'),
});
export type AnalyzeMedicalImageInput = z.infer<typeof AnalyzeMedicalImageInputSchema>;

const AnalyzeMedicalImageOutputSchema = z.object({
  analysis: z.string().describe('The preliminary analysis of the medical image.'),
  suggestedConditions: z.string().describe('Possible conditions suggested by the analysis.'),
  recommendedNextSteps: z.string().describe('Recommended next steps for the user.'),
});
export type AnalyzeMedicalImageOutput = z.infer<typeof AnalyzeMedicalImageOutputSchema>;

export async function analyzeMedicalImage(
  input: AnalyzeMedicalImageInput
): Promise<AnalyzeMedicalImageOutput> {
  return analyzeMedicalImageFlow(input);
}

const analyzeMedicalImagePrompt = ai.definePrompt({
  name: 'analyzeMedicalImagePrompt',
  input: {schema: AnalyzeMedicalImageInputSchema},
  output: {schema: AnalyzeMedicalImageOutputSchema},
  prompt: `You are a medical AI assistant that analyzes medical images and provides a preliminary analysis, suggests possible conditions, and recommends next steps.

  Analyze the following medical image and description to provide your analysis, suggested conditions, and recommended next steps.

  Description: {{{description}}}
  Image: {{media url=photoDataUri}}
  
  Make sure to provide this information in the analysis.
  `, // end prompt
});

const analyzeMedicalImageFlow = ai.defineFlow(
  {
    name: 'analyzeMedicalImageFlow',
    inputSchema: AnalyzeMedicalImageInputSchema,
    outputSchema: AnalyzeMedicalImageOutputSchema,
  },
  async input => {
    const {output} = await analyzeMedicalImagePrompt(input);
    return output!;
  }
);
