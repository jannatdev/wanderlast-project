
import Banner from "@/components/banner";
import WhyChoose from "@/components/why-choose";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/cta";
import FeatuedDestination from "@/components/FeatuedDestination";



export default function Home() {
  return (
    <>
      <main className="relative min-h-dvh bg-black">
        <Banner />
        <FeatuedDestination/>
        <WhyChoose />
        <Testimonials />
        <CallToAction />
      </main>
      
    </>
  );
}
