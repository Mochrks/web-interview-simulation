export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-gray-600">
                        © 2024 InterviewPro. All rights reserved.  <a
                            href="https://github.com/mochrks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            @mochrks
                        </a>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-600 hover:text-indigo-600">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

