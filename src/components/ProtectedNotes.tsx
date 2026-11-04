import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, User } from 'lucide-react';

interface ProtectedNotesProps {
  children: ReactNode;
}

export const ProtectedNotes = ({ children }: ProtectedNotesProps) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="max-w-md w-full gradient-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto">
              <Lock className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access study notes and materials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>🔐 Secure access to premium study materials</p>
              <p>📚 Thousands of quality notes available</p>
              <p>💯 100% free for students</p>
            </div>
            <Button 
              className="w-full btn-hero" 
              onClick={() => window.location.href = '/auth'}
            >
              <User className="h-4 w-4 mr-2" />
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
// Reviewed: academic catalog & interface consistency check (v2.0.48)
