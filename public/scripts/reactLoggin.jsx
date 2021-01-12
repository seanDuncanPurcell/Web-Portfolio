class InputName extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      err: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event){    
    const value = event.target.value;
    this.setState({value: event.target.value});
    
    const hasInValChars = value.match(/[><|&]/i);
    if(hasInValChars)
      this.setState({err: 'The following characters are not allowed: ">", "<", "|", "&", '});
  }

  handleBlur(event){
    const value = event.target.value;
    if(value.length < 5)
      this.setState({err: 'The minimum user name legnth is 5 characters.'});
    else if(value.length > 24)
      this.setState({err: 'The maximum user name legnth is 24 characters.'});
  }

  render() {
    return(
      <label htmlFor={this.props.id} className="form-comp">     
        <div>{this.props.label}</div>
        <input  
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.value}
          type={this.props.type} 
          name={this.props.name} 
          id={this.props.id} 
          placeholder={this.props.placeholder}
        />
        <br/>
        <span className="error-field">{this.state.err}</span>
      </label>
    )
  }  
}

class InputPass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      conVal: '',
      err: '',
      passMatch: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event){
    if(event.target.name == this.props.name)
      this.setState({value: event.target.value});
    else{
      this.setState({conVal: event.target.value});

      if(this.state.value != event.target.value)
        this.setState({passMatch: 'Both phrases must match'});
      else
        this.setState({passMatch: ''});  
    }
  }

  handleBlur(event){
    const value = event.target.value;
    const cntsNums = value.match(/[0-9]/i);
    const cntsLtr = value.match(/[a-z]/i);

    if(!cntsLtr || !cntsNums)
      this.setState({err: 'Your pass phrase must contain atleast one number and letter'});
    else if(value.length < 4)
      this.setState({err: 'Your pass phrase must be atleast four characters long.'});
  }

  render() {
    return(
      <label htmlFor={this.props.id} className="form-comp">
        <div>{this.props.label}</div>
        <input
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          type={this.props.type} 
          name={this.props.name}
          value={this.state.value}
          id={this.props.id} 
          placeholder={this.props.placeholder}
        />
        <br/>
        <span className="error-field">{this.state.err}</span>

        <div>{this.props.label}</div>
        <input
          onChange={this.handleChange}
          // onBlur={()=>{}}
          type={this.props.type} 
          name='confirmpass'
          value={this.state.conVal}
          id={this.props.id}
          placeholder={this.props.placeholder}
        />
        <br/>
        <span className="error-field">{this.state.passMatch}</span>
      </label>
    )
  }  
}


class NewUser extends React.Component {
  constructor(props){
    super(props);
    this.state = { nameErr: '', passErr: ''}

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    //make a new user
    event.preventDefault();
  }


  passRecs(value){
    if(value.length < 4)
      this.setState({err: 'The minimum pass phrase legnth is 4 characters.'});
  }

  render() {
    return(
      <form className="shadow-block" action="/loggin">
        <h1>Please Sign In.</h1>
          <InputName
            label="User Name"
            type="text" 
            name="username" 
            id="userName" 
            placeholder="CodeWizzard2021"
          />
          <InputPass
            label="Pass Phrase"
            type="password" 
            name="password"
            placeholder="Live2Code"
          />
        <button type="submit">Submit</button>
      </form>
    )
  }  
}

ReactDOM.render(<NewUser  />, document.getElementById('regNewUser') );