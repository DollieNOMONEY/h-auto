import Navigation from '@/components/Navigation';
import CarList from '@/components/CarList';
import Footer from "@/components/Footer";

export default function MoreCarsPage() {
  return (
    <div className="bg-[#001135]">
      <Navigation />
      
      <div className='mx-1'>
        <p className="text-4xl text-center my-12 font-serif">
          More Brands
        </p>
        
        {/* This calls your CarList component with the filter enabled */}
        <CarList listOtherBrands={true} />
      </div>

      <Footer />
    </div>
  );
}