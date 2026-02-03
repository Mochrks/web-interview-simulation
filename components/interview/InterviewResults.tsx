'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, FileSpreadsheet, FileText, Download } from 'lucide-react';
import { Answer } from './InterviewSimulator';
import { downloadCSV, downloadExcel, downloadPDF, downloadDOCX, InterviewReport } from '@/lib/reportExport';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

interface InterviewResultsProps {
    answers: Answer[];
    overallScore: number;
    onRestart: () => void;
}

export default function InterviewResults({ answers, overallScore, onRestart }: InterviewResultsProps) {
    const [isExporting, setIsExporting] = useState(false);

    const stageScores = {
        behavioral: answers.slice(0, 5).reduce((sum, a) => sum + a.score, 0) / 5,
        technical: answers.slice(5, 10).reduce((sum, a) => sum + a.score, 0) / 5,
        coding: answers.slice(10, 12).reduce((sum, a) => sum + a.score, 0) / 2,
        final: answers.slice(12).reduce((sum, a) => sum + a.score, 0) / 5
    };

    const radarData = [
        { skill: 'Communication', score: stageScores.behavioral },
        { skill: 'Technical Knowledge', score: stageScores.technical },
        { skill: 'Problem Solving', score: stageScores.coding },
        { skill: 'Cultural Fit', score: stageScores.final },
        { skill: 'Confidence', score: overallScore }
    ];

    const barData = [
        { stage: 'Behavioral', score: Math.round(stageScores.behavioral) },
        { stage: 'Technical', score: Math.round(stageScores.technical) },
        { stage: 'Coding', score: Math.round(stageScores.coding) },
        { stage: 'Final', score: Math.round(stageScores.final) }
    ];

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    if (stageScores.behavioral >= 70) strengths.push('Strong communication and behavioral skills');
    else weaknesses.push('Needs improvement in behavioral interview responses');

    if (stageScores.technical >= 70) strengths.push('Solid technical knowledge');
    else weaknesses.push('Should strengthen technical fundamentals');

    if (stageScores.coding >= 70) strengths.push('Excellent coding and problem-solving abilities');
    else weaknesses.push('Practice more coding challenges');

    if (stageScores.final >= 70) strengths.push('Good cultural fit and professional presence');
    else weaknesses.push('Work on professional communication and company research');

    if (overallScore >= 80) {
        recommendations.push('You\'re well-prepared! Focus on maintaining confidence during the actual interview.');
    } else if (overallScore >= 60) {
        recommendations.push('Good foundation. Practice more in areas where you scored below 70.');
        recommendations.push('Consider mock interviews with peers or mentors.');
    } else {
        recommendations.push('Significant preparation needed. Focus on fundamentals in each area.');
        recommendations.push('Take online courses and practice regularly.');
    }

    const report: InterviewReport = {
        userProfile: {
            name: 'Candidate',
            email: 'candidate@example.com',
            date: new Date().toLocaleDateString(),
            position: 'Software Engineer'
        },
        stages: [
            {
                stage: 'Behavioral Interview',
                score: Math.round(stageScores.behavioral),
                questions: answers.slice(0, 5).map((a, i) => ({
                    question: `Question ${i + 1}`,
                    answer: a.answer,
                    score: a.score,
                    feedback: a.feedback
                }))
            },
            {
                stage: 'Technical Interview',
                score: Math.round(stageScores.technical),
                questions: answers.slice(5, 10).map((a, i) => ({
                    question: `Question ${i + 1}`,
                    answer: a.answer,
                    score: a.score,
                    feedback: a.feedback
                }))
            },
            {
                stage: 'Coding Interview',
                score: Math.round(stageScores.coding),
                questions: answers.slice(10, 12).map((a, i) => ({
                    question: `Challenge ${i + 1}`,
                    answer: a.answer,
                    score: a.score,
                    feedback: a.feedback
                }))
            },
            {
                stage: 'Final Interview',
                score: Math.round(stageScores.final),
                questions: answers.slice(12).map((a, i) => ({
                    question: `Question ${i + 1}`,
                    answer: a.answer,
                    score: a.score,
                    feedback: a.feedback
                }))
            }
        ],
        overallScore: Math.round(overallScore),
        strengths,
        weaknesses,
        recommendations
    };

    const handleExport = async (format: 'csv' | 'xlsx' | 'pdf' | 'docx') => {
        setIsExporting(true);
        try {
            switch (format) {
                case 'csv':
                    downloadCSV(report);
                    break;
                case 'xlsx':
                    downloadExcel(report);
                    break;
                case 'pdf':
                    downloadPDF(report);
                    break;
                case 'docx':
                    await downloadDOCX(report);
                    break;
            }
        } catch (error) {
            console.error('Export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bauhaus-accent-blue';
        if (score >= 60) return 'bauhaus-accent-yellow';
        return 'bauhaus-accent-red';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Improvement';
    };

    return (
        <div className="min-h-screen bg-background p-6 space-y-8">
            <div className="bauhaus-card bauhaus-accent-blue">
                <h1 className="bauhaus-heading text-4xl md:text-5xl">Interview Complete!</h1>
                <p className="text-lg mt-2 opacity-90">Here are your results and feedback</p>
            </div>

            <div className="score-display animate-slide-up">
                <div className="text-sm uppercase font-bold mb-2">Overall Score</div>
                <div>{Math.round(overallScore)}</div>
                <div className="text-2xl mt-2">{getScoreLabel(overallScore)}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="radar-chart-container bg-card">
                    <h3 className="bauhaus-subheading text-xl mb-4">Skills Assessment</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="hsl(var(--foreground))" strokeWidth={2} />
                            <PolarAngleAxis
                                dataKey="skill"
                                tick={{ fill: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                            />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar
                                name="Score"
                                dataKey="score"
                                stroke="hsl(var(--bauhaus-red))"
                                fill="hsl(var(--bauhaus-red))"
                                fillOpacity={0.6}
                                strokeWidth={3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="radar-chart-container bg-card">
                    <h3 className="bauhaus-subheading text-xl mb-4">Stage Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="stage"
                                tick={{ fill: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="score" fill="hsl(var(--bauhaus-blue))" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bauhaus-card">
                <h3 className="bauhaus-subheading text-2xl mb-6">Stage Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {barData.map((stage) => (
                        <div key={stage.stage} className={`border-4 border-foreground p-4 ${getScoreColor(stage.score)}`}>
                            <h4 className="font-bold uppercase text-sm mb-2">{stage.stage}</h4>
                            <div className="text-4xl font-black">{stage.score}</div>
                            <div className="text-sm mt-1">{getScoreLabel(stage.score)}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bauhaus-card bauhaus-accent-blue">
                    <h3 className="bauhaus-subheading text-xl mb-4">💪 Strengths</h3>
                    <ul className="space-y-2">
                        {strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-2xl">•</span>
                                <span>{strength}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bauhaus-card bauhaus-accent-yellow">
                    <h3 className="bauhaus-subheading text-xl mb-4">📈 Areas for Improvement</h3>
                    <ul className="space-y-2">
                        {weaknesses.map((weakness, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-2xl">•</span>
                                <span>{weakness}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bauhaus-card">
                <h3 className="bauhaus-subheading text-2xl mb-4">💡 Recommendations</h3>
                <ul className="space-y-3">
                    {recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="text-2xl font-bold text-[hsl(var(--bauhaus-red))]">{i + 1}.</span>
                            <span className="text-lg">{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bauhaus-card">
                <h3 className="bauhaus-subheading text-2xl mb-6">📥 Export Report</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                        onClick={() => handleExport('csv')}
                        disabled={isExporting}
                        className="bauhaus-btn bauhaus-accent-blue"
                    >
                        <FileText className="w-5 h-5 mr-2" />
                        CSV
                    </Button>
                    <Button
                        onClick={() => handleExport('xlsx')}
                        disabled={isExporting}
                        className="bauhaus-btn bauhaus-accent-blue"
                    >
                        <FileSpreadsheet className="w-5 h-5 mr-2" />
                        Excel
                    </Button>
                    <Button
                        onClick={() => handleExport('pdf')}
                        disabled={isExporting}
                        className="bauhaus-btn bauhaus-accent-red"
                    >
                        <FileDown className="w-5 h-5 mr-2" />
                        PDF
                    </Button>
                    <Button
                        onClick={() => handleExport('docx')}
                        disabled={isExporting}
                        className="bauhaus-btn bauhaus-accent-yellow"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        DOCX
                    </Button>
                </div>
            </div>

            <div className="bauhaus-card">
                <div className="flex justify-center">
                    <Button onClick={onRestart} className="bauhaus-btn bauhaus-accent-red text-xl px-12 py-6">
                        Start New Interview
                    </Button>
                </div>
            </div>
        </div>
    );
}
