import './App.css';
import { AppRouter } from '@core/router/AppRouter';
import { Header } from '@shared/layout/header';

function App() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-950 text-slate-100">
      <Header />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
