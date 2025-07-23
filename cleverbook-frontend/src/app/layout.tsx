
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import{ NotificationProvider} from "@/context/notificationContext";
import ClientOnly from "@/components/clientOnly";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <NotificationProvider>
        <Navbar />
        {children}
        <Toaster richColors position="top-center" />
        </NotificationProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
