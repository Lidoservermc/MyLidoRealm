import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add title to the page
document.title = "MyLido - Lido's Minecraft Realm";

createRoot(document.getElementById("root")!).render(<App />);
