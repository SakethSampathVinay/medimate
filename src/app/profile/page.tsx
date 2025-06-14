'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPrescriptions, Prescription, mockTestResults, TestResult, mockTabletReminders, TabletReminder } from '@/lib/mock-data';
import { UserCircle, FileText, Beaker, Bell, PlusCircle, Download, ChevronRight, CalendarClock, Edit2 } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


export default function ProfilePage() {
  const [isAddPrescriptionModalOpen, setIsAddPrescriptionModalOpen] = useState(false);
  const [isAddTestResultModalOpen, setIsAddTestResultModalOpen] = useState(false);
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);

  // Simplified state for reminders
  const [reminders, setReminders] = useState(mockTabletReminders);
  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };


  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Image src="https://placehold.co/100x100.png" alt="User Avatar" width={80} height={80} className="rounded-full border shadow" data-ai-hint="profile avatar" />
            <div>
              <CardTitle className="font-headline text-3xl">MediMate User</CardTitle>
              <CardDescription>user@medimate.com | Manage your health information securely.</CardDescription>
               <Button variant="outline" size="sm" className="mt-2">
                <Edit2 className="mr-2 h-3 w-3" /> Edit Profile
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="prescriptions" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="prescriptions"><FileText className="mr-2 h-4 w-4" />Prescriptions</TabsTrigger>
            <TabsTrigger value="results"><Beaker className="mr-2 h-4 w-4" />Test Results</TabsTrigger>
            <TabsTrigger value="reminders"><Bell className="mr-2 h-4 w-4" />Tablet Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="font-headline text-2xl">My Prescriptions</CardTitle>
                <Button onClick={() => setIsAddPrescriptionModalOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPrescriptions.length > 0 ? mockPrescriptions.map(p => (
                  <Card key={p.id} className="shadow-sm">
                    <CardHeader className="flex flex-row justify-between items-start p-4">
                      <div>
                        <CardTitle className="font-headline text-lg">{p.medicineName}</CardTitle>
                        <CardDescription className="text-xs">Dr. {p.doctorName} - Issued: {p.dateIssued}</CardDescription>
                      </div>
                      {p.imageUrl && <Download className="h-5 w-5 text-primary cursor-pointer" onClick={() => alert('Download prescription (mock)')} />}
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm"><span className="font-semibold">Dosage:</span> {p.dosage}</p>
                      <p className="text-sm"><span className="font-semibold">Frequency:</span> {p.frequency}</p>
                    </CardContent>
                    {p.imageUrl && 
                        <div className="p-4 pt-0">
                            <Image src={p.imageUrl} alt={`Prescription for ${p.medicineName}`} width={100} height={150} className="rounded border" data-ai-hint={p.dataAiHint || "prescription scan"} />
                        </div>
                    }
                  </Card>
                )) : <p className="text-muted-foreground text-center py-4">No prescriptions added yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="font-headline text-2xl">My Test Results</CardTitle>
                 <Button onClick={() => setIsAddTestResultModalOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTestResults.length > 0 ? mockTestResults.map(r => (
                  <Card key={r.id} className="shadow-sm">
                    <CardHeader className="p-4">
                      <CardTitle className="font-headline text-lg">{r.testName}</CardTitle>
                      <CardDescription className="text-xs">Date: {r.dateTaken}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-2">{r.resultSummary}</p>
                      <div className="flex items-center space-x-2">
                        {r.reportUrl && <Button variant="outline" size="sm" asChild><a href={r.reportUrl} target="_blank" rel="noopener noreferrer"><Download className="mr-2 h-3 w-3" /> View Full Report</a></Button>}
                        {r.imageUrl && <Image src={r.imageUrl} alt={`Result for ${r.testName}`} width={100} height={100} className="rounded border" data-ai-hint={r.dataAiHint || "test result"} />}
                      </div>
                    </CardContent>
                  </Card>
                )) : <p className="text-muted-foreground text-center py-4">No test results added yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="font-headline text-2xl">Tablet Reminders</CardTitle>
                 <Button onClick={() => setIsAddReminderModalOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {reminders.length > 0 ? reminders.map(rem => (
                  <Card key={rem.id} className={`shadow-sm ${rem.isActive ? '' : 'opacity-60'}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-headline text-lg">{rem.medicineName}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <CalendarClock className="h-4 w-4 mr-1.5" /> {rem.time} - {rem.days.join(', ')}
                        </p>
                      </div>
                      <Switch checked={rem.isActive} onCheckedChange={() => toggleReminder(rem.id)} aria-label={`Toggle reminder for ${rem.medicineName}`} />
                    </CardContent>
                  </Card>
                )) : <p className="text-muted-foreground text-center py-4">No reminders set up.</p>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Health History</CardTitle>
            <CardDescription>A timeline of your significant health events and appointments (mock data).</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {['Annual Checkup - Jan 2024', 'Flu Vaccination - Oct 2023', 'Dental Cleaning - Jul 2023'].map(item => (
                <li key={item} className="flex items-center text-sm p-3 bg-muted/50 rounded-md">
                  <ChevronRight className="h-4 w-4 mr-2 text-primary" /> {item}
                </li>
              ))}
            </ul>
             <Button variant="link" className="mt-2 px-0">View Full Health History</Button>
          </CardContent>
        </Card>
      </div>

      {/* Add Prescription Modal */}
      <Dialog open={isAddPrescriptionModalOpen} onOpenChange={setIsAddPrescriptionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-xl">Add New Prescription</DialogTitle>
            <DialogDescription>Enter the details of your new prescription.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="medName" className="text-right">Medicine</Label>
              <Input id="medName" placeholder="e.g., Paracetamol 500mg" className="col-span-3" />
            </div>
             {/* Add more fields: Dosage, Frequency, Doctor, Date, Upload Image */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPrescriptionModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Test Result Modal */}
       <Dialog open={isAddTestResultModalOpen} onOpenChange={setIsAddTestResultModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-xl">Add New Test Result</DialogTitle>
            <DialogDescription>Enter the details of your new test result.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="testName" className="text-right">Test Name</Label>
              <Input id="testName" placeholder="e.g., Lipid Profile" className="col-span-3" />
            </div>
             {/* Add more fields: Date, Summary, Upload Report/Image */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTestResultModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Result</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Reminder Modal */}
       <Dialog open={isAddReminderModalOpen} onOpenChange={setIsAddReminderModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-xl">Add New Reminder</DialogTitle>
            <DialogDescription>Set up a new tablet reminder.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="remMedName" className="text-right">Medicine</Label>
              <Input id="remMedName" placeholder="e.g., Vitamin C" className="col-span-3" />
            </div>
             {/* Add more fields: Time, Days */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddReminderModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </AppLayout>
  );
}
