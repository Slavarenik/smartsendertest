import type { FormEvent } from "react";

type VerifyFormProps = {
  verificationCode: string;
  verificationError: string;
  onVerificationCodeChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const VerifyForm = ({
  verificationCode,
  verificationError,
  onVerificationCodeChange,
  onSubmit,
}: VerifyFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-8 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <label className="block text-sm font-medium text-slate-300" htmlFor="verificationCode">
        Verification code
      </label>
      <input
        id="verificationCode"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        required
        value={verificationCode}
        onChange={(event) => onVerificationCodeChange(event.target.value)}
        placeholder="123456"
        aria-invalid={verificationError ? true : undefined}
        aria-describedby={verificationError ? "verification-error" : undefined}
        className="mt-1.5 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-slate-400"
      />
      {verificationError ? (
        <p id="verification-error" className="mt-2 text-sm text-red-400">
          {verificationError}
        </p>
      ) : null}
      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-950 hover:bg-white"
      >
        Verify
      </button>
    </form>
  );
};
