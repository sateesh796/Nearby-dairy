# 🐄 Near by Dairy

A location-based dairy marketplace connecting farmers, buffalo buyers/sellers,
milk buyers/sellers, and veterinary doctors — built mobile-first for use on a
phone in the field.

This is a **working MVP**: everything runs in the browser with realistic
sample data and real GPS, so you can click through the full experience
immediately. It's structured so a real backend, database, maps, auth, and
video-call provider can be swapped in later through environment variables,
without rewriting the UI.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`). Your browser
will ask for location permission — allow it to see real distances to nearby
listings, or decline to use the built-in default location (Guntur, Andhra
Pradesh).

## What's real vs. simulated in this build

| Feature | Status |
|---|---|
| GPS location + distance calculation (haversine) | ✅ Real, uses `navigator.geolocation` |
| Buffalo marketplace: list, filter, sort, view details | ✅ Functional |
| Milk marketplace: list, filter, sort, view details | ✅ Functional |
| Seller-fixed pricing (price never auto-changes) | ✅ Functional |
| Make an offer / accept / reject / counter-offer | ✅ Functional |
| Buyer↔seller chat | ✅ Functional (simulated auto-reply, no server) |
| Nearby veterinary doctors, ratings, filters | ✅ Functional |
| Book a consultation | ✅ Functional (confirmation only, no payment) |
| Video consultation | 🟡 UI only — mic/camera toggle, timer, call layout; no real video stream |
| Admin dashboard: stats, remove listings, approve doctors | ✅ Functional |
| Accounts / login | 🟡 Simplified — a name + role picker, no real backend |
| Data persistence | 🟡 In-memory only; refreshing the page resets everything |
| Payments | ❌ Not implemented |

Switch roles anytime from the **Profile** tab (Buyer / Farmer / Vet Doctor /
Admin) to preview each experience — farmers get an "Add listing" button on
the marketplace screens, and Admin gets a dashboard.

## Project structure

```
near-by-dairy/
├── index.html
├── package.json
├── vite.config.js
├── .env.example          # copy to .env when you connect real services
└── src/
    ├── main.jsx           # React entry point
    ├── index.css          # global resets
    └── App.jsx            # the entire application (screens, mock data, logic)
```

`App.jsx` is intentionally a single file for now — every screen (Home,
Buffalo, Milk, Doctors, Profile, Admin), every modal (listing detail, offers,
chat, doctor booking, video call), and the mock data generator all live there
with clear section comments. As you connect a real backend, the natural next
step is to split it into `src/screens/`, `src/components/`, and
`src/api/` — the component boundaries are already drawn for you.

## Connecting real services

1. **Database & API** — replace the `useState` arrays for `buffaloes`, `milk`,
   `doctors`, `offers`, and `messages` with calls to your backend
   (`VITE_API_BASE_URL`). The database schema this UI expects is listed below.
2. **Maps** — the current "map" experience is distance-sorted lists; add a
   real map view using `VITE_GOOGLE_MAPS_API_KEY` or `VITE_MAPBOX_ACCESS_TOKEN`.
3. **Auth** — replace `AuthGate` with Firebase Authentication or your own
   JWT-based login using the `VITE_FIREBASE_*` variables.
4. **Media storage** — buffalo photos/videos and doctor profile photos should
   upload to Cloudinary or Firebase Storage (`VITE_CLOUDINARY_*`).
5. **Video consultation** — swap `VideoCallScreen`'s mock UI for a real
   WebRTC connection (or a hosted provider like Twilio/Agora/Daily) using
   `VITE_VIDEO_SIGNALING_URL`. The call controls (mic, camera, end call,
   timer) are already wired to local state and just need real media streams.

## Suggested database schema

The mock data in `buildMockData()` mirrors these tables — recreate them in
PostgreSQL, Firebase, or your database of choice:

- **users** — id, name, email, phone, password/auth_id, role, latitude,
  longitude, address, profile_image, created_at
- **buffalo_listings** — id, seller_id, breed, age, gender, milk_capacity,
  health_status, vaccination, description, price, latitude, longitude,
  images, video, status, created_at
- **milk_listings** — id, seller_id, milk_type, quantity, price_per_litre,
  availability_date, availability_time, delivery_option, latitude, longitude,
  description, status, created_at
- **doctors** — id, user_id, qualification, specialization, experience,
  clinic_name, consultation_fee, availability, latitude, longitude, rating,
  verification_status
- **appointments** — id, user_id, doctor_id, appointment_date,
  appointment_time, consultation_fee, status, video_room_id
- **orders** — id, buyer_id, seller_id, listing_id, quantity, agreed_price,
  status, created_at
- **offers** — id, listing_id, buyer_id, seller_id, seller_price,
  buyer_offer, counter_offer, status
- **messages** — id, sender_id, receiver_id, message, created_at
- **reviews** — id, user_id, doctor_id/seller_id, rating, review, created_at

## Notes on privacy

Seller GPS coordinates are jittered/approximated in this demo rather than
shown exactly — carry that same principle into production: show an
approximate area until buyer and seller agree to share exact location.
