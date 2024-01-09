import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { QueryClientProviders } from "./shared/Provider/ClientProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProviders>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
          colorPrimary: "#512370",
        },
      }}
    >
      <App />
    </ConfigProvider>
    ,
  </QueryClientProviders>,
);
