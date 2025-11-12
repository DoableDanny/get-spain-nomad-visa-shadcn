"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  content: string;
  author: string;
  authorType: "user" | "lawyer";
  timestamp: string;
}

interface TimelineProps {
  items: TimelineItem[];
  onAddNote: (note: string) => void;
  isLoading?: boolean;
}

export function Timeline({ items, onAddNote, isLoading }: TimelineProps) {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (note.trim()) {
      onAddNote(note);
      setNote("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="note">Add a Note</Label>
        <div className="mt-2 space-y-2">
          <Textarea
            id="note"
            placeholder="Add your notes or questions here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
          <Button onClick={handleSubmit} disabled={!note.trim() || isLoading}>
            Add Note
          </Button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Timeline</h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <Card key={item.id} className={cn(
                "relative pl-8",
                item.authorType === "lawyer" && "bg-blue-50/50"
              )}>
                <div className="absolute left-3 top-6 -ml-px h-full w-0.5 bg-gray-200" />
                <div className={cn(
                  "absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full",
                  item.authorType === "user" ? "bg-primary" : "bg-blue-600"
                )}>
                  {item.authorType === "user" ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Briefcase className="h-3 w-3 text-white" />
                  )}
                </div>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {item.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
