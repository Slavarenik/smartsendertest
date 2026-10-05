import type { FormEvent } from "react";

type SendFormProps = {
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const SendForm = ({ phoneNumber, onPhoneNumberChange, onSubmit }: SendFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-8 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <label className="block text-sm font-medium text-slate-300" htmlFor="phone">
        Phone number
      </label>
      <input
        id="phone"
        type="tel"
        autoComplete="tel"
        required
        value={phoneNumber}
        onChange={(event) => onPhoneNumberChange(event.target.value)}
        placeholder="+1 555 0100"
        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-slate-400"
      />

      <div id="recaptcha-container" />

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-950 hover:bg-white"
      >
        Send
      </button>
    </form>
  );
};
