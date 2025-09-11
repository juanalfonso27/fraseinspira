import quotesData from './quotes.json';
import type { Quote } from '@/types';

/**
 * An array of all quotes, imported from the quotes.json file.
 * This data is used as the primary source for all quotes in the application.
 */
export const quotes: Quote[] = quotesData;
