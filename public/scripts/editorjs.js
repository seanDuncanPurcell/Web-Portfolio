const editor = (async (articleID) => {
  const articleData = {};
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (articleID) {
    const responce = await fetch(`/blog/articles_db/${articleID}`);
    const jsonRes = await responce.json();
    articleData.time = jsonRes.time;
    articleData.blocks = jsonRes.blocks;
    articleData.version = jsonRes.version;
  }
  const options = {
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
    data: articleData,
  }
  if(!user.admin) options.readOnly = true;
  const edJS = await new EditorJS( options );


  const svBtn = document.getElementById('textsave');
  if (svBtn){
    svBtn.addEventListener('click', async () => {
      const newarticle = await edJS.save();
      console.log(newarticle);
      const options = {
          method: 'POST',
          mode: 'cors',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newarticle)
      };
      if(articleID) fetch(`/blog/article?id=${articleID}`, options);
      else {
        const responce = await fetch(`/blog/article`, options);
        const newID = await responce.json();
        window.location.href = `/blog/article?id=${newID}`;
      }
    });
  }
  return edJS;
})(articleID);