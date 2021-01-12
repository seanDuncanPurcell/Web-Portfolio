function setError(error){
  this.currentErr = error;
  this.props.errTest(true);
}
function clearError() {
  this.setState({err: '', confErr: ''});
  this.currentErr = '';
  this.props.errTest(false);  
}
async function findUser(name){
  console.log(`api/is-user?=${name}`);
  const respons = await fetch(`api/is-user?username=${name}`);
  const nameFound = respons.json();
  return nameFound ? true : false
} 

class InputName extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: '', err: ''}
    this.error = {
      badChar: 'The following characters are not allowed: ">", "<", "|", "&".',
      minChar: 'The minimum user name legnth is 5 characters.',
      maxChar: 'The maximum user name legnth is 24 characters.',
      badName: 'This name is already in use.'
    }
    this.currentErr = '';

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setError = setError.bind(this);
    this.clearError = clearError.bind(this);
  }

  handleChange(event){    
    const value = event.target.value;
    this.setState({value: event.target.value});
    
    const hasInValChars = value.match(/[><|&]/i);
    if(hasInValChars){
      this.setError(this.error.badChar);
      this.setState({err: this.currentErr});
    } else if (value.length > 4 && value.length < 26) {
      this.clearError();
      console.log('no error in name' + value.length )
    }
    this.props.handleVal(value);
  }

  async handleBlur(event){
    const value = event.target.value;
    if(value.length < 5){
      this.setError(this.error.minChar);
    }else if(value.length > 24){
      this.setError(this.error.maxChar);
    }else{      
      const nameUsed = await findUser(value);
      if(nameUsed) this.setError(this.error.badName);
      this.props.handleVal(value);
    }
    this.setState({err: this.currentErr})
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
      [this.props.name]: '',
      confirmpass: '',
      err: '',
      confErr: ''
    }
    this.error = {
      badChar: 'Your pass phrase must contain atleast one number and letter.',
      minChar: 'Your pass phrase must be atleast 4 characters long.',
      maxChar: 'Your pass phrase can be no more that 25 characters long.',
      badMatch: 'Both pass phrases must match.'
    }
    this.currentErr = '';
    this.passMatch = true;

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setError = setError.bind(this);
    this.clearError = clearError.bind(this);
  }

  testPhrases(value){
    const cntsNums = value.match(/[0-9]/i);
    const cntsLtr = value.match(/[a-z]/i);

    if(!cntsLtr || !cntsNums){
      this.setError(this.error.badChar);
    }else if(value.length < 4){
      this.setError(this.error.minChar);
    }else if(value.length > 25){
      this.setError(this.error.maxChar);
    }else{
      this.clearError();
    }
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
    
    if(event.target.name == 'confirmpass'){
      if(event.target.value !== this.state[this.props.name]){
        this.setError(this.error.badMatch);
        this.passMatch = false;
        this.setState({confErr: this.error.badMatch});
      }else{
        this.currentErr = '';
        this.setState({confErr: ''});
        this.passMatch = true;
        this.props.errTest(false);
        //Finallay, report data to parent 
        this.props.handleVal(this.state[this.props.name], event.target.value);
      }
    }else{
      if(event.target.value !== this.state.confirmpass){
        this.passMatch = false;
        this.props.errTest(true);
      }else{
        this.currentErr = '';
        this.setState({confErr: ''});
        this.passMatch = true;
        this.props.errTest(false);
      }
      this.testPhrases(event.target.value);
      //Finallay, report data to parent 
      this.props.handleVal(event.target.value, this.state.confirmpass);
    }
  }
  
  handleBlur(){
    if(this.currentErr){
      this.setState({err: this.currentErr});
    }
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
          value={this.state[this.props.name]}
          id={this.props.id} 
          placeholder={this.props.placeholder}
        />
        <br/>
        <span className="error-field">{this.state.err}</span>

        <div>Confirm Phrase</div>
        <input
          onChange={this.handleChange}
          // onBlur={()=>{}}
          type={this.props.type} 
          name='confirmpass'
          value={this.state.confirmpass}
          id={this.props.id}
          placeholder={this.props.placeholder}
        />
        <br/>
        <span className="error-field">{this.state.confErr}</span>
      </label>
    )
  }  
}

class NewUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  async handleSubmit(event){
    const {nameErr, passErr} = this.state;
    if(nameErr || passErr){
      this.setState({err: 'Please Correct the errors listed about.'});
    }else{
      const data = {
        username: this.username,
        password: this.password,
        repeat_password: this.repeat_password,
        email: this.email
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      //do somthing with errors and let user know what happened
      // const responce = await fetch('/register', options);
      console.log(JSON.stringify(data));
    }
    event.preventDefault();
  }

  handleName(name){
    this.username = name;
  }

  handlePass(pass, confPass){
    this.password = pass;
    this.repeat_password = confPass;
  }

  handleEmail(){}

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
          handleVal={this.handleName}
          errTest={(bool) => { this.setState({nameErr: bool}) }}
        />

        <label htmlFor="eMail" className="form-comp">
          <div>Email</div>

          <input 
            type="email" name="email" id="eMail" 
            placeholder="super@cool.com" onChange={this.handleEmail}
          />

          <div></div>
          <br/>
        </label>

        <InputPass
          label="Pass Phrase"
          type="password" 
          name="password"
          placeholder="Live2Code"
          handleVal={this.handlePass}
          errTest={(bool) => { this.setState({passErr: bool}) }}
        />
        
        <span className="form-comp">
          <input type="button" value="Submit" onClick={this.handleSubmit}/>
          <p className="error-field" >{this.state.err}</p>
        </span>
      </form>
    )
  }  
}

ReactDOM.render(<NewUser  />, document.getElementById('regNewUser') );