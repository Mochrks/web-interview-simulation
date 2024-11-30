import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">InterviewPro</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link href="/interview" passHref>
                            <Button variant="ghost">Start Interview</Button>
                        </Link>
                        <Link href="/about" passHref>
                            <Button variant="ghost">About</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

