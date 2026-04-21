import Header from "../src/components/Header";
import "./globals.css";

export const metadata = {
  title: {
    default: "MovieHub",
    template: "%s | MovieHub",
  },
  description: "Browse movies and web series by category, genre, and quality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Header />
          <main className="main">{children}</main>
          <footer className="footer">
            <p>&copy; 2026 MovieHub. All rights reserved.</p>
            <p className="disclaimer">
              This site does not store any files on its server. All contents are
              provided by non-affiliated third parties.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
