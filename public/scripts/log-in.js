async function userLoggin(event) {
  const passwrd = document.getElementById('passWrdOne');
  const name = document.getElementById('userName');
  const data = {password: passwrd, username: name}
  const options = {
    method: 'POST',
    header: {
      'Content-Type': 'aplicaiton/json'
    },
    body: JSON.stringify(data)
  }
  const responce = await fetch('/api/login', options);
  const jDate = await responce.json();
  console.log(jData);
}