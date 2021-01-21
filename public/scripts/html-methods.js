(async function fetchHTML() {
  const elmtArray = document.getElementsByTagName('*')
  
  for(let i = 0; i < elmtArray.length; i++){
    const htmlPage = elmtArray[i].getAttribute('html-incude');
    if(htmlPage) {
      try{
        const responce = await fetch(htmlPage);
        const html = await responce.text();
        elmtArray[i].innerHTML = html;
      }catch(err){
        console.warn(err);
      }
    }
  }
})();