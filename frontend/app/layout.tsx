import "./globals.css";
import { Toaster } from "react-hot-toast";
import { WalletProvider } from "@/context/WalletContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {children}

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#fff",
                color: "#111827",
                fontSize: "18px",
                fontWeight: "600",
                padding: "18px 24px",
                borderRadius: "16px",
                minWidth: "420px",
                textAlign: "center",
                boxShadow: "0 15px 35px rgba(0,0,0,0.18)",
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  );
}
