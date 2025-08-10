import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store.js";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);
