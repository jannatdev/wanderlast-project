import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarX } from "lucide-react";

import MyBookingCard from "@/components/booking/MyBookingCard";
import { authClient } from "@/lib/auth-client";


export interface Booking{
    _id:string
    name:string
    destination: string;
  image: string;
  departureDate: string;
  bookingId: string;
  price: number;
  status?: "Confirmed" | "Pending";
  onCancel?: () => void;
  onView?: () => void;
}

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const {data,error}=await authClient.token()
        const token =data?.token

    const res =await fetch(`https://wanderlast-server-drab.vercel.app/mybookings/${user?.email}`,{
        headers:{
             Authorization: `Bearer ${token}`,

        },
    })

   
    const bookings:Booking[]= await res.json()

  

    return (
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8 mt-15">
            {/* Page Heading */}
            <header>
                <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl">
                    My Bookings
                </h1>
                <p className="mt-3 text-base text-[#6C696D]">
                    Manage and view your upcoming travel plans
                </p>
            </header>

            {/* Bookings List */}
            {bookings.length > 0 ? (
                <div className="mt-8 space-y-6">
                    {bookings.map((booking:Booking) => (
                        <MyBookingCard
                            key={booking._id}
                           booking={booking}
                        />
                    ))}
                </div>
            ) : (
                <Card className="mt-8 border-dashed bg-white py-12 shadow-sm">
                    <CardContent className="flex flex-col items-center gap-4 text-center">
                        <CalendarX size={40} className="text-gray-400" />
                        <div>
                            <p className="text-lg font-semibold text-gray-900">
                                No bookings yet
                            </p>
                            <p className="mt-1 text-sm text-[#6C696D]">
                                {user
                                    ? "You have not booked any trip yet. Start exploring!"
                                    : "Please log in to see your bookings."}
                            </p>
                        </div>
                        <Button
                            render={<Link href="/Destinations" />}
                            className="h-10 bg-[#2AA9CE] px-6 text-white hover:bg-[#2396b8]"
                        >
                            Explore Destinations
                        </Button>
                    </CardContent>
                </Card>
            )}
        </main>
    );
};

export default MyBookingPage;
