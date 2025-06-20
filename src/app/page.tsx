import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Bot,
  Pill,
  CalendarDays,
  PlaySquare,
  Siren,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "AI Health Analysis",
    description: "Get preliminary advice based on medical images or symptoms.",
    icon: Bot,
    href: "/health-analysis",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-primary", // Updated
    dataAiHint: "AI diagnosis",
  },
  {
    title: "Medicine Information",
    description: "Search and view details about various medicines.",
    icon: Pill,
    href: "/medicines",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400", // Kept green as it's thematic for medicine
    dataAiHint: "medicine search",
  },
  {
    title: "Appointment Scheduling",
    description: "Book appointments with doctors and explore health packs.",
    icon: CalendarDays,
    href: "/appointments",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400", // Kept purple
    dataAiHint: "doctor appointment",
  },
  {
    title: "Health Reels",
    description: "Watch short videos on health, fitness, and wellness.",
    icon: PlaySquare,
    href: "/reels",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400", // Kept yellow
    dataAiHint: "health videos",
  },
  {
    title: "Emergency Assistance",
    description: "Access emergency contacts and first aid guides.",
    icon: Siren,
    href: "/emergency",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-accent", // Updated to use theme accent
    dataAiHint: "emergency help",
  },
  {
    title: "Personal Health Profile",
    description: "Manage prescriptions, test results, and health history.",
    icon: UserCircle,
    href: "/profile",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-secondary", // Updated to use theme secondary
    dataAiHint: "health records",
  },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="rounded-lg bg-gradient-to-r from-primary to-accent p-8 shadow-lg">
          <h1 className="font-headline text-4xl font-bold text-primary-foreground">
            Welcome to MediMate
          </h1>
          <p className="mt-2 text-lg text-primary-foreground/90">
            Your personal health companion, always here to assist you.
          </p>
        </header>

        <section>
          <h2 className="font-headline text-3xl font-semibold mb-6 text-foreground">
            Explore Features
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-card"
              >
                <CardHeader className="flex flex-row items-start gap-4 p-6">
                  <div className={`p-3 rounded-full ${feature.bgColor}`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl text-card-foreground">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-end p-6 pt-0">
                  <Link href={feature.href} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full group hover:bg-primary/10"
                    >
                      Explore{" "}
                      <ArrowRight className="ml-2 h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="shadow-md dark:bg-card">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-card-foreground">
                Health Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Stay hydrated! Drinking enough water throughout the day is
                crucial for overall health and well-being. Aim for at least 8
                glasses.
              </p>
              <img
                src="https://www.bing.com/th/id/OIP.Qhkh9TXj8cCfUMTtjpeyrAAAAA?w=136&h=105&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                alt="Health tip illustration"
                data-ai-hint="water hydration"
                className="mt-4 rounded-lg w-[500px] md:w-[250px]"
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
