import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-indigo-800 mb-8 text-center">Welcome to InterviewPro</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        Prepare for your next job interview with our AI-powered simulator. Practice answering common interview questions and improve your skills.
      </p>
      <Link href="/interview" passHref>
        <Button size="lg" className="text-lg">
          Start Your Interview Simulation
        </Button>
      </Link>
    </div>
  )
}

