import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface Props {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div className="w-full min-h-[100vh]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
