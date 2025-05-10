# Car360 – Product Requirements Document (PRD)

## 2 · Overview

Car360 is a SaaS platform that lets customers **discover, finance, purchase, lease, rent and maintain** cars entirely online through a single mobile and web app. Dealerships subscribe to upload inventory; consumers receive AI‑powered guidance and after‑sales support.

---

## 3 · Problem Statement

*Buying, leasing or renting a car is fragmented, paperwork‑heavy and opaque.* Customers juggle multiple visits, sales pitches and service providers, while dealerships struggle to convert online leads and build recurring revenue.

---

## 4 · Goals & Success Metrics

| Goal                             | Metric                                         | Target (MVP + 6 mo) |
| -------------------------------- | ---------------------------------------------- | ------------------- |
| Reduce purchase decision time    | Avg. days from first visit to checkout         | < 7 days            |
| Increase lead‑to‑sale conversion | % of registered users completing a transaction | ≥ 12 %              |
| Grow after‑sales revenue         | Avg. service bookings per sold car (12 mo)     | ≥ 2                 |
| Delight users                    | Net Promoter Score (NPS)                       | ≥ 65                |

---

## 5 · Target Users & Personas

1. **Decisive Dan** – knows the exact model and wants a fast checkout.
2. **Researcher Rina** – needs data‑driven recommendations to feel confident.
3. **Budget‑Watcher Bilal** – compares finance options and leases to minimise cost.
4. **Loyal Lara** – existing owner who wants payments and service in one place.
5. **Traveler Tariq** – short‑term visitor looking for flexible car rentals.
6. **Lease‑Savvy Leila** – evaluates multi‑year leases, mileage limits and residual values.
7. **Fleet Manager Faisal** – oversees a small business fleet and needs bulk leasing plus driver management.
8. **Eco‑Conscious Eva** – prefers EVs/hybrids and values carbon‑savings dashboards.

---

## 6 · Market Landscape & Unique Selling Proposition

* **Competitors:** Carvana, Cazoo, Dubicars (listing only) and various dealer CRMs.
* **USP:** A unified **AI layer** (conversational assistant, recommendation engine, predictive maintenance, image‑based service triage) plus **embedded payments and digital contracts**—all in a single customer journey.

---

## 7 · Key Use Cases & User Stories

| ID    | User Story                                                                                                                                                     | Priority |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| UC‑01 | *As a* new customer, *I want to* register with OTP or OAuth, *so that* I can start exploring cars.                                                             | P0       |
| UC‑02 | *As a* decisive buyer, *I want to* filter inventory by model and transaction mode (own / lease / rent), *so that* I quickly locate my car.                     | P0       |
| UC‑03 | *As a* hesitant buyer, *I want to* answer a short questionnaire and get AI recommendations, *so that* I feel confident in my choice.                           | P0       |
| UC‑04 | *As a* user on a vehicle detail page, *I want to* chat with an AI assistant, *so that* I can ask specific questions instantly.                                 | P0       |
| UC‑05 | *As a* buyer, *I want to* complete KYC, pull my credit score and sign e‑contracts, *so that* I can purchase without visiting a branch.                         | P0       |
| UC‑06 | *As an* existing owner, *I want to* view upcoming instalments and pay via a saved card, *so that* I never miss a payment.                                      | P0       |
| UC‑07 | *As an* owner, *I want to* receive predictive‑maintenance alerts, *so that* I can fix issues before breakdowns.                                                | P1       |
| UC‑08 | *As an* owner with a problem, *I want to* upload a photo and get an instant diagnosis with garage booking, *so that* I resolve issues quickly.                 | P1       |
| UC‑09 | *As a* short‑term visitor, *I want to* browse rental cars, compare daily and weekly rates and book instantly, *so that* I have transportation during my stay.  | P0       |
| UC‑10 | *As a* renter, *I want to* extend my rental or change the return location in‑app, *so that* I stay flexible.                                                   | P1       |
| UC‑11 | *As a* cost‑conscious driver, *I want to* explore lease options with mileage limits and upfront fees, *so that* I can decide if leasing is better than buying. | P0       |
| UC‑12 | *As a* lease customer, *I want to* track remaining mileage and lease‑end date in my dashboard, *so that* I avoid penalties.                                    | P1       |
| UC‑13 | *As a* lease customer nearing term end, *I want to* see upgrade or buy‑out offers, *so that* I can decide my next step easily.                                 | P2       |

---

## 8 · User Journey Summary

1. **Entry & Segmentation** – Splash → Register / Sign‑in → New vs. Existing.
2. **New Customers** –
   • *Path A:* “I’ve decided” → Inventory → Detail → Chat → Checkout.
   • *Path B:* “Help me decide” → Questionnaire → AI Picks → Compare → Detail → Chat → Checkout.
3. **Existing Customers** – Dashboard → Payments → Documents → Service → Always‑on chatbot.
4. **Service Assist** – Predictive alerts → Garage booking with image‑based triage.
5. **Cross‑Journey Helpers** – Global chatbot, notifications, progress save and analytics hooks.
6. **Garage Assistance** – Snap a photo of damage to receive an instant parts estimate and AI‑recommended nearby garages.

---

## 9 · Functional Requirements (MVP)

| Module                       | Requirement                                                      | Details                                                             |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Auth & On‑boarding**       | Email / phone OTP, social logins, guest browsing                 | Collect name, country, ID images; GDPR & UAE PDPL compliant storage |
| **Inventory Management**     | Dealer portal for SKU upload                                     | CSV & API import, status sync every 15 min                          |
| **Search & Filters**         | Multi‑facet search by mode, make, model, price, body style, fuel | ≤ 100 ms response via Elasticsearch                                 |
| **AI Recommendation Engine** | Questionnaire → ranked list with explanations                    | Fine‑tuned LLM + rule filters                                       |
| **Vehicle Detail Page**      | 360° media, specs, finance calculator, AI chatbot                | Show stock count & similar vehicles                                 |
| **Rental Module**            | Browse, filter & book rental cars                                | Real‑time availability, daily/weekly rates, insurance add‑ons       |
| **Rental Dashboard**         | View / extend rental, change return location                     | Pro‑rated pricing, dynamic late‑fee calculation                     |
| **Lease Module**             | Explore lease plans with mileage & term controls                 | Instant payment estimates, inline KYC & credit check                |
| **Lease Dashboard**          | Track mileage, lease‑end date, upgrade / buy‑out offers          | Notifications 60 / 30 / 7 days before term‑end                      |
| **Checkout & Payments**      | KYC (ShuftiPro), credit pull, e‑contract, HyperPay split         | Native SDK; Apple / Google Pay                                      |
| **Conversational AI**        | Retrieval‑augmented chatbot over manuals, FAQs & finance         | Context‑aware (model, VIN)                                          |
| **Owner Dashboard**          | Cars, payments, documents, service bookings                      | Real‑time payment reminders                                         |
| **Predictive Maintenance**   | Ingest telemetry (OBD / IoT)                                     | ML model forecasts wear on brakes, oil, tyres                       |
| **Garage Assist**            | Photo upload → classification → quote                            | Human fallback if confidence < 70 %                                 |
| **Notifications**            | Push, email, SMS                                                 | EN / AR localisation                                                |
| **Analytics**                | Event tracking & funnel dashboards                               | Mixpanel / PostHog                                                  |

---

## 10 · Non‑Functional Requirements

* **Performance:** < 1 s P95 page load on 4G.
* **Scalability:** 10 k concurrent users; 1 M telemetry messages / day.
* **Security & Compliance:** PCI‑DSS (payments), ISO 27001, GDPR, UAE PDPL.
* **Accessibility:** WCAG 2.1 AA.
* **Localisation:** English & Arabic v1; full RTL support.
* **Availability:** 99.8 % monthly uptime.

---

## 11 · MVP Scope

✔ UC‑01 → UC‑06 (core purchase & payments)
✔ AI modules: recommendation engine & RAG chatbot (knowledge base v1)
✔ Predictive maintenance telemetry (alpha)
✔ Garage photo diagnosis (prototype)

---

## 12 · Out‑of‑Scope (v1)

* AR driveway visualiser
* Concierge test‑drive logistics
* NFT referral programme
* EV eco‑score gamification

---

## 13 · Open Questions & Risks

| # | Question / Risk                                     | Owner       | Mitigation                               |
| - | --------------------------------------------------- | ----------- | ---------------------------------------- |
| 1 | Real‑time credit API availability in GCC            | Product     | Explore AECB or partner‑bank APIs        |
| 2 | Inventory accuracy across multiple dealers          | Engineering | Webhooks + 15 min sync, manual overrides |
| 3 | Legal validity of remote e‑signature for auto sales | Legal       | Confirm UAE MOJ e‑signature regulations  |

---

**End of Document – Ready for stakeholder review**
