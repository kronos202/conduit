import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import { AppProvider } from "./context/app.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ReactQueryProvider>
    <AppProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  </ReactQueryProvider>
  // </React.StrictMode>
);
