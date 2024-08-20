import { useConfirmEmail } from "@/hooks/auth/mutations/useConfirmEmail";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ConfirmEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hash = queryParams.get("hash");

  const { confirmEmail } = useConfirmEmail();

  useEffect(() => {
    confirmEmail({ hash: hash as string });
  }, [confirmEmail, hash]);

  return <div>Xin chúc mừng</div>;
};

export default ConfirmEmail;
