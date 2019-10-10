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
  }
};

statisticsArray = Object.values(statistics);

// Function Callings
fillTable(members);

createTable(statisticsArray);

// Function Declaration
function fillTable(array) {
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
  statistics.independents.loyalty = statistics.independents.loyaltyGlobal / statistics.republicans.number;
}

function createTable(array) {
  for (i = 0; i < array.length; i++) {
    var tableBody = document.getElementById("table-body");
    var newRow = document.createElement("tr");
    tableBody.appendChild(newRow);
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    cell1.innerHTML = array[i].party;
    cell2.innerHTML = array[i].number;
    cell3.innerHTML = array[i].loyalty;
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
  }
}
