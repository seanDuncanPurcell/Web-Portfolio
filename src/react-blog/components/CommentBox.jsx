const useState = React.useState

function userSessionData () {
  return JSON.parse(sessionStorage.getItem('user'));
}
  
async function cmtSet(id, pointer, txtCont){
  const cmtObj = {
    text: txtCont,
    pointer: pointer
  }
  let url = '/api/blog-comments'
  if (id) url += `?id=${id}`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cmtObj)
  })
}

async function cmtsGet(){
  const query = location.search
  const urlQuery = new URLSearchParams(query)
  const id = urlQuery.get('id')
  const url = `/api/blog-comments?id=${id}`
  const responce = await fetch(url)
  const retObj = await responce.json()
  return retObj
}

function TxtBox (props){
  const user = userSessionData().username
  return(
    <>  
      <h3>{user.username}</h3>
      <span className='comment_text-area'>
        <textarea
          placeholder='Write a comment...'
          value={props.value}
          onChange={props.handleTxtChange}
        />
        <button onClick={ evt => {
          props.handleSubmit()
        }}>
          Send
        </button>
      </span>
    </>
  )
}

function CmtOrReply(props) {
  const [txtCont, setTxtCont] = useState()
  const [relpy, setReply] = useState(false)
  const loggedIn = userSessionData().loggedin
  const pointer = props.pointer
  const resetWithNewData = props.resetWithNewData

  function handleReply() {
    if(relpy) setReply(false)
    else setReply(true)
  }
  
  async function handleSubmit(id){
    await cmtSet(id, pointer, txtCont)
    setTxtCont('')
    setReply(false)
    resetWithNewData()
  }

  function handleTxtChange(evnt) {
    const val = evnt.target.value 
    setTxtCont(val)
  }

  if(!loggedIn) return <></>
  else if(relpy){
    return(
      <>
        <span className='Comment-box__Sub-controls'>
          <button>Edit</button>
          <p>&#8226;</p>
          <button onClick={handleReply}>Reply</button>
        </span>
        <TxtBox 
          handleTxtChange={handleTxtChange}
          value={txtCont}
          handleSubmit={handleSubmit}
        />
      </>
    )
  }else{
    return (
      <span className='Comment-box__Sub-controls'>
        <button>Edit</button>
        <p>&#8226;</p>
        <button onClick={handleReply}>Reply</button>
      </span>
    )
  }
}

function CommentMainComp (props){
  const level = props.level
  const comments = props.array
  const resetWithNewData = props.resetWithNewData
  if(comments.length > 0){
    return(
      <div>
        {comments.map( (item, i) => {
          const myKey = props.srcKey + '_level-' + level + '_item-' + i
          return(
            <div className='Comment-box__Main' key={myKey}>
              <div className='img-frame'>
                <img src="/img/icon-svg/Black/user-icon.svg" alt="User Image"/>
              </div>
              <div className='Comment-box__post-img'>
                <div className='Comment-box__Sub-content'>
                  <h3>{item.authorID}</h3>
                  <p>{item.text}</p>
                </div>
                <CmtOrReply 
                  pointer={item._id}
                  resetWithNewData={resetWithNewData}
                />
                <CommentMainComp
                  level={level + 1}
                  array={item.comments}
                  srcKey={myKey}
                  resetWithNewData={resetWithNewData}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }else{
    return <></>
  }
}

class CommentBox extends React.Component{
  constructor(props){
    super(props)
    this.pointer = ''
    this.state = {reply: false, comments: [], loggedIn: false, newCmtTxt: ''}
    this.handleShowCmtBox = this.handleShowCmtBox.bind(this)
    this.handleTxtChange = this.handleTxtChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetWithNewData = this.resetWithNewData.bind(this)
    this.CommentComposer = this.CommentComposer.bind(this)
  } 
  
  async componentDidMount () {
    try {
      //get artical ID
      const query = location.search
      const urlQuery = new URLSearchParams(query)
      const id = urlQuery.get('id')

      //us id to set pointer
      this.pointer = id

      //us id to set up comment fetch
      const commentsObj = await cmtsGet()

      //check user status
      const loggedIn = userSessionData().loggedin

      //set up state to reflect new infor
      this.setState({comments: commentsObj, loggedIn: loggedIn})
    } catch (error) {
      console.warn(error)
    }
  }

  handleShowCmtBox() {
    if(this.state.reply) this.setState({reply: false})
    else this.setState({reply: true})
  }

  handleTxtChange(evnt){
    const val = evnt.target.value 
    this.setState({newCmtTxt: val})
  }
  
  async handleSubmit(id){
    await cmtSet(id, this.pointer, this.state.newCmtTxt)
    this.setState({newCmtTxt: '', reply: false})
    this.resetWithNewData()
  }

  async resetWithNewData(){
    const commentsObj = await cmtsGet()
    this.setState({comments: commentsObj, reply: false })
  }

  CommentComposer(props){
    if(this.state.reply){
      return(
        <>
          <div className='Comment-box__Controls'>            
            <button onClick={this.handleShowCmtBox}>Leave Comment</button>
          </div>
          <TxtBox 
            handleTxtChange={this.handleTxtChange}
            value={this.state.newCmtTxt}
            handleSubmit={this.handleSubmit}
          />
        </>
      )
    }else{
      return(
        <div className='Comment-box__Controls'>            
          <button onClick={this.handleShowCmtBox}>Leave Comment</button>
        </div>
      )
    }
  }

  render(){
    const array = this.state.comments
    const loggedIn = this.state.loggedIn

    if(loggedIn){
      return(
        <>
          <this.CommentComposer />
          <CommentMainComp 
            level={1}
            array={array}
            srcKey={'cmnt-blck'}
            resetWithNewData={this.resetWithNewData}
          />
        </>
      )
    } else {
      return(
        <>
         <h4 style={{color: "gray"}}><em>Create an account or login to leave a comment.</em></h4>
          <CommentMainComp
            level={1}
            array={array}
            srcKey={'cmnt-blck'}
            onSubmit={this.handleSubmit}
          />
        </>
      )
    }
  }
}

export default CommentBox