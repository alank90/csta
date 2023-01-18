import SteinStore from 'stein-js-client';
import sortTable from './sortTable';

const tableTemplate = document.getElementById('target');
const user = document.querySelector('.user');
const crowdImg = document.querySelector("img[alt='Crowd Shot']");

// Create Stein Store instance
const VITE_STEIN_URL = import.meta.env.VITE_STEIN_URL;
const store = new SteinStore(VITE_STEIN_URL);

// Event listener for close button on table
tableTemplate.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('close')) {
        tableTemplate.classList.toggle('visible');
    }
});

/**
 * Description - Retrieves google sheets via the Stein JS client
 * imports - sortTable
 * Called from - /main.js
 * Returns - Google sheets signup table and then uses Handlebars.js
 *           to inject data into HTML template
 */

export default function accessAttendeesTables() {
    console.log('Ok. called accessAttendees...');
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
                crowdImg.classList.toggle('visible');
                tableTemplate.scrollIntoView({ behavior: 'smooth' });

                //  ============= End Template code =============== //
            });
    } catch (error) {
        console.error(error);
    }
}
