import { Vehicle } from "../types/vehicle";

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    make: "Mercedes-Benz",
    model: "EQS",
    year: 2025,
    title: "Mercedes-Benz EQS 580 4MATIC",
    description: "The Mercedes-Benz EQS redefines electric luxury with its aerodynamic design, impressive range, and opulent interior. Experience the pinnacle of automotive innovation and sustainable mobility.",
    price: 125900,
    priceType: "Starting at",
    thumbnail: "https://images.unsplash.com/photo-1668248835473-c2f28c752663?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1668248835473-c2f28c752663?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  },
  {
    id: "v2",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2025,
    title: "Mercedes-Benz C300 4MATIC",
    description: "The Mercedes-Benz C-Class delivers sophisticated style, advanced technology, and refined performance in a compact luxury sedan package. Experience German engineering at its finest.",
    price: 48500,
    priceType: "Starting at",
    thumbnail: "https://images.unsplash.com/photo-1686562483617-3cf08d81e117?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1686562483617-3cf08d81e117?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618843479419-1dfa0357e424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    ],
    availableModes: ["buy", "lease", "rent"],
    bodyStyle: "sedan",
    fuelType: "petrol",
    mileage: 0,
    color: "Polar White",
    interiorColor: "Black MB-Tex",
    condition: "new",
    rating: 4.7,
    specs: {
      engine: "2.0L Turbocharged Inline-4",
      transmission: "9-speed Automatic",
      horsepower: 255,
      torque: "295 lb-ft",
      fuelEconomy: "23 City / 33 Highway",
      acceleration: "0-60 mph in 5.9 seconds",
      drivetrain: "All-Wheel Drive"
    },
    features: [
      {
        category: "Safety",
        items: [
          "Active Brake Assist",
          "Blind Spot Assist",
          "ATTENTION ASSIST®",
          "PRE-SAFE®",
          "Crosswind Assist"
        ]
      },
      {
        category: "Technology",
        items: [
          "11.9-inch Central Touchscreen",
          "12.3-inch Digital Instrument Cluster",
          "MBUX Infotainment System",
          "Wireless Smartphone Integration",
          "Fingerprint Scanner"
        ]
      },
      {
        category: "Comfort",
        items: [
          "Power Front Seats with Memory",
          "Heated Front Seats",
          "Dual-Zone Climate Control",
          "64-Color Ambient Lighting",
          "Burmester® Surround Sound System"
        ]
      }
    ],
    pricing: {
      buy: {
        msrp: 48500,
        offer: 47200,
        downPayment: 5000,
        monthlyPayment: 699,
        apr: 2.99,
        term: 60
      },
      lease: {
        monthlyPayment: 499,
        downPayment: 3500,
        term: 36,
        mileageLimit: 10000,
        residualValue: 29100
      },
      rent: {
        dailyRate: 149,
        weeklyRate: 890,
        monthlyRate: 2990,
        deposit: 1500
      }
    },
    stock: 5,
    location: "Dubai Sheikh Zayed Road",
    dealershipId: "d3",
    dealershipName: "Gargash Mercedes-Benz"
  },
  {
    id: "v3",
    make: "Alfa Romeo",
    model: "Giulia",
    year: 2025,
    title: "Alfa Romeo Giulia Quadrifoglio",
    description: "The Alfa Romeo Giulia Quadrifoglio combines Italian craftsmanship with exhilarating performance. With its powerful engine, precise handling, and distinctive styling, it delivers a driving experience like no other.",
    price: 79900,
    priceType: "Starting at",
    thumbnail: "https://images.unsplash.com/photo-1577494998472-199727fdc041?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1577494998472-199727fdc041?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1581650107963-3e8c1f48241b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581650107963-7bed89fb6593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    ],
    availableModes: ["buy", "lease"],
    bodyStyle: "sedan",
    fuelType: "petrol",
    mileage: 0,
    color: "Rosso Alfa",
    interiorColor: "Black Leather with Red Stitching",
    condition: "new",
    rating: 4.8,
    specs: {
      engine: "2.9L Twin-Turbo V6",
      transmission: "8-speed Automatic",
      horsepower: 505,
      torque: "443 lb-ft",
      fuelEconomy: "17 City / 25 Highway",
      acceleration: "0-60 mph in 3.8 seconds",
      drivetrain: "Rear-Wheel Drive"
    },
    features: [
      {
        category: "Safety",
        items: [
          "Forward Collision Warning",
          "Autonomous Emergency Braking",
          "Lane Departure Warning",
          "Blind Spot Monitoring",
          "Adaptive Cruise Control"
        ]
      },
      {
        category: "Technology",
        items: [
          "8.8-inch Touchscreen Infotainment",
          "Wireless Apple CarPlay and Android Auto",
          "Harman Kardon Premium Audio",
          "7-inch TFT Instrument Cluster",
          "Alfa Connect Services"
        ]
      },
      {
        category: "Performance",
        items: [
          "Alfa DNA Pro Drive Mode Selector",
          "Torque Vectoring Differential",
          "Active Suspension",
          "Carbon Ceramic Brakes",
          "Carbon Fiber Components"
        ]
      }
    ],
    pricing: {
      buy: {
        msrp: 79900,
        offer: 78500,
        downPayment: 8000,
        monthlyPayment: 1099,
        apr: 3.49,
        term: 60
      },
      lease: {
        monthlyPayment: 899,
        downPayment: 6000,
        term: 36,
        mileageLimit: 10000,
        residualValue: 47900
      }
    },
    stock: 1,
    location: "Dubai Motor City",
    dealershipId: "d4",
    dealershipName: "Alfa Romeo Dubai"
  }
]; 