// event handler for when the DOM content has loaded
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
        // Figure out what to do when the response is bad
        } else {
            const data = await response.json();

            const conference = data.conferences[0];

            // from index.html = card title class holds the Conference Name
            const nameTag = document.querySelector('.card-title');
            nameTag.innerHTML = conference.name;

            
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {

                const details = await detailResponse.json();

                // get description of conference
                const descriptionTag = document.querySelector('.card-text');
                descriptionTag.innerHTML = details.conference.description;

                // conference location image
                const imageTag = document.querySelector('.card-img-top');
                imageTag.src = details.conference.location.picture_url; 

                console.log(details);
            }
        }
    } catch (e) {
      // Figure out what to do if an error is raised
    }

});
