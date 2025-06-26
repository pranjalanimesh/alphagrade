import Image from "next/image";
import NavBar from "../components/NavBar";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <NavBar />

            {/* Hero Section */}
            <main className="px-6 py-16 sm:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-fade-in-scale opacity-0" 
                            style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                            <span className="animate-typewriter inline-block max-w-fit text-center">State-of-the-Art Math</span>

                            <div className="text-blue-700 animate-slide-in-right inline-block" style={{animationDelay: '1.5s', animationFillMode: 'forwards', opacity: '0'}}> Assessment</div>
                            <br />
                            <span className="animate-fade-in-up inline-block opacity-0" style={{animationDelay: '2.2s', animationFillMode: 'forwards'}}>for Modern Teachers</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in-up opacity-0 animate-typewriter" 
                           style={{animationDelay: '2.8s', animationFillMode: 'forwards'}}>
                            Transform how you assess student understanding with
                            intelligent, adaptive math evaluations that save
                            time and provide deeper insights.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up opacity-0" 
                             style={{animationDelay: '3.2s', animationFillMode: 'forwards'}}>
                            <a
                                href="/upload"
                                className="text-blue-700 hover:underline font-semibold mt-4 sm:mt-0"
                            >
                                <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg animate-pulse-button">
                                    Start Free Trial
                                </button>
                            </a>
                            <button className="border-2 border-gray-300 hover:border-blue-700 text-gray-700 hover:text-blue-700 font-semibold px-8 py-4 rounded-full transition-all duration-200">
                                Watch Demo
                            </button>
                        </div>

                        {/* Feature Cards */}
                        <div
                            className="grid md:grid-cols-3 gap-6 lg:gap-32 mt-20 mx-auto"
                            id="features"
                        >
                            {/* Card 1 */}
                            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 transform animate-fade-in-up opacity-0 w-xs" 
                                 style={{animationDelay: '3.6s', animationFillMode: 'forwards'}}>
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                                    <svg
                                        className="w-6 h-6 text-emerald-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                    Human-Level AI Scoring
                                </h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Benchmarked against experienced math markers
                                    and continuously cross-checked in real
                                    classrooms for results teachers can trust.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 transform animate-fade-in-up opacity-0 w-xs" 
                                 style={{animationDelay: '3.8s', animationFillMode: 'forwards'}}>
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                                    <svg
                                        className="w-6 h-6 text-orange-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                    Zero-Setup Upload
                                </h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Drag a single PDF bundle in; AlphaGrade
                                    auto-detects every response in under
                                    30&nbsp;seconds—no templates, bubbles, or
                                    training files.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 transform animate-fade-in-up opacity-0 w-xs" 
                                 style={{animationDelay: '4.0s', animationFillMode: 'forwards'}}>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                    3 Days
                                    <span className="inline-block align-middle mb-1">
                                        {/* Right arrow SVG */}
                                        <svg
                                            className="w-5 h-5 text-blue-600 inline"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                    3 Hours
                                </h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Grades a full cohort (≈150 papers) in just
                                    3&nbsp;hours, slashing marking time by
                                    ~90&nbsp;% and costing less than one extra
                                    worksheet per student.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12 px-6 sm:px-8 lg:px-12 mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    α
                                </span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">
                                AlphaGrade
                            </span>
                        </div>

                        <div className="flex space-x-8 text-sm text-gray-600">
                            <a
                                href="#privacy"
                                className="hover:text-blue-700 transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#terms"
                                className="hover:text-blue-700 transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#support"
                                className="hover:text-blue-700 transition-colors"
                            >
                                Support
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                        © 2025 AlphaGrade. Empowering teachers with intelligent
                        assessment technology.
                    </div>
                </div>
            </footer>

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-scale {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes typewriter {
                    0% {
                        width: 0;
                        opacity: 1;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        width: 100%;
                        opacity: 1;
                    }
                }

                @keyframes slide-in-right {
                    from {
                        transform: translateX(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes pulse-button {
                    0%, 100% {
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    }
                    50% {
                        box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.25);
                    }
                }

                @keyframes blink-cursor {
                    to {
                        border-right-color: transparent;
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1.5s ease-out;
                }

                .animate-fade-in-scale {
                    animation: fade-in-scale 1.2s ease-out;
                }

                .animate-typewriter {
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 3px solid #1d4ed8;
                    animation: typewriter 1.2s steps(20) forwards, blink-cursor 0.7s steps(1) 1.2s 1 forwards;
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.8s ease-out;
                }

                .animate-pulse-button {
                    animation: pulse-button 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}