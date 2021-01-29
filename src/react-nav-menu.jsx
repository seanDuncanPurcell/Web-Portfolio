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
                    <svg width="40" height="40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <title>
                            menu-icon
                        </title>
                        <path d="M1 14h14c.552 0 1-.448 1-1s-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1zm0-5h14c.552 0 1-.448 1-1s-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1zm0-5h14c.552 0 1-.448 1-1s-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1z" fill="#FFF" fill-rule="evenodd"/>
                    </svg>
                </button>
                {this.state.btns}
            </div>
        )
    }
}

ReactDOM.render( <NavMenu />, document.getElementById('header-left'));