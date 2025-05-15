// next-app/app/layout.tsx
import "./globals.css";
import "../styles/HTML_Components/side-bar.css";
import "../styles/HTML_Components/top-bar.css";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* fixed, always on top of the page */}
        <aside className="sidebar">
          <SideBar />
        </aside>

        <div className="main-wrapper">
          <header className="topbar">
            <TopBar />
          </header>

          {/* YOUR PAGE CONTENT */}
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
