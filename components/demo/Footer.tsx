export default function Footer() {
    const getFullyears = new Date().getFullYear();
    return (
        <footer className="border-t">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="">
                        © {getFullyears} All rights reserved.  <a
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

