
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Hospital as HospitalIconLucide, Loader2, MapPin, Phone, Globe, AlertTriangle, LocateFixed } from 'lucide-react';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { LatLngExpression, Map as LeafletMapType } from 'leaflet';
import dynamic from 'next/dynamic';

// ES Module imports for marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => <MapPlaceholder />, 
});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false, loading: () => null });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false, loading: () => null });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false, loading: () => null });
const useMap = dynamic(() => import('react-leaflet').then(mod => mod.useMap), { ssr: false, loading: () => null });


interface OsmHospitalElement {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags: {
    name?: string;
    "addr:street"?: string;
    "addr:housenumber"?: string;
    "addr:city"?: string;
    "addr:postcode"?: string;
    "addr:full"?: string;
    phone?: string;
    "contact:phone"?: string;
    website?: string;
    "contact:website"?: string;
    opening_hours?: string;
    amenity?: string;
  };
}

export interface HospitalDisplayData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
}

const DEFAULT_LOCATION: LatLngExpression = [17.3850, 78.4867]; // Hyderabad
const DEFAULT_ZOOM = 13;
const SEARCH_RADIUS_METERS = 5000; // 5km

function MapPlaceholder() {
  return (
    <div className="h-full w-full bg-muted flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="ml-2">Loading Map...</p>
    </div>
  );
}

const ChangeView: React.FC<{ selectedHospital?: HospitalDisplayData | null }> = ({ selectedHospital }) => {
  const mapHook = useMap!(); 
  useEffect(() => {
    if (selectedHospital && mapHook) {
      mapHook.flyTo([selectedHospital.latitude, selectedHospital.longitude], 15);
    }
  }, [selectedHospital, mapHook]);
  return null;
};

export default function HospitalsPage() {
  const [isClient, setIsClient] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState<LatLngExpression | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(DEFAULT_LOCATION);
  const [hospitals, setHospitals] = useState<HospitalDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  
  const hospitalCardsRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Dynamically import Leaflet and set up icons only on the client
    import('leaflet').then(LModule => {
      const L = LModule.default;
      // Check if the fix is already applied to avoid issues with StrictMode double effects
      // or multiple imports if this component were to re-render significantly.
      if (!(L.Icon.Default as any)._iconFixed) {
        // @ts-ignore
        if (L.Icon.Default.prototype._getIconUrl) { // Check if property exists before deleting
             // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
        }
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: markerIcon2x.src,
          iconUrl: markerIcon.src,
          shadowUrl: markerShadow.src,
        });
        (L.Icon.Default as any)._iconFixed = true; // Mark as fixed
      }
    }).catch(err => console.error("Failed to load Leaflet for icon fix:", err));
  }, [isClient]);


  useEffect(() => {
    if (!isClient) return; 

    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: LatLngExpression = [position.coords.latitude, position.coords.longitude];
          setUserCoordinates(coords);
          setMapCenter(coords);
          fetchNearbyHospitals(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn(`Geolocation error: ${err.message}`);
          setError('Could not get your location. Showing hospitals for default area. Please enable location services and refresh.');
          fetchNearbyHospitals(DEFAULT_LOCATION[0] as number, DEFAULT_LOCATION[1] as number);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Showing hospitals for default area.');
      fetchNearbyHospitals(DEFAULT_LOCATION[0] as number, DEFAULT_LOCATION[1] as number);
    }
  }, [isClient]); 

  const fetchNearbyHospitals = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    setHospitals([]); 
    const overpassQuery = `
      [out:json][timeout:30];
      (
        node["amenity"="hospital"](around:${SEARCH_RADIUS_METERS},${lat},${lon});
        way["amenity"="hospital"](around:${SEARCH_RADIUS_METERS},${lat},${lon});
        relation["amenity"="hospital"](around:${SEARCH_RADIUS_METERS},${lat},${lon});
      );
      out center;
    `;
    try {
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
      if (!response.ok) {
        throw new Error(`Overpass API request failed: ${response.statusText} (Status: ${response.status})`);
      }
      const data = await response.json();
      
      if (!data.elements) {
        console.warn("Overpass API returned no 'elements' array:", data);
        throw new Error("Invalid data structure from Overpass API.");
      }

      const fetchedHospitals: HospitalDisplayData[] = data.elements
        .filter((el: OsmHospitalElement) => el.tags?.name && (el.lat || el.center?.lat)) 
        .map((el: OsmHospitalElement) => {
          let Rlat, Rlon;
          if (el.lat && el.lon) {
            Rlat = el.lat;
            Rlon = el.lon;
          } else if (el.center?.lat && el.center?.lon) {
            Rlat = el.center.lat;
            Rlon = el.center.lon;
          } else {
            return null; 
          }

          let address = el.tags['addr:full'] || '';
          if (!address) {
            const street = el.tags['addr:street'] || '';
            const housenumber = el.tags['addr:housenumber'] || '';
            const city = el.tags['addr:city'] || '';
            const postcode = el.tags['addr:postcode'] || '';
            address = `${housenumber} ${street}, ${city} ${postcode}`.replace(/^ +|, +$/, '').replace(/ ,/g, ',').trim();
          }
          if (!address.trim() && el.tags.name) address = el.tags.name; 

          return {
            id: el.id,
            name: el.tags.name!,
            latitude: Rlat,
            longitude: Rlon,
            address: address || "Address not available",
            phone: el.tags.phone || el.tags['contact:phone'],
            website: el.tags.website || el.tags['contact:website'],
            openingHours: el.tags.opening_hours,
          };
        })
        .filter((h: HospitalDisplayData | null): h is HospitalDisplayData => h !== null);

      setHospitals(fetchedHospitals);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch hospital data. The Overpass API might be temporarily unavailable or the query might be too complex.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkerClick = (hospitalId: number) => {
    setSelectedHospitalId(hospitalId);
    const cardRef = hospitalCardsRef.current[hospitalId];
    if (cardRef) {
      cardRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleViewOnMapClick = (hospital: HospitalDisplayData) => {
    setSelectedHospitalId(hospital.id);
    if (mapContainerRef.current) {
        mapContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedHospital = useMemo(() => {
    return hospitals.find(h => h.id === selectedHospitalId) || null;
  }, [hospitals, selectedHospitalId]);

  const centerMapOnUser = () => {
    if (userCoordinates) {
      setMapCenter(userCoordinates); 
      setSelectedHospitalId(null); 
    } else {
        setError("Your location is not available to re-center the map. Please enable location services.");
    }
  };


  return (
    <AppLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center">
              <HospitalIconLucide className="mr-3 h-8 w-8 text-primary" />
              Nearby Hospitals
            </CardTitle>
            <CardDescription>Real-time hospital data from OpenStreetMap based on your location (or a default area).</CardDescription>
          </CardHeader>
          <CardContent>
             <Button onClick={centerMapOnUser} variant="outline" size="sm" disabled={!userCoordinates && !error && isLoading}>
                <LocateFixed className="mr-2 h-4 w-4" /> Center on My Location
            </Button>
          </CardContent>
        </Card>

        <div ref={mapContainerRef} className="h-[50vh] md:h-[60vh] w-full rounded-lg overflow-hidden shadow-lg border">
          {isClient ? (
            <MapContainer
              center={mapCenter}
              zoom={DEFAULT_ZOOM}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <ChangeView selectedHospital={selectedHospital} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {userCoordinates && typeof userCoordinates[0] === 'number' && typeof userCoordinates[1] === 'number' && Marker && Popup && (
                 <Marker position={userCoordinates as [number, number]}>
                  <Popup>Your current location</Popup>
                </Marker>
              )}
              {hospitals.map(hospital => (
                Marker && Popup && <Marker
                  key={hospital.id}
                  position={[hospital.latitude, hospital.longitude]}
                  eventHandlers={{ click: () => handleMarkerClick(hospital.id) }}
                  opacity={selectedHospitalId === hospital.id ? 1 : 0.7}
                >
                  <Popup>{hospital.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <MapPlaceholder />
          )}
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Fetching nearby hospitals...</p>
          </div>
        )}

        {error && !isLoading && (
          <Card className="bg-destructive/10 border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive"><AlertTriangle className="mr-2"/> Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground">{error}</p>
              {!userCoordinates && <p className="text-destructive-foreground mt-2">Please ensure location services are enabled in your browser and for this site to see hospitals truly near you. Displaying data for a default location.</p>}
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && hospitals.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <HospitalIconLucide className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No hospitals found nearby</p>
              <p className="text-muted-foreground">Try zooming out on the map or check again later. Data is from OpenStreetMap.</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && hospitals.length > 0 && (
          <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Hospitals Found ({hospitals.length})</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hospitals.map(hospital => (
                <Card
                  key={hospital.id}
                  ref={el => hospitalCardsRef.current[hospital.id] = el}
                  className={`flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 ${selectedHospitalId === hospital.id ? 'border-primary scale-105' : 'border-transparent'}`}
                  onClick={() => handleViewOnMapClick(hospital)} 
                >
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">{hospital.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2 text-sm">
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p>{hospital.address}</p>
                    </div>
                    {hospital.phone && (
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a href={`tel:${hospital.phone}`} onClick={(e) => e.stopPropagation()} className="text-primary hover:underline">{hospital.phone}</a>
                      </div>
                    )}
                    {hospital.website && (
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a 
                           href={hospital.website.startsWith('http') ? hospital.website : `//${hospital.website}`} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           onClick={(e) => e.stopPropagation()} 
                           className="text-primary hover:underline truncate block max-w-full"
                        >
                            {hospital.website}
                        </a>
                      </div>
                    )}
                     {hospital.openingHours && <p className="text-xs text-muted-foreground">Hours: {hospital.openingHours}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); handleViewOnMapClick(hospital); }}>
                      View on Map
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
