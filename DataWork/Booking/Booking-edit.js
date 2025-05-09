const api = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

const params = new URLSearchParams(window.location.search);
const bookingID = params.get('bookingID');
console.log(bookingID);

window.onload = function () {
    if (bookingID) {
        // Fetch booking data
        fetch(`${api}/booking/${bookingID}`)
            .then(res => res.json())
            .then(booking => {
                console.log(booking);
                if (booking) {
                    document.getElementById('BookingID').textContent = booking.bookingId || "undefined";
                    document.getElementById('CheckIn').textContent = booking.checkinDate || "undefined";
                    document.getElementById('CheckOut').textContent = booking.checkoutDate || "undefined";

                    // Populate customer info
                    const customer = booking.customer; // Assuming customer data is nested
                    if (customer) {
                        document.getElementById('customerID').value = customer.CusCID || "";
                        document.getElementById('customerName').value = customer.CusFname || "";
                        document.getElementById('customerEmail').value = customer.CusEmail || "";
                        document.getElementById('customerPhone').value = customer.CusTel || "";
                    }

                    // Populate emergency contact
                    const emergency = booking.emergencyContact; // Assuming emergency data is nested
                    if (emergency) {
                        document.getElementById('UrgenName').value = emergency.name || "";
                        document.getElementById('UrgenTel').value = emergency.phone || "";
                        document.getElementById('Relationship').value = emergency.relationship || "";
                    }

                    // Populate pet info
                    const pet = booking.pet; // Assuming pet data is nested
                    if (pet) {
                        document.getElementById('petName').value = pet.PName || "";
                        document.getElementById('petType').value = pet.PType || "";
                        document.getElementById('petBreeds').value = pet.PBreeds || "";
                        document.getElementById('petAge').value = pet.PAge || "";
                        document.getElementById('petDisease').value = pet.PDisease || "";
                        // document.getElementById('petVaccine').value = pet.PVaccine || ""; // Handling file input is more complex
                    }
                } else {
                    alert('Booking not found!');
                }
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
                alert('Failed to fetch booking data!');
            });
    } else {
        alert('No booking ID provided!');
    }
};


/* Enable Edit All Info */
function enableEdit() {
    // Customer info
    document.getElementById('customerID').disabled = false;
    document.getElementById('customerName').disabled = false;
    document.getElementById('customerEmail').disabled = false;
    document.getElementById('customerPhone').disabled = false;

    // Emergency contact
    document.getElementById('UrgenName').disabled = false;
    document.getElementById('UrgenTel').disabled = false;
    document.getElementById('Relationship').disabled = false;

    // Pet info
    document.getElementById('petName').disabled = false;
    document.getElementById('petType').disabled = false;
    document.getElementById('petBreeds').disabled = false;
    document.getElementById('petAge').disabled = false;
    document.getElementById('petDisease').disabled = false;
    document.getElementById('petVaccine').disabled = false;

    document.getElementById("buttonGroup").classList.remove("hidden-btn");
}


// แก้ไขข้อมูลทั้งหมด
async function confirmEdit() {
    const customerData = {
        CusCID: document.getElementById('customerID').value.trim(),
        CusFname: document.getElementById('customerName').value.trim(),
        CusEmail: document.getElementById('customerEmail').value.trim(),
        CusTel: document.getElementById('customerPhone').value.trim()
    };

    const emergencyData = {
        name: document.getElementById('UrgenName').value.trim(),
        phone: document.getElementById('UrgenTel').value.trim(),
        relationship: document.getElementById('Relationship').value.trim()
    };

    const petData = {
        PName: document.getElementById('petName').value.trim(),
        PType: document.getElementById('petType').value,
        PBreeds: document.getElementById('petBreeds').value,
        PAge: document.getElementById('petAge').value,
        PDisease: document.getElementById('petDisease').value,
        // PVaccine: document.getElementById('petVaccine').files[0] // Handling file upload requires more setup
    };

    const formData = new FormData();
    formData.append('customer', JSON.stringify(customerData));
    formData.append('emergencyContact', JSON.stringify(emergencyData));
    formData.append('pet', JSON.stringify(petData));
    // If you have a file, append it here
    const vaccineFile = document.getElementById('petVaccine').files[0];
    if (vaccineFile) {
        formData.append('petVaccine', vaccineFile);
    }


    if (confirm('Do you want to save the changes?')) {
        try {
            const response = await fetch(`${api}/booking/${bookingID}`, {
                method: 'PUT',
                body: formData
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