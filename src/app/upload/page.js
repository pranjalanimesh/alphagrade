"use client";

import { useState } from "react";
import UploadCard from "@/components/UploadCard";
import { Button } from "@/components/ui/button";
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
      "Accept": "appliation/pdf",
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
  const router = useRouter();

  const handleUpload = async () => {
    setUploading(true);
    setProgress(0);
    try {
      const mime = questionFiles[0]?.type || "application/pdf";
      const { questionPaper, answerSheet } = await getPresignedUrls(mime);

      if (questionFiles[0]) {
        await uploadToS3(questionPaper, questionFiles[0], setProgress);
      }

      if (answerFiles[0]) {
        setProgress(0); // Reset progress for second file
        await uploadToS3(answerSheet, answerFiles[0], setProgress);
      }

      setQuestionFiles([]);
      setAnswerFiles([]);
      setTimeout(() => {
        router.push("/evaluation");
      }, 500);
    } catch (e) {
      console.error("Upload failed:", e);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen space-y-12">
      <NavBar />
      <div className="flex flex-col items-center gap-8 justify-center">
        <UploadCard
          files={questionFiles}
          setFiles={setQuestionFiles}
          label="Upload Question Paper"
          description="Drag and drop a single PDF question paper, or click to select."
          multiple={false}
        />

        <UploadCard
          files={answerFiles}
          setFiles={setAnswerFiles}
          label="Upload Answer Paper"
          description="Drag and drop the PDF answer paper, or click to select."
          multiple={false}
        />

        <Button
          onClick={handleUpload}
          disabled={
            uploading || questionFiles.length === 0 || answerFiles.length === 0
          }
        >
          {uploading ? "Uploading…" : "Upload"}
        </Button>

        {uploading && (
          <div className="mt-4 w-64">
            <div className="bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mt-2">{progress}%</div>
          </div>
        )}
      </div>
    </div>
  );
}
