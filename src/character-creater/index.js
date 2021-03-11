import App from './App.js';

(async()=>{
  const url = `/api/get_character_configs?id=6046e4b81fd43c02f0bd15ff`;
  const responce = await fetch(url)
  const staticConfigs = await responce.json()
  const jsonCharacter = localStorage.getItem('myCharacter')
  const myCharacter = await JSON.parse(jsonCharacter);

  ReactDOM.render(
    <React.StrictMode>
      <App
        dataStatic={staticConfigs}
        myCharacter={myCharacter}
      />
    </React.StrictMode>,
    document.getElementById('charSheetRoot')
  );
})()


