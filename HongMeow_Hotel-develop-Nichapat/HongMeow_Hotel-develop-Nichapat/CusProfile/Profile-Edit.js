        const api = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

        const params = new URLSearchParams(window.location.search);
        const customerID = params.get('customerID');
        console.log(customerID);

        let emergencyContacts = []; // Array to store emergency contacts


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

                        // Load emergency contacts
                        if (customer.emergencyContacts && Array.isArray(customer.emergencyContacts)) {
                            emergencyContacts = customer.emergencyContacts;
                            loadEmergencyContacts();
                        }


                    } else {
                        alert('Customer not found!'); // Handle the case where the customer is not found
                    }
                })
                .catch(error => {
                    console.error('Error fetching customer data:', error);
                    alert('Failed to fetch customer data!'); // Inform the user about the error
                });
        };

        function loadEmergencyContacts() {
            const container = document.getElementById('additionalContacts');
            container.innerHTML = ''; // Clear existing contacts
            emergencyContacts.forEach((contact, index) => {
                const contactGroup = document.createElement('div');
                contactGroup.className = 'contact-group';
                contactGroup.innerHTML = `
                    <div class="edit-row"><label for="UrgenName${index}">Name: </label><input type="text" id="UrgenName${index}" name="UrgenName[]" value="${contact.name}" disabled></div>
                    <div class="edit-row"><label for="UrgenTel${index}">Tel: </label><input type="text" id="UrgenTel${index}" name="UrgenTel[]" value="${contact.phone}" disabled></div>
                    <div class="edit-row"><label for="Relationship${index}">Relationship: </label><input type="text" id="Relationship${index}" name="Relationship[]" value="${contact.relationship}" disabled></div>
                    <button class="remove-contact-button" onclick="removeEmergencyContact(${index})">Remove</button>
                `;
                container.appendChild(contactGroup);
            });
        }


        /* Enable Edit Customer Info */
        function enableEdit() {
            document.getElementById('customerID').disabled = false;
            document.getElementById('customerName').disabled = false;
            document.getElementById('customerEmail').disabled = false;
            document.getElementById('customerPhone').disabled = false;

            // Enable editing for existing emergency contacts
            const nameInputs = document.querySelectorAll('input[name="UrgenName[]"]');
            const telInputs = document.querySelectorAll('input[name="UrgenTel[]"]');
            const relationshipInputs = document.querySelectorAll('input[name="Relationship[]"]');

            nameInputs.forEach(input => input.disabled = false);
            telInputs.forEach(input => input.disabled = false);
            relationshipInputs.forEach(input => input.disabled = false);

            document.getElementById("buttonGroup").classList.remove("hidden-btn");
        }

        function addEmergencyContact() {
            const container = document.getElementById('additionalContacts');
            const index = emergencyContacts.length; // Use the current length as the index.

            const contactGroup = document.createElement('div');
            contactGroup.className = 'contact-group';
            contactGroup.innerHTML = `
                <div class="edit-row"><label for="UrgenName${index}">Name: </label><input type="text" id="UrgenName${index}" name="UrgenName[]" ></div>
                <div class="edit-row"><label for="UrgenTel${index}">Tel: </label><input type="text" id="UrgenTel${index}" name="UrgenTel[]" ></div>
                <div class="edit-row"><label for="Relationship${index}">Relationship: </label><input type="text" id="Relationship${index}" name="Relationship[]" ></div>
                <button class="remove-contact-button" onclick="removeEmergencyContact(${index})">Remove</button>
            `;
            container.appendChild(contactGroup);

            emergencyContacts.push({ name: '', phone: '', relationship: '' }); // Add a new empty contact
            console.log(emergencyContacts);
        }

        function removeEmergencyContact(index) {
            emergencyContacts.splice(index, 1); // Remove the contact at the specified index
            console.log(emergencyContacts);
            loadEmergencyContacts(); // Re-render the contact list
        }


        // แก้ไขข้อมูล
        async function confirmEdit() {
            const CusCID = document.getElementById('customerID').value.trim();
            const CusName = document.getElementById('customerName').value.trim(); // Corrected variable name
            const email = document.getElementById('customerEmail').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();

            // Get emergency contact details from the input fields.
             const UrgenNames = document.querySelectorAll('input[name="UrgenName[]"]');
            const UrgenTels = document.querySelectorAll('input[name="UrgenTel[]"]');
            const Relationships = document.querySelectorAll('input[name="Relationship[]"]');

            emergencyContacts = []; // Clear the array before updating it.

            UrgenNames.forEach((nameInput, index) => {
                emergencyContacts.push({
                    name: nameInput.value.trim(),
                    phone: UrgenTels[index].value.trim(),
                    relationship: Relationships[index].value.trim()
                });
            });



            const formData = new FormData();
            formData.append('CusCID', CusCID); // Changed from CusID to CusCID to match the expected form data
            formData.append('CusFname', CusName); // Changed from fname to CusName
            formData.append('CusEmail', email);
            formData.append('CusTel', phone);
            formData.append('emergencyContacts', JSON.stringify(emergencyContacts)); // Send emergency contacts


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