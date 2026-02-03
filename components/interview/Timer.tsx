'use client';

import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { formatTime } from '@/lib/interviewUtils';

interface TimerProps {
    totalSeconds: number;
    onTimeUp?: () => void;
    autoStart?: boolean;
}

export default function Timer({ totalSeconds, onTimeUp, autoStart = true }: TimerProps) {
    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(autoStart);

    useEffect(() => {
        if (!isRunning || remainingSeconds <= 0) return;

        const interval = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, remainingSeconds, onTimeUp]);

    const percentage = (remainingSeconds / totalSeconds) * 100;
    const isWarning = percentage <= 25;
    const isCritical = percentage <= 10;

    return (
        <div className="space-y-3">
            {/* Timer Display */}
            <div className={`bauhaus-timer ${isCritical ? 'bauhaus-accent-red animate-pulse' : isWarning ? 'bg-orange-500' : ''}`}>
                <div className="flex items-center justify-center gap-3">
                    <Clock className="w-8 h-8" />
                    <span>{formatTime(remainingSeconds)}</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bauhaus-progress">
                <div
                    className={`bauhaus-progress-fill ${isCritical ? 'bg-red-600' : isWarning ? 'bg-orange-500' : ''}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Warning Message */}
            {isWarning && (
                <div className={`bauhaus-card ${isCritical ? 'bauhaus-accent-red' : 'bg-orange-100 border-orange-600'} animate-slide-up`}>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-bold uppercase">
                            {isCritical ? 'Time Almost Up!' : 'Running Low on Time'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
