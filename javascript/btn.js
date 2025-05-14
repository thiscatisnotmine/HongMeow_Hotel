//******button book(Avaiable_Room_(Admin)******) แล้วไปหน้าอื่น *//
document.addEventListener("DOMContentLoaded", function () {
  // delegate event หลังโหลด dynamic
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("book-btn")) {
      window.location.href = "************************"; // เปลี่ยน path ตามที่ต้องการ
    }
  });
});

//*****view(Notification) แล้วไปหน้าอื่น*****//
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("view-link")) {
      e.preventDefault();
      window.location.href = "************************"; // เปลี่ยนเส้นทางไปยังหน้าที่คุณต้องการ
    }
  });
});

/* redirect แล้วไปหน้าอื่น */
function redirect(url) {
  window.location.href = url;
}


