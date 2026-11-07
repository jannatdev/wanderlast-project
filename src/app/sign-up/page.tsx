'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignupPage() {
    const handleSignUp=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
         const formData = new FormData(e.currentTarget);
         const user=Object.fromEntries(formData.entries()) as {name:string, email:string, image:string, password:string}

         const {data,error}= await signUp.email({
            ...user,

         })
         if(data){
            redirect('/');
         }
         if(error){
            console.log("Error",error)
            return
         }

        
    }
     
  return (
    <div className="mx-auto w-md my-20">
          <Card >
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" name="name" placeholder="name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
             
            
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Image</FieldLabel>
              <Input
                id="image"
                type="url"
                name="image"
                placeholder="image url"
                required
              />
             
            
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" name="password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="bg-[#2AA9CE] font-bold">Create Account</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/log-in">Log In</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>

    </div>
   
  )
}
