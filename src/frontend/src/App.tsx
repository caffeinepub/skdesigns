import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./components/Layout";
import ContactPage from "./pages/ContactPage";
import GraphicDesignPage from "./pages/GraphicDesignPage";
import HomePage from "./pages/HomePage";
import UIUXPage from "./pages/UIUXPage";
import VideoCreationPage from "./pages/VideoCreationPage";
import WebDesignPage from "./pages/WebDesignPage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <Toaster position="bottom-right" theme="dark" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const webDesignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/web-design",
  component: WebDesignPage,
});

const graphicDesignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/graphic-design",
  component: GraphicDesignPage,
});

const uiUxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ui-ux-design",
  component: UIUXPage,
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video-creation",
  component: VideoCreationPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  webDesignRoute,
  graphicDesignRoute,
  uiUxRoute,
  videoRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
