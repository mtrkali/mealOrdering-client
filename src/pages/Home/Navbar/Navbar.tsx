"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DeskTopMenu from "./components/dasktopMenu";
import RightSide from "./components/RightSide";
import MobileMenu from "./components/MobileMenu";
import NavbarSkeleton from "./components/NavbarSkeleton";
import logo from "../../../assets/logo.png";
import Image from "next/image";

export default function Navbar() {
    const { user, loading } = useAuth() || {};
    const [open, setOpen] = useState(false);

    if (loading) return <NavbarSkeleton />

    return (
        <div className="relative">
            <nav className="sticky mb-5 inset-0 top-0 z-50 border-b shadow-sm rounded-full">
                <div className="mx-auto flex h-12 md:h-14 max-w-7xl items-center justify-between px-2 lg:px-2">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-green-600 flex items-center gap-1">
                        <Image
                            src={logo}
                            alt="Logo"
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <DeskTopMenu user={user} />

                    {/* Right Side */}
                    <RightSide user={user} />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden"
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <MobileMenu user={user} open={open} />
            </nav>
        </div>
    );
}