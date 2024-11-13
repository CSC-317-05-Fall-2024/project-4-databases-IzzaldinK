/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/


document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(button => 
        button.addEventListener('click', () => deleteRestaurantCard(button))
    );
});

// Deletes restaurant card from memory

const deleteRestaurantCard = button => {
    const restaurantCard = button.closest('.restaurant');
    const restaurantId = restaurantCard.dataset.id;
    fetch(`/api/restaurants/${restaurantId}`, {
        method : 'Delete'
    })
    .then(response => {
        if(response.ok){
            window.location.reload();
        }else {
            console.error("Error while deleting");
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });
};