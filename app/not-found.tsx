import type { Metadata } from "next";
import { NotFoundBody } from "@/components/ui/not-found-body";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <NotFoundBody />
    </main>
  );
}
