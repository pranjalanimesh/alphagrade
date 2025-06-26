"use client"

import { useRef, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UploadCard({ files, setFiles, label, description, multiple = true }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = (fileList) => {
    const pdfFiles = Array.from(fileList).filter(
      (file) => file.type === "application/pdf"
    )
    if (multiple) {
      setFiles((prev) => [...prev, ...pdfFiles])
    } else {
      setFiles(pdfFiles.slice(0, 1))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleFileInput = (e) => {
    handleFiles(e.target.files)
  }

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="font-bold text-lg">{label}</div>
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`border-dashed border-2 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <FileIcon className="h-8 w-8 mb-2 text-gray-400" />
          <div className="text-gray-600 text-center">
            Drag and drop PDF file{multiple ? "s" : ""} here, or <span className="underline">click to select</span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            multiple={multiple}
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {files.map((file, idx) => (
            <div key={idx} className="border-dashed border rounded-lg p-4 flex items-center gap-4 bg-white">
              <FileIcon className="h-6 w-6 text-gray-400" />
              <div className="flex-1 grid gap-1.5 text-sm">
                <div className="truncate">{file.name}</div>
                <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeFile(idx)}>
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={() => setFiles([])} disabled={files.length === 0}>
            Cancel
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}