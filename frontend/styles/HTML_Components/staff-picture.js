class StaffPicture extends HTMLElement {
  connectedCallback() {
    const isViewPage = window.location.pathname.includes("viewmore.html");
    const isAddPage = window.location.pathname.includes("addstaff.html");

    const savedImage = localStorage.getItem("staffProfileImg");
    const pictureUrl = savedImage || this.getAttribute("src") || "../Picture/default-profile.png";

    // Template สำหรับทั้ง view และ add
    this.innerHTML = `
      <div class="profile-picture-container">
        <img
          id="profile-img"
          alt="Employee Profile Picture"
          class="profile-picture"
          src="${pictureUrl}"
          onerror="this.src='../Picture/default-profile.png';"
        />
        ${(isViewPage || isAddPage) ? `
          <input type="file" id="upload-input" accept="image/*" />
        ` : ''}
      </div>
    `;

    // Logic เปลี่ยนรูป
    if (isViewPage || isAddPage) {
      const profileImg = this.querySelector("#profile-img");
      const uploadInput = this.querySelector("#upload-input");

      uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          profileImg.src = reader.result;
          localStorage.setItem("staffProfileImg", reader.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }
}

customElements.define("staff-picture", StaffPicture);
