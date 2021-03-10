import App from './App.js';


const url = `/api/get_character_configs?id=6046e4b81fd43c02f0bd15ff`;
fetch(url).then( responce => {
  return responce.json()
}).then( staticConfigs => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        dataStatic={staticConfigs}
      />
    </React.StrictMode>,
    document.getElementById('charSheetRoot')
  );
})


