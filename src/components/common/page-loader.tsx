import { cn } from "@/lib/utils";

interface PageLoaderProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

export default function PageLoader({ className, children }: PageLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center min-h-screen", className)}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cc-primary mx-auto mb-4" />
        <p className="text-gray-600">{children || "Loading..."}</p>
      </div>
    </div>
  );
}

