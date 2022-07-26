// add an event listener for when the DOM loads
window.addEventListener('DOMContentLoaded', async () => {

  // declare a variable that will hold the URL for the STATES API
  const url = 'http://localhost:8000/api/states/';

  // fetch the URL. Don't forget the await keyword so that we get the response, not the Promise
  const response = await fetch(url);

  if (response.ok) {
    // if response is okay, get data using .json method.
    // Don't forget to use await
    const data = await response.json();

    const selectTag = document.getElementById('state');

    for (let state of data.states) {
      // Create an 'option' element
      let option = document.createElement('option');

      // Set the '.value' property of the option element to the
      // state's abbreviation
      option.value = Object.values(state);

      // Set the '.innerHTML' property of the option element to
      // the state's name
      option.innerHTML = Object.keys(state);

      // Append the option element as a child of the select tag
      selectTag.appendChild(option);
    }


    // State fetching code, here...
    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
      event.preventDefault();
      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData));

      // Send data
      const locationUrl = 'http://localhost:8000/api/locations/';
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(locationUrl, fetchConfig);
      if (response.ok) {
        formTag.reset();
        const newLocation = await response.json();
      }
    })
  }
});