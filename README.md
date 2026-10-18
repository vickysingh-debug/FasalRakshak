# FasalRakshak (फसल रक्षक)
### Smart Crop Protection, Real Weather Forecast, Multilingual Support & PMFBY Claim Tracking Portal for Indian Farmers
> **"सुरक्षित फसल, सशक्त किसान" — Protecting Crops, Empowering Farmers**

---

## 🌾 Project Overview

**FasalRakshak (फसल रक्षक)** is an upgraded, comprehensive agricultural web platform designed for Indian farmers. It combines real-time satellite weather forecasting, 14-language multilingual support (including Urdu RTL), secure farmer authentication with DPDP consent, transparent crop damage claim progression with PII privacy masking, live APMC Mandi rates, and an official WhatsApp farmer assistance desk.

---

## 🚀 Newly Upgraded & Core Features

### 1. 🌦️ Real Satellite Weather Forecast & Agro Alerts
- **Real Meteorological Data**: Integrated with the **Open-Meteo Forecast API** (`https://api.open-meteo.com/v1/forecast`), an open-access meteorological satellite feed.
- **Location Flexibility**:
  - District & State Selector covering major agricultural states across India (Madhya Pradesh, Punjab, Haryana, Uttar Pradesh, Rajasthan, Maharashtra, Gujarat, Bihar, West Bengal, Tamil Nadu, etc.).
  - **GPS Device Location Access**: Farmers can click "Use Device GPS Location" with an explicit permission consent modal.
- **Forecast Metrics**:
  - Current Temperature (°C), "Feels Like" temperature, Humidity (%), Wind Speed (km/h) & Direction, Rainfall Probability (%), and Surface Precipitation.
  - **7-Day Agriculture Outlook**: Daily high/low temperatures, precipitation amounts (mm), and localized intercultural farming recommendations.
- **Agricultural Early Warning System**:
  - ⛈️ **Heavy Rainfall & Waterlogging Alert**: Automatically triggered when rainfall probability > 60% or precipitation > 15mm.
  - 🔥 **Heatwave & Evaporation Advisory**: Triggered when temperature exceeds 39°C.
  - 🌪️ **High Wind / Storm Warning**: Triggered when wind gusts exceed 28 km/h.
  - ❄️ **Frost & Cold Wave Alert**: Triggered when minimum night temperature drops below 7°C.
  - 🌿 **Optimal Spray Window Indicator**: Detects calm, dry periods favorable for foliar sprays.
- **Transparency**: Clear labeling showing `Open-Meteo Satellite Model (Real-Time API)` or `Offline Fallback`. Never displays fake weather as real.

---

### 2. 🇮🇳 Multilingual Scalable Interface (14 Indian Languages + RTL)
- **14 Supported Indian Languages with Native Scripts**:
  1. **हिन्दी (Hindi)** — `hi`
  2. **English** — `en`
  3. **ਪੰਜਾਬੀ (Punjabi)** — `pa`
  4. **ગુજરાતી (Gujarati)** — `gu`
  5. **मराठी (Marathi)** — `mr`
  6. **বাংলা (Bengali)** — `bn`
  7. **తెలుగు (Telugu)** — `te`
  8. **தமிழ் (Tamil)** — `ta`
  9. **ಕನ್ನಡ (Kannada)** — `kn`
  10. **മലയാളം (Malayalam)** — `ml`
  11. **ଓଡ଼ିଆ (Odia)** — `or`
  12. **অসমীয়া (Assamese)** — `as`
  13. **اردو (Urdu)** — `ur` (**Right-to-Left RTL layout**)
  14. **नेपाली (Nepali)** — `ne`
- **Native Language Selector Modal**: Accessible via the globe button in the top navigation, featuring live search and native script labels.
- **Safe Fallback System**: If any specific key is missing in a regional language, the dictionary safely falls back to Hindi/English without showing raw broken variable keys.
- **Persistence**: Remembers chosen language across sessions using browser `localStorage`.
- **Urdu Right-to-Left (RTL)**: Dynamically sets `dir="rtl"` on the document root when Urdu is active.

---

### 3. 💬 WhatsApp Farmer Chatbot & Assistance Desk
- **Configurable Business Helpline**: Uses official WhatsApp number from `VITE_WHATSAPP_NUMBER` (defaults to `919876543210`).
- **One-Click Pre-composed Prompts**:
  - 🌾 *Report Crop Damage (फसल नुकसान सूचना)*
  - 📋 *Track Insurance Claim (दावा स्थिति जांचें)*
  - 🌦️ *Weather & Spray Advisory (मौसम व छिड़काव सलाह)*
  - 💰 *APMC Mandi Bhav (ताजा मंडी भाव)*
  - 🐛 *Crop Pests & Diseases (कीट व रोग रोकथाम)*
  - 🏛️ *Government Schemes (पीएम किसान व केसीसी)*
- **Architecture Transparency**:
  - The interface clearly notes: *"Click-to-chat connects directly to our verified manual Kisan Sahayata WhatsApp helpline. Fully automated chatbot responses require an official WhatsApp Business Cloud API access token and webhook configured on your backend server."*
  - Zero private access tokens or webhook secrets are exposed in client code.

---

### 4. 🔒 Secure Farmer Authentication & Privacy Access Control
- **Backend Authentication Server** (`server/index.js`):
  - **Bcrypt Password Hashing**: Passwords are encrypted with 10 salt rounds before storage; never stored or logged in plain text.
  - **JWT Session Tokens**: Issued on login/registration with 7-day expiration.
  - **Rate Limiting & Input Validation**: Protects against brute-force attacks on mobile numbers and passwords.
  - **DPDP Privacy Consent Checkbox**: Explicit consent required under the Digital Personal Data Protection Act to store farm land records and contact details.
- **Privacy Access Control (PII Masking)**:
  - **Public Claim Tracking**: If a public visitor or unregistered user searches for a Claim ID, sensitive personal information is masked (e.g. Phone: `98260XXXXX`, Name: `Rameshwar (Verified Farmer)`, Bank UTR: `SBI9824XXXXX`).
  - **Owner View**: If the authenticated farmer logs in, their full unmasked land and bank records are revealed with a green `Owner Access` badge.
  - **My Claims Portal (`navMyClaims`)**: Private section visible only after authentication displaying all claims filed by that specific farmer.
  - **Zero Password / Secret Exposure**: `.env.example` provides safe placeholders only. Real secrets remain strictly in local environment variables.

---

### 5. 🚜 Core Agriculture Features Preserved
- **Crop Damage Reporting**: Geo-tagged photo upload simulation, interactive damage severity slider (0–100%), live compensation calculator, voice note description simulation.
- **Digital Kisan Card**: Printable official farmer identity card with QR code simulation.
- **Claim Tracking**: 5-stage visual progress timeline from intimation to Direct Benefit Transfer (DBT).
- **APMC Mandi Bhav**: Daily prices, trends (+/- ₹), and arrival quantities for major commodities.
- **24x7 Helplines & AI Kisan Mitra**: Direct dialers for Kisan Call Centre (`1800-180-1551`) and PMFBY hotline (`14447`), interactive AI Q&A assistant, and grievance redressal form.

---

## 💻 Exact Windows Setup & Run Instructions

### Prerequisites
Make sure you have **Node.js** (v18+) and **npm** installed.
Verify in terminal:
```powershell
node -v
npm -v
```

### Step 1: Open Terminal in Project Directory
```powershell
cd c:\Users\DELL\Downloads\fasalrasak
```

### Step 2: Install Dependencies (Already installed)
```powershell
npm install
```

### Step 3: Run the Backend Authentication Server
Open a terminal window and run:
```powershell
npm run server
```
*Output:*
```
🌾 FasalRakshak Secure Backend running on port 5000
🔒 Authentication & Privacy Masking Active
```

### Step 4: Run the Frontend Development Server
Open a second terminal window (or run in background) and run:
```powershell
npm run dev
```
*Output:*
```
  VITE v5.4.21  ready in 610 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Open in Your Browser
Open your web browser and go to:
👉 **`http://localhost:3000`**

---

## ⚙️ Environment Configuration (`.env`)

| Variable | Default Value | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000` | Backend API endpoint for authentication and claims |
| `VITE_WEATHER_API_URL` | `https://api.open-meteo.com/v1/forecast` | Open-Meteo satellite weather API endpoint |
| `VITE_WHATSAPP_NUMBER` | `919876543210` | Official WhatsApp Business Helpline (E.164 without `+`) |
| `PORT` | `5000` | Port for the Express backend server |
| `JWT_SECRET` | *(Random secret)* | Secret key for signing authentication tokens |

---

## 🔍 Feature Status Breakdown

| Feature | Status | Requirement |
|---|---|---|
| **Satellite Weather Forecast** | ✅ **Live & Operational** | Uses free, real-time Open-Meteo API. No API key needed. |
| **Multilingual UI (14 Languages)** | ✅ **Live & Operational** | Built-in dictionary with native scripts and Urdu RTL. |
| **WhatsApp Assistance** | ✅ **Live & Operational** | Manual click-to-chat active. Automated bot requires WhatsApp Business Cloud API webhook. |
| **Secure Authentication** | ✅ **Live & Operational** | Bcrypt hashing & JWT sessions active on backend (port 5000). Graceful local fallback if offline. |
| **PII Privacy & Access Control** | ✅ **Live & Operational** | Masked public claims, private authenticated owner view. |
| **Digital Kisan Card & Claims** | ✅ **Live & Operational** | Persistent in `localStorage` and backend. |

---

## 🔒 Security & Privacy Notice
- **Zero API Keys Exposed**: The frontend contains zero private tokens or credentials.
- **Passwords Protected**: Salted with Bcrypt before persistence; never returned in API responses.
- **DPDP Act Aligned**: Explicit consent collected before personal data processing.
