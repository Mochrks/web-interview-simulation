export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">About InterviewPro</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-gray-600 mb-4">
                        InterviewPro is an innovative platform designed to help job seekers prepare for their interviews with confidence. Our AI-powered simulator provides a realistic interview experience, allowing users to practice answering common interview questions in a stress-free environment.
                    </p>
                    <p className="text-gray-600 mb-4">
                        With InterviewPro, you can:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>Practice answering a variety of interview questions</li>
                        <li>Improve your communication skills</li>
                        <li>Gain confidence in your interview abilities</li>
                        <li>Prepare for different types of interviews</li>
                    </ul>
                    <p className="text-gray-600">
                        Whether youre a recent graduate, career changer, or seasoned professional, InterviewPro can help you ace your next job interview and land your dream job.
                    </p>
                </div>
            </div>
        </div>
    )
}

