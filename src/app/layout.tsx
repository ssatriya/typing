import Providers from "./components/providers";
import "./globals.css";
import { Inter, Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Typing",
  description: "Reactjs Typing Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <Providers>
          <main className="container flex items-center justify-center mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
