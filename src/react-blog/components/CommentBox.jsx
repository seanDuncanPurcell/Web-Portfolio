const useState = React.useState

function userSessionData () {
  return JSON.parse(sessionStorage.getItem('user'));
}

function CmtOrReply(props) {
  const [txtCont, setTxtCont] = useState()
  const [relpy, setReply] = useState(false)
  const loggedIn = userSessionData().loggedin
  function handleReply() {
    if(relpy) setReply(false)
    else setReply(true)
  }
  const user = userSessionData()

  function handleTxt(evt) {
    const val = evt.target.value 
    setTxtCont(val);
  }
  
  function handleSubmit(props, id){
    const cmtObj = {
      text: txtCont,
      pointer: props.pointer
    }
    let url = '/api/blog-comments'
    if (id) url += `?id=${id}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cmtObj)
    })

    setTxtCont('')
    setReply(false)
    props.onSubmit()
  }

  if(!loggedIn) return <></>
  else if(relpy){
    return(
      <>
      <span className='Comment-box__Sub-controls'>
        {/* <button>Like</button>
        <p>&#8226;</p> */}
        <button onClick={handleReply}>Reply</button>
      </span>
        <h3>{user.username}</h3>
        <span className='comment_text-area'>
          <textarea
            placeholder='Write a comment...'
            value={txtCont}
            onChange={handleTxt}
          />
          <button onClick={ evt => {
            handleSubmit(props)
          }}>
            Send
          </button>
        </span>
      </>
    )
  }else{
    return (
      <span className='Comment-box__Sub-controls'>
        {/* <button>Like</button>
        <p>&#8226;</p> */}
        <button onClick={handleReply}>Reply</button>
      </span>
    )
  }
}

function CommentMainComp (props){
  const level = props.level
  const comments = props.array
  const onSubmit = props.onSubmit
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
                  onSubmit={onSubmit}
                />
                <CommentMainComp
                  level={level + 1}
                  array={item.comments}
                  srcKey={myKey}
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
    this.state = {reply: false, comments: [], loggedIn: false}
    this.handleComment = this.handleComment.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      const url = `/api/blog-comments?id=${id}`
      const responce = await fetch(url)
      const commentsObj = await responce.json()

      //check user status
      const loggedIn = userSessionData().loggedin

      //set up state to reflect new infor
      this.setState({comments: commentsObj, loggedIn: loggedIn})
    } catch (error) {
      console.warn(error)
    }
  }

  handleComment() {
    if(this.state.reply) this.setState({reply: false})
    else this.setState({reply: true})
  }

  async handleSubmit(){
    const query = location.search
    const urlQuery = new URLSearchParams(query)
    const id = urlQuery.get('id')
    const url = `/api/blog-comments?id=${id}`
    const responce = await fetch(url)
    const commentsObj = await responce.json()
    this.setState({comments: commentsObj, reply: false })
  }

  render(){
    const array = this.state.comments
    const loggedIn = this.state.loggedIn

    if(loggedIn){
      return(
        <>
          <CmtOrReply
            show={this.state.reply}
            pointer={this.pointer}
            onSubmit={this.handleSubmit}
          />
          <CommentMainComp 
            level={1}
            array={array}
            srcKey={'cmnt-blck'}
            onSubmit={this.handleSubmit}
          />
        </>
      )
    } else {
      return(
        <>
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