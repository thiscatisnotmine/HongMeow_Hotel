//*****select type ของ Avaiable_Room_(Admin) - room-card*****//
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
            <h3>Fan Capsule for dog</h3>
            <div class="room-images">
              <img src="../../image/image 11.png" class="main-image">
              <div class="thumbnail-row">
                <img src="../../image/image 5.png">
                <img src="../../image/image 7.png">
              </div>
            </div>
            <div class="room-detail">
              <div class="room-info-item">
                <img src="../../asset/fluent-mdl2_room.svg" class="info-icon">
                <span>ขนาดห้อง: 10 ตารางเมตร</span>
              </div>
              <div class="room-info-item">
                <img src="../../asset/ei_plus.svg" class="info-icon">
                <span>ดูบริการและสิ่งอำนวยความสะดวกทั้งหมด</span>
              </div>
            </div>
          </div>
          <div class="room-meta"><p><strong>Pet Type</strong></p><p class="price-detail"><br>Dog</p></div>
          <div class="room-meta"><p><strong>Available Rooms</strong></p><p class="price-detail"><br>2</p></div>
          <div class="room-meta room-price">
            <div class="price-box"><p><strong>Price</strong></p><p class="price-detail">599<br><small class="per-night">per night</small></p></div>
            <div class="book-wrapper"><button class="book-btn">Book</button></div>
          </div>
        </section>

        <section class="room-card">
          <div class="room-info">
            <h3>Air-conditioned Capsule for dog</h3>
            <div class="room-images">
              <img src="../../image/image 11.png" class="main-image">
              <div class="thumbnail-row">
                <img src="../../image/image 5.png">
                <img src="../../image/image 7.png">
              </div>
            </div>
            <div class="room-detail">
              <div class="room-info-item">
                <img src="../../asset/fluent-mdl2_room.svg" class="info-icon">
                <span>ขนาดห้อง: 10 ตารางเมตร</span>
              </div>
              <div class="room-info-item">
                <img src="../../asset/ei_plus.svg" class="info-icon">
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
              <img src="../../image/image 11.png" class="main-image">
              <div class="thumbnail-row">
                <img src="../../image/image 5.png">
                <img src="../../image/image 7.png">
              </div>
            </div>
            <div class="room-detail">
              <div class="room-info-item">
                <img src="../../asset/fluent-mdl2_room.svg" class="info-icon">
                <span>ขนาดห้อง: 20 ตารางเมตร</span>
              </div>
              <div class="room-info-item">
                <img src="../../asset/ei_plus.svg" class="info-icon">
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
            <h3>Fan Capsule for cat</h3>
            <div class="room-images">
              <img src="../../image/image 11.png" class="main-image">
              <div class="thumbnail-row">
                <img src="../../image/image 5.png">
                <img src="../../image/image 7.png">
              </div>
            </div>
            <div class="room-detail">
              <div class="room-info-item">
                <img src="../../asset/fluent-mdl2_room.svg" class="info-icon">
                <span>ขนาดห้อง: 8 ตารางเมตร</span>
              </div>
              <div class="room-info-item">
                <img src="../../asset/ei_plus.svg" class="info-icon">
                <span>ดูบริการและสิ่งอำนวยความสะดวกทั้งหมด</span>
              </div>
            </div>
          </div>
          <div class="room-meta"><p><strong>Pet Type</strong></p><p class="price-detail"><br>Cat</p></div>
          <div class="room-meta"><p><strong>Available Rooms</strong></p><p class="price-detail"><br>2</p></div>
          <div class="room-meta room-price">
            <div class="price-box">
            <p><strong>Price</strong></p>
            <p class="price-detail">399<br>
            <small class="per-night">per night</small></p></div>
            <div class="book-wrapper"><button class="book-btn">Book</button></div>
          </div>
        </section>

        <section class="room-card">
        <div class="room-info">
          <h3>Air-conditioned Capsule for cat</h3>
          <div class="room-images">
            <img src="../../image/image 11.png" class="main-image" alt="Main Image">
            <div class="thumbnail-row">
              <img src="../../image/image 5.png" alt="Thumbnail 1">
              <img src="../../image/image 7.png" alt="Thumbnail 2">
            </div>
          </div>
          <div class="room-detail">
            <div class="room-info-item">
              <img src="../../asset/fluent-mdl2_room.svg" alt="Room Size Icon" class="info-icon">
              <span>ขนาดห้อง: 8 ตารางเมตร</span>
            </div>
            <div class="room-info-item">
              <img src="../../asset/ei_plus.svg" alt="Facilities Icon" class="info-icon">
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
              899<br>
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
            <img src="../../image/image 11.png" class="main-image" alt="Main Image">
            <div class="thumbnail-row">
              <img src="../../image/image 5.png" alt="Thumbnail 1">
              <img src="../../image/image 7.png" alt="Thumbnail 2">
            </div>
          </div>
          <div class="room-detail">
            <div class="room-info-item">
              <img src="../../asset/fluent-mdl2_room.svg" alt="Room Size Icon" class="info-icon">
              <span>ขนาดห้อง: 15 ตารางเมตร</span>
            </div>
            <div class="room-info-item">
              <img src="../../asset/ei_plus.svg" alt="Facilities Icon" class="info-icon">
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
              1599<br>
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



//*****select type ของ Bookinf_Room - room-item*****//
document.addEventListener("DOMContentLoaded", function () {
  const roomTypeSelect = document.getElementById("roomTypeSelect");
  const roomList = document.querySelector(".room-list");

  if (!roomTypeSelect || !roomList) {
    console.warn("roomTypeSelect หรือ roomList ไม่พบใน DOM");
    return;
  }

  const dogRooms = `
    <div class="room-item">
      <div class="room-info">
        <div class="room-name">Fan capsule for dog</div>
        <div class="room-detail">Available Room: 5</div>
      </div>
      <div class="room-price">599</div>
      <small class="per-night">per night</small>
    </div>
    <div class="room-item">
      <div class="room-info">
        <div class="room-name">Air-conditioned capsule for dog</div>
        <div class="room-detail">Available Room: 5</div>
      </div>
      <div class="room-price">999</div>
      <small class="per-night">per night</small>
    </div>
    <div class="room-item">
      <div class="room-info">
        <div class="room-name">Air-conditioned deluxe for dog</div>
        <div class="room-detail">Available Room: 5</div>
      </div>
      <div class="room-price">1799</div>
      <small class="per-night">per night</small>
    </div>
  `;

  const catRooms = `
    <div class="room-item">
      <div class="room-info">
        <div class="room-name">Fan capsule for cat</div>
        <div class="room-detail">Available Room: 5</div>
      </div>
      <div class="room-price">399</div>
      <small class="per-night">per night</small>
    </div>
    <div class="room-item">
      <div class="room-info">
        <div class="room-name">Air-conditioned capsule for cat</div>
        <div class="room-detail">Available Room: 5</div>
      </div>
      <div class="room-price">899</div>
      <small class="per-night">per night</small>
    </div>
    <div class="room-item">
      <div class="room-info">
        <div class="room-name">Air-conditioned deluxe for cat</div>
        <div class="room-detail">Available Room: 5</div>
      </div>
      <div class="room-price">1599</div>
      <small class="per-night">per night</small>
    </div>
  `;

  function renderRooms(type) {
    roomList.innerHTML = type === "cat" ? catRooms : dogRooms;
  }

  // โหลดห้องเริ่มต้น
  renderRooms(roomTypeSelect.value);

  // เมื่อเปลี่ยน Pet Type
  roomTypeSelect.addEventListener("change", function () {
    renderRooms(this.value);
  });

  // *** บังคับให้เลือกวันที่ก่อนเลือกห้อง *** //
  roomList.addEventListener("click", function (e) {
    const startDate = document.getElementById("startDate")?.value;
    const endDate = document.getElementById("endDate")?.value;

    if (!startDate || !endDate) {
      alert("Please select both Check-in and Check-out dates before selecting a room.");
      return;
    }

    const item = e.target.closest(".room-item");
    if (!item) return;

    // highlight ที่เลือก
    document.querySelectorAll(".room-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    // ดึงชื่อห้องและราคา
    const roomName = item.querySelector(".room-name")?.textContent.trim();
    const roomPrice = item.querySelector(".room-price")?.textContent.trim();

    // อ่านและอัปเดต localStorage
    const booking = JSON.parse(localStorage.getItem("booking_room_data") || "{}");
    booking.roomName = roomName;
    booking.roomPrice = roomPrice;
    booking.startDate = startDate;
    booking.endDate = endDate;

    localStorage.setItem("booking_room_data", JSON.stringify(booking));
  });
});