import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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
import ThreeJSBackground from "./components/ThreeJSBackground";
import FriendProfile from "./components/FriendProfile";

function AppLayout() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
      }}
    >
      <ThreeJSBackground />
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
