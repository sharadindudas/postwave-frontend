import { useRouteContext } from "@tanstack/react-router";

export function useAuth() {
  const { user } = useRouteContext({
    from: "/_authenticated-layout"
  });

  return { user };
}
