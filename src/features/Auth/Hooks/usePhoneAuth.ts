import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";

import { auth } from "@core/firebase";
import { useRecaptcha } from "./useRecaptcha";

export const usePhoneAuth = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useRecaptcha();

  const handleSendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        return;
      }
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      console.log("SMS verification code sent!");
    } catch (error) {
      console.error("SMS failed to send:", error);
    }
  };

  const updateVerificationCode = (value: string) => {
    setVerificationCode(value);
    setVerificationError("");
  };

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!confirmationResult) {
      return;
    }
    setVerificationError("");
    try {
      const result = await confirmationResult.confirm(verificationCode);
      console.log("User successfully signed in!", result.user);
      navigate("/console");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Incorrect verification code.";
      setVerificationError(message);
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    verificationCode,
    setVerificationCode: updateVerificationCode,
    verificationError,
    confirmationResult,
    handleSendCode,
    handleVerifyCode,
  };
};
