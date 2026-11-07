


export type Destination = {
  
 
  _id:string
  name: string;
  country: string;
  price: string | number;
  rating: number;
  reviews: number;
  duration: string;
  departureDate: string;
  image: string;
  description: string;
  
  highlights: string[];
};

export const destinations = [
  {
    
    _id: "6adc7e95fbd1c930b7abfd0f",

    name: "Bali Paradise",
    country: "Indonesia",
    price: 1299,
    rating: 4.9,
    reviews: 234,
    duration: "7 Days / 6 Nights",
    departureDate: "05/15/2026",
    image: "/images/destinations/image2.png",
    description:
      "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
    highlights: [
      "Luxury beachfront accommodation",
      "Visit Uluwatu Temple at sunset",
      "Traditional Balinese spa treatment",
      "Private beach dinner experience",
      "Sunrise trek to Mount Batur",
    ],
  },
];

const API_BASE =
  process.env.DESTINATIONS_API_URL ?? "http://localhost:8000";

/**
 * Fetches a destination from the local API (json-server style backend),
 * falling back to the bundled mock data when the backend isn't reachable
 * or is missing the record.
 */
export async function getDestination(
  id: string,
): Promise<Destination | null> {
  const local = destinations.find((destination) => destination._id === id) ?? null;

  try {
    const res = await fetch(`${API_BASE}/Destinations/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as Partial<Destination>;
      // API records may be partial (e.g. packages created via the add form
      // don't carry highlights), so merge and normalize every field.
      const merged: Partial<Destination> = { ...local, ...data };
      return {
        _id: merged._id ?? id,
        name: merged.name ?? "Untitled Package",
        country: merged.country ?? "",
        price: merged.price ?? 0,
        rating: merged.rating ?? 0,
        reviews: merged.reviews ?? 0,
        duration: merged.duration ?? "",
        departureDate: merged.departureDate ?? "",
        image: merged.image ?? "/images/destinations/image2.png",
        description: merged.description ?? "",
        highlights: Array.isArray(data.highlights)
          ? data.highlights
          : (local?.highlights ?? []),
      };
    }
  } catch {
    // Backend not running — fall back to local mock data
  }

  return local;
}
