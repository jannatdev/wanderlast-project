'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { authClient, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"


import { useRouter } from "next/navigation";


const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/Destinations" },
  { label: "Add Destinations", href: "/AddDestinationPage" },
  { label: "My Bookings", href: "/myBookings" },
  { label: "Admin", href: "/admin" },
];

const authLinks = [
  { label: "Login", href: "/log-in" },
  { label: "Sign Up", href: "/sign-up" },
];

export default function Navbar() {
  const router =useRouter()
  const{data:session, refetch,}=authClient.useSession() 
  const user=session?.user

  const handleSignOut=async()=>{
    const {error}=await signOut({})
    if(error){
      console.log("Sign Out failed",error)
      return
    }
    await refetch()
    router.refresh();
    router.push("/");

  }
    
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-3 mb-6">
      <div className="relative flex h-16 items-center justify-between rounded-lg bg-white px-5 shadow-lg sm:px-7">
        <nav className="flex items-center gap-4 sm:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-sm font-semibold text-[#2AA9CE] underline underline-offset-4 sm:text-base"
                  : "text-sm font-medium text-black transition-colors hover:text-[#2AA9CE] sm:text-base"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-extrabold tracking-tight text-[#2AA9CE] sm:text-2xl"
        >
          Wanderlast
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm font-medium text-black transition-colors hover:text-[#2AA9CE] sm:text-base"
          >
            <User size={17} strokeWidth={1.75} aria-hidden />
            Profile
          </Link>

         {
          user ? <>
           <Popover>
            <PopoverTrigger >
              <Avatar>
                <AvatarImage  src={user?.image??"" as string} />
                <AvatarFallback>{user?.name?.charAt(0)??"U" }</AvatarFallback>
              </Avatar>
              
               
             
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{user?.name}</PopoverTitle>
                <PopoverDescription>{user?.email}</PopoverDescription>
                <Button onClick={handleSignOut} variant="destructive">Sign Out</Button>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          </>:<> {authLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-black transition-colors hover:text-[#2AA9CE] sm:text-base"
            >
              {link.label}
            </Link>
          ))}</>
         }
         
         
        </div>
      </div>
    </header>
  );
}
