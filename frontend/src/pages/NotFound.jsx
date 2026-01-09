export default function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-sm">
            <h1 className="text-7xl font-bold text-gray-800">404</h1>
            <div className="h-1 w-20 rounded bg-gray-800 my-5"></div>
            <p className="text-2xl md:text-3xl font-bold text-black">Page Not Found</p>
            <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <div className="flex items-center gap-4 mt-6">
                <a href="/" className="bg-black hover:opacity-90 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
                    Return Home
                </a>
                <a href="contact" className="hover:bg-gray-200 border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md active:scale-95 transition-all">
                    Contact support
                </a>
            </div>
        </div>
    );
};