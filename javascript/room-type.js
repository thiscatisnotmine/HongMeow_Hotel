document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("roomTypeSelect");
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "dog";
  const container = document.querySelector(".room-container");

  if (select) {
    select.value = type;

    select.addEventListener("change", function () {
      const newType = this.value;
      window.location.search = "?type=" + newType;
    });
  }

  if (container) {
    const roomData = {
      dog: `
        <section class="room-card">
          <div class="room-info">
            <h3>Air-conditioned Capsule for dog</h3>
            <div class="room-images">
              <img src="image/image 11.png" class="main-image">
              <div class="thumbnail-row">
                <img src="image/image 5.png">
                <img src="image/image 7.png">
              </div>
            </div>
            <div class="room-detail">
              <div class="room-info-item">
                <img src="/asset/fluent-mdl2_room.svg" class="info-icon">
                <span>ขนาดห้อง: 10 ตารางเมตร</span>
              </div>
              <div class="room-info-item">
                <img src="/asset/ei_plus.svg" class="info-icon">
                <span>ดูบริการและสิ่งอำนวยความสะดวกทั้งหมด</span>
              </div>
            </div>
          </div>
          <div class="room-meta"><p><strong>Pet Type</strong></p><p class="price-detail"><br>Dog</p></div>
          <div class="room-meta"><p><strong>Available Rooms</strong></p><p class="price-detail"><br>2</p></div>
          <div class="room-meta room-price">
            <div class="price-box"><p><strong>Price</strong></p><p class="price-detail">999<br><small class="per-night">per night</small></p></div>
            <div class="book-wrapper"><button class="book-btn">Book</button></div>
          </div>
        </section>

        <section class="room-card">
          <div class="room-info">
            <h3>Air-conditioned Deluxe for dog</h3>
            <div class="room-images">
              <img src="image/image 11.png" class="main-image">
              <div class="thumbnail-row">
                <img src="image/image 5.png">
                <img src="image/image 7.png">
              </div>
            </div>
            <div class="room-detail">
              <div class="room-info-item">
                <img src="/asset/fluent-mdl2_room.svg" class="info-icon">
                <span>ขนาดห้อง: 20 ตารางเมตร</span>
              </div>
              <div class="room-info-item">
                <img src="/asset/ei_plus.svg" class="info-icon">
                <span>ดูบริการและสิ่งอำนวยความสะดวกทั้งหมด</span>
              </div>
            </div>
          </div>
          <div class="room-meta"><p><strong>Pet Type</strong></p><p class="price-detail"><br>Dog</p></div>
          <div class="room-meta"><p><strong>Available Rooms</strong></p><p class="price-detail"><br>2</p></div>
          <div class="room-meta room-price">
            <div class="price-box"><p><strong>Price</strong></p><p class="price-detail">1799<br><small class="per-night">per night</small></p></div>
            <div class="book-wrapper"><button class="book-btn">Book</button></div>
          </div>
        </section>
      `,
      cat: `
        <section class="room-card">
        <div class="room-info">
          <h3>Air-conditioned Capsule for cat</h3>
          <div class="room-images">
            <img src="image/image 11.png" class="main-image" alt="Main Image">
            <div class="thumbnail-row">
              <img src="image/image 5.png" alt="Thumbnail 1">
              <img src="image/image 7.png" alt="Thumbnail 2">
            </div>
          </div>
          <div class="room-detail">
            <div class="room-info-item">
              <img src="/asset/fluent-mdl2_room.svg" alt="Room Size Icon" class="info-icon">
              <span>ขนาดห้อง: 10 ตารางเมตร</span>
            </div>
            <div class="room-info-item">
              <img src="/asset/ei_plus.svg" alt="Facilities Icon" class="info-icon">
              <span>ดูบริการและสิ่งอำนวยความสะดวกทั้งหมด</span>
            </div>
          </div>               
        </div>
        <div class="room-meta">
          <p><strong>Pet Type</strong></p>
          <p class="price-detail"><br>Cat</p>
        </div>
        <div class="room-meta">
          <p><strong>Available Rooms</strong></p>
          <p class="price-detail"><br>2</p>
        </div>
        
        <div class="room-meta room-price">
          <div class="price-box">
            <p><strong>Price</strong></p>
            <p class="price-detail">
              999<br>
              <small class="per-night">per night</small>
            </p>
          </div>
        
          <div class="book-wrapper">
            <button class="book-btn">Book</button>
          </div>
        </div>
      </section>

      <section class="room-card">
        <div class="room-info">
          <h3>Air-conditioned Deluxe for cat</h3>
          <div class="room-images">
            <img src="image/image 11.png" class="main-image" alt="Main Image">
            <div class="thumbnail-row">
              <img src="image/image 5.png" alt="Thumbnail 1">
              <img src="image/image 7.png" alt="Thumbnail 2">
            </div>
          </div>
          <div class="room-detail">
            <div class="room-info-item">
              <img src="/asset/fluent-mdl2_room.svg" alt="Room Size Icon" class="info-icon">
              <span>ขนาดห้อง: 20 ตารางเมตร</span>
            </div>
            <div class="room-info-item">
              <img src="/asset/ei_plus.svg" alt="Facilities Icon" class="info-icon">
              <span>ดูบริการและสิ่งอำนวยความสะดวกทั้งหมด</span>
            </div>
          </div>               
        </div>
        <div class="room-meta">
          <p><strong>Pet Type</strong></p>
          <p class="price-detail"><br>Cat</p>
        </div>
        <div class="room-meta">
          <p><strong>Available Rooms</strong></p>
          <p class="price-detail"><br>2</p>
        </div>
        
        <div class="room-meta room-price">
          <div class="price-box">
            <p><strong>Price</strong></p>
            <p class="price-detail">
              1799<br>
              <small class="per-night">per night</small>
            </p>
          </div>
        
          <div class="book-wrapper">
            <button class="book-btn">Book</button>
          </div>
        </div>
      </section>
      `
    };

    container.innerHTML = roomData[type] || "<p>No room data found.</p>";
  }
});