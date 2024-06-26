import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import SplashPage from "../components/SplashPage/SplashPage";
import SpotDetailView from "../components/SpotDetailView/SpotDetailView";
import NewSpotForm from "../components/NewSpotForm/NewSpotForm";
import CurrentUserSpots from "../components/CurrentUserSpots/CurrentUserSpots";
import EditSpotForm from "../components/EditSpotForm/EditSpotForm";
import NotFoundPage from "../components/Navigation/NotFoundPage";
import { BookmarksPage } from "../components/CurrentUserBookmarks/CurrentUserBookmarks";
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetailView />,
      },
      {
        path: "/spots/new",
        element: <NewSpotForm />,
      },
      {
        path: "/spots/current",
        element: <CurrentUserSpots />,
      },
      {
        path: "/spots/:spotId/edit",
        element: <EditSpotForm />,
      },
      {
        path: "/bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
