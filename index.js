const cohort = "2410-ftb-et-web-am";
const API_URL =  `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`;
const eventsList = document.getElementById('eventsList');
const form = document.querySelector('form');
const addEvent = document.getElementById('addEvent');


const state = {
  events: [],
};

//get list of events using fetch
async function getEvents() {
  const response = await fetch(API_URL);
  const eventData = await response.json();
  console.log('response is =>', eventData);
  state.events = eventData.data;
  console.log("state =>", state.events)
}

function renderEvents() {
  const eventCards = state.events.map((event, index) => {

    const eventProfile = document.createElement('div');
    
    const date = new Date(event.date);
    
    eventProfile.innerHTML = `
      <h1>${event.name}</h1>
      <p>${date}</p>
      <p>${event.location}</p>
      <p>${event.description}</p>
      <p>${event.description}</p>
      <button class="deleteButton" data-index="${index}">Delete</button>
      `;

      return eventProfile;
  });

  eventsList.replaceChildren(...eventCards);

  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      deleteEvent(index);
    });
  });
} 

//add event listener to the form submission button
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  //variables for each field in the form
  const eventName = document.getElementById("eventNameInput").value.trim();
  const eventDate = document.getElementById("eventDateInput").value;
  const eventLocation = document.getElementById("eventLocationInput").value.trim();
  const eventDescription = document.getElementById("eventDescriptionInput").value.trim();

  //create new object variable for form entry with each field
  const newEvent = {
    name: eventName,
    date: eventDate,
    location: eventLocation,
    description: eventDescription,
  };

  state.events.push(newEvent);
  renderEvents();

  //reset the form
  form.reset;
});

//delete button functionality
function deleteEvent (index) {
  state.events.splice(index, 1);
  renderEvents();
}

async function render() {
  await getEvents();
  renderEvents();

}

render();