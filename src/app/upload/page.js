"use client";

import { useState } from "react";
import UploadCard from "@/components/UploadCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Upload, FileText, Clock } from "lucide-react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

/* ---------- helpers ---------------------------------------------------- */

async function getPresignedUrls(mime = "application/pdf") {
  const { data, status } = await axios.get(
    "https://b9cd-13-233-67-63.ngrok-free.app/api/v1/generate/presigned-upload-url",
    {
      params: { mime },
      headers: { "ngrok-skip-browser-warning": "true" }
    }
  );
  if (status !== 200) {
    throw new Error(`Unexpected status ${status}`);
  }
  return data;
}

// Updated upload function using Axios
async function uploadToS3(presignedUrl, file, setProgress) {
  return axios.put(presignedUrl, file, {
    headers: {
      "Accept": "application/pdf",
      "Content-Type": file.type
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentComplete = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentComplete);
      }
    }
  });
}

/* ---------- component -------------------------------------------------- */

export default function UploadPage() {
  const [questionFiles, setQuestionFiles] = useState([]);
  const [answerFiles, setAnswerFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    setUploading(true);
    setProgress(0);
    setUploadComplete(false);
    
    try {
      const mime = questionFiles[0]?.type || "application/pdf";
      const { questionPaper, answerSheet } = await getPresignedUrls(mime);

      if (questionFiles[0]) {
        setCurrentFile("question paper");
        await uploadToS3(questionPaper, questionFiles[0], setProgress);
      }

      if (answerFiles[0]) {
        setProgress(0);
        setCurrentFile("answer sheet");
        await uploadToS3(answerSheet, answerFiles[0], setProgress);
      }

      setProgress(100);
      setUploadComplete(true);
      setCurrentFile("upload complete");
      
      // Clear files and redirect after a brief delay
      setTimeout(() => {
        setQuestionFiles([]);
        setAnswerFiles([]);
        router.push("/evaluation");
      }, 2000);
      
    } catch (e) {
      console.error("Upload failed:", e);
      alert("Upload failed. Please try again.");
      setUploading(false);
      setProgress(0);
      setCurrentFile("");
    }
  };

  const canUpload = questionFiles.length > 0 && answerFiles.length > 0 && !uploading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upload Documents
            </h1>
            <p className="text-lg text-gray-600">
              Upload your question paper and answer sheet to begin evaluation
            </p>
          </div>

          {/* Upload Cards or Progress View */}
          <div className="space-y-8">
            {!uploading ? (
              <>
                {/* Upload Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <UploadCard
                      files={questionFiles}
                      setFiles={setQuestionFiles}
                      label="Upload Question Paper"
                      description="Drag and drop a single PDF question paper, or click to select."
                      multiple={false}
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <UploadCard
                      files={answerFiles}
                      setFiles={setAnswerFiles}
                      label="Upload Answer Paper"
                      description="Drag and drop the PDF answer paper, or click to select."
                      multiple={false}
                    />
                  </div>
                </div>

                {/* Upload Summary */}
                {(questionFiles.length > 0 || answerFiles.length > 0) && (
                  <Card className="transition-all duration-500 ease-in-out transform animate-in slide-in-from-bottom-4">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Files Ready for Upload
                      </h3>
                      <div className="space-y-2">
                        {questionFiles.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Question Paper: {questionFiles[0].name}
                          </div>
                        )}
                        {answerFiles.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Answer Sheet: {answerFiles[0].name}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Upload Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleUpload}
                    disabled={!canUpload}
                    size="lg"
                    className="px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {canUpload ? "Start Upload" : "Select Both Files"}
                  </Button>
                </div>
              </>
            ) : (
              /* Upload Progress View */
              <div className="animate-in fade-in-50 duration-500">
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      {/* Upload Icon */}
                      <div className="flex justify-center">
                        {uploadComplete ? (
                          <div className="animate-in zoom-in duration-500">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                          </div>
                        ) : (
                          <div className="animate-spin">
                            <Upload className="h-16 w-16 text-blue-500" />
                          </div>
                        )}
                      </div>

                      {/* Status Text */}
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {uploadComplete ? "Upload Complete!" : "Uploading Files..."}
                        </h2>
                        <p className="text-gray-600 capitalize flex items-center justify-center gap-2">
                          {uploadComplete ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              Redirecting to evaluation page
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4" />
                              Currently uploading: {currentFile}
                            </>
                          )}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <Progress 
                          value={progress} 
                          className="w-full h-3"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                      </div>

                      {/* Upload Steps */}
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className={`p-3 rounded-lg border transition-all duration-300 ${
                          currentFile === "question paper" || uploadComplete
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}>
                          <div className="flex items-center gap-2">
                            {uploadComplete || (currentFile !== "question paper" && currentFile !== "") ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <div className={`h-4 w-4 rounded-full border-2 ${
                                currentFile === "question paper" ? "border-blue-500 animate-pulse" : "border-gray-300"
                              }`} />
                            )}
                            <span className="text-sm font-medium">Question Paper</span>
                          </div>
                        </div>
                        
                        <div className={`p-3 rounded-lg border transition-all duration-300 ${
                          currentFile === "answer sheet" || uploadComplete
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}>
                          <div className="flex items-center gap-2">
                            {uploadComplete ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <div className={`h-4 w-4 rounded-full border-2 ${
                                currentFile === "answer sheet" ? "border-blue-500 animate-pulse" : "border-gray-300"
                              }`} />
                            )}
                            <span className="text-sm font-medium">Answer Sheet</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}