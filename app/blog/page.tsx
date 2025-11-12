import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
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
            <Link href="/#booking">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-muted-foreground">
          Blog posts coming soon...
        </p>
      </div>
    </div>
  );
}
