

'use client';

import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  CheckCircle2,
  Eye,
  Trash2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Booking } from "@/app/myBookings/page";
import { useRouter } from "next/navigation";



export default function BookingCard( {booking}:{booking:Booking},status = "Confirmed") {

    const router =useRouter()

  
    const handleCancelButton=async()=>{

        try {
            const res = await fetch(
            `http://localhost:8000/mybookings/${booking._id}`,
            {
                method: "DELETE",
            }
            );

          const data = await res.json();

                if (!res.ok) {
                throw new Error(data.message || "Failed to cancel booking");
                }

        console.log("Booking cancelled:", data);

                router.refresh();
            } catch (error) {
                console.error("Cancel booking error:", error);
            }
            

        }
  

   


  return (
    <Card className="w-full rounded-none border border-gray-200 shadow-none">
      <CardContent className="flex flex-col gap-4 p-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Destination image */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-[136px] sm:w-[240px]">
          <Image
            src={booking.image}
            alt="ooking"
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover"
          />
        </div>

        {/* Booking information */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-1">
            <Badge
              variant="secondary"
              className={`gap-1 rounded-full px-2.5 py-1 font-normal ${
                status === "Confirmed"
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
              }`}
            >
              <CheckCircle2 size={12} />
              {status}
            </Badge>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            {booking.name}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <CalendarDays size={13} />
            Departure: {booking.departureDate}
          </p>

          <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={13} />
            Booking ID: {booking._id}
          </p>

          <p className="mt-2 text-2xl font-semibold text-cyan-500">
            ${booking.price}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:self-end">
          <Button

           onClick={handleCancelButton}
            type="button"
            variant="outline"
          
            className="h-8 rounded-none border-red-300 px-3 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={13} />
            Cancel
          </Button>

          <Button
            type="button"
         
            className="h-8 rounded-none bg-cyan-600 px-3 text-xs text-white hover:bg-cyan-700"
          >
            <Eye size={13} />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

}
