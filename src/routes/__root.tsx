import type { RouterContext } from "@/types/common";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export const Route = createRootRouteWithContext<RouterContext>()({
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
