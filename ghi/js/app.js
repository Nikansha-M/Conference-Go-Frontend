// get the details for each conference, pass it into this function, 
// get a string back, and add it to the innerHTML of the columns
function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
        <div class="column">
            <div class="card shadow-lg">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                </div>

                <div class="card-footer">
                <small class="text-muted">${starts} - ${ends}</small>
                </div>

            </div>
        </div>
    `;
}


// event handler for when the DOM content has loaded
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Figure out what to do when the response is bad
            throw new Error("Error: Bad Response!")
        } else {
            const data = await response.json();

            // we're going to iterate through each card 
            // column, start by setting i to 0
            let i = 0;

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);

                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const starts = new Date(details.conference.starts).toLocaleDateString();
                    const ends = new Date(details.conference.ends).toLocaleDateString();
                    const location = details.conference.location.name;
                    // create the card
                    const html = createCard(name, description, pictureUrl, starts, ends, location);
                    // selecting the column to place the card from 
                    // index.html either col-0, col-1, col-2
                    const column = document.querySelector(`#col-${i % 3}`);
                    column.innerHTML += html;
                    // increment the column counter by 1 each time
                    i++;
                }
            }
        }
    } catch (e) {
        // Figure out what to do if an error is raised
        console.error('error', e);
    }
});
