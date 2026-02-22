import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Raid Session", href: "#raid-session" },
    { label: "Booking", href: "#booking" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex justify-center">
        <div className="mx-4 w-full max-w-7xl">
          <nav
            className="flex min-h-[3.5rem] sm:min-h-[5rem] items-center justify-between px-0 sm:px-4 py-2 sm:py-3 gap-4"
            aria-label="Global"
          >
            {/* Logo Section */}
            <div className="flex shrink-0">
              <Link to="/" className="flex items-center shrink-0">
              <p className="text-2xl font-bold text-foreground">SAPPHIRES</p>
                {/*<svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 75 20"
                  className="h-8 sm:h-6 md:h-8 lg:h-8 xl:h-10 "
                >
                  {/* Sapphires gem outline /}
                  <path
                    d="M10 2L14 6L18 2L14 10L10 2Z"
                    fill="#0ea5e9"
                    stroke="#0369a1"
                    strokeWidth="0.5"
                  />
                  {/* Inner sparkle /}
                  <path
                    d="M14 4L15 5L16 4L15 6L14 4Z"
                    fill="#ffffff"
                    opacity="0.8"
                  />
                  {/* Text "SAPPHIRES" /}
                  <text
                    x="22"
                    y="12"
                    fontFamily="Arial, sans-serif"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#ffffff"
                  >
                    SAPPHIRES
                  </text>
                </svg>*/}
              </Link>
            </div>

            {/* Navigation Links - Center */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link) => (
                <a
                key={link.label}
                href={link.href}
                className="text-sm font-bold text-foreground/80 hover:text-foreground transition-colors"
                >
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
                
                </a>
            ))}
              {/*<a
                href="/"
                className="group relative text-sm font-medium text-zinc-200 duration-300 hover:text-zinc-100"
              >
                <span className="relative">
                  Home
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
              <a
                href="/#features"
                className="group relative text-sm font-medium text-zinc-200 duration-300 hover:text-zinc-100"
              >
                <span className="relative">
                  Features
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
              
             
              <a
                href="/#live-raids"
                className="group relative text-sm font-medium text-zinc-200 duration-300 hover:text-zinc-100"
              >
                <span className="relative">
                  Live Raids
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
              <a
                href="#about"
                className="group relative text-sm font-medium text-zinc-200 duration-300 hover:text-zinc-100"
              >
                <span className="relative">
                  About Us
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>*/}
            </div>
            
            {/* CTA Button (Desktop) */}
            <Button className="hidden md:inline-flex gap-2 rounded-full px-6 py-4 text-sm">
              Book a raid session
              <ArrowRight className="h-4 w-4 text-accent/90" />
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-foreground/80 hover:text-foreground hover:bg-accent/20 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Navigation Links & CTA 
            <div className="flex shrink-0 items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-zinc-300 transition hover:text-zinc-100 md:gap-6">
              <Link to="#booking">
              <button
                type="button"
                className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
                aria-haspopup="dialog"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
                  Book a raid session
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
              </Link>
            </div>*/}
          </nav>
          {/* Mobile Dropdown */}
          {mobileOpen && (
            <div className="md:hidden pb-4 bg-background w-full ">
              <div className="mt-2 rounded-2xl border border-border/50 bg-background/95 backdrop-blur p-4">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <Button className="mt-4 w-full gap-2 rounded-full px-6 py-4 text-sm">
                  Book a raid session
                  <ArrowRight className="h-4 w-4 text-accent/90" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
