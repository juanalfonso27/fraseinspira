"use client";

import { useState, useEffect } from 'react';
import type { Quote } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { QuoteActions } from './quote-actions';

interface DailyQuoteProps {
  quotes: Quote[];
}

/**
 * A component to display a "Quote of the Day".
 * It selects a random quote on the client side to prevent hydration mismatches.
 */
export function DailyQuote({ quotes }: DailyQuoteProps) {
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);

  // Select a random quote on initial client-side mount.
  useEffect(() => {
    getNewQuote();
  }, [quotes]);

  // Function to select a new random quote from the list.
  const getNewQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
  }

  if (!dailyQuote) {
    // Render nothing on the server and during the initial client render to avoid hydration errors.
    return null;
  }

  return (
    <Card className="my-8 border-primary/50 bg-card shadow-lg shadow-primary/10 dark:shadow-primary/5">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Frase del día</CardTitle>
          </div>
          <Button variant="outline" onClick={getNewQuote}>
            Nueva Frase
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-xl italic">
          <p>"{dailyQuote.text}"</p>
        </blockquote>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <cite className="text-md text-muted-foreground not-italic">— {dailyQuote.author}</cite>
        <QuoteActions quote={dailyQuote} />
      </CardFooter>
    </Card>
  );
}
