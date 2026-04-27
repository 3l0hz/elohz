'use server';
/**
 * @fileOverview An AI agent that suggests products based on a user's described problem.
 *
 * - findProductSolutions - A function that handles finding product solutions for a given problem.
 * - ProductSolutionFinderInput - The input type for the findProductSolutions function.
 * - ProductSolutionFinderOutput - The return type for the findProductSolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSolutionFinderInputSchema = z.object({
  problemDescription: z
    .string()
    .describe("A detailed description of the user's problem or need."),
});
export type ProductSolutionFinderInput = z.infer<
  typeof ProductSolutionFinderInputSchema
>;

const ProductSolutionSchema = z.object({
  name: z.string().describe('The name of the suggested product.'),
  reason: z
    .string()
    .describe('A brief explanation of how this product solves the problem.'),
});

const ProductSolutionFinderOutputSchema = z.object({
  suggestedProducts: z
    .array(ProductSolutionSchema)
    .describe('A list of products suggested to solve the user\u0027s problem.'),
});
export type ProductSolutionFinderOutput = z.infer<
  typeof ProductSolutionFinderOutputSchema
>;

// Hardcoded list of available products based on the proposal
const AVAILABLE_PRODUCTS = [
  {
    name: 'Selfie Stick Insta360 1.20 m',
    description: 'Extendable selfie stick for wider shots and better angles. Now at $19.990.',
    problem_solved: ['Malos ángulos', 'Poco alcance'],
  },
  {
    name: 'Soporte moto manillar Insta / GoPro',
    description: 'Secure mount for action cameras on motorcycle handlebars, reducing vibration.',
    problem_solved: ['Vibración en grabación', 'Estabilidad para cámara'],
  },
  {
    name: 'Selfie Stick 3 metros Black',
    description: 'Ultra-long selfie stick for impossible and creative camera angles. Now at $32.990.',
    problem_solved: ['Malos ángulos', 'Tomas imposibles', 'Poco alcance'],
  },
  {
    name: 'Mini trípode de bolsillo',
    description: 'Ultra-portable mini tripod for stable shots anywhere. Price: $16.990.',
    problem_solved: ['Estabilidad en mesa', 'Falta de soporte fijo', 'Selfies grupales'],
  },
  {
    name: 'Case metálico Insta360 X5 Black',
    description: 'Durable metal case for Insta360 X5, offering protection and accessory mounting points.',
    problem_solved: ['Falta de accesorios', 'Protección cámara'],
  },
  {
    name: 'Pack inicio Insta360 X5',
    description: 'Starter kit with essential accessories for Insta360 X5.',
    problem_solved: ['Falta de accesorios', 'Necesidad de kit completo'],
  },
  {
    name: 'Pedal Overdrive',
    description: 'Guitar/bass effect pedal for warm, rich overdriven tones.',
    problem_solved: ['Baja calidad de sonido', 'Necesidad de efectos de guitarra/bajo'],
  },
  {
    name: 'Pedal Delay',
    description: 'Guitar/bass effect pedal for creating echo and ambient soundscapes.',
    problem_solved: ['Baja calidad de sonido', 'Necesidad de efectos de guitarra/bajo'],
  },
  {
    name: 'Batería Insta360 X5',
    description: 'Spare battery for Insta360 X5 to extend recording time.',
    problem_solved: ['Poca duración de batería', 'Falta de energía'],
  },
  {
    name: 'Cargador Insta360 X5 doble',
    description: 'Dual battery charger for Insta360 X5, allowing simultaneous charging.',
    problem_solved: ['Poca duración de batería', 'Carga lenta'],
  },
  {
    name: 'Adaptador DJI 360',
    description: 'Adapter to use 360 cameras with DJI drones or accessories.',
    problem_solved: ['Compatibilidad entre marcas', 'Falta de adaptadores'],
  },
  {
    name: 'Lente repuesto GoPro 9/10/11/12',
    description: 'Replacement lens for GoPro Hero 9, 10, 11, or 12.',
    problem_solved: ['Lente dañado', 'Necesidad de repuestos'],
  },
];

export async function findProductSolutions(
  input: ProductSolutionFinderInput
): Promise<ProductSolutionFinderOutput> {
  return productSolutionFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productSolutionFinderPrompt',
  input: {schema: ProductSolutionFinderInputSchema},
  output: {schema: ProductSolutionFinderOutputSchema},
  prompt: `You are an expert product recommender for a tech gadget store. Your goal is to help users find the best products to solve their specific problems.

Here is a list of available products and what problems they typically solve:
{{#each products}}
- Name: {{{this.name}}}
  Description: {{{this.description}}}
  Problems Solved: {{#each this.problem_solved}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

The user has described the following problem:
Problem: {{{problemDescription}}}

Based on the user's problem, suggest up to 3 relevant products from the list that directly address and solve their issue. For each suggested product, provide its name and a concise reason explaining how it solves the problem. If no products are relevant, return an empty array for 'suggestedProducts'.`,
});

const productSolutionFinderFlow = ai.defineFlow(
  {
    name: 'productSolutionFinderFlow',
    inputSchema: ProductSolutionFinderInputSchema,
    outputSchema: ProductSolutionFinderOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({
      problemDescription: input.problemDescription,
      products: AVAILABLE_PRODUCTS,
    });
    return output!;
  }
);