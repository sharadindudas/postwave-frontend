import type { Session } from "@/types/common";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

interface MyRouterContext {
  user: Session["user"] | null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster
        containerClassName="font-cc-geist"
        position="top-center"
      />
    </>
  )
});
