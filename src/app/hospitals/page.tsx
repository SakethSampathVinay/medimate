
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockHospitals, Hospital } from '@/lib/mock-data';
import { Hospital as HospitalIcon, Search, MapPin, Phone, ExternalLink, Building2, Loader2, AlertTriangle } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [mapQuery, setMapQuery] = useState('hospitals'); // Default query

  useEffect(() => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationError(`Error: ${error.message}. Please ensure location services are enabled.`);
          setIsLocating(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      setMapQuery(`hospitals near ${userLocation.latitude},${userLocation.longitude}`);
    } else {
      setMapQuery('hospitals in major city'); // Fallback query if location is not available
    }
  }, [userLocation]);


  const filteredHospitals = useMemo(() => {
    return mockHospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(mapQuery)}`;
  // Note: For production, you'd typically include &key=YOUR_GOOGLE_MAPS_API_KEY in the URL.

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center">
              <HospitalIcon className="mr-3 h-8 w-8 text-primary" />
              Hospital Locator
            </CardTitle>
            <CardDescription>Find hospitals. Search by name or services offered. Map shows hospitals based on your location if available.</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Map View</CardTitle>
          </CardHeader>
          <CardContent>
            {isLocating && (
              <div className="h-96 w-full bg-muted rounded-lg flex flex-col items-center justify-center text-muted-foreground shadow-inner">
                <Loader2 className="h-12 w-12 mr-2 animate-spin text-primary" />
                <p className="mt-2">Fetching your location to show nearby hospitals...</p>
              </div>
            )}
            {locationError && !isLocating && (
              <div className="h-96 w-full bg-destructive/10 border border-destructive rounded-lg flex flex-col items-center justify-center text-destructive shadow-inner p-4">
                <AlertTriangle className="h-12 w-12 mr-2" />
                <p className="mt-2 text-center">{locationError}</p>
                <p className="text-xs mt-1 text-center">Displaying a general map of hospitals.</p>
                 <iframe
                  src={mapEmbedUrl} // Will use fallback query
                  width="100%"
                  height="350" // Adjusted height to fit error message
                  style={{ border: 0, marginTop: '1rem', borderRadius: '0.5rem' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nearby Hospitals Map Fallback"
                ></iframe>
              </div>
            )}
            {!isLocating && !locationError && userLocation && (
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-inner">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nearby Hospitals Map"
                ></iframe>
              </div>
            )}
             {!isLocating && !userLocation && !locationError && (
                <div className="h-96 w-full bg-muted rounded-lg flex flex-col items-center justify-center text-muted-foreground shadow-inner">
                    <MapPin className="h-12 w-12 mr-2" />
                    <p>Map will display hospitals. Enable location for nearby results.</p>
                    <iframe
                        src={mapEmbedUrl} // Will use fallback query 'hospitals in major city'
                        width="100%"
                        height="350"
                        style={{ border: 0, marginTop: '1rem', borderRadius: '0.5rem' }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="General Hospitals Map"
                    ></iframe>
                </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Map results are provided by Google Maps. An API key may be required for optimal performance and to remove watermarks in production.
            </p>
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

