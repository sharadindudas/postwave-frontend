import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated-layout/_main-layout/dashboard/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated-layout/_main-layout/dashboard/"!</div>
}
