import PageLoader from "@/components/common/page-loader";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated-layout/_main-layout")({
  beforeLoad: async ({ context }) => {
    if (!context.user?.isOnboarded) {
      throw redirect({ to: "/onboarding" });
    }
  },
  pendingComponent: PageLoader,
  component: RouteComponent
});

function RouteComponent() {
  return <Outlet />;
}
