import { useContext, useEffect } from "react";
import "./App.css";
import { LocalStorageEventTarget } from "./lib/auth";
import { AppContext } from "./context/app";
import useRouteElements from "./routers/useRouteElements";

function App() {
  const routeElements = useRouteElements();

  const { reset } = useContext(AppContext);

  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearLS", reset);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, [reset]);
  return <div>{routeElements}</div>;
}

export default App;
