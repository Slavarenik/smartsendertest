import { usePhoneAuth } from "../Hooks/usePhoneAuth";
import { SendForm } from "./SendForm";
import { VerifyForm } from "./VerifyForm";

export const Auth = () => {
  const {
    phoneNumber,
    setPhoneNumber,
    verificationCode,
    setVerificationCode,
    verificationError,
    confirmationResult,
    handleSendCode,
    handleVerifyCode,
  } = usePhoneAuth();

  if (confirmationResult) {
    return (
      <VerifyForm
        verificationCode={verificationCode}
        verificationError={verificationError}
        onVerificationCodeChange={setVerificationCode}
        onSubmit={handleVerifyCode}
      />
    );
  }

  return (
    <SendForm
      phoneNumber={phoneNumber}
      onPhoneNumberChange={setPhoneNumber}
      onSubmit={handleSendCode}
    />
  );
};
