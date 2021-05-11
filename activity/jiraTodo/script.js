var fContainer = document.querySelectorAll(".filter-colors__container");
var taskFilters = document.querySelectorAll(".task-filters");
var mainCon = document.querySelector(".block");
var addBtn = document.querySelector(".add");
var crossBtn = document.querySelector(".remove");
var modalCon = document.querySelector(".modal-container");
var dBox = document.querySelector(".desc-box");
var tickets = document.querySelector(".tickets");
var cross = false;
var f = false;
var colors = ["lightpink", "lightblue", "lightgreen", "black"];
var cColor = colors[colors.length - 1];
let ticketsArr = [];

// to set bg color

for (let j = 0; j < fContainer.length; j++) {
  fContainer[j].addEventListener("click", function () {
    // chosen color ticket will be on screen

    // removed everything from tickets container
    tickets.innerHTML = "";

    let strArr = localStorage.getItem("allTickets");
    ticketsArr = JSON.parse(strArr); // ticketArray nikala
    for (let i = 0; i < ticketsArr.length; i++) {
      let str = ticketsArr[i];

      let some = str.split("#"); // split to get color

      if (some[1] == colors[j]) {
        // if it is equal to color, making a new div & putting it back
        let ticket = document.createElement("div");
        ticket.setAttribute("class", "ticket-container");
        ticket.innerHTML = `<div class="top-color ${some[1]}"></div>
      <div class="ticket-sub-container">
          <h3 class="ticketId">${some[0]}</h3>
          <div class="ticket-disc">${some[2]}</div>
      </div>`;

        let ele = ticket.querySelector(".ticket-disc");
        ele.contentEditable = true; // inner text edit kar skte ab

        tickets.appendChild(ticket);

        // adding event listeners
        changeColor(ticket);
        removeTicket(ticket);
      }
    }
  });

  // double click p sab vapis aa jaye
  fContainer[j].addEventListener("dblclick", function () {
    tickets.innerHTML = "";

    let strArr = localStorage.getItem("allTickets");
    ticketsArr = JSON.parse(strArr); // ticketArray nikala
    for (let i = 0; i < ticketsArr.length; i++) {
      let str = ticketsArr[i];

      let some = str.split("#"); // split to get color

      // if it is equal to color, making a new div & putting it back
      let ticket = document.createElement("div");
      ticket.setAttribute("class", "ticket-container");
      ticket.innerHTML = `<div class="top-color ${some[1]}"></div>
      <div class="ticket-sub-container">
          <h3 class="ticketId">${some[0]}</h3>
          <div class="ticket-disc">${some[2]}</div>
      </div>`;

      let ele = ticket.querySelector(".ticket-disc");
      ele.contentEditable = true; // inner text edit kar skte ab

      tickets.appendChild(ticket);

      // adding event listeners
      changeColor(ticket);
      removeTicket(ticket);
    }
  });
}

// to show and hide ticket maker
addBtn.addEventListener("click", function () {
  if (!f) {
    modalCon.style.display = "flex";
  } else {
    modalCon.style.display = "none";
  }
  f = !f;
});

// cross to delete tickets
crossBtn.addEventListener("click", function () {
  cross = !cross;
  if (cross) crossBtn.style.backgroundColor = "black";
  else crossBtn.style.backgroundColor = "rgb(139, 135, 135)";
});

//  var & let-> var global-> i will be 5 before eventListeening event

for (let i = 0; i < taskFilters.length; i++) {
  taskFilters[i].addEventListener("click", function () {
    taskFilters.forEach(function (taskFilter) {
      taskFilter.classList.remove("border");
    });

    taskFilters[i].classList.add("border");
    cColor = taskFilters[i].classList[1];
  });
}

// making ticket by pressing enter
dBox.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && dBox.value != "") {
    let task = dBox.value;
    ticketMaker(task, cColor);
    // for next time
    cColor = colors[colors.length - 1];
    modalCon.style.display = "none";
    f = false;
    dBox.value = "";
  }
});

function ticketMaker(task, color) {
  let id = uid(); // it will get unique id from html

  let ticket = document.createElement("div");
  ticket.setAttribute("class", "ticket-container");
  ticket.innerHTML = `<div class="top-color ${color}"></div>
    <div class="ticket-sub-container">
        <h3 class="ticketId">${id}</h3>
        <div class="ticket-disc">${task}</div>
    </div>`;
  let ele = ticket.querySelector(".ticket-disc");

  ele.contentEditable = true; // inner text edit kar skte ab
  tickets.appendChild(ticket);
  changeColor(ticket);
  removeTicket(ticket);

  //local storage update
  let toPush = id + "#" + color + "#" + task;
  ticketsArr.push(toPush);
  let str = JSON.stringify(ticketsArr);
  localStorage.setItem("allTickets", str);
}

// adding event listeners will work everyhwere, condition is you need a callback with it and not a function call

// remove ticket function;
function removeTicket(ticket) {
  ticket.addEventListener("click", function () {
    if (cross) {
      // removing from local storage
      let id = ticket.querySelector(".ticketId").innerHTML;

      for (let j = 0; j < ticketsArr.length; j++) {
        let some = ticketsArr[j].split("#");
        if (some[0] == id) {
          ticketsArr.splice(j, 1);

          let str = JSON.stringify(ticketsArr);
          localStorage.setItem("allTickets", str);
          break;
        }
      }
      //removing from UI
      tickets.removeChild(ticket);
    }
  });
}

// function to change top color of ticket
function changeColor(ticket) {
  let ele = ticket.querySelector(".top-color");
  ele.addEventListener("click", function () {
    let classArr = ele.classList;
    let color = classArr[1];

    let i = 0;
    for (let j = 0; j < colors.length; j++) {
      if (colors[j] == color) {
        i = j;
        break;
      }
    }

    i = (i + 1) % colors.length;
    ele.classList.remove(color);
    ele.classList.add(colors[i]);

    // updating our local stroage
    let id = ticket.querySelector(".ticketId").innerHTML;

    for (let j = 0; j < ticketsArr.length; j++) {
      let some = ticketsArr[j].split("#");
      if (some[0] == id) {
        some[1] = colors[i];

        ticketsArr.splice(j, 1);
        let tp = some[0] + "#" + some[1] + "#" + some[2];
        ticketsArr.splice(j, 0, tp);
        let str = JSON.stringify(ticketsArr);
        localStorage.setItem("allTickets", str);
        break;
      }
    }
  });
}

// local storage ==============================================================================

if (localStorage.getItem("allTickets")) {
  let strArr = localStorage.getItem("allTickets");

  ticketsArr = JSON.parse(strArr);
  for (let i = 0; i < ticketsArr.length; i++) {
    let str = ticketsArr[i];

    let some = str.split("#");
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket-container");
    ticket.innerHTML = `<div class="top-color ${some[1]}"></div>
    <div class="ticket-sub-container">
        <h3 class="ticketId">${some[0]}</h3>
        <div class="ticket-disc">${some[2]}</div>
    </div>`;
    let ele = ticket.querySelector(".ticket-disc");
    ele.contentEditable = true; // inner text edit kar skte ab
    tickets.appendChild(ticket);
    changeColor(ticket);
    removeTicket(ticket);
  }
}
