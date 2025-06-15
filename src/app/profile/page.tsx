
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Prescription, TestResult, TabletReminder, DayOfWeek } from '@/lib/mock-data'; // Import DayOfWeek
import { mockPrescriptions, mockTestResults } from '@/lib/mock-data';

import { FileText, Beaker, Bell, PlusCircle, Download, ChevronRight, CalendarClock, Edit2, LogIn, Loader2, UserCircle as UserProfileIcon, Save, Trash2, AlertTriangle } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox

const LOCAL_STORAGE_REMINDERS_KEY = 'mediMateReminders';
const DAYS_OF_WEEK: DayOfWeek[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export default function ProfilePage() {
  const { user, isLoading: authLoading, updateUserMetadata } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isAddPrescriptionModalOpen, setIsAddPrescriptionModalOpen] = useState(false);
  const [isAddTestResultModalOpen, setIsAddTestResultModalOpen] = useState(false);
  
  // Reminder State
  const [reminders, setReminders] = useState<TabletReminder[]>([]);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<Partial<TabletReminder> & { tempId?: string }>({});
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [notifiedMinute, setNotifiedMinute] = useState<Set<string>>(new Set());


  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);

  // Load reminders from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedReminders = localStorage.getItem(LOCAL_STORAGE_REMINDERS_KEY);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    }
  }, []);

  // Save reminders to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_REMINDERS_KEY, JSON.stringify(reminders));
    }
  }, [reminders]);
  
  // Request notification permission
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            toast({ title: "Notifications Enabled", description: "You will now receive pill reminders." });
          } else {
            toast({ title: "Notifications Disabled", description: "You can enable reminders in browser settings.", variant: "destructive" });
          }
        });
      }
    }
  }, [toast]);

  // Check for due reminders and send notifications
  useEffect(() => {
    const checkReminders = () => {
      if (Notification.permission !== 'granted') return;

      const now = new Date();
      const currentDay = DAYS_OF_WEEK[now.getDay()];
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newNotifiedForThisMinute = new Set<string>();

      reminders.forEach(reminder => {
        if (reminder.isActive && reminder.days.includes(currentDay) && reminder.time === currentTime) {
          const notificationKey = `${reminder.id}-${currentTime}`;
          if (!notifiedMinute.has(notificationKey)) {
            new Notification("MediMate Pill Reminder", {
              body: `Time to take your ${reminder.medicineName} at ${reminder.time}.`,
              icon: '/logo.png', // Optional: Add a logo in your public folder
            });
            toast({
              title: `Reminder: ${reminder.medicineName}`,
              description: `It's time to take your medication at ${reminder.time}.`,
            });
            newNotifiedForThisMinute.add(notificationKey);
          } else {
             newNotifiedForThisMinute.add(notificationKey); // Keep it in the set if already notified this minute
          }
        }
      });
      setNotifiedMinute(newNotifiedForThisMinute);
    };

    // Clear notifiedMinute when the minute changes
    const minuteChangeInterval = setInterval(() => {
      setNotifiedMinute(new Set()); // Reset for the new minute
    }, 60 * 1000);


    const intervalId = setInterval(checkReminders, 30000); // Check every 30 seconds
    checkReminders(); // Initial check

    return () => {
      clearInterval(intervalId);
      clearInterval(minuteChangeInterval);
    };
  }, [reminders, toast, notifiedMinute]);


  useEffect(() => {
    if (user?.user_metadata?.username) {
      setNewUsername(user.user_metadata.username);
    } else if (user?.email) {
      setNewUsername(user.email.split('@')[0]); // Default to part of email
    }
  }, [user]);
  
  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!authLoading && !user) {
      // The UI below handles the display for unauthenticated users
    }
  }, [user, authLoading, router]);

  const handleUsernameUpdate = async () => {
    if (!newUsername.trim()) {
      toast({ title: "Error", description: "Username cannot be empty.", variant: "destructive" });
      return;
    }
    setUsernameLoading(true);
    const { error } = await updateUserMetadata({ username: newUsername.trim() });
    setUsernameLoading(false);
    if (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Username updated successfully!", className: "bg-green-500 text-white" });
      setIsEditingUsername(false);
    }
  };

  // Reminder Modal Handlers
  const openAddReminderModal = () => {
    setEditingReminderId(null);
    setCurrentReminder({ medicineName: '', time: '08:00', days: [], isActive: true, tempId: Date.now().toString() });
    setIsReminderModalOpen(true);
  };

  const openEditReminderModal = (reminder: TabletReminder) => {
    setEditingReminderId(reminder.id);
    setCurrentReminder({ ...reminder });
    setIsReminderModalOpen(true);
  };
  
  const handleReminderFormChange = (field: keyof TabletReminder, value: any) => {
    setCurrentReminder(prev => ({ ...prev, [field]: value }));
  };

  const handleDayToggle = (day: DayOfWeek) => {
    setCurrentReminder(prev => {
      const currentDays = prev.days || [];
      const newDays = currentDays.includes(day)
        ? currentDays.filter(d => d !== day)
        : [...currentDays, day];
      return { ...prev, days: newDays as DayOfWeek[] };
    });
  };
  
  const handleSaveReminder = () => {
    if (!currentReminder.medicineName || !currentReminder.time || !currentReminder.days || currentReminder.days.length === 0) {
      toast({ title: "Error", description: "Please fill all fields for the reminder.", variant: "destructive" });
      return;
    }

    if (editingReminderId) {
      setReminders(prev => prev.map(r => r.id === editingReminderId ? { ...r, ...currentReminder, id: editingReminderId } as TabletReminder : r));
      toast({ title: "Reminder Updated", description: `${currentReminder.medicineName} reminder updated.` });
    } else {
      const newReminder: TabletReminder = {
        id: currentReminder.tempId || Date.now().toString(), // Use tempId or generate new
        medicineName: currentReminder.medicineName!,
        time: currentReminder.time!,
        days: currentReminder.days as DayOfWeek[],
        isActive: currentReminder.isActive !== undefined ? currentReminder.isActive : true,
      };
      setReminders(prev => [...prev, newReminder]);
      toast({ title: "Reminder Added", description: `${newReminder.medicineName} reminder set.` });
    }
    setIsReminderModalOpen(false);
    setCurrentReminder({});
    setEditingReminderId(null);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast({ title: "Reminder Deleted", description: "The reminder has been removed." });
  };

  const toggleReminderActiveState = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };


  if (authLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading your profile...</p>
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center p-4">
          <Card className="max-w-md w-full p-8 shadow-lg">
            <UserProfileIcon className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-headline text-2xl mb-3">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              Please log in to access your personal health profile and medical records.
            </p>
            <Button asChild className="w-full">
              <Link href="/login?redirect=/profile">
                <LogIn className="mr-2 h-4 w-4" /> Log In or Sign Up
              </Link>
            </Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const currentDisplayName = user.user_metadata?.username || user.email?.split('@')[0] || "MediMate User";

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Image src="https://placehold.co/100x100.png" alt="User Avatar" width={80} height={80} className="rounded-full border shadow" data-ai-hint="profile avatar" />
            <div className="flex-grow">
              {!isEditingUsername ? (
                <>
                  <CardTitle className="font-headline text-3xl">{currentDisplayName}</CardTitle>
                  <CardDescription>{user.email || 'Manage your health information securely.'}</CardDescription>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => { setNewUsername(currentDisplayName); setIsEditingUsername(true); }}>
                    <Edit2 className="mr-2 h-3 w-3" /> Edit Username
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="username">Edit Username</Label>
                  <Input 
                    id="username" 
                    value={newUsername} 
                    onChange={(e) => setNewUsername(e.target.value)} 
                    className="max-w-sm"
                    placeholder="Enter your new username"
                  />
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={handleUsernameUpdate} disabled={usernameLoading} size="sm">
                      {usernameLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingUsername(false)} disabled={usernameLoading} size="sm">Cancel</Button>
                  </div>
                </div>
              )}
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
                 <Button onClick={openAddReminderModal}><PlusCircle className="mr-2 h-4 w-4" /> Add New Reminder</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {Notification.permission !== 'granted' && (
                    <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-700 text-sm flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Browser notifications are currently disabled. Please enable them in your browser settings to receive reminders.</span>
                    </div>
                )}
                {reminders.length > 0 ? reminders.map(rem => (
                  <Card key={rem.id} className={`shadow-sm ${rem.isActive ? '' : 'opacity-60'}`}>
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-grow">
                        <p className="font-headline text-lg">{rem.medicineName}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <CalendarClock className="h-4 w-4 mr-1.5" /> {rem.time} - {rem.days.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                        <Switch checked={rem.isActive} onCheckedChange={() => toggleReminderActiveState(rem.id)} aria-label={`Toggle reminder for ${rem.medicineName}`} />
                        <Button variant="outline" size="icon" onClick={() => openEditReminderModal(rem)} aria-label="Edit reminder">
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteReminder(rem.id)} aria-label="Delete reminder">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )) : <p className="text-muted-foreground text-center py-4">No reminders set up. Click 'Add New Reminder' to get started.</p>}
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
              <Label htmlFor="medNamePrescription" className="text-right">Medicine</Label>
              <Input id="medNamePrescription" placeholder="e.g., Paracetamol 500mg" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPrescriptionModalOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={() => { setIsAddPrescriptionModalOpen(false); toast({title: "Mock Action", description: "Prescription saved (mock)." }); }}>Save Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
       <Dialog open={isAddTestResultModalOpen} onOpenChange={setIsAddTestResultModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-xl">Add New Test Result</DialogTitle>
            <DialogDescription>Enter the details of your new test result.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="testNameResult" className="text-right">Test Name</Label>
              <Input id="testNameResult" placeholder="e.g., Lipid Profile" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTestResultModalOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={() => { setIsAddTestResultModalOpen(false); toast({title: "Mock Action", description: "Test result saved (mock)." }); }}>Save Result</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Reminder Modal */}
      <Dialog open={isReminderModalOpen} onOpenChange={setIsReminderModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-xl">{editingReminderId ? 'Edit Reminder' : 'Add New Reminder'}</DialogTitle>
            <DialogDescription>Set up a new tablet reminder.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="remMedName">Medicine Name</Label>
              <Input 
                id="remMedName" 
                placeholder="e.g., Vitamin C" 
                value={currentReminder.medicineName || ''}
                onChange={(e) => handleReminderFormChange('medicineName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remTime">Time</Label>
              <Input 
                id="remTime" 
                type="time"
                value={currentReminder.time || '08:00'}
                onChange={(e) => handleReminderFormChange('time', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Days</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {DAYS_OF_WEEK.map(day => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${day}`}
                      checked={currentReminder.days?.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                    />
                    <Label htmlFor={`day-${day}`} className="font-normal">{day}</Label>
                  </div>
                ))}
              </div>
            </div>
             <div className="flex items-center space-x-2">
                <Switch
                    id="reminderActive"
                    checked={currentReminder.isActive !== undefined ? currentReminder.isActive : true}
                    onCheckedChange={(checked) => handleReminderFormChange('isActive', checked)}
                />
                <Label htmlFor="reminderActive">Enable Reminder</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsReminderModalOpen(false); setCurrentReminder({}); setEditingReminderId(null);}}>Cancel</Button>
            <Button onClick={handleSaveReminder}>{editingReminderId ? 'Save Changes' : 'Add Reminder'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </AppLayout>
  );
}
