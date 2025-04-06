document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById('FirstName');
    const lastName = document.getElementById('LastName');
    const age = document.getElementById('Age');
    const dataTable = document.getElementById('data-table'); // Table to display data
    const addBtn = document.getElementById('add-data');
    const downloadBtn = document.getElementById('download'); // Button to download data

    const data = []; // Array to store data dynamically

    // Function to render the data table
    function renderTable() {
        const tbody = dataTable.querySelector('tbody');
        tbody.innerHTML = ''; // Clear previous table rows

        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.surname}</td>
                <td>${item.age}</td>
                <hr>
                <td><button class="delete" data-index="${index}">Delete</button></td>
            `;
            tbody.appendChild(row);

            // Add event listener for the delete button
            const deleteBtn = row.querySelector('.delete');
            deleteBtn.addEventListener('click', () => {
                data.splice(index, 1); // Remove item from array
                renderTable(); // Re-render the table
            });
        });
    }

    // Event listener for the "Add" button
    addBtn.addEventListener("click", () => {
        const name = firstName.value.trim().toLowerCase();
        const surname = lastName.value.trim().toLowerCase();
        const getAge = age.value;

        if (name === "" || surname === "" || getAge === "") {
            alert("Please enter some values.");
        }
        if (getAge < 20) {
            alert("Age must be greater than 20.");
            return;
        }
        else {
            // Add new data to the array
            data.push({
                name: name,
                surname: surname,
                age: getAge
            });

            // Clear the input fields
            firstName.value = '';
            lastName.value = '';
            age.value = '';

            // Re-render the table
            renderTable();
        }
    });

    // Event listener for the "Download Data" button to download as PDF
    downloadBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf; // Access jsPDF object
        const doc = new jsPDF(); // Create a new PDF instance

        // Adding title to the PDF
        doc.text('Mahloris Table', 14, 10);

        // Prepare the data to be printed in the table
        const tableData = data.map((item, index) => [
            index + 1, item.name, item.surname, item.age
        ]);

        // Define columns for the table
        const columns = ['Id', 'First Name', 'Last Name', 'Age'];

        // Add the table content to the PDF using autoTable
        doc.autoTable({
            head: [columns],
            body: tableData,
            startY: 20, // Start the table below the title
            margin: { horizontal: 10 }, // Margins around the table
        });

        // Save the generated PDF
        doc.save('table-data.pdf'); // Downloads the file with the name 'table-data.pdf'
    });
});
