import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import SignUp from "./components/Auth/SignUp/SignUp.jsx";
import VideoGrid from "./components/VideoGrid/VideoGrid.jsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.jsx";
import ChannelPage from "./components/ChannelPage/ChannelPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App layout with Header and Sidebar
        children: [
     {
        path: "/", 
        element: <VideoGrid />,
        },
      {
        path: "/videos", 
        element: <VideoGrid />,
        },
        {
            path: "/videos/:_id",
            element: <VideoPlayer /> 
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
        },
      {
          path: "/channel/:channelId",
          element: <ChannelPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
