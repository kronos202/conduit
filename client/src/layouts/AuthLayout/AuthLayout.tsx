import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-[100vh] w-full relative">
      <AuthHeader />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
