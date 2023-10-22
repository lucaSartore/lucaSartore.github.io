
const home_selector = document.getElementById('home_selector');
const portfolio_selector = document.getElementById('portfolio_selector');
const services_selector = document.getElementById('services_selector');
const contacts_selector = document.getElementById('contacts_selector');

const all_selectors = [home_selector, portfolio_selector, services_selector, contacts_selector]

// this is a <div> element
const top_bar = document.getElementById('top_bar');

var selected_button;
all_selectors.forEach(button => {
    if(button.classList.contains('selector_main')){
        selected_button = button;
    }
    add_button_animation(button);
});


function add_button_animation(button){
// hover animation
button.addEventListener('mouseover', () => {
    if (button == selected_button) {
    return;
    }
    button.style.animation = 'selector_hover 0.15s linear forwards'
});
// hover end animation
button.addEventListener('mouseout', () => {
    if (button == selected_button) {
    return;
    }
    button.style.animation = 'selector_hover_reverse 0.15s linear forwards'
}); 
// upgrade animation
button.addEventListener('click', () => {
    if (button == selected_button) {
    return;
    }
    button.style.animation = 'selector_upgrade 0.2s linear forwards'
    selected_button.style.animation = 'selector_downgrade 0.15s linear forwards'

    selected_button.classList.remove('selector_main')
    selected_button.classList.add('selector')
    selected_button.style.animation = 'selector_downgrade 0.15s linear forwards'
    button.classList.remove('selector')
    button.classList.add('selector_main')
    selected_button = button

    setTimeout(() =>next_page(button), 150)
});
}

function next_page(button){
    if (button == home_selector) {
        window.location.href = "../home/home.html";
    }
    if (button == portfolio_selector) {
        window.location.href = "../portfolio/portfolio.html";
    }
    if (button == services_selector) {
        window.location.href = "../services/services.html";
    }
    if (button == contacts_selector) {
        window.location.href = "../contacts/contacts.html";
    }
}
