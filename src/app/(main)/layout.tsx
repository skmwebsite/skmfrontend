import Header from "../_layout/Header";
import CartProviders from "@/src/provider/CartProviders";
import Footer from "../_layout/Footer";
import { frontendApi } from "@/src/api/api";
import AnnouncementBanner from "../_components/AnnouncementBanner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deliveryStatus = await frontendApi.orderAvailabilityCheck();
  const showAnnouncement = deliveryStatus?.success === false;
  return (
    <CartProviders>
      <Header showAnnouncement={showAnnouncement} />
      {children}
      <Footer />
    </CartProviders>
  );
}
