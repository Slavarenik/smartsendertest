import { useEffect } from "react";
import { RecaptchaVerifier } from "firebase/auth";

import { auth } from "@core/firebase";

export const useRecaptcha = () => {
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved, ready to send SMS
      },
    });

    return () => {
      window.recaptchaVerifier?.clear();
    };
  }, []);
};
