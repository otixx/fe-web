import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { QueryClientProviders } from "./shared/Provider/index.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProviders>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
        },
      }}
    >
      <App />
    </ConfigProvider>
    ,
  </QueryClientProviders>,
);
