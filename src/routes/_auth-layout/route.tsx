import authBgPattern from "@/assets/auth-bg-pattern.svg";
import authBgScreen from "@/assets/auth-bg-screen.svg";
import PageLoader from "@/components/common/page-loader";
import { authClient } from "@/lib/auth-client";
import type { User } from "@/types/common";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-layout")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      const user = session.user as User;
      throw redirect({
        to: user.isOnboarded ? "/dashboard" : "/onboarding"
      });
    }
  },
  pendingComponent: PageLoader,
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${authBgPattern})`,
        backgroundSize: "cover"
      }}>
      <div>
        <div className="absolute left-16 top-1/2 -translate-y-1/2 text-cc-neutral-100 w-md">
          <h2 className="text-5xl uppercase font-semibold mb-5 leading-16">Engaging & Conversational</h2>
          <p className="text-xl">From inbox to action—what started as a newsletter is now an interactive space for exclusive updates and insights.</p>
        </div>

        <div className="overflow-hidden">
          <img
            src={authBgScreen}
            alt="auth-bg-screen"
            loading="lazy"
            className="w-full h-full absolute top-1/4 left-1/5 right-0"
          />
        </div>
      </div>

      <div className="overflow-y-scroll max-h-screen fixed right-0 h-screen w-lg bg-cc-neutral-100 p-8 scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
}
