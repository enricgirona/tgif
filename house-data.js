// Global Variables
var members = data.results[0].members;

// Function Callings
createTable(members);

// Function Declaration
function createTable(array) {
  var mainTable = document.getElementById("mainTable");
  var tableBody = document.createElement("tbody");
  var tableHead = document.createElement("thead");
  mainTable.appendChild(tableHead);
  var row = document.createElement("tr");
  tableHead.appendChild(row);

  var cell1 = document.createElement("th");
  var cell2 = document.createElement("th");
  var cell3 = document.createElement("th");
  var cell4 = document.createElement("th");
  var cell5 = document.createElement("th");

  cell1.innerHTML = "Name";
  cell2.innerHTML = "Party";
  cell3.innerHTML = "State";
  cell4.innerHTML = "Years in Office";
  cell5.innerHTML = "% of Votes with the Party";
  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  row.appendChild(cell4);
  row.appendChild(cell5);

  mainTable.appendChild(tableBody);

  for (var i = 0; array.length > i; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var link = document.createElement("a");
    link.innerHTML = array[i].first_name + " " + (array[i].middle_name || " ") + " " + array[i].last_name;
    row.appendChild(cell1);
    cell1.appendChild(link);
    link.href = array[i].url;
    var cell2 = document.createElement("td");
    cell2.innerHTML = array[i].party;
    row.appendChild(cell2);
    var cell3 = document.createElement("td");
    cell3.innerHTML = array[i].state;
    row.appendChild(cell3);
    var cell4 = document.createElement("td");
    cell4.innerHTML = array[i].seniority;
    row.appendChild(cell4);
    var cell5 = document.createElement("td");
    if (array[i].votes_with_party_pct == undefined) {
      cell5.innerHTML = " - ";
    } else {
      cell5.innerHTML = array[i].votes_with_party_pct + " %";
    }
    row.appendChild(cell5);
    tableBody.appendChild(row);
  }
}