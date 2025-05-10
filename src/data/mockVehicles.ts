import { Vehicle } from "../types/vehicle";

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    make: "Tesla",
    model: "Model Y",
    year: 2025,
    title: "Tesla Model Y Long Range",
    description: "Experience the future of driving with the Tesla Model Y Long Range. This all-electric SUV offers impressive range, cutting-edge technology, and exceptional performance in a versatile package.",
    price: 58990,
    priceType: "Starting at",
    thumbnail: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619011455237-fbda7ee2469a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    ],
    availableModes: ["buy", "lease"],
    bodyStyle: "suv",
    fuelType: "electric",
    mileage: 0,
    color: "Pearl White",
    interiorColor: "Black",
    condition: "new",
    rating: 4.9,
    specs: {
      engine: "Dual Motor Electric",
      transmission: "Single-Speed Fixed Gear",
      horsepower: 384,
      torque: "376 lb-ft",
      fuelEconomy: "129 MPGe City / 112 MPGe Highway",
      acceleration: "0-60 mph in 4.8 seconds",
      drivetrain: "All-Wheel Drive"
    },
    features: [
      {
        category: "Safety",
        items: [
          "Autopilot",
          "Adaptive Cruise Control",
          "Automatic Emergency Braking",
          "Lane Departure Warning",
          "360° Cameras"
        ]
      },
      {
        category: "Technology",
        items: [
          "15-inch Touchscreen",
          "Wireless Phone Charging",
          "Premium Audio System",
          "Voice Commands",
          "Over-the-Air Updates"
        ]
      },
      {
        category: "Comfort",
        items: [
          "Heated Seats (Front & Rear)",
          "Panoramic Glass Roof",
          "Dual-Zone Climate Control",
          "Power-Adjustable Seats",
          "HEPA Air Filtration"
        ]
      }
    ],
    pricing: {
      buy: {
        msrp: 58990,
        offer: 57500,
        downPayment: 5000,
        monthlyPayment: 789,
        apr: 2.99,
        term: 72
      },
      lease: {
        monthlyPayment: 599,
        downPayment: 3000,
        term: 36,
        mileageLimit: 12000,
        residualValue: 34000
      }
    },
    stock: 5,
    location: "Dubai Motor City",
    dealershipId: "d1",
    dealershipName: "Premium EV Dubai"
  },
  {
    id: "v2",
    make: "BMW",
    model: "X5",
    year: 2025,
    title: "BMW X5 xDrive40i",
    description: "The BMW X5 combines luxury, technology and dynamic driving performance. With its powerful engine, premium interior and cutting-edge features, it delivers an exceptional driving experience.",
    price: 62500,
    priceType: "Starting at",
    thumbnail: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523983302122-73e869e1f850?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601362840469-54ea53d2d5d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    ],
    availableModes: ["buy", "lease", "rent"],
    bodyStyle: "suv",
    fuelType: "petrol",
    mileage: 0,
    color: "Alpine White",
    interiorColor: "Ivory White",
    condition: "new",
    rating: 4.8,
    specs: {
      engine: "3.0L TwinPower Turbo inline 6-cylinder",
      transmission: "8-speed Automatic",
      horsepower: 335,
      torque: "331 lb-ft",
      fuelEconomy: "21 City / 26 Highway",
      acceleration: "0-60 mph in 5.3 seconds",
      drivetrain: "All-Wheel Drive"
    },
    features: [
      {
        category: "Safety",
        items: [
          "Active Protection System",
          "Driving Assistant Professional",
          "Parking Assistant Plus",
          "Surround View with 3D View",
          "Active Blind Spot Detection"
        ]
      },
      {
        category: "Technology",
        items: [
          "12.3-inch Digital Instrument Cluster",
          "12.3-inch Central Information Display",
          "BMW Intelligent Personal Assistant",
          "Wireless Apple CarPlay and Android Auto",
          "Head-Up Display"
        ]
      },
      {
        category: "Comfort",
        items: [
          "Vernasca Leather Upholstery",
          "16-way Power Front Seats",
          "4-Zone Climate Control",
          "Panoramic Moonroof",
          "Harman Kardon Surround Sound System"
        ]
      }
    ],
    pricing: {
      buy: {
        msrp: 62500,
        offer: 60900,
        downPayment: 6000,
        monthlyPayment: 899,
        apr: 3.49,
        term: 60
      },
      lease: {
        monthlyPayment: 699,
        downPayment: 4500,
        term: 36,
        mileageLimit: 10000,
        residualValue: 37500
      },
      rent: {
        dailyRate: 189,
        weeklyRate: 1150,
        monthlyRate: 3990,
        deposit: 2000
      }
    },
    stock: 3,
    location: "Dubai Festival City",
    dealershipId: "d2",
    dealershipName: "AGMC BMW"
  },
  {
    id: "v3",
    make: "Mercedes-Benz",
    model: "EQS",
    year: 2025,
    title: "Mercedes-Benz EQS 580 4MATIC",
    description: "The Mercedes-Benz EQS redefines electric luxury with its aerodynamic design, impressive range, and opulent interior. Experience the pinnacle of automotive innovation and sustainable mobility.",
    price: 125900,
    priceType: "Starting at",
    thumbnail: "https://images.unsplash.com/photo-1633509817673-56be69f4a6ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1633509817673-56be69f4a6ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618843479419-1dfa0357e424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    ],
    availableModes: ["buy", "lease"],
    bodyStyle: "sedan",
    fuelType: "electric",
    mileage: 0,
    color: "Obsidian Black",
    interiorColor: "Nappa Leather - Black/Space Grey",
    condition: "new",
    rating: 4.9,
    specs: {
      engine: "Dual Electric Motors",
      transmission: "Single-Speed Automatic",
      horsepower: 516,
      torque: "631 lb-ft",
      fuelEconomy: "120 MPGe Combined",
      acceleration: "0-60 mph in 4.1 seconds",
      drivetrain: "All-Wheel Drive"
    },
    features: [
      {
        category: "Safety",
        items: [
          "Driver Assistance Package",
          "Active Distance Assist DISTRONIC",
          "Active Steering Assist",
          "Active Lane Keeping Assist",
          "PRE-SAFE® Plus"
        ]
      },
      {
        category: "Technology",
        items: [
          "MBUX Hyperscreen",
          "Augmented Reality Navigation",
          "Burmester® 3D Surround Sound",
          "Head-Up Display",
          "Biometric Authentication"
        ]
      },
      {
        category: "Comfort",
        items: [
          "Multi-Contour Massage Seats",
          "Executive Rear Seat Package",
          "4-Zone Climate Control",
          "Air Balance Package",
          "Acoustic Comfort Package"
        ]
      }
    ],
    pricing: {
      buy: {
        msrp: 125900,
        offer: 124500,
        downPayment: 15000,
        monthlyPayment: 1699,
        apr: 3.25,
        term: 60
      },
      lease: {
        monthlyPayment: 1499,
        downPayment: 10000,
        term: 36,
        mileageLimit: 10000,
        residualValue: 75500
      }
    },
    stock: 2,
    location: "Dubai Sheikh Zayed Road",
    dealershipId: "d3",
    dealershipName: "Gargash Mercedes-Benz"
  }
]; 