const api = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

const params = new URLSearchParams(window.location.search);
const customerID = params.get('customerID');
console.log(customerID);


window.onload = function () {
    // Fetch customer data
    fetch(`${api}/customer/${customerID}`)
        .then(res => res.json())
        .then(customer => {
            console.log(customer);
            if (customer) { // Check if customer data exists
                document.getElementById('customerID').value = customer.CusCID || "";
                document.getElementById('customerName').value = customer.CusFname || "";
                document.getElementById('customerEmail').value = customer.CusEmail || "";
                document.getElementById('customerPhone').value = customer.CusTel || "";
            } else {
                alert('Customer not found!'); // Handle the case where the customer is not found
            }
        })
        .catch(error => {
            console.error('Error fetching customer data:', error);
            alert('Failed to fetch customer data!'); // Inform the user about the error
        });
};


/* Enable Edit Customer Info */
function enableEdit() {
    document.getElementById('customerID').disabled = false;
    document.getElementById('customerName').disabled = false;
    document.getElementById('customerEmail').disabled = false;
    document.getElementById('customerPhone').disabled = false;
    document.getElementById("buttonGroup").classList.remove("hidden-btn");
}


// แก้ไขข้อมูล
async function confirmEdit() {
    const CusCID = document.getElementById('customerID').value.trim();
    const CusName = document.getElementById('customerName').value.trim(); // Corrected variable name
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    const formData = new FormData();
    formData.append('CusCID', CusCID); // Changed from CusID to CusCID to match the expected form data
    formData.append('CusFname', CusName); // Changed from fname to CusName
    formData.append('CusEmail', email);
    formData.append('CusTel', phone);


    if (confirm('Do you want to save the data?')) {
        // User clicked OK
        try {
            const response = await fetch(`${api}/customer/${customerID}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                alert('Information sent successfully.');
                location.reload();
            } else {
                const errorText = await response.text(); // Get the error message
                alert(`Failed to send data. Server responded with: ${response.status} - ${errorText}`);
                console.error('Server error:', response.status, errorText); // Log the error
            }
        } catch (error) {
            alert('An error occurred while sending data: ' + error.message); // Handle network errors
            console.error('Fetch error:', error);
        }
    } else {
        // User clicked Cancel
        console.log("Changes not saved");
    }

}


// ยกเลิกการแก้ไขข้อมูล
function cancelEdit() {
    if (confirm('Do you want to discard the changes?')) {
        // User clicked OK
        console.log("Changes discarded");
        location.reload();
    } else {
        // User clicked Cancel
        console.log("Changes not discarded");
    }
}