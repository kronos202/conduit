import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AppContext } from "@/context/app";
import { useContext } from "react";

interface Props {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <div className="flex flex-col justify-between w-full min-h-screen ">
      {isAuthenticated ? <Header /> : <AuthHeader />}
      {children}
      <Footer />
    </div>
  );
}
