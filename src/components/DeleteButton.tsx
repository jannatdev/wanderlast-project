'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { IDestination } from "@/type";
import { Link, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteButton = ({destination}:{destination:IDestination}) => {

    const handleDeleteButton=async()=>{

        
       
const res = await fetch (`https://wanderlast-server-drab.vercel.app/Destinations/${destination._id}`,{
    method:"Delete",
})
   const data = await res.json();
   redirect('/Destinations')
    }


    return (
        <AlertDialog>
  <AlertDialogTrigger render={<Button
            variant="outline"
            className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
            
          >  <Trash2 size={16} />
               Delete  </Button>}>
             
   
         
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteButton} className="bg-red-600">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    );
};

export default DeleteButton;