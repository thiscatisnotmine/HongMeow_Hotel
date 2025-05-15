// app/layout.tsx
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
      <body className="relative">
        <div className="flex">
          {/* Left fixed sidebar */}
          <SideBar />

          {/* Right side: topbar + page content */}
          <div className="flex-1">
            <TopBar />
            {/* 
                Legacy CSS defines .main-content as:
                
                margin-left: 340px; 
                margin-top: 20px; 
                padding: 20px;
              */}
            <div className="main-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
