const editor = (async (articalID) => {
  const articalData = {};
  if (articalID) {
    console.log(articalID);
    const responce = await fetch(`/blog/articals_db/${articalID}`);
    const jsonRes = await responce.json();
    articalData.time = jsonRes.time;
    articalData.blocks = jsonRes.blocks;
    articalData.version = jsonRes.version;
  }
  const edJS = await new EditorJS({
    autofocus: true,
    tools: {
      image: {
        class: SimpleImage,      
        inlineToolbar: true
      },
      header: {
        class: Header,
        shortcut: 'CTRL+SHIFT+H',
        config: {
          placeholder: 'Enter a header',
          levels: [1, 2, 3, 4],
          defaultLevel: 1
        }
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      Marker: {
        class: Marker,
        shortcut: 'CTRL+SHIFT+M',
      }
    },
    data: articalData,
  });

  const svBtn = document.getElementById('textsave');
  svBtn.addEventListener('click', async () => {
    const newArtical = await edJS.save();
    newArtical.id = articalID;
    console.log(newArtical);
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newArtical)
    };
    const responce = await fetch('/blog/artical', options);
    const newID = await responce.json();
    window.location.href = `/blog/artical/${newID}`;
  });
  return edJS;
})(articalID);