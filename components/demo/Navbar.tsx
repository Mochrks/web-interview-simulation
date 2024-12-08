"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes'
export default function Navbar() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    return (
        <nav className=" border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 ">Interview App</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-5">
                        <Link href="/about" passHref>
                            <Button variant="ghost">About</Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle Theme</span>
                        </Button>
                        <Link
                            href="https://github.com/Mochrks/web-interview-simulation"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="ghost" size="icon">
                                <Github className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

