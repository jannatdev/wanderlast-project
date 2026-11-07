"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departure: "",
  image: "",
  description: "",
};

const fieldClassName =
  "h-10 rounded-md border-transparent bg-slate-50 px-3.5 text-base shadow-none md:text-base";

export default function AddDestinationPage() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {data,error}=await authClient.token()
    const token =data?.token
     
    const res =await fetch('https://wanderlast-server-drab.vercel.app/AddDestinationPage',{
        method:"POST",
        headers:{
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(form)

    })
    if (!res.ok) {
  throw new Error(`Request failed: ${res.status}`);
}
     const result = await res.json();
    console.log(result)
   

 
  }
   const handleCancel = () => {
    setForm(initialForm);
  };
  return (
    <section className="bg-white px-4 py-16 md:py-20 mt-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-4xl leading-tight font-normal text-neutral-900 md:text-5xl">
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-12 w-full max-w-3xl rounded-xl border border-neutral-200 py-0 shadow-sm ring-0">
          <CardContent className="px-6 py-8 md:px-10 md:py-10">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-neutral-900"
                >
                  Destination Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Bali Paradise"
                  className={fieldClassName}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className="text-sm font-semibold text-neutral-900"
                  >
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Indonesia"
                    className={fieldClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-neutral-900">
                    Category
                  </Label>
                  <Select
                    value={form.category || null}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, category: value ?? "" }))
                    }
                  >
                    <SelectTrigger
                      size="default"
                      className="h-10 w-full rounded-md border-transparent bg-slate-50 pl-3.5 font-normal shadow-none"
                    >
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-sm font-semibold text-neutral-900"
                  >
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g., 1299"
                    className={fieldClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="duration"
                    className="text-sm font-semibold text-neutral-900"
                  >
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g., 7 Days/6 Nights"
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="departure"
                  className="text-sm font-semibold text-neutral-900"
                >
                  Departure Date
                </Label>
                <Input
                  id="departure"
                  name="departure"
                  type="date"
                  value={form.departure}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="image"
                  className="text-sm font-semibold text-neutral-900"
                >
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-neutral-900"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the travel experience..."
                  className="min-h-37.5 rounded-md border-transparent bg-slate-50 px-3.5 py-3 text-base shadow-none md:text-base"
                />
              </div>
              {/* <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-neutral-900"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the travel experience..."
                  className="min-h-37.5 rounded-md border-transparent bg-slate-50 px-3.5 py-3 text-base shadow-none md:text-base"
                />
              </div> */}

              <div className="flex flex-wrap justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-11 gap-2 rounded-md border-red-500 bg-white px-5 text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} aria-hidden />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-11 gap-2 rounded-md bg-[#2AA9CE] px-6 text-white hover:bg-[#2396b8]"
                >
                  <Save size={16} aria-hidden />
                  Add Travel Package
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
