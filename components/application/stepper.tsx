"use client"

import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "completed" | "current" | "upcoming" | "half-completed";

export interface Step {
  id: string;
  title: string;
  status: StepStatus;
}

interface StepperProps {
  steps: Step[];
  onStepClick?: (stepId: string) => void;
}

export function Stepper({ steps, onStepClick }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.id} className="md:flex-1">
            <button
              onClick={() => onStepClick?.(step.id)}
              className={cn(
                "group flex w-full flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 transition-colors",
                step.status === "completed" && "border-primary hover:border-primary/80",
                step.status === "half-completed" && "border-yellow-500 hover:border-yellow-600",
                step.status === "current" && "border-primary",
                step.status === "upcoming" && "border-gray-200 hover:border-gray-300"
              )}
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                {step.status === "completed" ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </span>
                ) : step.status === "half-completed" ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-50">
                    <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  </span>
                ) : step.status === "current" ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </span>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                  </span>
                )}
                <span
                  className={cn(
                    step.status === "completed" && "text-primary",
                    step.status === "half-completed" && "text-yellow-700",
                    step.status === "current" && "text-primary",
                    step.status === "upcoming" && "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
