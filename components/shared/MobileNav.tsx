"use client"
import React from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

import Link from "next/link";
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation'
import { Button } from '../ui/Button';

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <header className="header">
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28}/>
            </Link>

            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />

                    <Sheet>
                        {/* The trigger should only be the menu button */}
                        <SheetTrigger>
                            <Image
                                src="/assets/icons/menu.svg"
                                alt="menu"
                                width="32"
                                height="32"
                                className="cursor-pointer"
                            />
                        </SheetTrigger>

                        {/* Move the navLinks inside SheetContent so they are hidden by default */}
                        <SheetContent className="sheet-content sm:w-64">
                            <Image 
                                src="/assets/images/logo-text.svg"
                                alt="logo"
                                width={152}
                                height={23}
                            />
                            
                            <SheetHeader>
                            </SheetHeader>

                            <ul className="header-nav_elements mt-4">
                                {navLinks.map((link) => {
                                    const isActive = link.route === pathname;

                                    return (
                                        <li 
                                            key={link.route} 
                                        >
                                            <Link className="sidebar-link cursor-pointer flex items-center gap-2" href={link.route}>
                                                <Image
                                                    src={link.icon}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    );
}

export default MobileNav;
