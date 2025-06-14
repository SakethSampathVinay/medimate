
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hospital } from 'lucide-react'; // Using the Lucide icon

export default function HospitalsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center">
              <Hospital className="mr-3 h-8 w-8 text-primary" />
              Nearby Hospitals
            </CardTitle>
            <CardDescription>
              This feature is currently being updated. Please check back later for an improved hospital locator experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are working on bringing you a better way to find hospitals near you.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
