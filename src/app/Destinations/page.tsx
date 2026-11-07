import DestinationCard from '@/components/DestinationCard';
import { IDestination } from '@/type';


const DestinationsPage =async() => {
    const res = await fetch('https://wanderlast-server-drab.vercel.app/Destinations')
    const data =await res.json();
    const destinations=data;
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mt-25'>
                <h2 className='text-[45px] font-bold'>Explore All Destinations</h2>
                <p className='text-[#6C696D]'>Find your perfect travel experience from our curated collection</p>
            </div>
             <div className= ' grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
            {
                destinations.map((destination:IDestination)=> <DestinationCard key={destination._id} destination={destination}/>)
            }

         </div>
        </div>

        
    );
};

export default DestinationsPage;