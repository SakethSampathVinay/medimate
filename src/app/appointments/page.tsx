"use client";

import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockDoctors,
  Doctor,
  mockHealthCheckupPacks,
  HealthCheckupPack,
} from "@/lib/mock-data";
import {
  CalendarDays,
  UserCircle,
  MapPinIcon,
  StarIcon,
  CheckCircle,
  Filter,
  Search,
  BriefcaseMedical,
  Circle,
  GraduationCap,
  Coins,
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DoctorIcon = UserCircle;

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");

  const [selectedDoctorForModal, setSelectedDoctorForModal] =
    useState<Doctor | null>(null);
  const [isTimeSlotModalOpen, setIsTimeSlotModalOpen] = useState(false);
  const [modalSelectedDate, setModalSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [modalSelectedTime, setModalSelectedTime] = useState<string | null>(
    null
  );

  const { toast } = useToast();

  const specialties = useMemo(
    () => ["All", ...new Set(mockDoctors.map((doc) => doc.specialty))],
    []
  );

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSpecialty === "All" || doctor.specialty === selectedSpecialty)
    );
  }, [searchTerm, selectedSpecialty]);

  const handleViewProfileBook = (doctor: Doctor) => {
    setSelectedDoctorForModal(doctor);
    setModalSelectedDate(new Date());
    setModalSelectedTime(null);
    setIsTimeSlotModalOpen(true);
  };

  const handleModalBookingConfirm = () => {
    if (!selectedDoctorForModal || !modalSelectedTime || !modalSelectedDate) {
      toast({
        title: "Booking Error",
        description: "Please select a doctor, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Confirmed!",
      description: `Your appointment with ${
        selectedDoctorForModal.name
      } at ${modalSelectedTime} on ${format(
        modalSelectedDate,
        "PPP"
      )} is booked.`,
      variant: "default",
      className: "bg-green-500 text-white dark:bg-green-600 dark:text-white",
    });
    setIsTimeSlotModalOpen(false);
    setSelectedDoctorForModal(null);
    setModalSelectedTime(null);
  };

  const handleBookPackage = (pack: HealthCheckupPack) => {
    toast({
      title: "Package Booking Initiated",
      description: `You've selected the ${pack.name}. Proceed to payment (mock).`,
    });
    setTimeout(() => {
      toast({
        title: `Booked ${pack.name}!`,
        description: `Your ${pack.name} booking is confirmed.`,
        variant: "default",
        className: "bg-green-500 text-white dark:bg-green-600 dark:text-white",
      });
    }, 1500);
  };

  return (
    <AppLayout>
      <Tabs defaultValue="doctors" className="space-y-4">
        <CardHeader className="px-0">
          <CardTitle className="font-headline text-3xl flex items-center text-foreground">
            <CalendarDays className="mr-3 h-8 w-8 text-primary" />
            Book Doctor Appointments
          </CardTitle>
          <CardDescription>
            Find doctors, checkup packages, and book your appointments
            seamlessly.
          </CardDescription>
        </CardHeader>

        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
          <TabsTrigger value="doctors">Find a Doctor</TabsTrigger>
          <TabsTrigger value="packages">Health Checkup Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="space-y-8">
          <Card className="dark:bg-card">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center text-card-foreground">
                <Filter className="mr-2 h-5 w-5 text-primary" /> Filter Doctors
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow dark:bg-card"
                >
                  <CardHeader className="flex-row items-start gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        fill
                        className="rounded-full border object-cover"
                        data-ai-hint={doctor.dataAiHint || "doctor portrait"}
                      />
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="font-headline text-xl text-card-foreground">
                        {doctor.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-primary">
                        {doctor.specialty}
                      </CardDescription>
                      <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                        <GraduationCap className="mr-1 h-3 w-3" />{" "}
                        {doctor.degree}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <BriefcaseMedical className="mr-1 h-3 w-3" />{" "}
                        {doctor.experience}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPinIcon className="mr-1 h-3 w-3" />{" "}
                        {doctor.location}
                      </div>
                      <div className="flex items-center text-xs text-amber-500 dark:text-amber-400 mt-1">
                        <StarIcon className="mr-1 h-3 w-3 fill-amber-500 dark:fill-amber-400" />{" "}
                        {doctor.rating.toFixed(1)}
                      </div>
                      <div className="flex items-center text-sm font-semibold text-primary mt-1">
                        <Coins className="mr-1 h-4 w-4" /> ₹{doctor.fees}
                        <span className="text-xs font-normal text-muted-foreground ml-1">
                          Consultation
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleViewProfileBook(doctor)}
                    >
                      View Profile & Book
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="dark:bg-card">
              <CardContent className="text-center py-12">
                <DoctorIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-card-foreground">
                  No doctors found
                </p>
                <p className="text-muted-foreground">
                  Try adjusting your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="packages" className="space-y-8">
          <Card className="dark:bg-card">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-card-foreground">
                Predefined Health Checkup Packages
              </CardTitle>
              <CardDescription>
                Choose from our curated health checkup packages for
                comprehensive wellness.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockHealthCheckupPacks.map((pack) => (
                <Card
                  key={pack.id}
                  className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow dark:bg-card"
                >
                  <div className="relative w-full h-40 bg-muted dark:bg-muted/50 rounded-t-lg">
                    <Image
                      src="https://res.cloudinary.com/dgtfgihga/image/upload/v1750003005/OIP_1_alhkku.jpg"
                      alt={pack.name}
                      fill
                      className="rounded-t-lg object-cover w-full"
                      data-ai-hint={pack.dataAiHint || "health package"}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Circle className={`mr-2 h-5 w-5 ${pack.iconColor}`} />
                      <CardTitle className="font-headline text-xl text-card-foreground">
                        {pack.name}
                      </CardTitle>
                    </div>
                    <div className="flex items-baseline text-2xl font-bold text-primary mb-2">
                      <span className="text-xl mr-0.5">₹</span>
                      {pack.price.toFixed(0)}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h4 className="font-medium text-sm mb-1 text-card-foreground">
                      Tests Included:
                    </h4>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                      {pack.testsIncluded.map((test) => (
                        <li key={test}>{test}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => handleBookPackage(pack)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Book This Pack
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedDoctorForModal && (
        <Dialog
          open={isTimeSlotModalOpen}
          onOpenChange={setIsTimeSlotModalOpen}
        >
          <DialogContent className="sm:max-w-md dark:bg-card">
            <DialogHeader>
              <DialogTitle className="font-headline text-xl text-card-foreground">
                Book Appointment with {selectedDoctorForModal.name}
              </DialogTitle>
              <DialogDescription className="space-y-1">
                <div>
                  {selectedDoctorForModal.specialty} -{" "}
                  {selectedDoctorForModal.degree}
                </div>
                <div className="font-semibold text-primary">
                  Consultation Fee: ₹{selectedDoctorForModal.fees}
                </div>
                <div className="text-xs text-muted-foreground pt-1">
                  {selectedDoctorForModal.about}
                </div>
                <div className="pt-2">
                  Select a date and time for your appointment.
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Calendar
                mode="single"
                selected={modalSelectedDate}
                onSelect={(date) => {
                  setModalSelectedDate(date);
                  setModalSelectedTime(null);
                }}
                initialFocus
                className="rounded-md border dark:bg-background"
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
              {modalSelectedDate &&
              selectedDoctorForModal.availability[
                format(modalSelectedDate, "yyyy-MM-dd")
              ]?.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-card-foreground">
                    Available Slots for {format(modalSelectedDate, "PPP")}:
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDoctorForModal.availability[
                      format(modalSelectedDate, "yyyy-MM-dd")
                    ].map((slot) => (
                      <Button
                        key={slot}
                        variant={
                          modalSelectedTime === slot ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setModalSelectedTime(slot)}
                        className={
                          modalSelectedTime === slot
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent/10"
                        }
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : modalSelectedDate ? (
                <div className="text-sm text-muted-foreground text-center py-2">
                  No slots available for {selectedDoctorForModal.name} on{" "}
                  {format(modalSelectedDate, "PPP")}.
                </div>
              ) : null}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsTimeSlotModalOpen(false)}
                className="hover:bg-muted/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleModalBookingConfirm}
                disabled={!modalSelectedTime}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Confirm Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
}
