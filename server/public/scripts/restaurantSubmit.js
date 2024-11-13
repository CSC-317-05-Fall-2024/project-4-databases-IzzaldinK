const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Extract fields from the form, and
    // send a request to create a new restaurant

    // Adds restaurant card to memory
    
    const formData = new FormData(event.target);

    const newRestaurant = {
        name: formData.get('name'),
        phone: formData.get('number'),
        address: formData.get('address'),
        photo: formData.get('photo'),
    };

    fetch('/api/restaurants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRestaurant),
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/restaurants';
        } else {
            console.error('Failed to create restaurant:', response);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

document.addEventListener('DOMContentLoaded', () => {
 
    // Add event listener to the form for submit events
    const form = document.querySelector('form');

    form.addEventListener('submit', handleSubmit);
});
