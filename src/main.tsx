import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "./Componets/ReuseCompo/Wrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Wrapper>
      <App />
    </Wrapper>
  </BrowserRouter>,
);
