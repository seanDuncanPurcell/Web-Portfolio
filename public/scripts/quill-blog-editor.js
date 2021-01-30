(()=>{
    const container = document.getElementById('compArea');
    const svBtn = document.getElementById('saveBtn');
    const quillOps = {theme: 'snow'};
    const {id} = JSON.parse(sessionStorage.getItem('current-article'));

    const navToArticle = (artId) => {
        sessionStorage.setItem('current-article', JSON.stringify({"id": artId}));
        window.location.href = '/blog/article';
    }
    const saveArticle = () => {
        const quill = new Quill(container, quillOps);
        if (id) const artId = id;
        else const artId = '';
        const delta = quill.getContents();
        const jData = JSON.stringify(delta);
        const url = `/api/set-article${artId}`

        fetch( url, {
            method: 'POST',
            body: jData,
            headers: {
                'Content-Type': 'aplication/json'
            },
            credntials: 'same-origin'
        }).then( responce => {
            const retData = await responce.json();
            quill.setContent(retData);
        }, error => {
            console.warn(error.message);
        })
    }
    const loadArticalInQuill = () => {
        const quill = new Quill(container, quillOps);
        const url = `/api/get-article${id}`
        fetch( url ).then( responce => {
            const retData = await responce.json();
            quill.setContent(retData);
        }, error => {
            console.warn(error.message);
        });
    }

    if(id) loadArticalInQuill();
    svBtn.addEventListener('click', saveArticle );
    (blogPostBtns = () => {
        const elements = document.getElementsByClassName('brief-blog');
        elements.forEach(element => {
            const articalId = element.id;
            element.addEventListener('click', ()=>navToArticle(articalId) )
        });
    })();
})();

