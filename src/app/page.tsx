'use client';

import { useState, type FormEvent } from 'react';
import { analyzeBusinessAction, regenerateHeadlineAction } from '@/app/actions';
import type { AnalyzeBusinessOutput } from '@/ai/flows/bizPulse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Star, MessageSquare, AlertTriangle, RefreshCw, Briefcase, BrainCircuit } from 'lucide-react';

export default function DashboardPage() {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [analysisData, setAnalysisData] = useState<AnalyzeBusinessOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !location.trim()) {
      setErrorMessage('Both business name and location are required.');
      return;
    }
    
    setIsLoading(true);
    setAnalysisData(null);
    setErrorMessage(null);

    try {
      const result = await analyzeBusinessAction(businessName, location);
      setAnalysisData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegenerateClick = async () => {
    if (!analysisData) return;

    setIsRefreshing(true);
    setErrorMessage(null);

    try {
      const newHeadlineData = await regenerateHeadlineAction(businessName, location);
      setAnalysisData(prevData => prevData ? { ...prevData, headline: newHeadlineData.headline } : null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate a new headline.';
      setErrorMessage(message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderResults = () => {
    if (isLoading) {
      return <ResultSkeleton />;
    }
    if (analysisData) {
      return (
        <ResultCard 
          data={analysisData}
          isRefreshing={isRefreshing}
          onRegenerate={handleRegenerateClick}
          businessName={businessName}
          location={location}
        />
      );
    }
    return null;
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-4 pt-12 md:p-24 bg-gray-50">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-gray-800 flex items-center justify-center gap-3">
            <BrainCircuit className="w-10 h-10 text-primary" />
            GrowthProAI Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your Mini Local Business Intelligence Center
          </p>
        </header>

        <Card className="mb-8 shadow-md">
            <CardContent className="p-6">
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-1.5">
                        <label htmlFor="businessName" className="font-medium text-sm text-gray-700">Business Name</label>
                        <Input
                            id="businessName"
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="e.g., The Corner Cafe"
                            className="flex-1"
                            disabled={isLoading}
                        />
                    </div>
                     <div className="space-y-1.5">
                        <label htmlFor="location" className="font-medium text-sm text-gray-700">City / Location</label>
                        <Input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., San Francisco"
                            className="flex-1"
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full md:w-auto md:col-start-2">
                        {isLoading ? 'Analyzing...' : 'Analyze Business'}
                    </Button>
                </form>
            </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {renderResults()}
        </div>
      </div>
    </main>
  );
}

const ResultSkeleton = () => (
  <Card className="shadow-md">
    <CardHeader>
      <Skeleton className="h-7 w-3/5 rounded-md" />
      <Skeleton className="h-5 w-2/5 rounded-md" />
    </CardHeader>
    <CardContent className="space-y-5">
       <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
       </div>
       <div className="space-y-2">
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <Skeleton className="h-6 w-full rounded-md" />
       </div>
       <div className="flex justify-end">
        <Skeleton className="h-10 w-48 rounded-md" />
       </div>
    </CardContent>
  </Card>
);

interface ResultCardProps {
  data: AnalyzeBusinessOutput;
  isRefreshing: boolean;
  onRegenerate: () => void;
  businessName: string;
  location: string;
}

const ResultCard = ({ data, isRefreshing, onRegenerate, businessName, location }: ResultCardProps) => (
  <Card className="shadow-md animate-in fade-in-50">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-2xl">
          <Briefcase className="w-6 h-6 text-primary" />
          {businessName}
      </CardTitle>
      <CardDescription>{location}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-lg text-foreground">{data.rating} ★</span>
          </div>
          <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg text-foreground">{data.reviews} Reviews</span>
          </div>
      </div>

      <div className="pt-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">AI-Powered SEO Headline</h3>
          <p className="text-xl font-semibold text-gray-800">{data.headline}</p>
      </div>
      
      <div className="flex justify-end pt-4">
          <Button onClick={onRegenerate} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Generating...' : 'Regenerate Headline'}
          </Button>
      </div>
    </CardContent>
  </Card>
);
