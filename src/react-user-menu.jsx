class UserMenu extends React.Component{
    constructor(props){
        super(props)
        const {username, loggedin} = JSON.parse(sessionStorage.getItem('user'));
        this.state = {clicked: false, btns: [], userName: username, loggedin: loggedin};
        
        this.handleClick = this.handleClick.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
        this.UserLable = this.UserLable.bind(this);
    }

    handleClick(){
        if(this.state.clicked){
            this.setState({btns: [], clicked: false});
        }
        else {
            this.handleMenuOpen();
            this.setState({clicked: true});
        }
    }

    handleMenuOpen(){
        if(this.state.loggedin){
            this.setState({btns: [
                <a key='mlob' href='/?out=true' className='btn-lvl-one'>Log Out</a>
            ]})
        }else{
            this.setState({btns: [
                <a key='mlib' href='/login' className='btn-lvl-one'>Log In</a>,
                <a key='mnub' href='/register' className='btn-lvl-one'>New Account</a>
            ]})            
        }
    }

    UserLable (props) {
        if(props.loggedin) return <div id="userName">{this.state.userName}</div>
        else return <></>
    }
    
    render(){
        return(
            <div id='user-menu'>
                <button onClick={this.handleClick} className="btn-case">
                    < this.UserLable loggedin={this.state.loggedin} />
                    <div  className='btn-lvl-one' >
                        <svg width="40" height="40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <title>
                                user-icon
                            </title>
                            <path d="M13 5c0-2.76-2.24-5-5-5S3 2.24 3 5c0 1.52.678 2.882 1.75 3.8C2.52 9.97 1 12.306 1 15c0 .552.448 1 1 1s1-.448 1-1c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .552.448 1 1 1s1-.448 1-1c0-2.693-1.52-5.03-3.75-6.2C12.323 7.88 13 6.52 13 5zM8 8C6.343 8 5 6.657 5 5s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" fill="#FFF" fillRule="evenodd"/>
                        </svg>
                    </div>
                </button>
                {this.state.btns}
            </div>
        )
    }
}

export default UserMenu