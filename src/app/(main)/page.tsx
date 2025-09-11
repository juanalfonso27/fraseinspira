import { quotes } from "@/lib/quotes";
import { QuoteList } from "@/components/quote-list";
import type { Quote } from "@/types";
import { Suspense } from "react";
import { DailyQuote } from "@/components/daily-quote";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// The main page of the application, rendered at the root URL.
export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) {
  const allQuotes: Quote[] = quotes;
  // Get initial category from URL search params if present.
  const category = searchParams.category as string | undefined;

  return (
    <div className="container py-8">
      {/* Suspense boundary for the DailyQuote component which fetches a random quote on the client. */}
      <Suspense fallback={<DailyQuoteSkeleton />}>
        <DailyQuote quotes={allQuotes} />
      </Suspense>
      
      {/* The main list of quotes, with search and filter capabilities. */}
      <QuoteList allQuotes={allQuotes} initialCategory={category} />
    </div>
  );
}

/**
 * A skeleton loader component for the DailyQuote card.
 * Provides a placeholder UI while the client-side quote is being selected.
 */
function DailyQuoteSkeleton() {
    return (
        <Card className="my-8 animate-pulse">
            <CardHeader><div className="h-8 w-3/4 rounded-md bg-muted"></div></CardHeader>
            <CardContent><div className="h-6 w-full rounded-md bg-muted"></div></CardContent>
            <CardFooter><div className="h-4 w-1/4 rounded-md bg-muted"></div></CardFooter>
        </Card>
    )
}
