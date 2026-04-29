
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

const AVAILABLE_PRODUCTS = [
  {
    name: 'Selfie stick insta 360 1.20 mt',
    description: 'Palo selfie extensible ideal para ángulos amplios con cámaras 360.',
    problem_solved: ['Malos ángulos', 'Poco alcance', 'Selfies grupales'],
  },
  {
    name: 'Selfie Stick 3 metros (black)',
    description: 'Palo selfie ultra largo para tomas aéreas imposibles.',
    problem_solved: ['Tomas tipo drone', 'Altura extrema', 'Perspectiva única'],
  },
  {
    name: 'Selfie 90 cm telesin',
    description: 'Palo selfie compacto y resistente de la marca Telesin.',
    problem_solved: ['Portabilidad', 'Resistencia', 'Cámaras de acción'],
  },
  {
    name: 'Soporte moto Manillar/Carenado insta gp',
    description: 'Soporte robusto para montar cámaras en el manillar o carenado de motocicletas.',
    problem_solved: ['Vibración', 'Montaje en moto', 'Grabación en ruta'],
  },
  {
    name: 'Soporte parabrisa insta/gopro',
    description: 'Ventosa de alta succión para parabrisas de vehículos.',
    problem_solved: ['Grabación en auto', 'Estabilidad en vidrio', 'Seguridad'],
  },
  {
    name: 'Adaptador Casco Moto TELESIN',
    description: 'Montaje específico para el mentón o lateral del casco de moto.',
    problem_solved: ['POV motovlog', 'Montaje en casco', 'Ángulo de visión del piloto'],
  },
  {
    name: 'Mini trípode gopro Ulanzi',
    description: 'Trípode de bolsillo ultra versátil para cámaras GoPro.',
    problem_solved: ['Estabilidad en mesa', 'Time-lapse', 'Base fija'],
  },
  {
    name: 'Mini trípode insta',
    description: 'Trípode compacto diseñado para cámaras Insta360.',
    problem_solved: ['Estabilidad 360', 'Base pequeña', 'Portabilidad'],
  },
  {
    name: 'Soporte smartphone giratorio CNC',
    description: 'Adaptador de aluminio CNC para montar celulares en trípodes.',
    problem_solved: ['Uso de celular en trípode', 'Durabilidad', 'Rotación 360'],
  },
  {
    name: 'Pechera Telesin',
    description: 'Arnés de pecho para grabaciones manos libres en primera persona.',
    problem_solved: ['Grabación deportiva', 'Manos libres', 'POV corporal'],
  },
  {
    name: 'Lente repuesto GoPro 9/10/11/12',
    description: 'Protector de lente de reemplazo para cámaras GoPro Hero.',
    problem_solved: ['Lente rayado', 'Protección cámara', 'Mantenimiento'],
  },
  {
    name: 'Adaptador magnético DJI Osmo Action 5 Pro',
    description: 'Montaje de liberación rápida magnética para DJI Osmo.',
    problem_solved: ['Montaje rápido', 'Compatibilidad DJI', 'Seguridad magnética'],
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
  prompt: `You are an expert product recommender for elohz, a premium store for action camera accessories (Insta360, GoPro, DJI).

Available products:
{{#each products}}
- Name: {{{this.name}}}
  Description: {{{this.description}}}
  Problems Solved: {{#each this.problem_solved}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

User's problem: {{{problemDescription}}}

Suggest up to 3 relevant products. Be technical and precise.`,
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
