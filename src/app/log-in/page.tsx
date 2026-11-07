'use client';

import { Button } from "@/components/ui/button"
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
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";


const LogInPage = () => {
  const handleLogIn=async(e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault();
           const formData = new FormData(e.currentTarget);
           const user=Object.fromEntries(formData.entries()) as { email:string, password:string}
  
           const {data,error}= await signIn.email({
              ...user,
                callbackURL: "/",
  
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
        <div className="flex flex-col gap-6 mx-auto w-md mb-10 mt-25" >
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogIn}>
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" className="bg-[#2AA9CE] font-bold" >Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
    );
};

export default LogInPage;