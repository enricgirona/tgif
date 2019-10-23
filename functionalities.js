// Global Variables
var members;

var statistics = {
  democrats: {
    party: "Democrats",
    number: 0,
    loyaltyGlobal: 0,
    loyalty: 0
  },

  republicans: {
    party: "Republicans",
    number: 0,
    loyaltyGlobal: 0,
    loyalty: 0
  },

  independents: {
    party: "Independents",
    number: 0,
    loyaltyGlobal: 0,
    loyalty: 0
  },

  total: {
    party: "Total",
    number: 0,
    loyaltyGlobal: 0,
    loyalty: 0
  }
};

statisticsArray = Object.values(statistics);

var selector = document.getElementById("states");

var currentState;

var data = [];

// Fetch
if (window.location.pathname.includes("senate") == true) {
  fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: "GET",
    headers: {
      "X-API-Key": "44SeJ6t27roT2JFKVCOm6ypyzlj2Fo8cWZj9rtdx"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      members = data.results[0].members;
      init();
      var loading = document.getElementById("loading-page");
      loading.parentNode.removeChild(loading);
    })
    .catch(error => {
      console.log(error);
    });
} else {
  fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
    method: "GET",
    headers: {
      "X-API-Key": "44SeJ6t27roT2JFKVCOm6ypyzlj2Fo8cWZj9rtdx"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      members = data.results[0].members;
      init();
      var loading = document.getElementById("loading-page");
      loading.parentNode.removeChild(loading);
    })
    .catch(error => {
      console.log(error);
    });
}

// EventListeners
if (window.location.pathname.includes("data") == true) {
  document.getElementById("states").addEventListener("change", filter);
  document.getElementById("democrats").addEventListener("click", filter);
  document.getElementById("republicans").addEventListener("click", filter);
  document.getElementById("independents").addEventListener("click", filter);
}

// Function Calls
loading();

// Function Declaration
function loading() {
  var loader = document.createElement("div");
  loader.classList.add("spinner-border", "text-light");
  document.getElementById("loading-page").appendChild(loader);
}

function init() {
  if (window.location.pathname.includes("data") == true) {
    createTable(members);
    getStates();
  } else {
    fillStatistics(members);

    createGlance(statisticsArray);
    if (window.location.pathname.includes("attendance") == true) {
      engagement(members, "least-engaged", -1, 1, "missed_votes_pct", "missed_votes");

      engagement(members, "most-engaged", 1, -1, "missed_votes_pct", "missed_votes");
    } else {
      engagement(members, "most-loyal", -1, 1, "votes_with_party_pct", "total_votes");

      engagement(members, "least-loyal", 1, -1, "votes_with_party_pct", "total_votes");
    }
  }
}

function fillStatistics(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i].party == "D") {
      statistics.democrats.number++;
      statistics.democrats.loyaltyGlobal += array[i].votes_with_party_pct;
    }
    if (array[i].party == "R") {
      statistics.republicans.number++;
      statistics.republicans.loyaltyGlobal += array[i].votes_with_party_pct;
    }
    if (array[i].party == "I") {
      statistics.independents.number++;
      statistics.independents.loyaltyGlobal += array[i].votes_with_party_pct;
    }
  }
  statistics.democrats.loyalty = statistics.democrats.loyaltyGlobal / statistics.democrats.number;
  statistics.republicans.loyalty = statistics.republicans.loyaltyGlobal / statistics.republicans.number;
  statistics.independents.loyalty = statistics.independents.loyaltyGlobal / statistics.independents.number;
  statistics.total.number = statistics.democrats.number + statistics.republicans.number + statistics.independents.number;
  statistics.total.loyaltyGlobal =
    statistics.democrats.loyaltyGlobal + statistics.republicans.loyaltyGlobal + statistics.independents.loyaltyGlobal;
  statistics.total.loyalty = statistics.total.loyaltyGlobal / statistics.total.number;
}

function createGlance(array) {
  for (i = 0; i < array.length; i++) {
    var tableBody = document.getElementById("at-a-glance");
    var newRow = document.createElement("tr");
    tableBody.appendChild(newRow);
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    cell1.innerHTML = array[i].party;
    cell2.innerHTML = array[i].number;
    cell3.innerHTML = (array[i].loyalty || 0).toFixed(2) + " %";
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
  }
}

function fillTable(array, id, i, param, param2) {
  var tableBody = document.getElementById(id);
  var newRow = document.createElement("tr");
  tableBody.appendChild(newRow);
  var cell1 = document.createElement("td");
  var link = document.createElement("a");
  link.innerHTML = array[i].first_name + " " + (array[i].middle_name || " ") + " " + array[i].last_name;
  newRow.appendChild(cell1);
  cell1.appendChild(link);
  link.href = array[i].url;
  var cell2 = document.createElement("td");
  var cell3 = document.createElement("td");
  cell2.innerHTML = array[i][param2].toFixed(0);
  cell3.innerHTML = array[i][param] + " %";
  newRow.appendChild(cell2);
  newRow.appendChild(cell3);
}

function engagement(array, id, x, y, param, param2) {
  array.sort(function(a, b) {
    if (a[param] > b[param]) {
      return x;
    }
    if (a[param] < b[param]) {
      return y;
    }
    return 0;
  });
  for (let i = 0; i < array.length; i++) {
    if (i < Math.round(array.length / 100) * 10) {
      fillTable(array, id, i, param, param2);
    } else if (array[i - 1][param] == array[i][param]) {
      fillTable(array, id, i, param, param2);
    } else {
      break;
    }
  }
}

function createTable(array) {
  var mainTable = document.getElementById("mainTable");
  mainTable.innerHTML = "";
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

function getStates() {
  var everyState = ["All States"];
  for (i = 0; i < members.length; i++) {
    if (everyState.includes(members[i].state) === false) {
      everyState.push(members[i].state);
    }
  }

  for (i = 0; i < everyState.length; i++) {
    var oneState = document.createElement("option");
    oneState.setAttribute("value", everyState[i]);
    oneState.innerHTML = everyState[i];
    selector.appendChild(oneState);
  }
}

function filter() {
  if (selector.value == "All States") {
    firstMembers = members;
    if (
      document.getElementById("democrats").checked ||
      document.getElementById("republicans").checked ||
      document.getElementById("independents").checked
    ) {
      var finalMembers = firstMembers.filter(
        member =>
          (document.getElementById("democrats").checked && member.party == "D") ||
          (document.getElementById("republicans").checked && member.party == "R") ||
          (document.getElementById("independents").checked && member.party == "I")
      );
      createTable(finalMembers);
      if (finalMembers[0] == null) {
        var alert = document.getElementById("mainTable");
        var alertMessage = document.createElement("p");
        alertMessage.innerHTML = "Sorry, there's no data to display with this requeriments...";
        alert.appendChild(alertMessage);
      }
    } else {
      createTable(firstMembers);
      if (firstMembers[0] == null) {
        var alert = document.getElementById("mainTable");
        var alertMessage = document.createElement("p");
        alertMessage.innerHTML = "Sorry, there's no data to display with this requeriments...";
        alert.appendChild(alertMessage);
      }
    }
  } else {
    firstMembers = members.filter(member => selector.value == member.state);
    if (
      document.getElementById("democrats").checked ||
      document.getElementById("republicans").checked ||
      document.getElementById("independents").checked
    ) {
      var finalMembers = firstMembers.filter(
        member =>
          (document.getElementById("democrats").checked && member.party == "D") ||
          (document.getElementById("republicans").checked && member.party == "R") ||
          (document.getElementById("independents").checked && member.party == "I")
      );
      createTable(finalMembers);
      if (finalMembers[0] == null) {
        var alert = document.getElementById("mainTable");
        var alertMessage = document.createElement("p");
        alertMessage.innerHTML = "Sorry, there's no data to display with this requeriments...";
        alert.appendChild(alertMessage);
      }
    } else {
      createTable(firstMembers);
      if (firstMembers[0] == null) {
        var alert = document.getElementById("mainTable");
        var alertMessage = document.createElement("p");
        alertMessage.innerHTML = "Sorry, there's no data to display with this requeriments...";
        alert.appendChild(alertMessage);
      }
    }
  }
}
