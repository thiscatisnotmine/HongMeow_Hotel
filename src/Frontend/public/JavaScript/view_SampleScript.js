// Sample Script for Sample_view.thml

const mockapi = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

    // 1.ดึง ssn จาก URL
    // const params = new URLSearchParams(window.location.search);
    // const ssn = params.get('ssn');

    // mock มีแค่แบบจำลองของคนแรก EmpCID = 225537995
    const ssn = 225537995.

    // 2. fetch ไปที่ API โดยใส่ ssn
    if (ssn) {
        fetch(`${mockapi}/employee/${ssn}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(employee => {
            console.log(employee); //กด F12 บนแป้นพิมพ์และไปที่ console เพื่อดูข้อมูลที่ดึงมา
            document.getElementById('employeeInfo').innerHTML = `
                <p><strong>ID Card:</strong> ${employee.EmpCID}</p>
                <p><strong>Name:</strong> ${employee.EmpFname}</p>
                <p><strong>Age:</strong> ${employee.EmpAge}</p>
                <p><strong>Role:</strong> ${employee.EmpRole}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching employee:', error);
            document.getElementById('employeeInfo').innerHTML = '<p>Error loading user data.</p>';
        });
    } else {
        document.getElementById('employeeInfo').innerHTML = '<p>No SSN provided.</p>';
    }