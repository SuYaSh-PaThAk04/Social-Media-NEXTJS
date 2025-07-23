"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import NotificationBell from "@/components/NotificationBell";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getUserIdFromToken } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

useEffect(() => {
  const id = getUserIdFromToken();
  if (id) {
    setUserId(id);
  } else {
    router.push("/auth/login");
  }
  console.log(id);
}, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/auth/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/posts/create", label: "Create Post" },
    { href: "/explore", label: "Explore" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          CleverBook
        </Link>

        <div className="hidden md:flex gap-6 text-lg font-medium items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "underline" : ""}
            >
              {link.label}
            </Link>
          ))}
  
         <Link href={`/profile`}>View Profile</Link>
          <NotificationBell />
          {token ? (
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button variant="secondary">Login</Button>
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <NotificationBell />
          <Sheet>
            <SheetTrigger>
              <Menu size={28} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>CleverBook</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                {token ? (
                  <Button variant="secondary" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Link href="/auth/login">
                    <Button variant="secondary">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
