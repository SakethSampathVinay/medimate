import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Pill, Hospital, CalendarDays, PlaySquare, Siren, UserCircle } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'AI Health Analysis',
    description: 'Get preliminary advice based on medical images or symptoms.',
    icon: Bot,
    href: '/health-analysis',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    dataAiHint: 'AI diagnosis'
  },
  {
    title: 'Medicine Information',
    description: 'Search and view details about various medicines.',
    icon: Pill,
    href: '/medicines',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    dataAiHint: 'medicine search'
  },
  {
    title: 'Hospital Locator',
    description: 'Find nearby hospitals with contact information and directions.',
    icon: Hospital,
    href: '/hospitals',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    dataAiHint: 'hospital map'
  },
  {
    title: 'Appointment Scheduling',
    description: 'Book appointments with doctors and explore health packs.',
    icon: CalendarDays,
    href: '/appointments',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    dataAiHint: 'doctor appointment'
  },
  {
    title: 'Health Reels',
    description: 'Watch short videos on health, fitness, and wellness.',
    icon: PlaySquare,
    href: '/reels',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    dataAiHint: 'health videos'
  },
  {
    title: 'Emergency Assistance',
    description: 'Access emergency contacts and first aid guides.',
    icon: Siren,
    href: '/emergency',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    dataAiHint: 'emergency help'
  },
  {
    title: 'Personal Health Profile',
    description: 'Manage prescriptions, test results, and health history.',
    icon: UserCircle,
    href: '/profile',
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-600',
    dataAiHint: 'health records'
  },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="rounded-lg bg-gradient-to-r from-primary to-accent p-8 shadow-lg">
          <h1 className="font-headline text-4xl font-bold text-primary-foreground">Welcome to MediMate</h1>
          <p className="mt-2 text-lg text-primary-foreground/90">Your personal health companion, always here to assist you.</p>
        </header>

        <section>
          <h2 className="font-headline text-3xl font-semibold mb-6">Explore Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-start gap-4 p-6">
                  <div className={`p-3 rounded-full ${feature.bgColor}`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm">{feature.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-end p-6 pt-0">
                  <Link href={feature.href} className="w-full">
                    <Button variant="outline" className="w-full group">
                      Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Health Tip of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Stay hydrated! Drinking enough water throughout the day is crucial for overall health and well-being. Aim for at least 8 glasses.</p>
              <img src="https://placehold.co/600x200.png" alt="Health tip illustration" data-ai-hint="water hydration" className="mt-4 rounded-lg" />
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
