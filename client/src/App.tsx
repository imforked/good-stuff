import { Layout } from "./components/Layout";
import { Toaster } from "./components/Toast";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
