'use server';

import { 
  analyzeBusiness, 
  AnalyzeBusinessOutput,
  regenerateHeadline,
  RegenerateHeadlineOutput
} from '@/ai/flows/bizPulse';

export async function analyzeBusinessAction(
  businessName: string,
  location: string
): Promise<AnalyzeBusinessOutput> {
  if (!businessName || typeof businessName !== 'string' || !location || typeof location !== 'string') {
    throw new Error('Invalid business name or location provided.');
  }

  if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error(
      'Authentication failed. Please add your Google AI API key to the .env file as `GOOGLE_API_KEY=YOUR_KEY_HERE` and restart the server.'
    );
  }

  try {
    const result = await analyzeBusiness({ businessName, location });
    return result;
  } catch (error) {
    console.error('An error occurred during business analysis:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      'Failed to get business analysis from AI. Please check the server logs for more details.'
    );
  }
}

export async function regenerateHeadlineAction(
  businessName: string,
  location: string
): Promise<RegenerateHeadlineOutput> {
  if (!businessName || typeof businessName !== 'string' || !location || typeof location !== 'string') {
    throw new Error('Invalid business name or location provided.');
  }

  try {
    const result = await regenerateHeadline({ businessName, location });
    return result;
  } catch (error) {
    console.error('An error occurred during headline regeneration:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      'Failed to get new headline from AI. Please check the server logs for more details.'
    );
  }
}
