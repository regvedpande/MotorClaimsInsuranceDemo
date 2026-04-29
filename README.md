# Motor Claims Command Center

Enterprise-style React 18 portfolio demo for a complete motor insurance claims ecosystem. The application is deployable on Vercel and uses hardcoded Indian insurance mock data, role-based portals, settlement calculations, workflow state changes, and management analytics.

## Experience Highlights

- Polished full-bleed landing page with stronger visual hierarchy and faster portal entry points
- Refined shared navigation shell with branded top bar, structured side nav, and mobile-friendly bottom navigation
- End-to-end claims workflows across customer, surveyor, garage, operations, and analytics roles
- Production-ready Vite build deployed cleanly on Vercel

## Live Demo Flow

1. Open the landing page and choose a portal from the role cards.
2. Use **Claims Desk** to inspect claims, approve assessments, review documents, and run settlement calculations.
3. Use **Claimant Portal** to file a new FNOL claim and track its status.
4. Use **Surveyor Portal** to simulate field photo uploads, line-item decisions, and report submission.
5. Use **Garage Portal** to submit estimates, view cashless authorisations, and inspect payment status.
6. Use **Analytics Dashboard** to review KPIs, regional performance, ageing, and settlement charts.

## Demo Guide

- Start on the landing page to show the upgraded hero, clearer CTA flow, and role-based portal cards.
- Start with **Claims Desk** to show the full operational workflow and drill into claim details.
- Open **Settlement Calculator** to explain depreciation, inadmissibles, excess, and net payable.
- Use **Claimant Portal** to demonstrate a customer-facing FNOL journey.
- Use **Surveyor Portal** and **Garage Portal** to show partner workflows.
- Finish with **Analytics Dashboard** to highlight portfolio KPIs, charts, tables, and ageing risk.

## Tech Stack

- React 18 with Vite
- Material UI v5 and a custom insurance dashboard theme
- React Router v6
- Recharts
- date-fns
- React Context + useState
- Static mock data only, no backend calls

## Architecture

```mermaid
flowchart LR
  User[Demo user] --> Landing[Portal selector]
  Landing --> Desk[Claims Desk]
  Landing --> Claimant[Claimant Portal]
  Landing --> Surveyor[Surveyor Portal]
  Landing --> Garage[Garage Portal]
  Landing --> Analytics[Analytics Dashboard]
  Desk --> State[React Context claim state]
  Claimant --> State
  Surveyor --> State
  Garage --> State
  State --> Data[Static mock insurance data]
  State --> Settlement[Settlement calculator]
  State --> Charts[Recharts analytics]
  Analytics --> Charts
```

## Local Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Vercel Deployment

The repository includes `vercel.json` with a rewrite rule for React Router:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Import the repo into Vercel, keep the default Vite settings, and deploy.

## Project Structure

```text
src/
  components/       Shared enterprise UI components
  context/          Global claim state and notifications
  data/             Mock claims, garages, surveyors, constants
  hooks/            UI helpers
  pages/            Role-based portals and pages
  utils/            Currency, date, settlement calculations
```

## UI Notes

- `Landing.jsx` owns the marketing-free first screen and portal selection experience.
- `PortalLayout.jsx` provides the shared desktop drawer, top app bar, and mobile bottom navigation.
- `theme.js` and `styles.css` hold the global visual system for cards, tables, typography, and shell polish.

## Settlement Formula

The calculator follows:

```text
(Bill - Inadmissibles) x (1 - Depreciation Rate) - Excess
```

Cashless claims pay the garage after depreciation and collect excess plus inadmissibles from the customer at delivery. Reimbursement claims deduct the compulsory excess from the amount paid to the customer.

## Portfolio Notes

This demo is intentionally frontend-only, but it mirrors enterprise claims concepts for interview discussions: FNOL, eligibility, surveyor assignment, document review, estimate approvals, cashless authorisation, NEFT settlement, ageing reports, and executive analytics.
