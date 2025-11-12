import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Clock, CheckCircle, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Spain Digital Nomad Visa
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm font-medium hover:underline">
              Blog
            </Link>
            <Link href="/app">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Button size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Get Your Spain Digital Nomad Visa
          <span className="block text-primary mt-2">Fast & Easy</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Expert guidance through every step of your Spain digital nomad visa application.
          Work with experienced lawyers who specialize in Spanish immigration.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="#booking">Book Consultation</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/app">View Application</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 bg-muted/50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Service?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <FileText className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Document Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Step-by-step guidance on all required documents including apostille and sworn translations
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Expert Lawyers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Work directly with specialized immigration lawyers who know the Spanish system
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Fast Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Streamlined application process with real-time tracking and timeline updates
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>High Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our lawyers have helped hundreds of digital nomads successfully obtain their visas
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Book Your Consultation</h3>
              <p className="text-muted-foreground">
                Schedule a 30-minute consultation with one of our expert lawyers for just €30
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Get Your Account</h3>
              <p className="text-muted-foreground">
                After your consultation, your lawyer will activate your account to begin the application process
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Documents</h3>
              <p className="text-muted-foreground">
                Follow our step-by-step guide to upload all required documents with help from your lawyer
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Submit & Track</h3>
              <p className="text-muted-foreground">
                Submit your application and track progress in real-time with timeline updates from your lawyer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="container mx-auto px-4 py-24 bg-muted/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Book Your Consultation
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            30-minute consultation with an expert immigration lawyer - €30
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Schedule Your Appointment</CardTitle>
              <CardDescription>
                Fill out the form below to book your consultation with one of our lawyers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Select Date & Time</Label>
                  <Input id="date" type="datetime-local" />
                  <p className="text-sm text-muted-foreground">
                    Available slots are shown based on lawyer availability
                  </p>
                </div>

                <Button className="w-full" size="lg">
                  Continue to Payment - €30
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Spain Digital Nomad Visa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
