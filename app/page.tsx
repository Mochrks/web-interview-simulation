import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Code2, BarChart3, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl w-full">
          <div className="bauhaus-card bauhaus-accent-red mb-12 animate-slide-up">
            <h1 className="bauhaus-heading text-6xl md:text-8xl lg:text-9xl">
              JOB INTERVIEW
              <br />
              SIMULATION
            </h1>
          </div>

          <div className="bauhaus-card mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-2xl md:text-3xl font-bold leading-relaxed">
              Master Your Interview Skills Through
              <span className="bauhaus-accent-yellow px-3 py-1 ml-3">Professional</span>
              <br />
              Real-World Simulation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bauhaus-card bauhaus-accent-blue animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Mic className="w-12 h-12 mb-4" />
              <h3 className="font-bold uppercase text-lg mb-2">Voice Support</h3>
              <p className="text-sm">Speech recognition & text-to-speech</p>
            </div>

            <div className="bauhaus-card bauhaus-accent-yellow animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Code2 className="w-12 h-12 mb-4" />
              <h3 className="font-bold uppercase text-lg mb-2">Live Coding</h3>
              <p className="text-sm">Real-time code editor with execution</p>
            </div>

            <div className="bauhaus-card bauhaus-accent-red animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <BarChart3 className="w-12 h-12 mb-4" />
              <h3 className="font-bold uppercase text-lg mb-2">Analytics</h3>
              <p className="text-sm">Detailed performance evaluation</p>
            </div>

            <div className="bauhaus-card bauhaus-accent-blue animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <FileText className="w-12 h-12 mb-4" />
              <h3 className="font-bold uppercase text-lg mb-2">Reports</h3>
              <p className="text-sm">Export in CSV, Excel, PDF, DOCX</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link href="/interview">
              <Button className="bauhaus-btn bauhaus-accent-red text-2xl px-12 py-8">
                Start Interview
                <ArrowRight className="w-8 h-8 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="bauhaus-heading text-4xl md:text-6xl mb-12 text-center">
            4 INTERVIEW STAGES
          </h2>

          <div className="space-y-8">
            <div className="bauhaus-asymmetric">
              <div className="bauhaus-card bauhaus-accent-blue">
                <div className="text-6xl font-black mb-4">01</div>
                <h3 className="bauhaus-subheading text-3xl mb-4">Behavioral</h3>
                <p className="text-lg leading-relaxed">
                  Answer behavioral questions using voice or text. Get evaluated on clarity,
                  confidence, and keyword matching. Practice STAR method responses.
                </p>
              </div>
              <div className="bauhaus-card bg-card">
                <ul className="space-y-2 text-sm">
                  <li>✓ Voice interaction</li>
                  <li>✓ Clarity analysis</li>
                  <li>✓ Confidence scoring</li>
                  <li>✓ Keyword detection</li>
                </ul>
              </div>
            </div>

            <div className="bauhaus-asymmetric">
              <div className="bauhaus-card bg-card">
                <ul className="space-y-2 text-sm">
                  <li>✓ Multiple choice</li>
                  <li>✓ Open-ended questions</li>
                  <li>✓ Auto-scoring</li>
                  <li>✓ Instant feedback</li>
                </ul>
              </div>
              <div className="bauhaus-card bauhaus-accent-yellow">
                <div className="text-6xl font-black mb-4">02</div>
                <h3 className="bauhaus-subheading text-3xl mb-4">Technical</h3>
                <p className="text-lg leading-relaxed">
                  Test your technical knowledge with multiple-choice and open-ended questions.
                  Cover algorithms, databases, APIs, and system design.
                </p>
              </div>
            </div>

            <div className="bauhaus-asymmetric">
              <div className="bauhaus-card bauhaus-accent-red">
                <div className="text-6xl font-black mb-4">03</div>
                <h3 className="bauhaus-subheading text-3xl mb-4">Live Coding</h3>
                <p className="text-lg leading-relaxed">
                  Solve coding challenges in JavaScript, TypeScript, Java, or Golang.
                  Run tests, get instant feedback, and improve your problem-solving skills.
                </p>
              </div>
              <div className="bauhaus-card bg-card">
                <ul className="space-y-2 text-sm">
                  <li>✓ 4 languages supported</li>
                  <li>✓ Syntax highlighting</li>
                  <li>✓ Test case execution</li>
                  <li>✓ Code quality analysis</li>
                </ul>
              </div>
            </div>

            <div className="bauhaus-asymmetric">
              <div className="bauhaus-card bg-card">
                <ul className="space-y-2 text-sm">
                  <li>✓ Scenario-based</li>
                  <li>✓ Cultural fit assessment</li>
                  <li>✓ Emotional tone analysis</li>
                  <li>✓ Final evaluation</li>
                </ul>
              </div>
              <div className="bauhaus-card bauhaus-accent-blue">
                <div className="text-6xl font-black mb-4">04</div>
                <h3 className="bauhaus-subheading text-3xl mb-4">Final Round</h3>
                <p className="text-lg leading-relaxed">
                  HR and managerial questions to assess cultural fit, career goals,
                  and professional development. Complete your interview journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
