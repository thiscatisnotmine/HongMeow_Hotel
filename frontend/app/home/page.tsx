// next-app/app/home/page.tsx
import "../../styles/HTML_Components/home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <img
        src="/image/image_3-removebg-preview.png"
        alt="Logo"
        className="home-logo"
      />
      <p className="welcome-text">
        Welcome, team! Let’s deliver exceptional service and create
        <br />
        unforgettable experiences for our guests.
      </p>
    </div>
  );
}
