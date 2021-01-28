const Buttons = props => props.btns.map( (btn) => {<a href={btn.href}>{btn.name}</a>} )

getUser = () => JSON.parse(sessionStorage.getItem('user'))

class UserMenu extends React.Component{
    constructor(props){
        super(props)
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.state = {clicked: false, btns: []};
        this.user = {};
        
        this.handleClick = this.handleClick.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
    }

    handleClick(){
        this.user = getUser();
        if(this.state.clicked){
            this.setState({btns: [], clicked: false});
        }
        else {
            this.handleMenuOpen();
            this.setState({clicked: true});
        }
    }

    handleMenuOpen(){
        if(this.user.loggedin){
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

    render(){
        return(
            <div id='user-menu'>
                <button  className='btn-lvl-one' onClick={this.handleClick}>
                    <img src={`/img/icon-svg/white/user-icon.svg`} alt="User Menu Icon" />
                </button>
                {this.state.btns}
            </div>
        )
    }
}

ReactDOM.render( <UserMenu />, document.getElementById('header-right'));