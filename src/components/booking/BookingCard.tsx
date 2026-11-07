
'use client';
import { IDestination } from '@/type';
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

import { ArrowRight, Check } from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';


const benefits = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({destination}:{destination:IDestination}) => {
    const { data: session } = authClient.useSession();
    const router =useRouter()

  const user = session?.user;


    const handleBooking=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!user?.email) {
      router.push("/login");
      return;
    }

        const formData = new FormData(e.currentTarget);
        const departureDate = formData.get("departureDate") as string;

        const { _id, ...destinationData } = destination;
        const data={
            userName:user?.name,
            email:user?.email,
            
            ...destinationData,
              destinationId: _id,
            departureDate,
            bookingDate:new Date()

        }

        try{
          const res = await fetch('http://localhost:8000/booking',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)

        })
         if (!res.ok) {
        throw new Error(`Booking failed: ${res.status}`);
      }
       const bookingData = await res.json();
       console.log(bookingData)
        router.refresh();
        router.push('/Destinations')
          
        }
         catch (error) {
      console.error("Booking error:", error);
    }

        
       
        
           
    }
    return (
        <div>
            <p className="text-sm text-gray-500">Starting from</p>

            <p className="mt-1 text-4xl font-semibold tracking-tight text-cyan-600">
              ${destination.price}
            </p>

            <p className="mt-1 text-sm text-gray-500">per person</p>

            <form onSubmit={handleBooking}>
                 <div className="mt-10">
              <label
                htmlFor="departure"
                className="sr-only"
              >
                Departure date
              </label>
              <Input
                id="departure"
                type="date"
                name='departureDate'
                defaultValue={destination.departureDate}
                className="h-11 rounded-none bg-gray-50"
              />
            </div>

            <Separator className="my-4" />

            <Button
              type='submit'
              className="h-13 w-full rounded-none bg-cyan-600 text-white hover:bg-cyan-700"
             
            >
             
                Book Now
                <ArrowRight size={18} />
             
            </Button>


            </form>

           
            <ul className="mt-5 space-y-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <Check
                    size={17}
                    className="shrink-0 text-green-600"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
            
        </div>
    );
};

export default BookingCard;