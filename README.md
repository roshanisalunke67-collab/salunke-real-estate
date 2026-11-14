# Salunke Real Estate — AI-ready luxury website

A responsive React + Vite + TypeScript website with a charcoal, gold and cream identity.

## Included
- Existing luxury website layout and mobile navigation
- Property catalogue with owner-shared Raunak City and Neeraj Park flat listings; filters for construction status, Flats/Shops/Plots and Sale/Rent
- WhatsApp enquiry handoff for buyer, renter and property-owner leads
- Salunke AI chat widget with English, Hindi and Marathi responses, browser voice input and read-aloud replies
- Cinematic theatre-curtain welcome animation on page entry
- AI property-description draft generator
- AI photo-enhancement tool for genuine property photos
- Netlify serverless function for Gemini API calls; API key remains server-side
- No admin dashboard

## Important feature boundaries
- The chatbot can only recommend records supplied in `src/data/properties.ts`. It must not invent availability, prices or property details. Listings currently marked “To Be Confirmed” have no construction classification supplied yet.
- Website forms open WhatsApp with a pre-filled message. The visitor must press Send. This starter does not silently store lead data in a database.
- The WhatsApp button is a human handoff. A fully automated WhatsApp bot requires WhatsApp Business Platform/Cloud API setup, approved credentials and applicable messaging charges; that is not activated in this starter.
- AI image enhancement is an optional AI operation. Always compare the output with the original and reject it if it changes physical property features. Do not use generated images to misrepresent a listing.
- AI functions need a Gemini API key. Free quotas and model availability depend on Google's current account, region and usage limits; usage is not guaranteed to remain free.

## Update property listings (no admin dashboard)
Edit `src/data/properties.ts`. Confirm availability, construction status, exact measurements and permission to advertise before updating each listing. Replace representative remote stock-image URLs with genuine owner-approved property photos in `public/properties/` and paths such as `/properties/kalyan-flat-front.jpg`. The currently displayed stock photos are illustrative only and do not depict the exact units.

Each property object uses these fields. For Plots, set `purpose: "Sale"`; the site does not offer plot rentals. Use `construction` to distinguish New Construction from Resale Construction; while unknown, use `To Be Confirmed`. Only add a record after the owner has authorised the listing and its current details have been confirmed.

```ts
{
  id: 1,
  title: "Property title from the owner",
  location: "Confirmed locality",
  construction: "New Construction", // or "Resale Construction" or "To Be Confirmed"
  type: "Flat", // or "Shop" or "Plot"
  purpose: "Sale", // or "Rent" for Flats and Shops only
  price: "Confirmed price or rent",
  beds: 2, // use 0 for shops and plots
  baths: 2, // use 0 when not applicable
  area: "Confirmed area in sq ft",
  image: "/properties/actual-property-photo.jpg",
  tag: "Representative photo",
  description: "Listing details supplied by the owner",
  features: ["Owner-confirmed feature"]
}
```

## Run locally

1. Install Node.js LTS.
2. In the project folder, run:

```bash
npm install
npm run dev
```

3. Open the Vite local URL shown in the terminal.

The frontend works without an AI key, but AI requests will show a setup message until the key is configured. Voice replies use the browser's built-in speech synthesis; microphone input uses browser speech recognition where supported (for example, compatible Chrome/Edge builds) and requires microphone permission. Voice availability and quality vary by browser and installed language voices. The welcome curtain animation includes a Skip intro control and respects reduced-motion settings.

## Configure Gemini AI

1. Create or access an API key in [Google AI Studio](https://aistudio.google.com/app/apikey).
2. For local Netlify Functions testing, install the Netlify CLI and use `netlify dev` (or deploy to Netlify to test). Add `GEMINI_API_KEY` to your local `.env` file; never commit the real key.
3. In Netlify, open **Project configuration → Environment variables** and add `GEMINI_API_KEY` with the secret value. Then redeploy. Netlify documents that function environment variables are accessed at runtime and that changes require a new deploy: https://docs.netlify.com/build/functions/environment-variables/.

The Netlify function uses Gemini `generateContent` REST calls with server-side credentials. Google currently recommends the Interactions API for new projects; `generateContent` remains supported, so this starter uses the simpler REST path and can be migrated later: https://ai.google.dev/gemini-api/docs/interactions-overview. The configured model IDs are `gemini-3.1-flash-lite` for text and `gemini-3.1-flash-image` for image editing; check current model availability and pricing in your AI Studio account before launch.

## Build and deploy

```bash
npm run build
```

Netlify settings are in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

Connect the project repository to Netlify for automatic deployments on each Git push.

## Before going public
- Replace representative stock photos with genuine property photos before advertising the exact units. Confirm construction classifications and listing details.
- Add the Gemini key in Netlify's environment settings (not in React source code).
- Test AI chat in all three languages and review outputs for factual accuracy.
- Test phone and WhatsApp links on a mobile device.
- Publish a privacy notice explaining how enquiry details are used.
- Confirm property advertising, permissions and applicable Maharashtra RERA requirements before publishing any listing or claim.
