"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Stepper, type Step } from "@/components/application/stepper";
import { Timeline, type TimelineItem } from "@/components/application/timeline";
import { FileUpload } from "@/components/application/file-upload";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type StepId = "work-contract" | "company-certificate" | "degree" | "criminal-record" | "submit";

interface UploadedFile {
  name: string;
  uploadedAt: string;
}

interface StepData {
  file?: UploadedFile;
  isTranslated?: boolean;
  translationRequested?: boolean;
  notes: TimelineItem[];
  expertiseOption?: "masters" | "employment";
}

export default function ApplicationPage() {
  const [currentStep, setCurrentStep] = useState<StepId>("work-contract");
  const [stepData, setStepData] = useState<Record<StepId, StepData>>({
    "work-contract": { notes: [] },
    "company-certificate": { notes: [] },
    "degree": { notes: [] },
    "criminal-record": { notes: [] },
    "submit": { notes: [] },
  });

  const getStepStatus = (stepId: StepId): Step["status"] => {
    const data = stepData[stepId];

    if (stepId === "submit") {
      const allStepsComplete = (["work-contract", "company-certificate", "degree", "criminal-record"] as StepId[])
        .every(id => {
          const d = stepData[id];
          return d.file && (d.isTranslated || !requiresTranslation(id));
        });
      return allStepsComplete ? "current" : "upcoming";
    }

    if (stepId === "degree") {
      if (data.expertiseOption && data.file) {
        if (data.expertiseOption === "masters" && !data.isTranslated) {
          return "half-completed";
        }
        return "completed";
      }
      return stepId === currentStep ? "current" : "upcoming";
    }

    if (data.file) {
      if (requiresTranslation(stepId) && !data.isTranslated) {
        return "half-completed";
      }
      return "completed";
    }

    return stepId === currentStep ? "current" : "upcoming";
  };

  const requiresTranslation = (stepId: StepId): boolean => {
    return ["company-certificate", "criminal-record"].includes(stepId) ||
           (stepId === "degree" && stepData[stepId].expertiseOption === "masters");
  };

  const steps: Step[] = [
    { id: "work-contract", title: "Work Contract", status: getStepStatus("work-contract") },
    { id: "company-certificate", title: "Company Certificate", status: getStepStatus("company-certificate") },
    { id: "degree", title: "Degree/Expertise", status: getStepStatus("degree") },
    { id: "criminal-record", title: "Criminal Record", status: getStepStatus("criminal-record") },
    { id: "submit", title: "Submit", status: getStepStatus("submit") },
  ];

  const handleFileUpload = (stepId: StepId, file: File) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        file: {
          name: file.name,
          uploadedAt: new Date().toLocaleDateString(),
        },
      },
    }));
  };

  const handleAddNote = (stepId: StepId, note: string) => {
    const newNote: TimelineItem = {
      id: Date.now().toString(),
      content: note,
      author: "You",
      authorType: "user",
      timestamp: new Date().toLocaleString(),
    };

    setStepData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        notes: [...prev[stepId].notes, newNote],
      },
    }));
  };

  const handleTranslationToggle = (stepId: StepId, checked: boolean) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        isTranslated: checked,
      },
    }));
  };

  const handleRequestTranslation = (stepId: StepId) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        translationRequested: true,
      },
    }));
    alert("Translation request sent to your lawyer. They will provide a quote shortly.");
  };

  const handleExpertiseOption = (option: "masters" | "employment") => {
    setStepData(prev => ({
      ...prev,
      degree: {
        ...prev.degree,
        expertiseOption: option,
      },
    }));
  };

  const renderStepContent = () => {
    const data = stepData[currentStep];

    switch (currentStep) {
      case "work-contract":
        return (
          <div className="space-y-6">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Work Contract Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Your work contract must meet the following requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Contract must be at least 3 months old</li>
                  <li>Must state that the freelancer is permitted to work in Spain</li>
                  <li>Must show monthly income of at least €3,000</li>
                  <li>Income must be stated in Euros</li>
                </ul>
              </CardContent>
            </Card>

            <div>
              <Label>Upload Work Contract</Label>
              <div className="mt-2">
                <FileUpload
                  onFileUpload={(file) => handleFileUpload("work-contract", file)}
                  uploadedFile={data.file}
                />
              </div>
            </div>

            <Timeline
              items={data.notes}
              onAddNote={(note) => handleAddNote("work-contract", note)}
            />
          </div>
        );

      case "company-certificate":
        return (
          <div className="space-y-6">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Company Certificate Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Your company certificate must meet the following requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Must state the incorporation date of the company</li>
                  <li>Can be a certificate of incorporation or certificate of good standing</li>
                  <li>Company must be at least 1 year old</li>
                  <li>Document must be apostilled</li>
                  <li>Document must be sworn translated to Spanish</li>
                </ul>
              </CardContent>
            </Card>

            <div>
              <Label>Upload Company Certificate</Label>
              <div className="mt-2">
                <FileUpload
                  onFileUpload={(file) => handleFileUpload("company-certificate", file)}
                  uploadedFile={data.file}
                />
              </div>
            </div>

            {data.file && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="translated-company"
                    checked={data.isTranslated}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleTranslationToggle("company-certificate", e.target.checked)
                    }
                  />
                  <Label
                    htmlFor="translated-company"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Document is apostilled and sworn translated
                  </Label>
                </div>

                {!data.isTranslated && !data.translationRequested && (
                  <Button
                    variant="outline"
                    onClick={() => handleRequestTranslation("company-certificate")}
                  >
                    Request Translation Service
                  </Button>
                )}

                {data.translationRequested && !data.isTranslated && (
                  <Card className="border-yellow-200 bg-yellow-50/50">
                    <CardContent className="pt-4">
                      <p className="text-sm text-yellow-800">
                        Translation requested. Your lawyer will provide a quote shortly.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <Timeline
              items={data.notes}
              onAddNote={(note) => handleAddNote("company-certificate", note)}
            />
          </div>
        );

      case "degree":
        return (
          <div className="space-y-6">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Proof of Expertise Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>You can prove your expertise with one of the following options:</p>
              </CardContent>
            </Card>

            <div>
              <Label>Select Proof of Expertise Type</Label>
              <RadioGroup className="mt-2">
                <RadioGroupItem
                  id="masters"
                  name="expertise"
                  value="masters"
                  label="Master's Degree Certificate"
                  checked={data.expertiseOption === "masters"}
                  onChange={() => handleExpertiseOption("masters")}
                />
                <RadioGroupItem
                  id="employment"
                  name="expertise"
                  value="employment"
                  label="Proof of Employment (3+ years with contracts and invoices)"
                  checked={data.expertiseOption === "employment"}
                  onChange={() => handleExpertiseOption("employment")}
                />
              </RadioGroup>
            </div>

            {data.expertiseOption === "masters" && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="pt-4 text-sm">
                  <p className="font-medium mb-2">Master's Degree Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Must be apostilled</li>
                    <li>Must be sworn translated to Spanish</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.expertiseOption === "employment" && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="pt-4 text-sm">
                  <p className="font-medium mb-2">Proof of Employment Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>3 or more years of employment contracts</li>
                    <li>Corresponding invoices for the period</li>
                    <li>Documents showing continuous work history</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.expertiseOption && (
              <>
                <div>
                  <Label>Upload Document</Label>
                  <div className="mt-2">
                    <FileUpload
                      onFileUpload={(file) => handleFileUpload("degree", file)}
                      uploadedFile={data.file}
                    />
                  </div>
                </div>

                {data.file && data.expertiseOption === "masters" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="translated-degree"
                        checked={data.isTranslated}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleTranslationToggle("degree", e.target.checked)
                        }
                      />
                      <Label
                        htmlFor="translated-degree"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Document is apostilled and sworn translated
                      </Label>
                    </div>

                    {!data.isTranslated && !data.translationRequested && (
                      <Button
                        variant="outline"
                        onClick={() => handleRequestTranslation("degree")}
                      >
                        Request Translation Service
                      </Button>
                    )}

                    {data.translationRequested && !data.isTranslated && (
                      <Card className="border-yellow-200 bg-yellow-50/50">
                        <CardContent className="pt-4">
                          <p className="text-sm text-yellow-800">
                            Translation requested. Your lawyer will provide a quote shortly.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </>
            )}

            <Timeline
              items={data.notes}
              onAddNote={(note) => handleAddNote("degree", note)}
            />
          </div>
        );

      case "criminal-record":
        return (
          <div className="space-y-6">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Criminal Record Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Your criminal record certificate must meet the following requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Must be from your country of residence</li>
                  <li>Must be recent (typically less than 3 months old)</li>
                  <li>Document must be apostilled</li>
                  <li>Document must be sworn translated to Spanish</li>
                </ul>
              </CardContent>
            </Card>

            <div>
              <Label>Upload Criminal Record Certificate</Label>
              <div className="mt-2">
                <FileUpload
                  onFileUpload={(file) => handleFileUpload("criminal-record", file)}
                  uploadedFile={data.file}
                />
              </div>
            </div>

            {data.file && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="translated-criminal"
                    checked={data.isTranslated}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleTranslationToggle("criminal-record", e.target.checked)
                    }
                  />
                  <Label
                    htmlFor="translated-criminal"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Document is apostilled and sworn translated
                  </Label>
                </div>

                {!data.isTranslated && !data.translationRequested && (
                  <Button
                    variant="outline"
                    onClick={() => handleRequestTranslation("criminal-record")}
                  >
                    Request Translation Service
                  </Button>
                )}

                {data.translationRequested && !data.isTranslated && (
                  <Card className="border-yellow-200 bg-yellow-50/50">
                    <CardContent className="pt-4">
                      <p className="text-sm text-yellow-800">
                        Translation requested. Your lawyer will provide a quote shortly.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <Timeline
              items={data.notes}
              onAddNote={(note) => handleAddNote("criminal-record", note)}
            />
          </div>
        );

      case "submit":
        const allStepsComplete = (["work-contract", "company-certificate", "degree", "criminal-record"] as StepId[])
          .every(id => {
            const d = stepData[id];
            return d.file && (d.isTranslated || !requiresTranslation(id));
          });

        return (
          <div className="space-y-6">
            {allStepsComplete ? (
              <>
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Ready to Submit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      All required documents have been uploaded and verified. You can now submit your application.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(["work-contract", "company-certificate", "degree", "criminal-record"] as StepId[]).map(id => (
                      <div key={id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <span className="text-sm font-medium capitalize">
                          {id.replace("-", " ")}
                        </span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Complete
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button className="w-full" size="lg">
                  Submit Application
                </Button>
              </>
            ) : (
              <Card className="border-yellow-200 bg-yellow-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    Incomplete Application
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Please complete all required steps before submitting your application:
                  </p>
                  <div className="space-y-2">
                    {(["work-contract", "company-certificate", "degree", "criminal-record"] as StepId[]).map(id => {
                      const d = stepData[id];
                      const isComplete = d.file && (d.isTranslated || !requiresTranslation(id));
                      return (
                        <div key={id} className="flex items-center justify-between py-2">
                          <span className="text-sm capitalize">
                            {id.replace("-", " ")}
                          </span>
                          {isComplete ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Complete
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Incomplete
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    const stepIds: StepId[] = ["work-contract", "company-certificate", "degree", "criminal-record", "submit"];
    const currentIndex = stepIds.indexOf(currentStep);
    if (currentIndex < stepIds.length - 1) {
      setCurrentStep(stepIds[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepIds: StepId[] = ["work-contract", "company-certificate", "degree", "criminal-record", "submit"];
    const currentIndex = stepIds.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepIds[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Spain Digital Nomad Visa
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, User</span>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Visa Application</h1>
          <p className="text-muted-foreground">
            Complete all steps to submit your Spain digital nomad visa application
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper
            steps={steps}
            onStepClick={(stepId) => setCurrentStep(stepId as StepId)}
          />
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">
                {currentStep.replace("-", " ")}
              </CardTitle>
              <CardDescription>
                Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === "work-contract"}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === "submit"}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
