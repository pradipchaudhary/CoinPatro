# 🚀 NepCoin
*Your Nepali Crypto Price Tracker – क्रिप्टो मूल्य नेपालीमा!*

![NepCoin Banner](./public/banner.jpg)

---

## 📖 About  
**NepCoin (नेपकोइन)** is a simple, powerful, and localized **Chrome Extension** that displays **live cryptocurrency prices in Nepali language (नेपालीमा)**.

It automatically converts values into **Nepali numerals (०, १, २, ...)** and shows the latest market prices in **Nepali Rupees (NPR)** — right inside your browser.  

---

## ✨ Features  

- 🪙 Track **Bitcoin, Ethereum, Solana** (more coming soon)  
- 🔄 Auto-refresh every **30 seconds**  
- 🔢 **Nepali numeral support** (localized UX)  
- 🌐 Powered by **CoinGecko API**  
- 🇳🇵 Made with ❤️ for **Nepali crypto users**  

---

## 📸 Screenshots  

 ![Popup Screenshot](./public/Screenshot.png)

---

## 🛠 Tech Stack  

- ⚛️ **React + TypeScript**  
- 🎨 **TailwindCSS**  
- 🔐 **Manifest V3 (Chrome Extensions)**  
- 🌍 **CoinGecko API**  

---

## 📂 Project Structure  

```bash
nepcoin/
│── public/           # Static assets (icons, manifest, etc.)
│── src/  
│   ├── components/   # Reusable React components  
│   ├── pages/        # Popup, Options page, etc.  
│   ├── styles/       # Tailwind CSS config & global styles  
│   ├── utils/        # Helper functions (formatting, API calls)  
│   ├── App.tsx       # Root component  
│   └── index.tsx     # Entry point  
│── package.json  
│── manifest.json     # Chrome Extension config  
│── tailwind.config.js
│── tsconfig.json  
└── README.md  
