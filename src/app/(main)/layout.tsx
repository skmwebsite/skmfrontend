import Header from "../_layout/Header";
import CartProviders from "@/src/provider/CartProviders";
import Footer from "../_layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProviders>
      <Header />
      {children}
      <Footer />
    </CartProviders>
  );
}
