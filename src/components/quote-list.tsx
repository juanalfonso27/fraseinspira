"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Quote } from '@/types';
import { QuoteCard } from './quote-card';
import { CategoryFilter } from './category-filter';
import { SearchBar } from './search-bar';
import { Separator } from './ui/separator';

interface QuoteListProps {
  allQuotes: Quote[];
  initialCategory?: string;
}

/**
 * A client component that manages and displays the list of quotes.
 * It handles client-side filtering based on search queries and selected categories.
 */
export function QuoteList({ allQuotes, initialCategory }: QuoteListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory || null);

  // Effect to update the active category if it changes via URL parameters.
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Memoized calculation of filtered quotes to optimize performance.
  const filteredQuotes = useMemo(() => {
    let quotes = allQuotes;

    if (activeCategory) {
      quotes = quotes.filter(q => q.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery) {
        // The AI-enhanced query may contain multiple words (synonyms).
        // We split them and check if the quote's text or author includes ANY of them.
        const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
        quotes = quotes.filter(q => 
            searchTerms.some(term => 
                q.text.toLowerCase().includes(term) || q.author.toLowerCase().includes(term)
            )
        );
    }
    
    return quotes;
  }, [allQuotes, activeCategory, searchQuery]);

  return (
    <div className="py-8">
      <div className="space-y-6">
        <SearchBar onSearch={setSearchQuery} />
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <Separator className="my-8" />

      {filteredQuotes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      ) : (
        <div className="col-span-full mt-10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
          <h2 className="font-headline text-2xl font-semibold">No se encontraron frases</h2>
          <p className="mt-2 text-muted-foreground">
            Intenta ajustar tu búsqueda o filtros.
          </p>
        </div>
      )}
    </div>
  );
}
