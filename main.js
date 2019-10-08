/*document.getElementById("senate-data").innerHTML = JSON.stringify(data);*/

/*console.log(data.results[0].members[11].first_name + " " + data.results[0].members[11].last_name);*/

function createTable() {
  var senateTable = document.getElementById("taula1");
  var tableBody = document.createElement("tbody");
  var tableHead = document.createElement("thead");
  senateTable.appendChild(tableHead);
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

  senateTable.appendChild(tableBody);

  for (var i = 0; data.results[0].members.length > i; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var link = document.createElement("a");
    link.innerHTML =
      data.results[0].members[i].first_name +
      " " +
      (data.results[0].members[i].middle_name || " ") +
      " " +
      data.results[0].members[i].last_name;
    row.appendChild(cell1);
    cell1.appendChild(link);
    link.href = data.results[0].members[i].url;
    var cell2 = document.createElement("td");
    cell2.innerHTML = data.results[0].members[i].party;
    row.appendChild(cell2);
    var cell3 = document.createElement("td");
    cell3.innerHTML = data.results[0].members[i].state;
    row.appendChild(cell3);
    var cell4 = document.createElement("td");
    cell4.innerHTML = data.results[0].members[i].seniority;
    row.appendChild(cell4);
    var cell5 = document.createElement("td");
    cell5.innerHTML = data.results[0].members[i].votes_with_party_pct + " %";
    row.appendChild(cell5);
    tableBody.appendChild(row);
  }
}

createTable();
