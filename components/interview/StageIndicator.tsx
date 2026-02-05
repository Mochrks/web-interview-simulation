'use client';

import React from 'react';
import {
  MessageSquare,
  Code2,
  Terminal,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { InterviewStage } from '@/data/interviewData';

interface StageIndicatorProps {
  currentStage: InterviewStage;
  completedStages: InterviewStage[];
}

const stages: { id: InterviewStage; label: string; icon: React.ReactNode }[] = [
  {
    id: 'behavioral',
    label: 'Behavioral',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  { id: 'technical', label: 'Technical', icon: <Code2 className="w-5 h-5" /> },
  {
    id: 'coding',
    label: 'Live Coding',
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    id: 'final',
    label: 'Final Round',
    icon: <Briefcase className="w-5 h-5" />,
  },
];

export default function StageIndicator({
  currentStage,
  completedStages,
}: StageIndicatorProps) {
  return (
    <div className="bauhaus-card bg-card">
      <h3 className="bauhaus-subheading text-xl mb-6">Interview Progress</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, index) => {
          const isActive = stage.id === currentStage;
          const isCompleted = completedStages.includes(stage.id);
          const isPending = !isActive && !isCompleted;

          return (
            <div key={stage.id} className="relative">
              {/* Stage Card */}
              <div
                className={`
                  border-4 border-foreground p-4 transition-all duration-300
                  ${isActive ? 'bauhaus-accent-red shadow-[8px_8px_0px_0px_hsl(var(--foreground))] scale-105' : ''}
                  ${isCompleted ? 'bauhaus-accent-blue' : ''}
                  ${isPending ? 'bg-muted opacity-60' : ''}
                `}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  {/* Icon */}
                  <div
                    className={`
                    w-12 h-12 border-3 border-foreground flex items-center justify-center
                    ${isActive ? 'bg-white' : isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                  `}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      stage.icon
                    )}
                  </div>

                  {/* Label */}
                  <div>
                    <p className="font-bold uppercase text-sm">{stage.label}</p>
                    <p className="text-xs mt-1">
                      {isCompleted
                        ? 'Completed'
                        : isActive
                          ? 'In Progress'
                          : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-1 bg-foreground transform -translate-y-1/2 z-10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Stage Dots (Mobile Alternative) */}
      <div className="flex md:hidden items-center justify-center gap-3 mt-6">
        {stages.map((stage) => {
          const isActive = stage.id === currentStage;
          const isCompleted = completedStages.includes(stage.id);

          return (
            <div
              key={stage.id}
              className={`
                stage-dot
                ${isActive ? 'active' : ''}
                ${isCompleted ? 'completed' : ''}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}
