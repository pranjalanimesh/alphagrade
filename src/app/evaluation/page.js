'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const EvaluationPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/evaluation')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => {
                if (json.error) {
                    throw new Error(json.error);
                }
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load evaluation data:', err);
                setError(`Failed to load evaluation data: ${err.message}`);
                setLoading(false);
            });
    }, []);

    // Helper function to create PDF blob URL
    const createPdfBlobUrl = (base64Data) => {
        try {
            // Remove data URL prefix if present
            const cleanBase64 = base64Data.replace(/^data:application\/pdf;base64,/, '');
            
            // Convert base64 to binary
            const binaryString = atob(cleanBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Create blob and return URL
            const blob = new Blob([bytes], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        } catch (err) {
            console.error('Error creating PDF blob URL:', err);
            return null;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="text-gray-500 text-lg">Loading assessments...</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="text-gray-500 text-lg">No assessments found</span>
            </div>
        );
    }

    return (
        <>
        <NavBar/>
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Evaluation</h1>
            
            {/* Question Paper Section */}
            <div className="mb-8">
                <h2 className="font-semibold mb-2">Question Paper</h2>
                <div className="mb-2 text-gray-700 text-sm">
                    <span className="font-medium">{data.question.name}</span> &middot; {formatSize(data.question.size)}
                </div>
                <div className="border rounded overflow-hidden shadow">
                    <iframe
                        src={createPdfBlobUrl(data.question.data) || `data:application/pdf;base64,${data.question.data}`}
                        title="Question Paper"
                        width="100%"
                        height="500px"
                        className="w-full"
                        onError={(e) => {
                            console.error('Question PDF iframe error:', e);
                        }}
                    />
                </div>
            </div>

            {/* Answer Papers Section */}
            <div>
                <h2 className="font-semibold mb-2">Answer Papers</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {data.answers && data.answers.length > 0 ? (
                        data.answers.map((ans, idx) => (
                            <div key={idx} className="border rounded p-2 shadow bg-white">
                                <div className="mb-2 text-gray-700 text-sm">
                                    <span className="font-medium">{ans.name}</span> &middot; {formatSize(ans.size)}
                                </div>
                                <div className="overflow-hidden rounded border">
                                    <iframe
                                        src={createPdfBlobUrl(ans.data) || `data:application/pdf;base64,${ans.data}`}
                                        title={`Answer Paper ${idx + 1}`}
                                        width="100%"
                                        height="300px"
                                        className="w-full"
                                        onError={(e) => {
                                            console.error(`Answer PDF ${idx + 1} iframe error:`, e);
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">No answer papers uploaded.</div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default EvaluationPage;