'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b-4 border-foreground bg-background sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <span className="font-black text-2xl uppercase tracking-tight">
                            INVSIM
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="outline" className="bauhaus-btn">
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </Button>
                        </Link>
                        <Link href="/interview">
                            <Button className="bauhaus-btn bauhaus-accent-red">
                                Start Practice
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
