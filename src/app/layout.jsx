import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import { FilterProvider } from "./context/FilterContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href="/images/brand/logo.png"
          type="image/x-icon"
        />
        <title>Truffe et Moustache</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-md mx-auto`}
      >
        <FilterProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
