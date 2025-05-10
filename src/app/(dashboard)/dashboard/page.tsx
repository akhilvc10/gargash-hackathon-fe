import Link from "next/link";
import { ArrowLeft, Bell, Car, CreditCard, Settings, User } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
     <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
            </div>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">Welcome to Car360!</h2>
          <p className="mb-4">
            Thank you for completing your profile. Based on your preferences, we've curated some recommendations for you.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link 
              href="/vehicles"
              className="inline-block bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50"
            >
              View Recommendations
            </Link>
            <Link 
              href="/profile"
              className="inline-block bg-blue-700 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800"
            >
              Complete Your Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { 
              title: "Your Vehicles", 
              icon: <Car className="h-5 w-5" />,
              description: "View and manage your vehicles",
              cta: "Explore Vehicles",
              href: "/my-vehicles"
            },
            { 
              title: "Payments", 
              icon: <CreditCard className="h-5 w-5" />,
              description: "View your payment history and upcoming payments",
              cta: "Manage Payments",
              href: "/payments"
            },
            { 
              title: "Account Settings", 
              icon: <Settings className="h-5 w-5" />,
              description: "Update your profile and preferences",
              cta: "Edit Settings",
              href: "/settings"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <Link 
                href={item.href}
                className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
              >
                {item.cta}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recommended Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Mercedes-Benz GLE",
                type: "SUV",
                price: "AED 320,000",
                image: "https://via.placeholder.com/300x200?text=Mercedes+GLE"
              },
              {
                name: "BMW 5 Series",
                type: "Sedan",
                price: "AED 280,000",
                image: "https://via.placeholder.com/300x200?text=BMW+5+Series"
              },
              {
                name: "Audi e-tron",
                type: "Electric",
                price: "AED 350,000",
                image: "https://via.placeholder.com/300x200?text=Audi+e-tron"
              }
            ].map((vehicle, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500">{vehicle.type}</span>
                    <span className="font-medium">{vehicle.price}</span>
                  </div>
                  <Link 
                    href={`/vehicles/${index}`}
                    className="mt-3 inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link 
              href="/vehicles"
              className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
            >
              View All Vehicles
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 