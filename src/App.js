import "./App.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UpdateProfile from "./components/UpdateProfile";
import MyProfile from "./components/MyProfile";
import Login from "./components/Login";
import Connections from "./components/Connections";
import ReceiveRequests from "./components/ReceiveRequests";
import Friends from "./components/Friends";
import ProtectedRoute from "./components/ProtectedRoute";
import FriendProfile from "./components/FriendProfile";
import Chat from "./components/Chat";

function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const showBackgroundImage = isHomePage || location.pathname === "/login";

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        backgroundImage: showBackgroundImage
          ? "url('/developer background.jpg')"
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      {/* Tagline only on home page */}
      {isHomePage && (
        <div className="absolute top-1/3 w-full text-center z-10 px-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight font-[Poppins]">
            Where Developers Connect,
            <br className="hidden md:block" /> Collaborate & Code Together.
          </h1>
        </div>
      )}

      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          { path: "/feed", element: <Connections /> },
          { path: "/myprofile", element: <MyProfile /> },
          { path: "/updateprofile", element: <UpdateProfile /> },
          { path: "/receive-requests", element: <ReceiveRequests /> },
          { path: "/friends", element: <Friends /> },
          { path: "/friendsprofile/:id", element: <FriendProfile /> },
          { path: "/chat/:id", element: <Chat /> },
        ],
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
}

export default App;
