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
  imageInterpretation: z.string().describe('A general interpretation of the provided medical image. Focus on observable features without diagnosing.'),
  possibleConditions: z.array(z.string()).describe('A list of possible, general health conditions that might relate to the image findings. This is not a diagnosis.'),
  commonCausesForFindings: z.array(z.string()).describe('Common causes or factors that could lead to the observed image features.'),
  simpleHomeRemedies: z.array(z.string()).describe('Simple, general home care advice. State "Not applicable based on image analysis alone" or if professional advice is needed.'),
  otcMedicationSuggestions: z.array(z.object({
    medication: z.string().describe("General type of over-the-counter medication (e.g., 'Antiseptic wipe'). State 'Not applicable based on image analysis alone' if so. Do not suggest specific brand names."),
    usageCautions: z.string().describe('Important cautions for using this type of OTC medication.')
  })).describe('Suggestions for general types of over-the-counter medications. State "Not applicable based on image analysis alone" or if professional advice is needed before taking any medication.'),
  warningSignsBasedOnImage: z.array(z.string()).describe('Warning signs or red flags evident from the image or description that indicate the user should seek emergency medical attention.'),
  doctorConsultationRecommendation: z.string().describe('A clear recommendation on whether a doctor should be consulted based on the image (e.g., "Consult a doctor for proper evaluation of these findings.", "Seek medical review to discuss this image.").'),
  specialistReferral: z.string().optional().describe('Optionally, the type of medical specialist to consider seeing (e.g., "Radiologist for further image review", "Dermatologist if skin related").')
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
  prompt: `You are MediMate AI, a virtual medical assistant trained to provide structured, general health information based on medical images and descriptions, not medical diagnoses.
Your responses must help populate the structured output fields as defined.
Analyze the following medical image and description:
Description: {{{description}}}
Image: {{media url=photoDataUri}}

Your information should cover:
- imageInterpretation: General interpretation of observable features from the image. This is not a diagnosis.
- possibleConditions: General health conditions related to image findings. This is not a diagnosis.
- commonCausesForFindings: Common factors that could lead to the observed image features.
- simpleHomeRemedies: General home care advice. State "Not applicable based on image analysis alone" or if professional advice is needed.
- otcMedicationSuggestions: General types of OTC medications (e.g., 'Antiseptic wipe') with crucial usage cautions. Do not suggest specific brand names. State "Not applicable based on image analysis alone" or if professional advice is needed.
- warningSignsBasedOnImage: Red flags from the image/description requiring emergency attention.
- doctorConsultationRecommendation: Clear advice on consulting a doctor. If the image is unclear, or suggests a vague, chronic, life-threatening, or complex condition, state that this situation is beyond your scope as a virtual assistant and strongly recommend doctor consultation, explaining why. In such cases, for fields like home remedies or OTC, you may state "Requires professional medical evaluation."
- specialistReferral (optional): Type of specialist if applicable.

Never guess or make bold claims. Maintain a friendly, helpful, concise, safe, and educational tone.
It is crucial to remember that your advice is not a substitute for professional medical care.
  `, 
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
