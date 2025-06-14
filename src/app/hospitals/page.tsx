
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
  const [isLocating, setIsLocating] = useState(true); // Start with true to show loading initially
  const [mapQuery, setMapQuery] = useState('hospitals in major Indian city'); // Default fallback

  useEffect(() => {
    // Try to get user's location when the component mounts
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
          setLocationError(`Error fetching your location: ${error.message}.`);
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
      // Use a generic query if location is not available or there was an error
      setMapQuery('hospitals in major Indian city');
    }
  }, [userLocation, locationError]); // Also depend on locationError to update query on error


  const filteredHospitals = useMemo(() => {
    return mockHospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY_HERE&q=${encodeURIComponent(mapQuery)}`;
  // Note: Replace YOUR_API_KEY_HERE with your actual Google Maps API key.
  // For testing without an API key, the map may show an error or have limitations.

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
              <div className="h-96 w-full bg-destructive/10 border border-destructive rounded-lg flex flex-col items-center justify-center text-destructive shadow-inner p-4 text-center">
                <AlertTriangle className="h-12 w-12" />
                <p className="mt-2 font-semibold">{locationError}</p>
                <p className="text-sm mt-1">Displaying a general map of hospitals. Please note that Google Maps requires an API key to function correctly, and you might see an error from Google within the map area below.</p>
                 <iframe
                  src={mapEmbedUrl.replace("YOUR_API_KEY_HERE&", "")} // Attempt without key for fallback
                  width="100%"
                  height="250" 
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
                  src={mapEmbedUrl.replace("YOUR_API_KEY_HERE&", "")} // Attempt without key
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
                // This case handles when geolocation is not supported or user hasn't interacted yet
                // and there's no explicit error from geolocation API itself.
                <div className="h-96 w-full bg-muted rounded-lg flex flex-col items-center justify-center text-muted-foreground shadow-inner p-4 text-center">
                    <MapPin className="h-12 w-12 mb-2" />
                    <p className="mb-2">Attempting to display a general map of hospitals. Enable location services for more relevant results.</p>
                    <p className="text-sm mb-4">Note: Google Maps requires an API key to function correctly. You might see an error from Google within the map area below.</p>
                    <iframe
                        src={mapEmbedUrl.replace("YOUR_API_KEY_HERE&", "")} // Attempt without key for initial fallback
                        width="100%"
                        height="250"
                        style={{ border: 0, borderRadius: '0.5rem' }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="General Hospitals Map"
                    ></iframe>
                </div>
            )}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Map results are provided by Google Maps. An API key is typically required by Google for the map to load correctly. Without a valid API key, you may see an error message from Google Maps within the map area or experience limited functionality. Please ensure a valid API key is configured in the application for production use.
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
