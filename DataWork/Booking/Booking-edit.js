const api = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

const params = new URLSearchParams(window.location.search);
const bookingID = params.get('bookingID');
console.log(bookingID);

window.onload = function () {
    if (bookingID) {
        // Fetch booking data
        const fetchBooking = fetch(`${api}/booking/${bookingID}`)
            .then(res => res.json());

        // Fetch customer data (assuming you have customer ID in booking data)
        const fetchCustomer = fetchBooking.then(booking => {
            if (booking && booking.customerId) { // Adjust 'customerId' as needed
                return fetch(`${api}/customer/${booking.customerId}`).then(res => res.json());
            } else {
                return Promise.resolve(null); // Or handle the missing customer ID appropriately
            }
        });

        // Fetch pet data (assuming you have pet ID in booking data)
        const fetchPet = fetchBooking.then(booking => {
            if (booking && booking.petId) { // Adjust 'petId' as needed
                return fetch(`${api}/pet/${booking.petId}`).then(res => res.json());
            } else {
                 return Promise.resolve(null); // Or handle missing pet ID
            }
        });

        // Combine all promises
        Promise.all([fetchBooking, fetchCustomer, fetchPet])
            .then(([booking, customer, pet]) => {
                console.log(booking, customer, pet);
                if (booking) {
                    document.getElementById('BookingID').textContent = booking.bookingId || "undefined";
                    document.getElementById('CheckIn').value = booking.checkinDate || ""; // Set value for input
                    document.getElementById('CheckOut').value = booking.checkoutDate || ""; // Set value for input
                }

                if (customer) {
                    document.getElementById('customerID').value = customer.CusCID || "";
                    document.getElementById('customerName').value = customer.CusFname || "";
                    document.getElementById('customerEmail').value = customer.CusEmail || "";
                    document.getElementById('customerPhone').value = customer.CusTel || "";
                }

                if (pet) {
                    document.getElementById('petName').value = pet.PName || "";
                    document.getElementById('petType').value = pet.PType || "";
                    document.getElementById('petBreeds').value = pet.PBreeds || "";
                    document.getElementById('petAge').value = pet.PAge || "";
                    document.getElementById('petDisease').value = pet.PDisease || "";
                }


            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data!');
            });
    } else {
        alert('No booking ID provided!');
    }
};


/* Enable Edit Only Checkin and Checkout */
function enableEdit() {
    // Booking
    document.getElementById('CheckIn').disabled = false;
    document.getElementById('CheckOut').disabled = false;
    document.getElementById("buttonGroup").classList.remove("hidden-btn");
}

// แก้ไขข้อมูล Checkin และ Checkout
async function confirmEdit() {
    const bookingData = {
        checkinDate: document.getElementById('CheckIn').value.trim(),
        checkoutDate: document.getElementById('CheckOut').value.trim(),
    };



    if (confirm('Do you want to save the changes?')) {
        try {
            const response = await fetch(`${api}/booking/${bookingID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                alert('Booking information updated successfully.');
                location.reload();
            } else {
                const errorText = await response.text();
                alert(`Failed to update booking. Server responded with: ${response.status} - ${errorText}`);
                console.error('Server error:', response.status, errorText);
            }
        } catch (error) {
            alert('An error occurred while updating the booking: ' + error.message);
            console.error('Fetch error:', error);
        }
    } else {
        console.log("Changes not saved");
    }
}


// ยกเลิกการแก้ไขข้อมูล
function cancelEdit() {
    if (confirm('Do you want to discard the changes?')) {
        console.log("Changes discarded");
        location.reload();
    } else {
        console.log("Changes not discarded");
    }
}

// ยกเลิกการจอง
async function cancelBooking() {
    if (confirm('Are you sure you want to cancel this booking?')) {
        try {
            const response = await fetch(`${api}/booking/${bookingID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Booking cancelled successfully.');
                // Redirect to a confirmation or booking list page
                window.location.href = 'booking_cancelled_confirmation.html'; // Replace with your desired page
            } else {
                const errorText = await response.text();
                alert(`Failed to cancel booking. Server responded with: ${response.status} - ${errorText}`);
                console.error('Server error:', response.status, errorText);
            }
        } catch (error) {
            alert('An error occurred while cancelling the booking: ' + error.message);
            console.error('Fetch error:', error);
        }
    } else {
        console.log("Cancellation not confirmed");
    }
}