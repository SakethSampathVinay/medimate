'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDoctors, Doctor, mockHealthCheckupPacks, HealthCheckupPack } from '@/lib/mock-data';
import { CalendarDays, UserCircle, MapPinIcon, StarIcon, CheckCircle, DollarSign, Filter, Search } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';

const DoctorIcon = UserCircle; 

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  const specialties = useMemo(() => ['All', ...new Set(mockDoctors.map(doc => doc.specialty))], []);
  const locations = useMemo(() => ['All', ...new Set(mockDoctors.map(doc => doc.location))], []);

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(doctor =>
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty) &&
      (selectedLocation === 'All' || doctor.location === selectedLocation)
    );
  }, [searchTerm, selectedSpecialty, selectedLocation]);

  const handleBooking = (doctor: Doctor, time: string) => {
    setSelectedDoctor(doctor);
    setSelectedTime(time);
    // In a real app, this would open a confirmation modal or navigate to a booking summary page
    toast({
      title: "Appointment Slot Selected",
      description: `You've selected ${time} with ${doctor.name} on ${selectedDate ? format(selectedDate, "PPP") : ""}. Confirm to book.`,
    });
    // Simulate booking confirmation for now
    setTimeout(() => {
      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment with ${doctor.name} at ${time} on ${selectedDate ? format(selectedDate, "PPP") : ""} is booked.`,
        variant: "default",
        className: "bg-green-500 text-white",
      });
      setSelectedDoctor(null); // Reset after "booking"
      setSelectedTime(null);
    }, 2000);
  };

  return (
    <AppLayout>
      <Tabs defaultValue="doctors" className="space-y-4">
        <CardHeader className="px-0">
            <CardTitle className="font-headline text-3xl flex items-center">
              <CalendarDays className="mr-3 h-8 w-8 text-primary" />
              Schedule Appointments
            </CardTitle>
            <CardDescription>Find doctors, checkup packages, and book your appointments seamlessly.</CardDescription>
        </CardHeader>

        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
          <TabsTrigger value="doctors">Find a Doctor</TabsTrigger>
          <TabsTrigger value="packages">Health Checkup Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <Filter className="mr-2 h-6 w-6" /> Filter Doctors
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search doctor name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger><SelectValue placeholder="Specialty" /></SelectTrigger>
                <SelectContent>{specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
                <SelectContent>{locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map(doctor => (
                <Card key={doctor.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="flex-row items-start gap-4">
                    <Image src={doctor.imageUrl} alt={doctor.name} width={80} height={80} className="rounded-full border" data-ai-hint={doctor.dataAiHint || "doctor portrait"} />
                    <div>
                      <CardTitle className="font-headline text-xl">{doctor.name}</CardTitle>
                      <CardDescription className="text-sm">{doctor.specialty}</CardDescription>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPinIcon className="mr-1 h-3 w-3" /> {doctor.location}
                      </div>
                      <div className="flex items-center text-xs text-amber-500 mt-1">
                        <StarIcon className="mr-1 h-3 w-3 fill-amber-500" /> {doctor.rating.toFixed(1)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h4 className="font-semibold text-sm mb-2">Available Slots ({selectedDate ? format(selectedDate, "MMM dd") : "Selected Date"}):</h4>
                    {selectedDate && doctor.availability[format(selectedDate, "yyyy-MM-dd")]?.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {doctor.availability[format(selectedDate, "yyyy-MM-dd")].map(slot => (
                          <Button key={slot} variant="outline" size="sm" onClick={() => handleBooking(doctor, slot)}>
                            {slot}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No slots available for this date.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <DoctorIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No doctors found</p>
                <p className="text-muted-foreground">Try adjusting your filters or selected date.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="packages" className="space-y-8">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Predefined Health Checkup Packages</CardTitle>
              <CardDescription>Choose from our curated health checkup packages for comprehensive wellness.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {mockHealthCheckupPacks.map(pack => (
                <Card key={pack.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                   <div className="relative w-full h-48">
                     <Image 
                        src={pack.imageUrl} 
                        alt={pack.name} 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-t-lg"
                        data-ai-hint={pack.dataAiHint || "health package"}
                      />
                   </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{pack.name}</CardTitle>
                    <CardDescription className="text-sm h-16 overflow-hidden text-ellipsis">{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-lg font-semibold text-primary mb-2">
                      <DollarSign className="mr-1 h-5 w-5" /> {pack.price.toFixed(2)}
                    </div>
                    <h4 className="font-medium text-sm mb-1">Tests Included:</h4>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                      {pack.testsIncluded.map(test => <li key={test}>{test}</li>)}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <CheckCircle className="mr-2 h-4 w-4" /> Book Package
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
