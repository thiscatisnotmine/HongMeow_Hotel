/* For payment details page */

const confirm = document.getElementById('makepay').style.display = 'block';


fetch(`${api}/booking/${q}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})

// ...

const detailBody = document.getElementsByClassName("paysdetail")
detailBody.innerHTML = '';
const detailSection = document.createElement("div")
detailSection.innerHTML= `
    <div id="content">
    <h2>Booking Details</h2>
    <p>Customer ID: ${CusCID}<br>
        Date: ${booking.CheckInDate} - ${booking.CheckOutDate} | ${booking.Duration} <br>
        ${booking.RoomAmout}</p>
    </div>

    <div id="contentPrice">
    <h2>Total Price</h2> ${payment.PayTotal}
    </div>
`
// Payment method form
// 
document.getElementById('pmethod').style.display = 'block';