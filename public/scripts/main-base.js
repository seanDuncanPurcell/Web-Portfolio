import UserMenu from './react-user-menu.js';
import NavMenu from './react-nav-menu.js';

window.addEventListener('load',async () => {
    const res = await fetch('/api/get-user');
    const body = await res.json();
    sessionStorage.setItem('user', JSON.stringify(body));
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log('Welcome ' + user.username);

    ReactDOM.render( React.createElement(NavMenu, null), document.getElementById('header-left'));
    ReactDOM.render( React.createElement(UserMenu, null), document.getElementById('header-right'));
});

