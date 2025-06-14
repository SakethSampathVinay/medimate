
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockHospitals, Hospital } from '@/lib/mock-data';
import { Hospital as HospitalIcon, Search, MapPin, Phone, ExternalLink, Building2 } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHospitals = useMemo(() => {
    return mockHospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center">
              <HospitalIcon className="mr-3 h-8 w-8 text-primary" />
              Hospital Locator
            </CardTitle>
            <CardDescription>Find hospitals. Search by name or services offered.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search hospitals (e.g., City General, Cardiology)"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        {filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredHospitals.map(hospital => (
              <Card key={hospital.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-56">
                  <Image 
                    src={hospital.imageUrl} 
                    alt={hospital.name} 
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint={hospital.dataAiHint || "hospital exterior"}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-primary" /> {hospital.name}
                  </CardTitle>
                  <div className="flex items-center text-sm mt-1">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" /> {hospital.contact}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h4 className="font-semibold text-sm mb-1">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.services.map(service => (
                      <Badge key={service} variant="secondary">{service}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a 
                      href={hospital.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Get Directions
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
           <Card>
            <CardContent className="text-center py-12">
              <HospitalIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No hospitals found</p>
              <p className="text-muted-foreground">Try adjusting your search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
