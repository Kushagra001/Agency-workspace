import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-clinical-offwhite flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-clinical-blue-light flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-clinical-blue">404</span>
        </div>
        <h2 className="text-xl font-semibold text-ink mb-2">Page not found</h2>
        <p className="text-sm text-ink-muted mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button>
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
