"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah A.",
    location: "Dubai",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    role: "Business Owner",
    quote: "Car360 transformed my car buying experience. The AI recommendations were spot-on, and completing everything online saved me countless hours. I love my new Tesla!",
    rating: 5,
    purchaseType: "Buy",
    vehicle: "Tesla Model Y"
  },
  {
    id: 2,
    name: "Ahmed M.",
    location: "Abu Dhabi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Marketing Director",
    quote: "The lease process was seamless and transparent. I could compare different options side by side, and the monthly payment calculator helped me stay within budget.",
    rating: 5,
    purchaseType: "Lease",
    vehicle: "BMW X5"
  },
  {
    id: 3,
    name: "Lara K.",
    location: "Sharjah",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    role: "Software Engineer",
    quote: "As a short-term resident, the rental options on Car360 were perfect. The app made extending my rental super easy when my plans changed.",
    rating: 4,
    purchaseType: "Rent",
    vehicle: "Toyota Camry"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real experiences from Car360 customers across the UAE.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-gray-800 rounded-2xl p-6 md:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-14 w-14 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-gray-400">{testimonial.location} • {testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-car360-orange fill-car360-orange" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="bg-car360-blue bg-opacity-20 text-car360-blue px-3 py-1 rounded-full text-xs mr-3">
                        {testimonial.purchaseType}
                      </span>
                      <span>{testimonial.vehicle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? "w-8 bg-car360-blue" 
                    : "w-2 bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
