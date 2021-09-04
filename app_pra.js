const button = document.querySelector('button');
const username = document.querySelector('#user');

button.addEventListener('click',check);

function check(e) {
    if (username.value === '') {
        alert('Enter a username');
    }
}