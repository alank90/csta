import './css/style.css';
import SteinStore from 'stein-js-client';

// Create SStein Store instance
const store = new SteinStore(
    'https://api.steinhq.com/v1/storages/63b713daeced9b09e9b0a04f'
);

const el = document.getElementById('signup');
const user = document.querySelector('.user');
const button = document.querySelector('.btn');
const form = document.querySelector('form');
const crowdImg = document.querySelector("img[src='./img/crowd.webp']");

// Add event listener's
el.addEventListener('click', () => {
    user.classList.toggle('form--appear');
    crowdImg.classList.toggle('visible');
});

// Event listener to submit form data to Google sheets
button.addEventListener('click', function () {
    // Vars
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


/* store.read('signup').then((data) => {
    console.log(data);
}); */
