# Gargash Car360 - All-in-One Vehicle Platform

## Overview

Car360 is a comprehensive SaaS platform that enables customers to discover, finance, purchase, lease, rent, and maintain vehicles entirely online through a single intuitive mobile and web application. The platform bridges the gap between dealerships and consumers, offering AI-powered guidance and seamless after-sales support.

## Features

- **AI-Powered Recommendations**: Personalized vehicle suggestions based on user preferences
- **Unified Transaction Experience**: Purchase, lease, or rent vehicles through a single platform
- **Conversational AI Assistant**: Context-aware chatbot for instant answers to vehicle questions
- **Digital Contracts & Payments**: Complete KYC, credit checks, and e-contracts online
- **Predictive Maintenance**: Receive alerts before issues occur (powered by telemetry)
- **Image-Based Service Triage**: Upload photos for instant diagnosis and garage bookings
- **Comprehensive Dashboard**: Track payments, documents, and service bookings

## Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router)
- **UI Components**: Shadcn UI, Radix UI
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Authentication**: Email/phone OTP, social logins
- **State Management**: React Hook Form, Context API
- **Notifications**: Sonner (Toast)

## Getting Started

### Prerequisites

- Node.js 18.17+ 
- pnpm 8.15.6+

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd gargash-hackathon-cars-360
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (dashboard)/      # Dashboard routes
│   ├── (landing)/        # Landing page routes
│   ├── api/              # API routes
│   ├── existing-user/    # Existing user flows
│   ├── user-preferences/ # User preference settings
│   └── userflow/         # User journey flows
├── components/           # React components
│   ├── anomalies/        # Error handling components
│   ├── home/             # Homepage components
│   ├── magicui/          # UI animation components
│   ├── onboarding/       # User onboarding components
│   ├── services/         # Service-related components
│   ├── ui/               # Shadcn UI components
│   └── vehicles/         # Vehicle-related components
├── data/                 # Static data and mock APIs
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
└── types/                # TypeScript type definitions
```

## Development Guidelines

- Use TypeScript for all code
- Follow the component structure in the codebase
- Prefer Server Components where possible
- Localize strings for English and Arabic (RTL support)
- Ensure WCAG 2.1 AA accessibility compliance

## License

This project is proprietary and confidential.

## Acknowledgements

Built for the Gargash Hackathon by [Team Name].
