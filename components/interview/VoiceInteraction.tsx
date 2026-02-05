'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Play } from 'lucide-react';
import { VoiceService } from '@/lib/interviewUtils';

interface VoiceInteractionProps {
  questionText: string;
  onTranscriptChange: (transcript: string) => void;
  onRecordingComplete?: (transcript: string, duration: number) => void;
  autoPlayQuestion?: boolean;
}

export default function VoiceInteraction({
  questionText,
  onTranscriptChange,
  onRecordingComplete,
  autoPlayQuestion = false,
}: VoiceInteractionProps) {
  const [voiceService] = useState(() => new VoiceService());
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(
    null
  );
  const [voiceSupport, setVoiceSupport] = useState({ tts: false, stt: false });

  useEffect(() => {
    const support = voiceService.isSupported();
    setVoiceSupport(support);

    if (autoPlayQuestion && support.tts) {
      handlePlayQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayQuestion = async () => {
    try {
      setIsSpeaking(true);
      await voiceService.speak(questionText);
    } catch (error) {
      console.error('Error playing question:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleStopSpeaking = () => {
    voiceService.stop();
    setIsSpeaking(false);
  };

  const handleStartListening = async () => {
    try {
      setIsListening(true);
      setRecordingStartTime(Date.now());
      const result = await voiceService.listen();
      const duration = recordingStartTime
        ? (Date.now() - recordingStartTime) / 1000
        : 0;

      setTranscript(result);
      onTranscriptChange(result);

      if (onRecordingComplete) {
        onRecordingComplete(result, duration);
      }
    } catch (error) {
      console.error('Error listening:', error);
    } finally {
      setIsListening(false);
      setRecordingStartTime(null);
    }
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
    setRecordingStartTime(null);
  };

  return (
    <div className="space-y-4">
      <div className="bauhaus-card bg-[hsl(var(--bauhaus-light-gray))]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {voiceSupport.tts && (
              <Button
                onClick={isSpeaking ? handleStopSpeaking : handlePlayQuestion}
                className={`bauhaus-btn px-4 py-2 sm:px-8 sm:py-4 ${isSpeaking ? 'bauhaus-accent-yellow' : 'bauhaus-accent-blue'}`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    Play Question
                  </>
                )}
              </Button>
            )}

            {voiceSupport.stt && (
              <Button
                onClick={
                  isListening ? handleStopListening : handleStartListening
                }
                className={`bauhaus-btn px-4 py-2 sm:px-8 sm:py-4 ${isListening ? 'bauhaus-accent-red animate-pulse' : 'bauhaus-accent-blue'}`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Record Answer
                  </>
                )}
              </Button>
            )}
          </div>

          {isListening && (
            <div className="voice-wave mx-auto sm:mx-0">
              <div className="voice-wave-bar"></div>
              <div className="voice-wave-bar"></div>
              <div className="voice-wave-bar"></div>
              <div className="voice-wave-bar"></div>
              <div className="voice-wave-bar"></div>
            </div>
          )}
        </div>

        {(!voiceSupport.tts || !voiceSupport.stt) && (
          <div className="mt-4 p-3 border-3 border-yellow-600 bg-yellow-50 text-yellow-900">
            <p className="font-bold">⚠️ Limited Voice Support</p>
            <p className="text-sm mt-1">
              {!voiceSupport.tts && 'Text-to-Speech not supported. '}
              {!voiceSupport.stt && 'Speech-to-Text not supported. '}
              Please use a modern browser like Chrome or Edge for full voice
              features.
            </p>
          </div>
        )}
      </div>

      {transcript && (
        <div className="bauhaus-card animate-slide-up">
          <h4 className="font-bold uppercase mb-2 text-lg">
            Your Answer (Transcribed):
          </h4>
          <p className="text-base leading-relaxed">{transcript}</p>
        </div>
      )}

      {isListening && recordingStartTime && (
        <div className="bauhaus-card bauhaus-accent-red animate-pulse">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase">
              🔴 Recording in Progress
            </span>
            <span className="font-mono text-lg">
              {Math.floor((Date.now() - recordingStartTime) / 1000)}s
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
