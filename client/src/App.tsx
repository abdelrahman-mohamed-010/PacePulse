import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Sale from "./pages/Sale";
import Trending from "./pages/Trending";
import Featured from "./pages/Featured";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/children", element: <div>children </div> },
      { path: "/cart", element: <Cart /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/men", element: <Men /> },
      { path: "/women", element: <Women /> },
      { path: "/sale", element: <Sale /> },
      { path: "/featured", element: <Featured /> },
      { path: "/Trending", element: <Trending /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
