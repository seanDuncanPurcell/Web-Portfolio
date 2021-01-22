class NavMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {clicked: false, btns: []};
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.user = getUser();
        if(this.state.clicked){
            this.setState({btns: [], clicked: false});
        }
        else {
            this.setState({
                btns: 
                    [
                        <a key='nmhb' href='/' className='btn-lvl-one'>HOME</a>,
                        <a key='nmbib' href='/bio' className='btn-lvl-one'>About Dev</a>,
                        <a key='nmblb' href='/blog' className='btn-lvl-one'>Alcodeimy Blog</a>,
                        <a key='nmpb' href='/projects' className='btn-lvl-one'>Projects</a>
                    ], 
                clicked: true
            });
        }
    }

    render(){
        return(
            <div id='nav-menu'>
                <button  className='btn-lvl-one' onClick={this.handleClick}>
                    <img src={`http://${location.host}/img/icon-svg/white/menu-icon.svg`} alt="Navigation Menu Icon"/>
                </button>
                {this.state.btns}
            </div>
        )
    }
}

ReactDOM.render( <NavMenu />, document.getElementById('header-left'));