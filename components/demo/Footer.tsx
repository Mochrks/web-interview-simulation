export default function Footer() {
    return (
        <footer className="border-t-4 border-foreground bg-background mt-20">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-bold uppercase">
                        INVSIM © 2025
                    </div>
                    <div className="text-sm">
                        Created by{' '}
                        <a
                            href="https://github.com/mochrks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:text-[hsl(var(--bauhaus-red))] transition-colors"
                        >
                            @mochrks
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

