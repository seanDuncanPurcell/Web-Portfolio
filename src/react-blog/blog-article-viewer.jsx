function userSessionData () {
  return JSON.parse(sessionStorage.getItem('user'));
}

class ArticleViewer extends React.Component{
  constructor(props){
    super(props);
    const {admin} = userSessionData(); 
    this.state = {userAdmin: admin, userAuthor: false,  editMode: false} ;

    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.EditConstrols =this.EditConstrols.bind(this);
  }

  EditConstrols (props) {
    const {userAdmin, userAuthor} = this.state;
    const authorised = (userAdmin || userAuthor) ? true : false;
    if(props.editMode){
      return(
        <div className='button-pannle'>
          <button onClick={() => location.assign('/blog') }>Leave</button>
          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.handleEdit}>Stop Editing</button>
        </div>
      )
    }else if(authorised) {
      return(
        <div className='button-pannle'>
          <button onClick={() => location.assign('/blog') }>Leave</button>
          <button onClick={this.handleEdit}>Edit</button>
        </div>
      )
    } else {
      return(
        <div className='button-pannle'>
          <button onClick={() => location.assign('/blog') }>Leave</button>
        </div>
      )
    }
  } 
  
  async componentDidMount () {
    const query = location.search;
    const urlQuery = new URLSearchParams(query);
    const id = urlQuery.get('id');
    console.log('the id is: ' + id)
    let articleData = {};
    if(id){
      const url = `/api/get-article?id=${id}`;
      const responce = await fetch(url);      
      console.log(responce);
      articleData = await responce.json();
      console.log(articleData);
    }

    this.editor = new EditorJS({
      holderId: 'editor-container', 
      data: articleData,
      // tools: {
      //   header: {
      //     class: Header,
      //     inlineToolbar: true,
      //     shortcut: 'CMD+SHIFT+H',
      //     config: {
      //       placeholder: 'Greatness Awaits You!',
      //       levels: [1, 2, 3, 4, 5, 6],
      //       defaultLevel: 1
      //     }
      //   },
      //   quote: {
      //     class: Quote,
      //     inlineToolbar: true,
      //     shortcut: 'CMD+SHIFT+O',
      //     config: {
      //       quotePlaceholder: 'Enter a quote',
      //       captionPlaceholder: 'Quote\'s author',
      //     },
      //   },
      //   list: {
      //     class: List,
      //     inlineToolbar: true,
      //   },
      //   code: CodeTool,
      //   Marker: {
      //     class: Marker,
      //     shortcut: 'CMD+SHIFT+M',
      //   }
      // },
      readOnly: true
    });
  }
  
  handleSave() {
    this.editor.save()
    .then( svData => {
      const id = this.props.data._id;
      let url = '/api/set-article'
      if (id) url += `?id=${id}`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(svData)
      })
      .then( result => result.json() )
      .then( data => {
        console.log(data._id);
      } )
      .catch( error => console.warn(error))
    })
  }
  
  handleEdit() {
    const editToggle = () => {
      return this.state.editMode ? false : true;
    }
    this.setState({editMode: editToggle()});
    this.editor.readOnly.toggle();
  }

  render(){
    return(      
      <div className='ArticleView'>
        <this.EditConstrols editMode={this.state.editMode}/>
        <div id='editor-container' />
      </div>
    )
  }
}

export default ArticleViewer;