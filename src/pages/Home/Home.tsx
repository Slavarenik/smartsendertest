import { Auth } from "@features/Auth";

export const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-slate-100">
        Smart Sender
      </h1>

      <Auth />      
    </div>
  );
};