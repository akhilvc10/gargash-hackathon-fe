import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-car360-blue to-blue-700 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative p-6 md:p-12 lg:p-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 max-w-2xl">
              Ready to Transform Your Car Experience?
            </h2>
            
            <p className="text-blue-100 text-lg mb-6 md:mb-8 max-w-2xl">
              Join thousands of satisfied customers who have discovered a better way to buy, lease, rent and maintain their vehicles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                size="lg"
                className="bg-white text-car360-blue hover:bg-blue-50 px-8 w-full sm:w-auto"
                asChild
              >
                <Link href="/onboarding">
                  Get Started
                </Link>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 w-full sm:w-auto"
                asChild
              >
                <Link href="/contact" className="flex items-center justify-center">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
