"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadCard from "@/components/UploadCard";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
    const [questionFiles, setQuestionFiles] = useState([]);
    const [answerFiles, setAnswerFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleUpload = async () => {
        setUploading(true);
        try {
            const form = new FormData();
            questionFiles.forEach((file) =>
                form.append("questionFiles[]", file)
            );
            answerFiles.forEach((file) => form.append("answerFiles[]", file));

            await fetch("/api/upload", { method: "POST", body: form });

            setQuestionFiles([]);
            setAnswerFiles([]);
            router.push("/evaluate");
        } catch (e) {
            alert("Upload failed.");
        }
        setUploading(false);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                gap: "2rem",
                justifyContent: "center",
            }}
        >
            <UploadCard
                files={questionFiles}
                setFiles={setQuestionFiles}
                label="Upload Question Paper"
                description="Drag and drop a single PDF question paper, or click to select. Only one PDF is accepted."
                multiple={false}
            />
            <UploadCard
                files={answerFiles}
                setFiles={setAnswerFiles}
                label="Upload Answer Papers"
                description="Drag and drop PDF answer papers, or click to select. Only PDFs are accepted."
            />
            <Button
                onClick={handleUpload}
                disabled={
                    questionFiles.length === 0 ||
                    answerFiles.length === 0 ||
                    uploading
                }
            >
                {uploading ? "Uploading..." : "Upload"}
            </Button>
        </div>
    );
}
