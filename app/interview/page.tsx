import { interviewQuestions } from '@/data/interviewQuestions';
import InterviewQuestions from '@/components/demo/InterviewQuestions';

export default function InterviewPage() {
    const shuffled = interviewQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Job Interview Simulator</h1>
                <p className="text-center text-gray-600 mb-8">
                    Practice your interview skills with our AI-powered simulator. Answer the following 10 questions as if you were in a real job interview.
                </p>
                <InterviewQuestions questions={selectedQuestions} />
            </div>
        </div>
    );
}

