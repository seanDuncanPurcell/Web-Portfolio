window.addEventListener('load',async () => {
    const res = await fetch('/user');
    const body = await res.json();
    sessionStorage.setItem('user', JSON.stringify(body));
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log('Welcome ' + user.username);
});

async function confirmName(evt) {
    const username = evt.value;

    // const responce = await fetch(`/api/user?=${username}`);
}
