export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-100 border-t">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="text-gray-600">
                        © {currentYear} All rights reserved.  <a
                            href="https://github.com/mochrks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            @mochrks
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    )
}

