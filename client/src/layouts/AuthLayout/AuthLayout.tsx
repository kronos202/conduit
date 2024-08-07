import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-between">
      <AuthHeader />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
