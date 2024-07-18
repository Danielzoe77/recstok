

document.addEventListener('DOMContentLoaded', () => {
  const dropdownElements = document.querySelectorAll('.dropdown');

  dropdownElements.forEach((dropdown) => {
    const dropdownButton = dropdown.querySelector('.dropdownbtn');
    const dropdownMenu = dropdown.querySelector('.menu');
    const dropdownIcon = dropdownButton.querySelector('i');

    dropdownButton.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
      dropdownIcon.classList.toggle('rotate-180');
    });
  });

  document.addEventListener('click', (e) => {
      dropdownElements.forEach((dropdown) => {
          const dropdownMenu = dropdown.querySelector('.menu');
          const dropdownIcon = dropdown.querySelector('i');

          if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
              dropdownMenu.classList.add('hidden');
              dropdownIcon.classList.remove('rotate-180');
          }
      });
  });
});


  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

const form = document.getElementById('paymentForm');
const tableBody = document.getElementById('recordstbody');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const className = document.getElementById('className').value;
  const studentName = document.getElementById('studentName').value;
  const amountToBePaid = document.getElementById('amountToBePaid').value;
  const amountDeposited = document.getElementById('amountDeposited').value;
 
  const balance =  amountDeposited - amountToBePaid;
 
  const token = localStorage.getItem("token");
  
  fetch('http://localhost:3000/api/records/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ className, studentName, amountToBePaid, amountDeposited,balance }),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
    .then((data) => {
      const tableRow = createTableRow(className, studentName, amountToBePaid, amountDeposited, balance, data._id);
      console.log(tableRow);
     
      tableBody.appendChild(tableRow);
      getRecords(); 
     

      
     
    })
  
    .catch((error) => console.error('Error:', error));
 
  form.reset();
  
 
});

function createTableRow(className, studentName, amountToBePaid, amountDeposited, balance, id) {
  const tableRow = document.createElement('tr');
  const classTd = document.createElement('td');
  const nameTd = document.createElement('td');
  const amountToBePaidTd = document.createElement('td');
  const amountDepositedTd = document.createElement('td');
  const balanceTd = document.createElement('td');
  const editTd = document.createElement('td');
  const deleteTd = document.createElement('td');

  classTd.textContent = className;
  nameTd.textContent = studentName;
  amountToBePaidTd.textContent = amountToBePaid;
  amountDepositedTd.textContent = amountDeposited;
  balanceTd.textContent = balance.toFixed(2);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editRecord(id, tableRow));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteRecord(id, tableRow));

  editTd.appendChild(editButton);
  deleteTd.appendChild(deleteButton);

  tableRow.appendChild(classTd);
  tableRow.appendChild(nameTd);
  tableRow.appendChild(amountToBePaidTd);
  tableRow.appendChild(amountDepositedTd);
  tableRow.appendChild(balanceTd);
  tableRow.appendChild(editTd);
  tableRow.appendChild(deleteTd);

  return tableRow;
}




function editRecord(id, row) {

  const className = row.cells[0].textContent;
  const studentName = row.cells[1].textContent;
  const amountToBePaid = row.cells[2].textContent;
  const amountDeposited = row.cells[3].textContent;
  document.getElementById('className').value = className;
  document.getElementById('studentName').value = studentName;
  document.getElementById('amountToBePaid').value = amountToBePaid;
  document.getElementById('amountDeposited').value = amountDeposited;
  
  const updatedRecord = {
    className,
    studentName,
    amountToBePaid,
    amountDeposited
  };
  
  
  fetch(`https://skulrecbackendcod.onrender.com/api/records/updateRecord/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedRecord)
  })
  .then(response => response.json())
  .then(updatedRecord => {
    // Update the table row with the updated data
    const row = document.getElementById(`row_${id}`);
    row.cells[0].textContent = updatedRecord.className;
    row.cells[1].textContent = updatedRecord.studentName;
    row.cells[2].textContent = updatedRecord.amountToBePaid;
    row.cells[3].textContent = updatedRecord.amountDeposited;
  });
 
}

function deleteRecord(id, row) {
  row.remove();
  fetch(`https://skulrecbackendcod.onrender.com/api/records/deleteRecord/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

const getRecords = async () => {
  const token = localStorage.getItem('token');

  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload;
  const {id} = userId;
  const response = await fetch(`https://skulrecbackendcod.onrender.com/api/records/getRecords/${id}`);
  const records = await response.json();


  if (Array.isArray(records)) {
    const tableBody = document.getElementById('recordstbody');
    tableBody.innerHTML = '';

    records.forEach((record) => {
      const tableRow = document.createElement('tr');

      const classTd = createTableCell(record.className);
      const nameTd = createTableCell(record.studentName);
      const amountToBePaidTd = createTableCell(record.amountToBePaid);
      const amountDepositedTd = createTableCell(record.amountDeposited);
      const balanceTd = createTableCell(record.balanceAmount);

      const editTd = createEditCell(record._id, tableRow);
      const deleteTd = createDeleteCell(record._id, tableRow);

      tableRow.appendChild(classTd);
      tableRow.appendChild(nameTd);
      tableRow.appendChild(amountToBePaidTd);
      tableRow.appendChild(amountDepositedTd);
      tableRow.appendChild(balanceTd);
      tableRow.appendChild(editTd);
      tableRow.appendChild(deleteTd);
      tableBody.appendChild(tableRow);
    });
  }
};

function createTableCell(textContent) {
  const td = document.createElement('td');
  td.textContent = textContent;
  return td;
}

function createEditCell(recordId, tableRow) {
  const editTd = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editRecord(recordId, tableRow));
  editTd.appendChild(editButton);
  return editTd;
}

function createDeleteCell(recordId, tableRow) {
  const deleteTd = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteRecord(recordId, tableRow));
  deleteTd.appendChild(deleteButton);
  return deleteTd;
}

document.addEventListener('DOMContentLoaded', getRecords);
getRecords()


//update record
const updateRecord = async () => {
  const token = localStorage.getItem('token');
  console.log(token);
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload;
  console.log(userId);
  const {id} = userId;
  const response = await fetch(`https://skulrecbackendcod.onrender.com/api/records/getRecords/${id}`);
  const records = await response.json();
  console.log(records);
}

//greeting message


const greeting = document.getElementById('greeting');
const token = localStorage.getItem('token');
const id = JSON.parse(atob(token.split('.')[1])).id; // Get the id from the token

fetch(`https://skulrecbackendcod.onrender.com/api/users/${id}`, {
  method: 'GET',
  // credentials: 'include' // Send cookies to the server
})
.then(response => {
  return response.json();
})
.then(data => {
  greeting.textContent = `Welcome, ${data.fullname.toUpperCase()}`;
})
.catch(error => {
  console.error('Error:', error); // Log the error
  greeting.textContent = 'Hello Guest';
});
//logout
const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
  fetch('https://skulrecbackendcod.onrender.com/api/users/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('Response:', response); // Log the response object
    return response.json();
  })
  .then(data => {
    console.log('Data:', data); // Log the data from the server
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  })
  .catch(error => console.error(error));
});


// const searchInput = document.getElementById('search');
// const recordsTable = document.getElementById('recordstbody');

// searchInput.addEventListener('input', () => {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   const records = [...recordsTable.rows].slice(0); // exclude header row

//   const filteredRecords = records.filter((record) => {
//     const name = record.cells[1].textContent.trim().toLowerCase();
//     return name.includes(searchTerm);
//   });

//   recordsTable.innerHTML = '';
//   filteredRecords.forEach((record) => recordsTable.appendChild(record));
// })

const searchInput = document.getElementById('search');
const recordsTable = document.getElementById('recordstbody');

let originalRecords = [];



const gettRecords = async () => {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload;
  const {id} = userId;
  const response = await fetch(`https://skulrecbackendcod.onrender.com/api/records/getRecords/${id}`);
  const records = await response.json();
  return records;
}

const geRecords = async () => {
  const records = await gettRecords();
  originalRecords = records.map((record) => ({
    ...record,
  }))
  
}

document.addEventListener('DOMContentLoaded', geRecords);

// searchInput.addEventListener('input', () => {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   const filteredRecords = originalRecords.filter((record) => {
//     const name = record.studentName.trim().toLowerCase();
//     console.log(name);
//     return name.includes(searchTerm);
//   });
//   recordsTable.innerHTML = '';
//   filteredRecords.forEach((record) => {
//     const row = document.createElement('tr'); // Create a table row element
//     const cell = document.createElement('td'); // Create a table cell element
//     cell.textContent = record.studentName; // Set the cell text to the student name
//     row.appendChild(cell); // Append the cell to the row
//     recordsTable.appendChild(row); // Append the row to the table
//   });
// });
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredRecords = originalRecords.filter((record) => {
    const name = record.studentName.trim().toLowerCase();
    return name.includes(searchTerm);
  });
  recordsTable.innerHTML = '';
  filteredRecords.forEach((record) => {
    const row = document.createElement('tr');
    const columns = ['className', 'studentName', 'amountToBePaid', 'amountDeposited',' balanceAmount', 'edit', 'delete']; // Define the column names
    columns.forEach((column) => {
      const cell = document.createElement('td');
      cell.textContent = record[column]; // Get the value from the record object
      row.appendChild(cell);
    });
    recordsTable.appendChild(row);
  });
});




