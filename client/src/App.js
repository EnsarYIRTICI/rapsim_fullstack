import "./App.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { AuthProvider } from "./contexts/AuthContext";

import RoutesPage from "./pages/RoutesPage";

function App() {
  return (
    <AuthProvider>
      <RoutesPage />
    </AuthProvider>
  );
}

export default App;
