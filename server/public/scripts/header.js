/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

function loadHeader(){
    const headerHTML = `

            <h1>Anaheim</h1>
            <img src="images/anaheim-skyline.jpg" alt="">
    
    `;
    document.querySelector('.img-container').innerHTML = headerHTML;
}

function loadNav() {
    const navHTML = `

        
            <a href="index.html">Home</a>
            <a href="attractions.html">Attractions</a>
            <a href="restaurants">Restaurants</a>
            <a href="newrestaurant.html">New Resaurant</a>
        
    
    `;
    document.querySelector('.nav-bar').innerHTML = navHTML;
}

function loadFooter(){
    const footerHTML = `

    <span>Contact Info: iallawzi@sfsu.edu</span>
    
    `
    document.querySelector('.footer').innerHTML = footerHTML;
};

document.addEventListener('DOMContentLoaded',function(){
    loadHeader();
    loadNav();
    loadFooter();
});