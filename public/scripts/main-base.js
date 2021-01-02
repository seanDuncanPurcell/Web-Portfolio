window.addEventListener('load',async () => {
    const res = await fetch('/user');
    const body = await res.json();
    sessionStorage.setItem('user', JSON.stringify(body));
});