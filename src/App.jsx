import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  MapPin, Search, SlidersHorizontal, Phone, MessageCircle, Video, Star,
  Mic, MicOff, Camera, CameraOff, PhoneOff, Bell, User, Home as HomeIcon,
  ChevronRight, ChevronLeft, X, Check, ShieldCheck, Droplets, Stethoscope,
  Plus, Clock, BadgeCheck, AlertTriangle, LogIn, Menu, Navigation, Send,
  Trash2, ThumbsUp, ThumbsDown, Repeat
} from "lucide-react";

/* ============================== STYLES ============================== */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700;800&display=swap');

.nbd-root{
  --ink:#1C1B18; --ink-soft:#5B564C; --ink-faint:#8A8478;
  --paper:#FBF6EC; --paper-dim:#F3ECDC; --paper-flat:#FFFFFF;
  --field:#2F4A3C; --field-light:#3E5F4E; --field-pale:#E7EEE7;
  --hide:#6B4226; --hide-pale:#EFE2D3;
  --marigold:#E3A008; --marigold-dark:#B87F04; --marigold-pale:#FBEBC4;
  --line:#DDD3BC; --line-soft:#EAE2CE;
  --danger:#A13D2D; --danger-pale:#F2DED7;
  font-family:'Public Sans', sans-serif;
  color:var(--ink);
  background:var(--paper-dim);
  -webkit-font-smoothing:antialiased;
}
.nbd-serif{ font-family:'Fraunces', serif; }
.nbd-shell{
  max-width:460px; margin:0 auto; background:var(--paper);
  min-height:100vh; display:flex; flex-direction:column;
  box-shadow:0 0 40px rgba(0,0,0,0.08);
  position:relative;
}
.nbd-top{
  position:sticky; top:0; z-index:20; background:var(--field); color:var(--paper);
  padding:14px 16px 12px;
}
.nbd-top-row{ display:flex; align-items:center; justify-content:space-between; }
.nbd-logo{ display:flex; align-items:center; gap:8px; font-size:19px; font-weight:600; letter-spacing:0.2px; }
.nbd-loc-pill{
  margin-top:10px; display:flex; align-items:center; gap:6px;
  background:rgba(255,255,255,0.12); border-radius:999px; padding:7px 12px;
  font-size:12.5px; color:var(--paper); width:fit-content; cursor:pointer;
  border:1px solid rgba(255,255,255,0.18);
}
.nbd-icon-btn{
  width:34px; height:34px; border-radius:999px; display:flex; align-items:center;
  justify-content:center; background:rgba(255,255,255,0.12); border:none; color:var(--paper);
  cursor:pointer; position:relative;
}
.nbd-icon-btn:active{ transform:scale(0.94); }
.nbd-dot{
  position:absolute; top:5px; right:5px; width:8px; height:8px; border-radius:999px;
  background:var(--marigold); border:1.5px solid var(--field);
}
.nbd-main{ flex:1; overflow-y:auto; padding-bottom:84px; }
.nbd-bottom-nav{
  position:sticky; bottom:0; z-index:20; background:var(--paper-flat);
  border-top:1px solid var(--line); display:flex; padding:6px 4px 10px;
}
.nbd-nav-btn{
  flex:1; display:flex; flex-direction:column; align-items:center; gap:3px;
  background:none; border:none; padding:6px 2px; color:var(--ink-faint); cursor:pointer;
  font-size:10.5px; font-weight:600;
}
.nbd-nav-btn.active{ color:var(--field); }

.nbd-section{ padding:18px 16px 6px; }
.nbd-hero{
  margin:14px 16px 6px; background:var(--field); color:var(--paper);
  border-radius:22px; padding:20px 18px; position:relative; overflow:hidden;
}
.nbd-hero-label{ font-size:12px; text-transform:uppercase; letter-spacing:1.2px; color:var(--marigold-pale); font-weight:700; }
.nbd-hero-grid{ display:flex; margin-top:14px; }
.nbd-hero-stat{ flex:1; }
.nbd-hero-num{ font-family:'Fraunces', serif; font-size:34px; font-weight:600; font-variant-numeric:tabular-nums; line-height:1; }
.nbd-hero-cap{ font-size:12px; color:rgba(251,246,236,0.75); margin-top:4px; }
.nbd-hero-divider{ width:1px; background:rgba(255,255,255,0.18); margin:2px 14px; }

.nbd-cta-row{ display:flex; gap:10px; padding:14px 16px 4px; }
.nbd-btn-primary{
  flex:1; background:var(--marigold); color:var(--ink); border:none; border-radius:999px;
  padding:13px 16px; font-weight:700; font-size:14.5px; cursor:pointer; display:flex;
  align-items:center; justify-content:center; gap:6px;
}
.nbd-btn-secondary{
  flex:1; background:transparent; color:var(--field); border:1.5px solid var(--field);
  border-radius:999px; padding:13px 16px; font-weight:700; font-size:14.5px; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:6px;
}
.nbd-btn-primary:active, .nbd-btn-secondary:active{ transform:scale(0.98); }

.nbd-cat-row{ padding:10px 16px 4px; display:flex; flex-direction:column; gap:10px; }
.nbd-cat-card{
  display:flex; align-items:center; gap:12px; background:var(--paper-flat);
  border:1px solid var(--line); border-radius:16px; padding:14px; cursor:pointer;
}
.nbd-cat-icon{
  width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center;
  font-size:20px; flex-shrink:0;
}
.nbd-cat-title{ font-weight:700; font-size:14.5px; }
.nbd-cat-sub{ font-size:12.5px; color:var(--ink-soft); margin-top:1px; }

.nbd-h1{ font-family:'Fraunces', serif; font-size:22px; font-weight:600; margin:0 0 2px; }
.nbd-h2{ font-family:'Fraunces', serif; font-size:17px; font-weight:600; margin:0; }
.nbd-eyebrow{ font-size:12px; color:var(--ink-soft); margin:0 0 10px; }

.nbd-searchbar{
  margin:4px 16px 0; display:flex; align-items:center; gap:8px; background:var(--paper-flat);
  border:1px solid var(--line); border-radius:12px; padding:10px 12px;
}
.nbd-searchbar input{ border:none; outline:none; background:none; font-size:14px; flex:1; color:var(--ink); font-family:'Public Sans',sans-serif; }

.nbd-filterbar{ display:flex; gap:8px; overflow-x:auto; padding:12px 16px 4px; scrollbar-width:none; }
.nbd-filterbar::-webkit-scrollbar{ display:none; }
.nbd-chip{
  flex-shrink:0; border:1px solid var(--line); background:var(--paper-flat); color:var(--ink);
  border-radius:999px; padding:7px 13px; font-size:12.5px; font-weight:600; cursor:pointer; white-space:nowrap;
}
.nbd-chip.active{ background:var(--field); color:var(--paper); border-color:var(--field); }
.nbd-filter-toggle{
  flex-shrink:0; display:flex; align-items:center; gap:5px; border:1px solid var(--field);
  color:var(--field); background:var(--field-pale); border-radius:999px; padding:7px 13px; font-size:12.5px; font-weight:700; cursor:pointer;
}

.nbd-filter-panel{ margin:6px 16px 4px; background:var(--paper-flat); border:1px solid var(--line); border-radius:16px; padding:14px; }
.nbd-field-label{ font-size:11.5px; font-weight:700; color:var(--ink-soft); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:5px; display:block; }
.nbd-select, .nbd-input{
  width:100%; border:1px solid var(--line); border-radius:9px; padding:9px 10px; font-size:13.5px;
  background:var(--paper); color:var(--ink); font-family:'Public Sans',sans-serif;
}
.nbd-field-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px; }

.nbd-list{ padding:2px 16px 12px; }
.nbd-row{
  display:flex; gap:12px; padding:14px 0; border-bottom:1px solid var(--line-soft); cursor:pointer;
}
.nbd-row:last-child{ border-bottom:none; }
.nbd-thumb{
  width:74px; height:74px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center;
  font-size:28px;
}
.nbd-row-title{ font-weight:700; font-size:14.5px; margin:0 0 2px; }
.nbd-row-meta{ font-size:12.5px; color:var(--ink-soft); line-height:1.5; }
.nbd-row-bottom{ display:flex; align-items:center; justify-content:space-between; margin-top:6px; }
.nbd-price{ font-family:'Fraunces', serif; font-weight:600; font-size:16px; color:var(--field); font-variant-numeric:tabular-nums; }
.nbd-dist{ display:flex; align-items:center; gap:3px; font-size:12px; color:var(--hide); font-weight:600; }
.nbd-badge{
  display:inline-flex; align-items:center; gap:3px; font-size:11px; font-weight:700; padding:2px 8px;
  border-radius:999px; margin-right:5px;
}
.nbd-badge-good{ background:var(--field-pale); color:var(--field); }
.nbd-badge-marigold{ background:var(--marigold-pale); color:var(--marigold-dark); }

.nbd-empty{ text-align:center; padding:40px 20px; color:var(--ink-soft); }

.nbd-fab{
  position:absolute; right:18px; bottom:96px; width:52px; height:52px; border-radius:999px;
  background:var(--marigold); color:var(--ink); border:none; display:flex; align-items:center; justify-content:center;
  box-shadow:0 6px 18px rgba(227,160,8,0.45); cursor:pointer; z-index:15;
}

.nbd-modal-backdrop{
  position:fixed; inset:0; background:rgba(28,27,24,0.55); z-index:50; display:flex; align-items:flex-end;
  justify-content:center;
}
.nbd-modal-sheet{
  width:100%; max-width:460px; background:var(--paper); border-radius:22px 22px 0 0; max-height:92vh;
  overflow-y:auto; animation:nbdSlideUp 0.22s ease-out;
}
@keyframes nbdSlideUp{ from{ transform:translateY(30px); opacity:0; } to{ transform:translateY(0); opacity:1; } }
.nbd-modal-header{
  position:sticky; top:0; background:var(--paper); display:flex; align-items:center; justify-content:space-between;
  padding:16px; border-bottom:1px solid var(--line-soft); z-index:2;
}
.nbd-modal-close{ width:30px; height:30px; border-radius:999px; background:var(--paper-dim); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; }

.nbd-tabbar{ display:flex; border-bottom:1px solid var(--line-soft); padding:0 16px; }
.nbd-tab{ padding:12px 4px; margin-right:20px; font-size:13.5px; font-weight:700; color:var(--ink-faint); background:none; border:none; cursor:pointer; border-bottom:2px solid transparent; }
.nbd-tab.active{ color:var(--field); border-bottom-color:var(--field); }

.nbd-detail-hero{ width:100%; height:180px; display:flex; align-items:center; justify-content:center; font-size:64px; }
.nbd-detail-body{ padding:16px; }
.nbd-spec-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:14px 0; }
.nbd-spec{ background:var(--paper-flat); border:1px solid var(--line); border-radius:12px; padding:10px 12px; }
.nbd-spec-k{ font-size:11px; color:var(--ink-faint); font-weight:700; text-transform:uppercase; letter-spacing:0.4px; }
.nbd-spec-v{ font-size:14px; font-weight:700; margin-top:2px; }

.nbd-chat-scroll{ padding:14px 16px; display:flex; flex-direction:column; gap:8px; min-height:160px; }
.nbd-msg{ max-width:78%; padding:9px 12px; border-radius:14px; font-size:13.5px; line-height:1.4; }
.nbd-msg.me{ align-self:flex-end; background:var(--field); color:var(--paper); border-bottom-right-radius:4px; }
.nbd-msg.them{ align-self:flex-start; background:var(--paper-flat); border:1px solid var(--line); border-bottom-left-radius:4px; }
.nbd-chat-input-row{ display:flex; gap:8px; padding:12px 16px 16px; border-top:1px solid var(--line-soft); }
.nbd-chat-input-row input{ flex:1; border:1px solid var(--line); border-radius:999px; padding:10px 14px; font-size:13.5px; outline:none; font-family:'Public Sans',sans-serif; }
.nbd-send-btn{ width:38px; height:38px; border-radius:999px; background:var(--field); color:var(--paper); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; }

.nbd-offer-box{ background:var(--hide-pale); border-radius:14px; padding:14px; margin:14px 0; }
.nbd-offer-row{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:13.5px; }
.nbd-offer-actions{ display:flex; gap:8px; margin-top:8px; }
.nbd-mini-btn{ flex:1; padding:8px; border-radius:9px; border:none; font-weight:700; font-size:12.5px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px; }

.nbd-doctor-card{ display:flex; gap:12px; background:var(--paper-flat); border:1px solid var(--line); border-radius:16px; padding:14px; margin:0 16px 12px; }
.nbd-avatar{ width:58px; height:58px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0; background:var(--field-pale); }
.nbd-avail-dot{ width:7px; height:7px; border-radius:999px; display:inline-block; margin-right:5px; }

.nbd-call-screen{ position:fixed; inset:0; background:#14231C; z-index:60; display:flex; flex-direction:column; color:#fff; }
.nbd-call-top{ padding:18px; text-align:center; }
.nbd-call-doc{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }
.nbd-call-avatar{ width:120px; height:120px; border-radius:999px; background:#243B30; display:flex; align-items:center; justify-content:center; font-size:52px; }
.nbd-call-pip{
  position:absolute; top:70px; right:18px; width:76px; height:104px; border-radius:14px; background:#3E5F4E;
  display:flex; align-items:center; justify-content:center; font-size:28px; border:2px solid rgba(255,255,255,0.2);
}
.nbd-call-controls{ display:flex; justify-content:center; gap:16px; padding:26px; }
.nbd-call-btn{ width:54px; height:54px; border-radius:999px; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; background:rgba(255,255,255,0.14); color:#fff; }
.nbd-call-btn.off{ background:rgba(255,255,255,0.35); }
.nbd-call-btn.end{ background:var(--danger); }

.nbd-stat-card{ background:var(--paper-flat); border:1px solid var(--line); border-radius:14px; padding:14px; }
.nbd-stat-num{ font-family:'Fraunces',serif; font-size:24px; font-weight:600; }
.nbd-stat-lbl{ font-size:11.5px; color:var(--ink-soft); margin-top:2px; }
.nbd-admin-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:14px 16px; }

.nbd-role-btn{ flex:1; padding:12px 6px; border-radius:12px; border:1.5px solid var(--line); background:var(--paper-flat); font-weight:700; font-size:12.5px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:5px; color:var(--ink-soft); }
.nbd-role-btn.active{ border-color:var(--field); background:var(--field-pale); color:var(--field); }

.nbd-toast{
  position:fixed; bottom:96px; left:50%; transform:translateX(-50%); background:var(--ink); color:var(--paper);
  padding:11px 18px; border-radius:999px; font-size:13px; font-weight:600; z-index:70; max-width:90%; text-align:center;
  animation:nbdFade 2.6s ease forwards;
}
@keyframes nbdFade{ 0%{opacity:0; transform:translate(-50%,8px);} 12%{opacity:1; transform:translate(-50%,0);} 82%{opacity:1;} 100%{opacity:0;} }
`;

/* ============================== HELPERS ============================== */

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function seededRand(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function jitterPoint(lat, lng, maxKm, seed) {
  const r1 = seededRand(seed);
  const r2 = seededRand(seed + 7.13);
  const distKm = 0.6 + r1 * maxKm;
  const angle = r2 * 2 * Math.PI;
  const dLat = (distKm / 111) * Math.cos(angle);
  const dLng = (distKm / (111 * Math.cos((lat * Math.PI) / 180))) * Math.sin(angle);
  return { lat: lat + dLat, lng: lng + dLng };
}
function fmtKm(km) {
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  return `${km.toFixed(1)} km away`;
}
function fmtINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}
let __id = 1000;
function uid() {
  __id += 1;
  return __id;
}

/* ============================== MOCK DATA ============================== */

function buildMockData(center) {
  const breeds = ["Murrah", "Jaffarabadi", "Nili-Ravi", "Mehsana", "Surti"];
  const sellerNames = ["Ramesh Naidu", "Suresh Babu", "Lakshmi Devi", "Venkatesh Rao", "Padmavathi", "Krishna Rao", "Anitha Kumari", "Nagarjuna Reddy", "Malleswari"];
  const health = ["Excellent", "Good", "Good", "Fair"];

  const buffaloes = Array.from({ length: 9 }).map((_, i) => {
    const p = jitterPoint(center.lat, center.lng, 42, i * 3.1 + 1);
    const age = [2, 3, 3, 4, 5, 4, 6, 2, 5][i];
    const milkPerDay = [8, 10, 12, 9, 14, 11, 7, 13, 10][i];
    return {
      id: uid(),
      type: "buffalo",
      breed: breeds[i % breeds.length],
      age,
      gender: i % 4 === 0 ? "Male" : "Female",
      milkPerDay,
      health: health[i % health.length],
      vaccinated: i % 3 !== 0,
      price: 55000 + milkPerDay * 2600 + age * 900 + Math.round(seededRand(i + 5) * 8000),
      sellerName: sellerNames[i % sellerNames.length] + (i === 0 ? " (You)" : ""),
      isYours: i === 0,
      description:
        "Healthy, well-fed buffalo raised on natural fodder. Regular vaccination and health checkups. Genuine buyers only, visit anytime with prior call.",
      lat: p.lat,
      lng: p.lng,
      offers: [],
      messages: [],
      emoji: "🐃",
      color: i % 2 === 0 ? "var(--field-pale)" : "var(--hide-pale)",
    };
  });

  const milkTypes = ["Buffalo", "Cow"];
  const milkSellers = ["Ramesh Naidu", "Sita Mahalakshmi", "Krishnaiah", "Padma Rao", "Ravi Teja", "Subbamma", "Yesu Ratnam"];
  const milk = Array.from({ length: 7 }).map((_, i) => {
    const p = jitterPoint(center.lat, center.lng, 30, i * 4.7 + 20);
    const qty = [15, 30, 10, 25, 40, 12, 20][i];
    const price = milkTypes[i % 2] === "Buffalo" ? 68 + (i % 3) * 4 : 48 + (i % 3) * 3;
    return {
      id: uid(),
      type: "milk",
      milkType: milkTypes[i % 2],
      quantity: qty,
      price,
      sellerName: milkSellers[i % milkSellers.length] + (i === 0 ? " (You)" : ""),
      isYours: i === 0,
      availableDate: "Today",
      availableTime: i % 2 === 0 ? "6:00 AM - 9:00 AM" : "5:30 PM - 7:30 PM",
      delivery: i % 2 === 0 ? "Pickup + Delivery" : "Pickup only",
      description: "Fresh, unadulterated milk from our own dairy. Chilled and ready. Daily/weekly subscriptions available on request.",
      lat: p.lat,
      lng: p.lng,
      messages: [],
      emoji: "🥛",
    };
  });

  const docNames = ["Dr. Ravi Kumar", "Dr. Swathi Reddy", "Dr. Chandrasekhar", "Dr. Anjali Rao", "Dr. Md Iqbal", "Dr. Nikhila Varma"];
  const specializations = ["Large animal medicine", "Reproduction & AI", "Surgery", "Nutrition & feed planning", "General practice"];
  const doctors = Array.from({ length: 6 }).map((_, i) => {
    const p = jitterPoint(center.lat, center.lng, 35, i * 5.9 + 40);
    return {
      id: uid(),
      name: docNames[i],
      qualification: "B.V.Sc & A.H.",
      specialization: specializations[i % specializations.length],
      experience: [8, 5, 12, 3, 9, 2][i],
      clinicName: `${["Guntur", "Tenali", "Mangalagiri", "Vijayawada", "Narasaraopet", "Chilakaluripet"][i]} Veterinary Clinic`,
      fee: [300, 250, 400, 200, 350, 150][i],
      rating: [4.7, 4.5, 4.9, 4.2, 4.6, 4.0][i],
      reviews: [58, 34, 121, 12, 76, 5][i],
      available: i !== 3,
      verified: i !== 5,
      lat: p.lat,
      lng: p.lng,
    };
  });

  return { buffaloes, milk, doctors };
}

/* ============================== SMALL ATOMS ============================== */

function Field({ label, children }) {
  return (
    <div>
      <span className="nbd-field-label">{label}</span>
      {children}
    </div>
  );
}

function Badge({ tone = "good", children }) {
  return <span className={`nbd-badge nbd-badge-${tone}`}>{children}</span>;
}

/* ============================== TOP BAR & NAV ============================== */

function TopBar({ locationLabel, locStatus, onChangeLocation, notifications, showNotif, setShowNotif, onClearNotif }) {
  return (
    <div className="nbd-top">
      <div className="nbd-top-row">
        <div className="nbd-logo">🐄 Near by Dairy</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="nbd-icon-btn" onClick={() => setShowNotif((s) => !s)} aria-label="Notifications">
            <Bell size={17} />
            {notifications.length > 0 && <span className="nbd-dot" />}
          </button>
        </div>
      </div>
      <div className="nbd-loc-pill" onClick={onChangeLocation}>
        <MapPin size={13} />
        {locStatus === "locating" ? "Finding your location…" : locationLabel}
        {locStatus !== "granted" && <span style={{ opacity: 0.75 }}>· tap to enable GPS</span>}
      </div>

      {showNotif && (
        <div
          style={{
            position: "absolute",
            top: 66,
            right: 12,
            width: 280,
            background: "var(--paper-flat)",
            color: "var(--ink)",
            borderRadius: 14,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            zIndex: 30,
            overflow: "hidden",
            border: "1px solid var(--line)",
          }}
        >
          <div style={{ padding: "12px 14px", fontWeight: 700, borderBottom: "1px solid var(--line-soft)", display: "flex", justifyContent: "space-between" }}>
            Notifications
            {notifications.length > 0 && (
              <span style={{ fontWeight: 600, fontSize: 12, color: "var(--ink-soft)", cursor: "pointer" }} onClick={onClearNotif}>
                Clear
              </span>
            )}
          </div>
          <div style={{ maxHeight: 260, overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <div style={{ padding: 16, fontSize: 13, color: "var(--ink-soft)" }}>You're all caught up.</div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} style={{ padding: "10px 14px", fontSize: 12.5, borderBottom: "1px solid var(--line-soft)" }}>
                  <div>{n.text}</div>
                  <div style={{ color: "var(--ink-faint)", fontSize: 11, marginTop: 2 }}>{n.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BottomNav({ view, setView, role }) {
  const items = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "buffalo", label: "Buffalo", icon: () => <span style={{ fontSize: 16 }}>🐃</span> },
    { id: "milk", label: "Milk", icon: Droplets },
    { id: "doctors", label: "Doctors", icon: Stethoscope },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <div className="nbd-bottom-nav">
      {items.map((it) => (
        <button key={it.id} className={`nbd-nav-btn ${view === it.id ? "active" : ""}`} onClick={() => setView(it.id)}>
          <it.icon size={19} />
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ============================== AUTH GATE ============================== */

function AuthGate({ onEnter }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");
  const roles = [
    { id: "buyer", label: "Buyer", emoji: "🧑‍🌾" },
    { id: "farmer", label: "Farmer / Seller", emoji: "🐃" },
    { id: "doctor", label: "Vet Doctor", emoji: "👨‍⚕️" },
    { id: "admin", label: "Admin", emoji: "🛡️" },
  ];
  return (
    <div className="nbd-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <style>{STYLES}</style>
      <div style={{ maxWidth: 400, width: "100%", background: "var(--paper-flat)", borderRadius: 22, padding: 26, border: "1px solid var(--line)" }}>
        <div style={{ fontSize: 30, marginBottom: 6 }}>🐄</div>
        <div className="nbd-h1">Near by Dairy</div>
        <div style={{ color: "var(--ink-soft)", fontSize: 13.5, marginBottom: 20, lineHeight: 1.5 }}>
          Find buffaloes, fresh milk, and veterinary doctors near your location.
        </div>

        <Field label="Your name">
          <input className="nbd-input" placeholder="e.g. Ramesh Naidu" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>

        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <span className="nbd-field-label">I am a</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
            {roles.map((r) => (
              <button key={r.id} className={`nbd-role-btn ${role === r.id ? "active" : ""}`} onClick={() => setRole(r.id)}>
                <span style={{ fontSize: 18 }}>{r.emoji}</span>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <button
          className="nbd-btn-primary"
          style={{ width: "100%" }}
          onClick={() => onEnter(name.trim() || "Guest User", role)}
        >
          <LogIn size={16} /> Continue
        </button>
        <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>
          Demo build — sign-in is simplified for preview. Switch roles anytime from Profile.
        </div>
      </div>
    </div>
  );
}

/* ============================== HOME SCREEN ============================== */

function HomeScreen({ counts, setView, role }) {
  return (
    <div>
      <div className="nbd-hero">
        <div className="nbd-hero-label">Near you right now</div>
        <div className="nbd-hero-grid">
          <div className="nbd-hero-stat">
            <div className="nbd-hero-num">{counts.buffalo}</div>
            <div className="nbd-hero-cap">🐃 Buffaloes</div>
          </div>
          <div className="nbd-hero-divider" />
          <div className="nbd-hero-stat">
            <div className="nbd-hero-num">{counts.milk}</div>
            <div className="nbd-hero-cap">🥛 Milk sellers</div>
          </div>
          <div className="nbd-hero-divider" />
          <div className="nbd-hero-stat">
            <div className="nbd-hero-num">{counts.doctors}</div>
            <div className="nbd-hero-cap">👨‍⚕️ Vets</div>
          </div>
        </div>
      </div>

      <div className="nbd-cta-row">
        <button className="nbd-btn-primary" onClick={() => setView("buffalo")}>
          <Navigation size={15} /> Find Nearby
        </button>
        <button className="nbd-btn-secondary" onClick={() => setView(role === "farmer" ? "buffalo" : "buffalo")}>
          <Plus size={15} /> Sell Now
        </button>
      </div>

      <div className="nbd-section">
        <div className="nbd-h2">Everything you need for your dairy, near you.</div>
        <p className="nbd-eyebrow" style={{ marginTop: 6 }}>
          Buy and sell buffaloes, find fresh milk, and connect with nearby veterinary doctors.
        </p>
      </div>

      <div className="nbd-cat-row">
        <div className="nbd-cat-card" onClick={() => setView("buffalo")}>
          <div className="nbd-cat-icon" style={{ background: "var(--field-pale)" }}>🐃</div>
          <div style={{ flex: 1 }}>
            <div className="nbd-cat-title">Buffalo Marketplace</div>
            <div className="nbd-cat-sub">Buy or sell buffaloes near your location</div>
          </div>
          <ChevronRight size={18} color="var(--ink-faint)" />
        </div>
        <div className="nbd-cat-card" onClick={() => setView("milk")}>
          <div className="nbd-cat-icon" style={{ background: "var(--marigold-pale)" }}>🥛</div>
          <div style={{ flex: 1 }}>
            <div className="nbd-cat-title">Milk Marketplace</div>
            <div className="nbd-cat-sub">Find nearby milk buyers and sellers</div>
          </div>
          <ChevronRight size={18} color="var(--ink-faint)" />
        </div>
        <div className="nbd-cat-card" onClick={() => setView("doctors")}>
          <div className="nbd-cat-icon" style={{ background: "var(--hide-pale)" }}>👨‍⚕️</div>
          <div style={{ flex: 1 }}>
            <div className="nbd-cat-title">Veterinary Doctors</div>
            <div className="nbd-cat-sub">Find vets nearby and consult by video call</div>
          </div>
          <ChevronRight size={18} color="var(--ink-faint)" />
        </div>
      </div>
    </div>
  );
}

/* ============================== BUFFALO SCREEN ============================== */

function BuffaloScreen({ listings, center, role, onOpen, onAdd }) {
  const [radius, setRadius] = useState(50);
  const [breed, setBreed] = useState("Any");
  const [sort, setSort] = useState("distance");
  const [showFilters, setShowFilters] = useState(false);
  const [minMilk, setMinMilk] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [showAdd, setShowAdd] = useState(false);

  const withDist = listings.map((l) => ({ ...l, distance: haversineKm(center.lat, center.lng, l.lat, l.lng) }));
  let filtered = withDist.filter(
    (l) => l.distance <= radius && (breed === "Any" || l.breed === breed) && l.milkPerDay >= minMilk && l.price <= maxPrice
  );
  filtered.sort((a, b) => {
    if (sort === "distance") return a.distance - b.distance;
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "milk") return b.milkPerDay - a.milkPerDay;
    return 0;
  });

  return (
    <div>
      <div className="nbd-section" style={{ paddingBottom: 0 }}>
        <div className="nbd-h1">Buffalo Marketplace</div>
        <div className="nbd-eyebrow">{filtered.length} buffaloes within {radius} km</div>
      </div>

      <div className="nbd-filterbar">
        <div className="nbd-filter-toggle" onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal size={13} /> Filters
        </div>
        {[5, 10, 25, 50].map((r) => (
          <div key={r} className={`nbd-chip ${radius === r ? "active" : ""}`} onClick={() => setRadius(r)}>
            Within {r} km
          </div>
        ))}
      </div>

      {showFilters && (
        <div className="nbd-filter-panel">
          <div className="nbd-field-grid">
            <Field label="Breed">
              <select className="nbd-select" value={breed} onChange={(e) => setBreed(e.target.value)}>
                {["Any", "Murrah", "Jaffarabadi", "Nili-Ravi", "Mehsana", "Surti"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label="Sort by">
              <select className="nbd-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="distance">Distance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="milk">Milk production</option>
              </select>
            </Field>
          </div>
          <div className="nbd-field-grid" style={{ marginBottom: 0 }}>
            <Field label={`Min milk: ${minMilk} L/day`}>
              <input type="range" min="0" max="16" value={minMilk} onChange={(e) => setMinMilk(+e.target.value)} style={{ width: "100%" }} />
            </Field>
            <Field label={`Max price: ${fmtINR(maxPrice)}`}>
              <input type="range" min="40000" max="300000" step="5000" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} style={{ width: "100%" }} />
            </Field>
          </div>
        </div>
      )}

      <div className="nbd-list">
        {filtered.length === 0 ? (
          <div className="nbd-empty">No buffaloes match these filters yet. Try widening your distance range.</div>
        ) : (
          filtered.map((l) => (
            <div className="nbd-row" key={l.id} onClick={() => onOpen(l)}>
              <div className="nbd-thumb" style={{ background: l.color }}>{l.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="nbd-row-title">{l.breed} Buffalo {l.isYours && "· Your listing"}</div>
                <div className="nbd-row-meta">
                  Age: {l.age} yrs · Milk: {l.milkPerDay} L/day
                  <br />
                  Health: {l.health} {l.vaccinated && "· Vaccinated"}
                </div>
                <div className="nbd-row-bottom">
                  <span className="nbd-price">{fmtINR(l.price)}</span>
                  <span className="nbd-dist"><MapPin size={11} /> {fmtKm(l.distance)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {role === "farmer" && (
        <button className="nbd-fab" onClick={() => setShowAdd(true)} aria-label="Add buffalo listing">
          <Plus size={22} />
        </button>
      )}
      {showAdd && <AddBuffaloModal onClose={() => setShowAdd(false)} onSubmit={(item) => { onAdd(item); setShowAdd(false); }} />}
    </div>
  );
}

function AddBuffaloModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    breed: "Murrah", age: "3", gender: "Female", milkPerDay: "10",
    health: "Good", vaccinated: true, price: "", description: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const canSubmit = form.price && Number(form.price) > 0;

  return (
    <div className="nbd-modal-backdrop" onClick={onClose}>
      <div className="nbd-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nbd-modal-header">
          <div className="nbd-h2">List a Buffalo</div>
          <button className="nbd-modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div style={{ padding: 16 }}>
          <div className="nbd-field-grid">
            <Field label="Breed">
              <select className="nbd-select" value={form.breed} onChange={set("breed")}>
                {["Murrah", "Jaffarabadi", "Nili-Ravi", "Mehsana", "Surti"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Gender">
              <select className="nbd-select" value={form.gender} onChange={set("gender")}>
                <option>Female</option><option>Male</option>
              </select>
            </Field>
          </div>
          <div className="nbd-field-grid">
            <Field label="Age (years)">
              <input className="nbd-input" type="number" min="0" value={form.age} onChange={set("age")} />
            </Field>
            <Field label="Milk (litres/day)">
              <input className="nbd-input" type="number" min="0" value={form.milkPerDay} onChange={set("milkPerDay")} />
            </Field>
          </div>
          <div className="nbd-field-grid">
            <Field label="Health condition">
              <select className="nbd-select" value={form.health} onChange={set("health")}>
                <option>Excellent</option><option>Good</option><option>Fair</option>
              </select>
            </Field>
            <Field label="Vaccinated">
              <select className="nbd-select" value={form.vaccinated ? "yes" : "no"} onChange={(e) => setForm((f) => ({ ...f, vaccinated: e.target.value === "yes" }))}>
                <option value="yes">Yes</option><option value="no">No</option>
              </select>
            </Field>
          </div>
          <Field label="Your price (₹) — you set this, it will not be changed">
            <input className="nbd-input" type="number" min="0" placeholder="e.g. 85000" value={form.price} onChange={set("price")} />
          </Field>
          <div style={{ height: 12 }} />
          <Field label="Description">
            <textarea className="nbd-input" rows={3} placeholder="Describe the buffalo, feeding routine, reason for sale…" value={form.description} onChange={set("description")} />
          </Field>
          <button
            className="nbd-btn-primary"
            style={{ width: "100%", marginTop: 16, opacity: canSubmit ? 1 : 0.5 }}
            onClick={() => {
              if (!canSubmit) return;
              onSubmit({
                breed: form.breed, age: Number(form.age), gender: form.gender,
                milkPerDay: Number(form.milkPerDay), health: form.health, vaccinated: form.vaccinated,
                price: Number(form.price), description: form.description || "No additional details provided.",
              });
            }}
          >
            <Check size={16} /> Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== MILK SCREEN ============================== */

function MilkScreen({ listings, center, role, onOpen, onAdd }) {
  const [radius, setRadius] = useState(50);
  const [milkType, setMilkType] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);
  const [showAdd, setShowAdd] = useState(false);

  const withDist = listings.map((l) => ({ ...l, distance: haversineKm(center.lat, center.lng, l.lat, l.lng) }));
  let filtered = withDist.filter((l) => l.distance <= radius && (milkType === "Any" || l.milkType === milkType) && l.price <= maxPrice);
  filtered.sort((a, b) => a.distance - b.distance);

  return (
    <div>
      <div className="nbd-section" style={{ paddingBottom: 0 }}>
        <div className="nbd-h1">Milk Marketplace</div>
        <div className="nbd-eyebrow">{filtered.length} sellers within {radius} km</div>
      </div>

      <div className="nbd-filterbar">
        <div className="nbd-filter-toggle" onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal size={13} /> Filters
        </div>
        {[5, 10, 25, 50].map((r) => (
          <div key={r} className={`nbd-chip ${radius === r ? "active" : ""}`} onClick={() => setRadius(r)}>
            Within {r} km
          </div>
        ))}
      </div>

      {showFilters && (
        <div className="nbd-filter-panel">
          <div className="nbd-field-grid" style={{ marginBottom: 0 }}>
            <Field label="Milk type">
              <select className="nbd-select" value={milkType} onChange={(e) => setMilkType(e.target.value)}>
                <option>Any</option><option>Cow</option><option>Buffalo</option>
              </select>
            </Field>
            <Field label={`Max price: ₹${maxPrice}/L`}>
              <input type="range" min="30" max="100" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} style={{ width: "100%" }} />
            </Field>
          </div>
        </div>
      )}

      <div className="nbd-list">
        {filtered.length === 0 ? (
          <div className="nbd-empty">No milk sellers match these filters yet. Try widening your distance range.</div>
        ) : (
          filtered.map((l) => (
            <div className="nbd-row" key={l.id} onClick={() => onOpen(l)}>
              <div className="nbd-thumb" style={{ background: "var(--marigold-pale)" }}>{l.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="nbd-row-title">{l.milkType} Milk {l.isYours && "· Your listing"}</div>
                <div className="nbd-row-meta">
                  Available: {l.quantity} L · {l.availableTime}
                  <br />
                  Seller: {l.sellerName} · {l.delivery}
                </div>
                <div className="nbd-row-bottom">
                  <span className="nbd-price">₹{l.price}/L</span>
                  <span className="nbd-dist"><MapPin size={11} /> {fmtKm(l.distance)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {role === "farmer" && (
        <button className="nbd-fab" onClick={() => setShowAdd(true)} aria-label="Add milk listing">
          <Plus size={22} />
        </button>
      )}
      {showAdd && <AddMilkModal onClose={() => setShowAdd(false)} onSubmit={(item) => { onAdd(item); setShowAdd(false); }} />}
    </div>
  );
}

function AddMilkModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    milkType: "Buffalo", quantity: "20", price: "", availableTime: "6:00 AM - 9:00 AM",
    delivery: "Pickup + Delivery", description: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const canSubmit = form.price && Number(form.price) > 0 && form.quantity;

  return (
    <div className="nbd-modal-backdrop" onClick={onClose}>
      <div className="nbd-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nbd-modal-header">
          <div className="nbd-h2">List Milk for Sale</div>
          <button className="nbd-modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div style={{ padding: 16 }}>
          <div className="nbd-field-grid">
            <Field label="Milk type">
              <select className="nbd-select" value={form.milkType} onChange={set("milkType")}>
                <option>Buffalo</option><option>Cow</option>
              </select>
            </Field>
            <Field label="Quantity (litres)">
              <input className="nbd-input" type="number" min="0" value={form.quantity} onChange={set("quantity")} />
            </Field>
          </div>
          <div className="nbd-field-grid">
            <Field label="Price per litre (₹) — you set this">
              <input className="nbd-input" type="number" min="0" placeholder="e.g. 70" value={form.price} onChange={set("price")} />
            </Field>
            <Field label="Delivery option">
              <select className="nbd-select" value={form.delivery} onChange={set("delivery")}>
                <option>Pickup only</option><option>Pickup + Delivery</option>
              </select>
            </Field>
          </div>
          <Field label="Available time window">
            <input className="nbd-input" value={form.availableTime} onChange={set("availableTime")} />
          </Field>
          <div style={{ height: 12 }} />
          <Field label="Description">
            <textarea className="nbd-input" rows={3} placeholder="Any details buyers should know…" value={form.description} onChange={set("description")} />
          </Field>
          <button
            className="nbd-btn-primary"
            style={{ width: "100%", marginTop: 16, opacity: canSubmit ? 1 : 0.5 }}
            onClick={() => {
              if (!canSubmit) return;
              onSubmit({
                milkType: form.milkType, quantity: Number(form.quantity), price: Number(form.price),
                availableTime: form.availableTime, delivery: form.delivery, availableDate: "Today",
                description: form.description || "No additional details provided.",
              });
            }}
          >
            <Check size={16} /> Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== LISTING DETAIL MODAL (buffalo + milk, offer + chat) ============================== */

function ListingDetailModal({ listing, distance, role, onClose, onOffer, onOfferAction, onSendMessage }) {
  const [tab, setTab] = useState("details");
  const [offerAmount, setOfferAmount] = useState("");
  const [chatText, setChatText] = useState("");
  const isBuffalo = listing.type === "buffalo";
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (tab === "chat" && chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [tab, listing.messages.length]);

  const pendingOffer = isBuffalo ? listing.offers.find((o) => o.status === "pending" || o.status === "countered") : null;

  return (
    <div className="nbd-modal-backdrop" onClick={onClose}>
      <div className="nbd-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nbd-modal-header">
          <div className="nbd-h2">{isBuffalo ? `${listing.breed} Buffalo` : `${listing.milkType} Milk`}</div>
          <button className="nbd-modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="nbd-detail-hero" style={{ background: isBuffalo ? listing.color : "var(--marigold-pale)" }}>
          {listing.emoji}
        </div>

        <div className="nbd-tabbar">
          <button className={`nbd-tab ${tab === "details" ? "active" : ""}`} onClick={() => setTab("details")}>Details</button>
          {isBuffalo && role !== "farmer" && (
            <button className={`nbd-tab ${tab === "offer" ? "active" : ""}`} onClick={() => setTab("offer")}>Make an Offer</button>
          )}
          {isBuffalo && role === "farmer" && listing.isYours && (
            <button className={`nbd-tab ${tab === "offer" ? "active" : ""}`} onClick={() => setTab("offer")}>
              Offers {listing.offers.length > 0 && `(${listing.offers.length})`}
            </button>
          )}
          <button className={`nbd-tab ${tab === "chat" ? "active" : ""}`} onClick={() => setTab("chat")}>Message seller</button>
        </div>

        {tab === "details" && (
          <div className="nbd-detail-body">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="nbd-price" style={{ fontSize: 22 }}>
                {isBuffalo ? fmtINR(listing.price) : `₹${listing.price}/L`}
              </span>
              <span className="nbd-dist"><MapPin size={12} /> {fmtKm(distance)}</span>
            </div>
            <div style={{ marginTop: 6 }}>
              {isBuffalo ? (
                <>
                  {listing.health === "Excellent" && <Badge tone="good">Excellent health</Badge>}
                  {listing.vaccinated && <Badge tone="marigold">Vaccinated</Badge>}
                </>
              ) : (
                <Badge tone="good">{listing.delivery}</Badge>
              )}
            </div>

            <div className="nbd-spec-grid">
              {isBuffalo ? (
                <>
                  <div className="nbd-spec"><div className="nbd-spec-k">Breed</div><div className="nbd-spec-v">{listing.breed}</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Age</div><div className="nbd-spec-v">{listing.age} years</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Gender</div><div className="nbd-spec-v">{listing.gender}</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Milk/day</div><div className="nbd-spec-v">{listing.milkPerDay} L</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Health</div><div className="nbd-spec-v">{listing.health}</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Vaccinated</div><div className="nbd-spec-v">{listing.vaccinated ? "Yes" : "No"}</div></div>
                </>
              ) : (
                <>
                  <div className="nbd-spec"><div className="nbd-spec-k">Type</div><div className="nbd-spec-v">{listing.milkType}</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Quantity</div><div className="nbd-spec-v">{listing.quantity} L</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Available</div><div className="nbd-spec-v">{listing.availableDate}</div></div>
                  <div className="nbd-spec"><div className="nbd-spec-k">Time</div><div className="nbd-spec-v">{listing.availableTime}</div></div>
                </>
              )}
            </div>

            <div className="nbd-field-label">Description</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)", marginTop: 4 }}>{listing.description}</p>

            <div className="nbd-field-label" style={{ marginTop: 12 }}>Seller</div>
            <p style={{ fontSize: 13.5, marginTop: 4 }}>{listing.sellerName}</p>

            {!listing.isYours && (
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button className="nbd-btn-secondary" onClick={() => setTab("chat")}><MessageCircle size={15} /> Chat</button>
                <button className="nbd-btn-primary" onClick={() => setTab(isBuffalo ? "offer" : "chat")}>
                  {isBuffalo ? "Make an Offer" : "Request to Buy"}
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "offer" && isBuffalo && (
          <div className="nbd-detail-body">
            <div className="nbd-offer-box">
              <div className="nbd-offer-row"><span>Seller price</span><strong>{fmtINR(listing.price)}</strong></div>
            </div>

            {role !== "farmer" && !pendingOffer && (
              <>
                <Field label="Your offer (₹)">
                  <input className="nbd-input" type="number" placeholder={`e.g. ${Math.round(listing.price * 0.92)}`} value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} />
                </Field>
                <button
                  className="nbd-btn-primary"
                  style={{ width: "100%", marginTop: 12 }}
                  onClick={() => { if (offerAmount) { onOffer(listing.id, Number(offerAmount)); setOfferAmount(""); } }}
                >
                  Send Offer
                </button>
              </>
            )}

            {listing.offers.length === 0 && <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 8 }}>No offers yet.</div>}

            {listing.offers.slice().reverse().map((o) => (
              <div className="nbd-offer-box" key={o.id}>
                <div className="nbd-offer-row"><span>Buyer offer</span><strong>{fmtINR(o.amount)}</strong></div>
                {o.counter && <div className="nbd-offer-row"><span>Counter offer</span><strong>{fmtINR(o.counter)}</strong></div>}
                <div className="nbd-offer-row" style={{ marginBottom: 0 }}>
                  <span>Status</span>
                  <Badge tone={o.status === "accepted" ? "good" : o.status === "rejected" ? "good" : "marigold"}>{o.status}</Badge>
                </div>
                {role === "farmer" && listing.isYours && (o.status === "pending") && (
                  <div className="nbd-offer-actions">
                    <button className="nbd-mini-btn" style={{ background: "var(--field-pale)", color: "var(--field)" }} onClick={() => onOfferAction(listing.id, o.id, "accepted")}>
                      <ThumbsUp size={13} /> Accept
                    </button>
                    <button className="nbd-mini-btn" style={{ background: "var(--danger-pale)", color: "var(--danger)" }} onClick={() => onOfferAction(listing.id, o.id, "rejected")}>
                      <ThumbsDown size={13} /> Reject
                    </button>
                    <button
                      className="nbd-mini-btn"
                      style={{ background: "var(--marigold-pale)", color: "var(--marigold-dark)" }}
                      onClick={() => {
                        const counter = Math.round((o.amount + listing.price) / 2);
                        onOfferAction(listing.id, o.id, "countered", counter);
                      }}
                    >
                      <Repeat size={13} /> Counter
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "chat" && (
          <div>
            <div className="nbd-chat-scroll">
              {listing.messages.length === 0 && <div style={{ fontSize: 13, color: "var(--ink-soft)", textAlign: "center", marginTop: 20 }}>Say hello to {listing.sellerName.replace(" (You)", "")}.</div>}
              {listing.messages.map((m, i) => (
                <div key={i} className={`nbd-msg ${m.from === "you" ? "me" : "them"}`}>{m.text}</div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="nbd-chat-input-row">
              <input placeholder="Type a message…" value={chatText} onChange={(e) => setChatText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && chatText.trim()) { onSendMessage(listing.id, listing.type, chatText.trim()); setChatText(""); } }} />
              <button className="nbd-send-btn" onClick={() => { if (chatText.trim()) { onSendMessage(listing.id, listing.type, chatText.trim()); setChatText(""); } }}>
                <Send size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================== DOCTORS SCREEN ============================== */

function DoctorsScreen({ doctors, center, onOpen, role }) {
  const [radius, setRadius] = useState(50);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const withDist = doctors.map((d) => ({ ...d, distance: haversineKm(center.lat, center.lng, d.lat, d.lng) }));
  let filtered = withDist.filter((d) => d.distance <= radius && d.rating >= minRating && (!onlyAvailable || d.available) && d.verified);
  filtered.sort((a, b) => a.distance - b.distance);

  return (
    <div>
      <div className="nbd-section" style={{ paddingBottom: 0 }}>
        <div className="nbd-h1">Nearby Veterinary Doctors</div>
        <div className="nbd-eyebrow">{filtered.length} verified vets within {radius} km</div>
      </div>

      <div className="nbd-filterbar">
        <div className="nbd-filter-toggle" onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal size={13} /> Filters
        </div>
        {[5, 10, 25, 50].map((r) => (
          <div key={r} className={`nbd-chip ${radius === r ? "active" : ""}`} onClick={() => setRadius(r)}>
            Within {r} km
          </div>
        ))}
        <div className={`nbd-chip ${onlyAvailable ? "active" : ""}`} onClick={() => setOnlyAvailable((s) => !s)}>Available now</div>
      </div>

      {showFilters && (
        <div className="nbd-filter-panel">
          <Field label={`Minimum rating: ${minRating.toFixed(1)}+`}>
            <input type="range" min="0" max="4.5" step="0.5" value={minRating} onChange={(e) => setMinRating(+e.target.value)} style={{ width: "100%" }} />
          </Field>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="nbd-empty">No vets match these filters yet. Try widening your distance range.</div>
      ) : (
        filtered.map((d) => (
          <div className="nbd-doctor-card" key={d.id} onClick={() => onOpen(d)}>
            <div className="nbd-avatar">👨‍⚕️</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="nbd-row-title">{d.name}</div>
              <div className="nbd-row-meta">{d.specialization}<br />Experience: {d.experience} years</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "4px 0" }}>
                <Star size={12} fill="var(--marigold)" color="var(--marigold)" />
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{d.rating}</span>
                <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>({d.reviews})</span>
              </div>
              <div className="nbd-row-bottom">
                <span style={{ fontSize: 12.5 }}>
                  <span className="nbd-avail-dot" style={{ background: d.available ? "var(--field)" : "var(--ink-faint)" }} />
                  {d.available ? "Available" : "Offline"} · ₹{d.fee}
                </span>
                <span className="nbd-dist"><MapPin size={11} /> {fmtKm(d.distance)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function DoctorProfileModal({ doctor, distance, onClose, onBook, onVideoCall }) {
  const [booking, setBooking] = useState(false);
  const [slot, setSlot] = useState("Today, 5:00 PM");
  const [booked, setBooked] = useState(false);
  const slots = ["Today, 5:00 PM", "Today, 6:30 PM", "Tomorrow, 9:00 AM", "Tomorrow, 11:30 AM"];

  return (
    <div className="nbd-modal-backdrop" onClick={onClose}>
      <div className="nbd-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nbd-modal-header">
          <div className="nbd-h2">{doctor.name}</div>
          <button className="nbd-modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="nbd-detail-body">
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div className="nbd-avatar" style={{ width: 68, height: 68, fontSize: 30 }}>👨‍⚕️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{doctor.name} {doctor.verified && <BadgeCheck size={14} color="var(--field)" style={{ display: "inline", verticalAlign: "-2px" }} />}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{doctor.qualification} · {doctor.experience} yrs experience</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                <Star size={12} fill="var(--marigold)" color="var(--marigold)" />
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{doctor.rating}</span>
                <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>({doctor.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="nbd-spec-grid">
            <div className="nbd-spec"><div className="nbd-spec-k">Specialization</div><div className="nbd-spec-v">{doctor.specialization}</div></div>
            <div className="nbd-spec"><div className="nbd-spec-k">Clinic</div><div className="nbd-spec-v">{doctor.clinicName}</div></div>
            <div className="nbd-spec"><div className="nbd-spec-k">Fee</div><div className="nbd-spec-v">₹{doctor.fee}</div></div>
            <div className="nbd-spec"><div className="nbd-spec-k">Distance</div><div className="nbd-spec-v">{fmtKm(distance)}</div></div>
          </div>

          {!booking && !booked && (
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button className="nbd-btn-secondary" onClick={() => setBooking(true)}><Clock size={15} /> Book Consultation</button>
              <button className="nbd-btn-primary" onClick={() => onVideoCall(doctor)}><Video size={15} /> Video Call</button>
            </div>
          )}

          {booking && !booked && (
            <div style={{ marginTop: 10 }}>
              <Field label="Choose a slot">
                <select className="nbd-select" value={slot} onChange={(e) => setSlot(e.target.value)}>
                  {slots.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <button className="nbd-btn-primary" style={{ width: "100%", marginTop: 12 }} onClick={() => { onBook(doctor, slot); setBooked(true); }}>
                Confirm Booking — ₹{doctor.fee}
              </button>
            </div>
          )}

          {booked && (
            <div style={{ marginTop: 14, background: "var(--field-pale)", borderRadius: 12, padding: 14, textAlign: "center" }}>
              <Check size={20} color="var(--field)" />
              <div style={{ fontWeight: 700, marginTop: 6 }}>Appointment confirmed</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>{slot} with {doctor.name}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== VIDEO CALL SCREEN ============================== */

function VideoCallScreen({ doctor, onEnd }) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setConnecting(false), 1400);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (connecting) return;
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [connecting]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="nbd-call-screen">
      <style>{STYLES}</style>
      <div className="nbd-call-top">
        <div style={{ fontWeight: 700, fontSize: 15 }}>{doctor.name}</div>
        <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 2 }}>{connecting ? "Connecting…" : `${mm}:${ss}`}</div>
      </div>
      <div className="nbd-call-doc" style={{ position: "relative" }}>
        <div className="nbd-call-avatar">👨‍⚕️</div>
        {!connecting && <div style={{ fontSize: 12.5, opacity: 0.75 }}>Video consultation in progress</div>}
        <div className="nbd-call-pip">{camOn ? "🧑" : <CameraOff size={20} />}</div>
      </div>
      <div className="nbd-call-controls">
        <button className={`nbd-call-btn ${!micOn ? "off" : ""}`} onClick={() => setMicOn((m) => !m)}>
          {micOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
        <button className="nbd-call-btn end" onClick={onEnd}><PhoneOff size={22} /></button>
        <button className={`nbd-call-btn ${!camOn ? "off" : ""}`} onClick={() => setCamOn((c) => !c)}>
          {camOn ? <Camera size={20} /> : <CameraOff size={20} />}
        </button>
      </div>
    </div>
  );
}

/* ============================== PROFILE SCREEN ============================== */

function ProfileScreen({ userName, role, setRole, locationLabel }) {
  const roles = [
    { id: "buyer", label: "Buyer", emoji: "🧑‍🌾" },
    { id: "farmer", label: "Farmer / Seller", emoji: "🐃" },
    { id: "doctor", label: "Vet Doctor", emoji: "👨‍⚕️" },
    { id: "admin", label: "Admin", emoji: "🛡️" },
  ];
  return (
    <div className="nbd-section">
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div className="nbd-avatar" style={{ width: 60, height: 60, fontSize: 26 }}>🧑</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{userName}</div>
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}><MapPin size={11} style={{ display: "inline", verticalAlign: "-1px" }} /> {locationLabel}</div>
        </div>
      </div>

      <span className="nbd-field-label">Switch role (demo mode)</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "8px 0 22px" }}>
        {roles.map((r) => (
          <button key={r.id} className={`nbd-role-btn ${role === r.id ? "active" : ""}`} onClick={() => setRole(r.id)}>
            <span style={{ fontSize: 18 }}>{r.emoji}</span>
            {r.label}
          </button>
        ))}
      </div>

      <div className="nbd-h2" style={{ marginBottom: 8 }}>About this build</div>
      <div style={{ background: "var(--paper-flat)", border: "1px solid var(--line)", borderRadius: 14, padding: 14, fontSize: 13, lineHeight: 1.6, color: "var(--ink-soft)" }}>
        This is a working MVP with realistic sample data, running entirely in this session.
        <br /><br />
        <strong style={{ color: "var(--ink)" }}>Fully functional:</strong> GPS-based distance sorting, marketplace filters, buffalo &amp; milk listings, offer negotiation, chat, doctor booking, and the admin dashboard.
        <br /><br />
        <strong style={{ color: "var(--ink)" }}>Simulated for this preview:</strong> the video call (UI only, no live stream), payments, and persistent accounts/database — these are built to be swapped for real GPS is already live, Maps, WebRTC, and payment APIs via environment variables without changing the rest of the app.
      </div>
    </div>
  );
}

/* ============================== ADMIN SCREEN ============================== */

function AdminScreen({ buffaloes, milk, doctors, setBuffaloes, setMilk, setDoctors }) {
  const pendingDoctors = doctors.filter((d) => !d.verified);
  const stats = [
    { label: "Total Users", value: 214 },
    { label: "Active Sellers", value: buffaloes.length + milk.length },
    { label: "Buffalo Listings", value: buffaloes.length },
    { label: "Milk Listings", value: milk.length },
    { label: "Veterinary Doctors", value: doctors.filter((d) => d.verified).length },
    { label: "Orders", value: 47 },
  ];

  return (
    <div>
      <div className="nbd-section" style={{ paddingBottom: 0 }}>
        <div className="nbd-h1">Admin Dashboard</div>
        <div className="nbd-eyebrow">Platform overview and moderation</div>
      </div>

      <div className="nbd-admin-grid">
        {stats.map((s) => (
          <div className="nbd-stat-card" key={s.label}>
            <div className="nbd-stat-num">{s.value}</div>
            <div className="nbd-stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {pendingDoctors.length > 0 && (
        <div className="nbd-section">
          <div className="nbd-h2">Pending doctor verification</div>
          {pendingDoctors.map((d) => (
            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--line-soft)" }}>
              <div className="nbd-avatar" style={{ width: 40, height: 40, fontSize: 18 }}>👨‍⚕️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{d.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{d.clinicName}</div>
              </div>
              <button className="nbd-mini-btn" style={{ background: "var(--field-pale)", color: "var(--field)", flex: "none", padding: "7px 10px" }}
                onClick={() => setDoctors((ds) => ds.map((x) => (x.id === d.id ? { ...x, verified: true } : x)))}>
                <ShieldCheck size={13} /> Approve
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="nbd-section">
        <div className="nbd-h2">Manage buffalo listings</div>
      </div>
      <div className="nbd-list" style={{ paddingTop: 0 }}>
        {buffaloes.map((l) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div style={{ flex: 1, fontSize: 13 }}>{l.breed} · {l.sellerName} · {fmtINR(l.price)}</div>
            <button className="nbd-icon-btn" style={{ background: "var(--danger-pale)", color: "var(--danger)", width: 30, height: 30 }}
              onClick={() => setBuffaloes((bs) => bs.filter((x) => x.id !== l.id))}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="nbd-section">
        <div className="nbd-h2">Manage milk listings</div>
      </div>
      <div className="nbd-list" style={{ paddingTop: 0 }}>
        {milk.map((l) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div style={{ flex: 1, fontSize: 13 }}>{l.milkType} milk · {l.sellerName} · ₹{l.price}/L</div>
            <button className="nbd-icon-btn" style={{ background: "var(--danger-pale)", color: "var(--danger)", width: 30, height: 30 }}
              onClick={() => setMilk((ms) => ms.filter((x) => x.id !== l.id))}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== ROOT APP ============================== */

export default function NearByDairyApp() {
  const [entered, setEntered] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("buyer");

  const FALLBACK_CENTER = { lat: 16.3067, lng: 80.4365 }; // Guntur, Andhra Pradesh
  const [center, setCenter] = useState(FALLBACK_CENTER);
  const [locationLabel, setLocationLabel] = useState("Guntur, Andhra Pradesh");
  const [locStatus, setLocStatus] = useState("default");

  const [view, setView] = useState("home");
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to Near by Dairy! Enable GPS to see what's truly near you.", time: "Just now" },
  ]);

  const initial = useMemo(() => buildMockData(FALLBACK_CENTER), []);
  const [buffaloes, setBuffaloes] = useState(initial.buffaloes);
  const [milk, setMilk] = useState(initial.milk);
  const [doctors, setDoctors] = useState(initial.doctors);

  const [activeListing, setActiveListing] = useState(null);
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [callDoctor, setCallDoctor] = useState(null);
  const [toast, setToast] = useState(null);

  function pushNotification(text) {
    setNotifications((n) => [{ id: Date.now(), text, time: "Just now" }, ...n]);
  }
  function showToast(text) {
    setToast({ id: Date.now(), text });
    setTimeout(() => setToast(null), 2600);
  }

  function requestLocation() {
    setLocStatus("locating");
    if (!navigator.geolocation) { setLocStatus("unsupported"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCenter(c);
        setLocationLabel("Your current location");
        setLocStatus("granted");
        const fresh = buildMockData(c);
        setBuffaloes(fresh.buffaloes);
        setMilk(fresh.milk);
        setDoctors(fresh.doctors);
        pushNotification("Location updated — showing listings near you.");
      },
      () => setLocStatus("denied"),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }

  // regenerate re-linked object references when listings arrays change (keep offers/messages)
  function updateBuffalo(id, updater) {
    setBuffaloes((bs) => bs.map((b) => (b.id === id ? updater(b) : b)));
  }
  function updateMilkListing(id, updater) {
    setMilk((ms) => ms.map((m) => (m.id === id ? updater(m) : m)));
  }

  function handleOffer(listingId, amount) {
    updateBuffalo(listingId, (b) => ({ ...b, offers: [...b.offers, { id: uid(), amount, status: "pending" }] }));
    showToast("Offer sent to seller.");
    pushNotification(`You made an offer of ${fmtINR(amount)}.`);
  }
  function handleOfferAction(listingId, offerId, status, counter) {
    updateBuffalo(listingId, (b) => ({
      ...b,
      offers: b.offers.map((o) => (o.id === offerId ? { ...o, status, counter: counter ?? o.counter } : o)),
    }));
    if (status === "accepted") pushNotification("Offer accepted — coordinate pickup with the buyer.");
    if (status === "countered") pushNotification(`Counter offer of ${fmtINR(counter)} sent.`);
  }
  function handleSendMessage(listingId, type, text) {
    const push = (item) => ({ ...item, messages: [...item.messages, { from: "you", text }] });
    if (type === "buffalo") updateBuffalo(listingId, push);
    else updateMilkListing(listingId, push);

    setTimeout(() => {
      const reply = { from: "them", text: "Thanks for reaching out — I'm available today, call anytime after 4 PM." };
      const pushReply = (item) => ({ ...item, messages: [...item.messages, reply] });
      if (type === "buffalo") updateBuffalo(listingId, pushReply);
      else updateMilkListing(listingId, pushReply);
    }, 1100);
  }
  function handleAddBuffalo(item) {
    const p = jitterPoint(center.lat, center.lng, 3, Math.random() * 100);
    setBuffaloes((bs) => [
      { id: uid(), type: "buffalo", sellerName: userName + " (You)", isYours: true, lat: p.lat, lng: p.lng, offers: [], messages: [], emoji: "🐃", color: "var(--field-pale)", ...item },
      ...bs,
    ]);
    showToast("Listing published.");
    pushNotification("Your buffalo listing is now live.");
  }
  function handleAddMilk(item) {
    const p = jitterPoint(center.lat, center.lng, 3, Math.random() * 100);
    setMilk((ms) => [
      { id: uid(), type: "milk", sellerName: userName + " (You)", isYours: true, lat: p.lat, lng: p.lng, messages: [], emoji: "🥛", ...item },
      ...ms,
    ]);
    showToast("Listing published.");
    pushNotification("Your milk listing is now live.");
  }
  function handleBookAppointment(doctor, slot) {
    pushNotification(`Appointment confirmed with ${doctor.name} — ${slot}.`);
    showToast("Appointment confirmed.");
  }

  useEffect(() => { if (entered) requestLocation(); /* eslint-disable-next-line */ }, [entered]);

  const counts = useMemo(() => {
    const bWithDist = buffaloes.map((b) => haversineKm(center.lat, center.lng, b.lat, b.lng));
    const mWithDist = milk.map((m) => haversineKm(center.lat, center.lng, m.lat, m.lng));
    const dWithDist = doctors.filter((d) => d.verified).map((d) => haversineKm(center.lat, center.lng, d.lat, d.lng));
    return {
      buffalo: bWithDist.filter((d) => d <= 25).length,
      milk: mWithDist.filter((d) => d <= 25).length,
      doctors: dWithDist.filter((d) => d <= 25).length,
    };
  }, [buffaloes, milk, doctors, center]);

  if (!entered) {
    return <AuthGate onEnter={(name, r) => { setUserName(name); setRole(r); setEntered(true); }} />;
  }

  const activeListingDistance = activeListing ? haversineKm(center.lat, center.lng, activeListing.lat, activeListing.lng) : 0;
  const activeDoctorDistance = activeDoctor ? haversineKm(center.lat, center.lng, activeDoctor.lat, activeDoctor.lng) : 0;

  // keep activeListing in sync with underlying state (so offers/messages update live)
  const liveActiveListing = activeListing
    ? activeListing.type === "buffalo"
      ? buffaloes.find((b) => b.id === activeListing.id)
      : milk.find((m) => m.id === activeListing.id)
    : null;

  return (
    <div className="nbd-root">
      <style>{STYLES}</style>
      <div className="nbd-shell">
        <TopBar
          locationLabel={locationLabel}
          locStatus={locStatus}
          onChangeLocation={requestLocation}
          notifications={notifications}
          showNotif={showNotif}
          setShowNotif={setShowNotif}
          onClearNotif={() => setNotifications([])}
        />

        <div className="nbd-main">
          {view === "home" && <HomeScreen counts={counts} setView={setView} role={role} />}
          {view === "buffalo" && (
            <BuffaloScreen listings={buffaloes} center={center} role={role} onOpen={(l) => setActiveListing(l)} onAdd={handleAddBuffalo} />
          )}
          {view === "milk" && (
            <MilkScreen listings={milk} center={center} role={role} onOpen={(l) => setActiveListing(l)} onAdd={handleAddMilk} />
          )}
          {view === "doctors" && (
            <DoctorsScreen doctors={doctors} center={center} role={role} onOpen={(d) => setActiveDoctor(d)} />
          )}
          {view === "profile" && (
            <ProfileScreen userName={userName} role={role} setRole={setRole} locationLabel={locationLabel} />
          )}
          {view === "admin" && (
            <AdminScreen buffaloes={buffaloes} milk={milk} doctors={doctors} setBuffaloes={setBuffaloes} setMilk={setMilk} setDoctors={setDoctors} />
          )}
        </div>

        <BottomNav view={role === "admin" ? (view === "admin" ? "admin" : view) : view} setView={setView} role={role} />
        {role === "admin" && (
          <button
            className="nbd-fab"
            style={{ bottom: 96, background: view === "admin" ? "var(--field)" : "var(--marigold)", color: view === "admin" ? "var(--paper)" : "var(--ink)" }}
            onClick={() => setView(view === "admin" ? "home" : "admin")}
          >
            <ShieldCheck size={20} />
          </button>
        )}

        {liveActiveListing && (
          <ListingDetailModal
            listing={liveActiveListing}
            distance={activeListingDistance}
            role={role}
            onClose={() => setActiveListing(null)}
            onOffer={handleOffer}
            onOfferAction={handleOfferAction}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeDoctor && !callDoctor && (
          <DoctorProfileModal
            doctor={activeDoctor}
            distance={activeDoctorDistance}
            onClose={() => setActiveDoctor(null)}
            onBook={handleBookAppointment}
            onVideoCall={(d) => setCallDoctor(d)}
          />
        )}

        {callDoctor && <VideoCallScreen doctor={callDoctor} onEnd={() => { setCallDoctor(null); setActiveDoctor(null); }} />}

        {toast && <div className="nbd-toast">{toast.text}</div>}
      </div>
    </div>
  );
}
