// Global Variables
var members = data.results[0].members;

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

// Function Callings
fillStatistics(members);

createGlance(statisticsArray);

engagement(members, "most-loyal", -1, 1);

engagement(members, "least-loyal", 1, -1);

// Function Declaration
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
    cell3.innerHTML = (array[i].loyalty.toFixed(2) || "0") + " %";
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
  }
}

function fillTable(array, id, i) {
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
  cell2.innerHTML = ((array[i].total_votes / 100) * array[i].votes_with_party_pct).toFixed(0);
  cell3.innerHTML = array[i].votes_with_party_pct + " %";
  newRow.appendChild(cell2);
  newRow.appendChild(cell3);
}

function engagement(array, id, x, y) {
  array.sort(function(a, b) {
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return x;
    }
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return y;
    }
    return 0;
  });
  for (let i = 0; i < array.length; i++) {
    if (i < Math.round(array.length / 100) * 10) {
      fillTable(array, id, i);
    } else if (array[i - 1].votes_with_party_pct == array[i].votes_with_party_pct) {
      fillTable(array, id, i);
    } else {
      break;
    }
  }
}
