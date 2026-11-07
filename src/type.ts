export interface IDestination{
     _id: string
     id?:string
  name: string
  country: string
  price?: string | number
  duration: string
  departureDate: string
  image: string
  description: string,
  departure:string,
  category:string
  rating:number
  reviews:number
  highlights:string 
  
  
}

export interface IBooking{
  _id?: string
  id?: string
  bookingId?: string
  name: string
  price: string | number
  image: string
  departureDate: string
  bookingDate?: string
  email?: string
  userName?: string
  destinationId?: string
  status?: string
}