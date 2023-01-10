import './css/style.css';
import SteinStore from 'stein-js-client';
import sortTable from './modules/sortTables';

// Create Stein Store instance
const VITE_STEIN_URL = import.meta.env.VITE_STEIN_URL;
const store = new SteinStore(VITE_STEIN_URL);

const signUp = document.getElementById('signup');
const user = document.querySelector('.user');
const button = document.querySelector('.btn');
const form = document.querySelector('form');
const crowdImg = document.querySelector("img[src='./public/crowd.webp']");
const attendees = document.querySelector('.attendees');
const tableTemplate = document.getElementById('target');

// ========= Event listener's =============== //

// Sign-up button listener
signUp.addEventListener('click', () => {
    user.classList.toggle('form--appear');
    crowdImg.classList.toggle('visible');
});

// ===== Event listener to submit form data to Google sheets ======== //
button.addEventListener('click', function () {
    // lets grab data from form
    let formData = new FormData(form);
    let arrayFormData = [];

    form.classList.add('form--no');
    // Need to convert FormData object to array object for stein to accept.
    formData = Object.fromEntries(formData.entries());
    arrayFormData.push(formData);

    // Let's hit the stein API with the form data
    try {
        store.append('signup', arrayFormData).then((res) => {
            console.log(res);
            form.reset();
            button.innerHTML = `Sign-up succesful. ${res.updatedRange}`;
        });
    } catch (error) {
        console.error(error);
        alert('Add attendee failed! Sorry try again.');
    }
});

// ===== End Event listener to submit form data =================== //

// ===== Event listener to retrieve attendees & create   ==== //
// ===== template forattendee table using Handlebars.js  ==== //
attendees.addEventListener('click', () => {
    let attendeesArray = [];
    if (tableTemplate.classList.contains('visible')) {
        tableTemplate.classList.remove('visible');
    }

    try {
        store
            .read('signup')
            .then((data) => {
                attendeesArray = data;

                // ===== Handlebars template code ============ //
                let template = document.getElementById('template').innerHTML;

                //Compile the template
                let compiled_template = Handlebars.compile(template);

                //Render the data into the template
                let rendered = compiled_template({ attendeesArray });

                //Overwrite the contents of #target with the renderer HTML
                document.getElementById('target').innerHTML = rendered;

                // toggle the form block so table is able to take its place in
                // document body.
                user.classList.toggle('visible');
            })
            .then(() => {
                sortTable();
            });
    } catch (error) {
        console.log.error(error);
    }

    //  ============= End Template code =============== //
});

// ============== Close Dialog Box Event Listener == //
form.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('close')) {
        user.classList.toggle('form--appear');
    }
});

tableTemplate.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('close')) {
        tableTemplate.classList.toggle('visible');
    }
});
