import PageLoader from "@/components/common/page-loader";
import { authClient } from "@/lib/auth-client";
import type { User } from "@/types/common";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated-layout")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (!session) {
      throw redirect({ to: "/login" });
    }

    return { user: session.user as User };
  },
  pendingComponent: PageLoader,
  component: RouteComponent
});

function RouteComponent() {
  return <Outlet />;
}
