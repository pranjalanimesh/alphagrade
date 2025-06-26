"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import evaluationResults from "./result";
import EvaluationResults from "../../components/EvaluationResults";

const EvaluationPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(
                "https://b9cd-13-233-67-63.ngrok-free.app/api/v1/fetch/presigned-upload-url",
                {
                    headers: { "ngrok-skip-browser-warning": "true" },
                }
            )
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load evaluation data:", err);
                setError(`Failed to load evaluation data: ${err.message}`);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="text-gray-500 text-lg">
                    Loading assessments...
                </span>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="text-gray-500 text-lg">
                    No assessments found
                </span>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <div className="max-w-6xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8 text-center">
                    Evaluation
                </h1>
                <div className="flex flex-col items-center space-y-8">
                    {/* Answer Paper (Centered) */}
                    <div className="w-full max-w-xl text-center">
                        <h2 className="font-semibold mb-2">Answer Paper</h2>
                        <a
                            href={data.answerSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                        >
                            Open Answer Paper
                        </a>
                    </div>

                    {/* Grading (Centered) */}
                    <div className="w-full max-w-2xl text-center">
                        <h2 className="font-semibold mb-2">Grading</h2>
                        <EvaluationResults evaluationData={evaluationResults} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EvaluationPage;
