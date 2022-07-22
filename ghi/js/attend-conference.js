window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        // Here, add the 'd-none' class to the loading icon/tag
        const loadingTag = document.getElementById('loading-conference-spinner');
        loadingTag.classList.add('d-none');
        // Here, remove the 'd-none' class from the select tag
        selectTag.classList.remove('d-none');


        // HANDLE THE FORM POST to add an attendee to the back-end
        // get attendee form element by its id
        const formTag = document.getElementById('create-attendee-form');
        // add an event handler for the submit event
        formTag.addEventListener('submit', async event => {
            // Prevent the default from happening
            event.preventDefault();

            // Create a FormData object from the form
            const formData = new FormData(formTag);

            // Get a new object from the form data's entries
            const json = JSON.stringify(Object.fromEntries(formData));

            // Create options for the fetch
            const attendeesUrl = 'http://localhost:8001/api/attendees/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            // Make the fetch using the await keyword to the 
            // URL http://localhost:8001/api/attendees/
            const response = await fetch(attendeesUrl, fetchConfig);
            if (response.ok) {

                // When the response from the fetch is good, you need to remove 
                // the d-none from the success alert and add d-none to the form.
                const successTag = document.getElementById('success-message');
                successTag.classList.remove('d-none');
                const createFormTag = document.getElementById('create-attendee-form');
                createFormTag.classList.add('d-none');
            }

        });

    }
});