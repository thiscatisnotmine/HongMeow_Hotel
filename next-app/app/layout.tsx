// next-app/app/layout.tsx
import "./globals.css"; // must import your new globals
import "../styles/HTML_Components/side-bar.css";
import "../styles/HTML_Components/top-bar.css";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 1) outer flex wrapper */}
        <div className="root">
          {/* 2) fixed sidebar */}
          <SideBar />

          {/* 3) right side: TopBar + content */}
          <div className="main-wrapper">
            <TopBar />
            <div className="main-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
