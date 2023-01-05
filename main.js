import './css/style.css';
import SteinStore from 'stein-js-client';

// Create SStein Store instance
const store = new SteinStore(
    'https://api.steinhq.com/v1/storages/63b713daeced9b09e9b0a04f'
);

store
    .append('signup', [
        {
            student_name: 'Alan Killian',
            teacher_name: 'Greg Leong',
            group: 'Comp Sci II',
        },
    ])
    .then((res) => {
        console.log(res);
    });

store.read('signup').then((data) => {
    console.log(data);
});
