import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      
      <main className="flex-grow">{children}</main>
      
      <Footer />
    </div>
  );
};

export default AuthLayout;
