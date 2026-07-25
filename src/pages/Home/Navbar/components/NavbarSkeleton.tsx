// components/NavbarSkeleton.tsx

export default function NavbarSkeleton() {
    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm animate-pulse">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <div className="h-8 w-32 rounded-md bg-gray-200 animate animate-bounce" />

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 animate animate-bounce">
                    <div className="h-4 w-12 rounded bg-gray-200" />
                    <div className="h-4 w-14 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-4 w-10 rounded bg-gray-200" />
                </div>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-3 animate animate-bounce">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div className="space-y-2">
                        <div className="h-4 w-24 rounded bg-gray-200" />
                        <div className="h-3 w-16 rounded bg-gray-200" />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="h-8 w-8 rounded bg-gray-200 md:hidden" />
            </div>
        </nav>
    );
}