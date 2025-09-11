'use server';

import { searchQuotesWithSynonyms } from '@/ai/flows/keyword-search-synonyms';

/**
 * A server action that enhances a search keyword by generating synonyms using an AI model.
 * This helps to broaden the search results for quotes.
 * 
 * @param keyword The user's original search keyword.
 * @returns An enhanced search string including synonyms, or the original keyword on failure.
 */
export async function getEnhancedSearch(keyword: string) {
    if (!keyword) return '';
    try {
        const result = await searchQuotesWithSynonyms({ keyword });
        return result.enhancedKeyword;
    } catch (error) {
        console.error("AI search enhancement failed:", error);
        // Fallback to the original keyword if the AI service fails.
        return keyword;
    }
}
