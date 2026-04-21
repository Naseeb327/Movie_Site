import { Suspense } from "react";
import HomePage from "../src/views/Home";

export const metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
