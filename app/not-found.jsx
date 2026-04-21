import Link from "next/link";

export const metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="app-not-found">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="back-btn">
        Go Back Home
      </Link>
    </div>
  );
}
