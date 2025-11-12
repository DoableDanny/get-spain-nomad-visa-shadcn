"use client"

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile?: {
    name: string;
    uploadedAt: string;
  };
  onFileRemove?: () => void;
  accept?: string;
  maxSizeMB?: number;
  isUploading?: boolean;
}

export function FileUpload({
  onFileUpload,
  uploadedFile,
  onFileRemove,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxSizeMB = 10,
  isUploading = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }
    onFileUpload(file);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  if (uploadedFile) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  Uploaded on {uploadedFile.uploadedAt}
                </p>
              </div>
            </div>
            {onFileRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFileRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "border-dashed transition-colors",
        dragActive && "border-primary bg-primary/5",
        isUploading && "opacity-50 pointer-events-none"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">
              {isUploading ? "Uploading..." : "Drop your file here, or browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports: {accept} (Max {maxSizeMB}MB)
            </p>
          </div>
          <Button onClick={onButtonClick} disabled={isUploading}>
            Select File
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept={accept}
          />
        </div>
      </CardContent>
    </Card>
  );
}
