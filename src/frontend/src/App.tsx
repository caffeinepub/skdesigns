import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./components/Layout";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import GraphicDesignPage from "./pages/GraphicDesignPage";
import HomePage from "./pages/HomePage";
import UIUXPage from "./pages/UIUXPage";
import VideoCreationPage from "./pages/VideoCreationPage";
import WebDesignPage from "./pages/WebDesignPage";

// ─── Public site root (with Layout) ────────────────────────────────────────
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

// ─── Admin root (no Layout — standalone portal) ─────────────────────────────
const adminRootRoute = createRootRoute({
  component: () => <Outlet />,
});

const adminRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin",
  component: AdminPage,
});

// ─── Route trees ─────────────────────────────────────────────────────────────
const publicRouteTree = rootRoute.addChildren([
  indexRoute,
  webDesignRoute,
  graphicDesignRoute,
  uiUxRoute,
  videoRoute,
  contactRoute,
]);

const adminRouteTree = adminRootRoute.addChildren([adminRoute]);

// ─── Router selection ─────────────────────────────────────────────────────────
const isAdminPath = window.location.pathname.startsWith("/admin");

const router = createRouter({
  routeTree: isAdminPath ? adminRouteTree : publicRouteTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
