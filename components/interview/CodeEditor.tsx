'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, Code2 } from 'lucide-react';
import { ProgrammingLanguage } from '@/data/interviewData';

interface CodeEditorProps {
    language: ProgrammingLanguage;
    initialCode: string;
    onLanguageChange: (lang: ProgrammingLanguage) => void;
    onCodeChange: (code: string) => void;
    onRun: (code: string) => void;
    onReset: () => void;
    output?: string;
    isRunning?: boolean;
}

export default function CodeEditor({
    language,
    initialCode,
    onLanguageChange,
    onCodeChange,
    onRun,
    onReset,
    output = '',
    isRunning = false
}: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);

    const handleEditorChange = (value: string | undefined) => {
        const newCode = value || '';
        setCode(newCode);
        onCodeChange(newCode);
    };

    const handleRun = () => {
        onRun(code);
    };

    const handleReset = () => {
        setCode(initialCode);
        onReset();
    };

    const getMonacoLanguage = (lang: ProgrammingLanguage): string => {
        const mapping: Record<ProgrammingLanguage, string> = {
            javascript: 'javascript',
            typescript: 'typescript',
            java: 'java',
            golang: 'go'
        };
        return mapping[lang];
    };

    return (
        <div className="bauhaus-code-editor bg-card">
            <div className="flex items-center justify-between p-4 border-b-4 border-foreground bg-[hsl(var(--bauhaus-yellow))]">
                <div className="flex items-center gap-3">
                    <Code2 className="w-6 h-6" />
                    <span className="font-bold uppercase text-lg">Code Editor</span>
                </div>

                <div className="flex items-center gap-3">
                    <Select value={language} onValueChange={(val) => onLanguageChange(val as ProgrammingLanguage)}>
                        <SelectTrigger className="w-40 border-3 border-foreground font-bold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="golang">Golang</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={handleReset}
                        variant="outline"
                        size="sm"
                        className="border-3 border-foreground bauhaus-btn"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>

                    <Button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="bauhaus-btn bauhaus-accent-red"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        {isRunning ? 'Running...' : 'Run Code'}
                    </Button>
                </div>
            </div>

            <div className="h-96">
                <Editor
                    height="100%"
                    language={getMonacoLanguage(language)}
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on'
                    }}
                />
            </div>

            <div className="border-t-4 border-foreground bg-black text-green-400 p-4 h-48 overflow-auto font-mono text-sm">
                <div className="flex items-center gap-2 mb-2 text-white">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 font-bold">Console Output</span>
                </div>
                <pre className="whitespace-pre-wrap">
                    {output || '// Run your code to see output here...'}
                </pre>
            </div>
        </div>
    );
}
