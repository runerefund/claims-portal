// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #f9fafb;
  --foreground: #111827;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: "Inter", sans-serif;
}

input, select, textarea {
  background-color: white;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
}

button {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RUNE & THORFi Victim Compensation Portal",
  description: "Submit your claim for compensation related to RUNE and THORFi losses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background ${inter.className}`}>{children}</body>
    </html>
  );
}

// page.tsx
export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RUNE & THORFi Victim Compensation Portal</h1>
      <p className="mb-4">Submit your claim for compensation related to RUNE and THORFi losses</p>
      <div className="p-4 bg-white shadow rounded-md">
        <h2 className="text-lg font-semibold">SECURITY NOTICE:</h2>
        <p className="text-sm mb-4">
          We will NEVER ask you to connect your wallet or send funds. We only request a nominated wallet address to send your
          compensation funds.
        </p>
        <form>
          <label htmlFor="wallet">Main THORChain Wallet Address Affected</label>
          <input type="text" id="wallet" placeholder="Enter your THORChain wallet address" />

          <label htmlFor="loss">Loss Amount (in USD)</label>
          <input type="number" id="loss" placeholder="Enter total loss amount" />

          <label htmlFor="product">THORFi Product Used</label>
          <select id="product">
            <option value="">Select product</option>
            <option value="savings">Savings</option>
            <option value="loans">Loans</option>
            <option value="staking">Staking</option>
          </select>

          <button type="submit" className="mt-4" disabled>
            Continue
          </button>
        </form>
      </div>
      <p className="text-sm mt-4">
        For questions about the compensation process or technical support, please contact the RUNE Restitution Council through
        official channels.
      </p>
    </main>
  );
}
