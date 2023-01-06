import './css/style.css';
import SteinStore from 'stein-js-client';

// Create SStein Store instance
const store = new SteinStore(
    'https://api.steinhq.com/v1/storages/63b713daeced9b09e9b0a04f'
);

const signUp = document.getElementById('signup');
const user = document.querySelector('.user');
const button = document.querySelector('.btn');
const form = document.querySelector('form');
const crowdImg = document.querySelector("img[src='./img/crowd.webp']");
const attendees = document.querySelector('.attendees');

// ========= Event listener's =============== //

// Sign-up button listener
signUp.addEventListener('click', () => {
    user.classList.toggle('form--appear');
    crowdImg.classList.toggle('visible');
});

// Event listener to submit form data to Google sheets
button.addEventListener('click', function () {
    // lets
    let formData = new FormData(form);
    let arrayFormData = [];

    form.classList.add('form--no');
    // Need to convert FormData object to array object for stein to accept.
    formData = Object.fromEntries(formData.entries());
    arrayFormData.push(formData);

    store.append('signup', arrayFormData).then((res) => {
        console.log(res);
        form.reset();
    });
});

// Event listener to retrieve attendees & create template for
// attendee table
attendees.addEventListener('click', () => {
    store.read('signup').then((data) => {
        console.log(data);
    });

    // Handlebars template code
    let template = document.getElementById('template').innerHTML;

    //Compile the template
    let compiled_template = Handlebars.compile(template);

    //Render the data into the template
    let rendered = compiled_template({ name: 'Luke', power: 'force' });

    //Overwrite the contents of #target with the renderer HTML
    document.getElementById('target').innerHTML = rendered;

    user.classList.toggle('visible');

    //  ============= End Template code =============== //
});
