"use client";

import { useState } from 'react';

export default function HateSpeechDetector() {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!inputText.trim()) {
            setError('Please enter some text to analyze');
            return;f
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: inputText }) // Using 'input' for compatibility with backend
            });
            
            const data = await res.json();
            
            if (res.ok) {
                setResult(data);
            } else {
                setError(data.error || 'Analysis failed');
            }
        } catch (err) {
            setError('Network error: Unable to connect to the server');
        } finally {
            setLoading(false);
        }
    };

    const clearAll = () => {
        setInputText('');
        setResult(null);
        setError(null);
    };

    const getResultColor = (isHateSpeech) => {
        return isHateSpeech ? 'text-red-600' : 'text-green-600';
    };

    const getResultBg = (isHateSpeech) => {
        return isHateSpeech ? 'bg-red-100 border-red-200' : 'bg-green-50 border-green-200';
    };

    // 
    // 

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Hate Speech Detector
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        AI-powered tool to analyze and detect potential hate speech in text content. 
                        Enter your text below for instant analysis.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Text Input */}
                        <div>
                            <label htmlFor="text-input" className="block text-sm font-semibold text-gray-700 mb-3">
                                Enter text to analyze
                            </label>
                            <textarea
                                id="text-input"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type or paste your text here for hate speech analysis..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm leading-relaxed"
                                disabled={loading}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-500">
                                    {inputText.length} characters
                                </span>
                                {inputText.length > 500 && (
                                    <span className="text-sm text-amber-600">
                                        ⚠️ Large text may take longer to process
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading || !inputText.trim()}
                                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </span>
                                ) : (
                                    'Analyze Text'
                                )}
                            </button>
                            
                            <button
                                type="button"
                                onClick={clearAll}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-800 font-medium">{error}</p>
                        </div>
                    </div>
                )}


                {/* Results Display */}
                {result && (
                    <div className={`border-2 rounded-xl p-6 ${getResultBg(result.is_hate_speech)}`}>
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Analysis Results</h3>
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${result.is_hate_speech ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {result.is_hate_speech ? '⚠️ Hate Speech Detected' : '✅ Content Safe'}
                            </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Classification</h4>
                                <p className={`text-lg font-bold ${getResultColor(result.is_hate_speech)}`}>
                                    {result.prediction === 'hate_speech' ? 'Hate Speech' : 'Normal Content'}
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Confidence Score</h4>
                                <div className="flex items-center space-x-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div 
                                            className={`h-3 rounded-full ${result.is_hate_speech ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${(result.confidence * 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {(result.confidence * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 p-4 bg-white rounded-lg border">
                            <h4 className="font-semibold text-gray-700 mb-2">Analyzed Text</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                "{result.text}"
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer Info */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>This tool uses machine learning to detect potential hate speech patterns.</p>
                    <p>Results should be reviewed by human moderators for final decisions.</p>
                </div>
            </div>
        </div>
    );
}