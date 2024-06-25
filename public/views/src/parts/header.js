import React, {Component} from "react"; 
import logo from './../assets/img/logo-3.png'; 
import { Link } from "react-router-dom";
  

class Header extends Component {

    constructor( props ) {
        
        super( props ); 
 
        
        this.sidebarHandlerRefs = React.createRef();
        this.sidebarRefs = React.createRef();

    }
    
    componentDidMount() {
        
    }   

    fadeToggle = (elem) => {
        elem.classList.toggle('fade'); 
    }
    
    animatedSidebar = (e) => {
        
        
        const sidebarToggler = this.sidebarHandlerRefs.current;
        if (!sidebarToggler) {
            return;
        }
        
        // Prevent the default action of the event
        e.preventDefault(); 

        // Get the corresponding sidebar container ID
        const id = this.sidebarRefs.current;  
        const sidebarContainer = id;
        
        if (!sidebarContainer) {
            return;
        }

        // Show the container immediately without animation
        sidebarContainer.style.display = 'block';

        // Find the mask and content children
        const mask = sidebarContainer.querySelector('.mask');
        const asideContent = sidebarContainer.querySelector('.aside-content');
        const closeToggler = sidebarContainer.querySelector('.close-toggler');

        // Check if elements exist
        if (mask && asideContent && closeToggler) {
              
            // Perform the mask fade toggle 
            if (mask.style.display === 'none' || mask.style.display == "") {
                
                // open the mask 
                mask.style.display = "block";
                setTimeout(() => {
                    this.fadeToggle(mask)
                    closeToggler.style.display = "block";
                    // slide main sidebar
                      
                    asideContent.classList.add("active--aside");
                }, 5)

                

            }  
        }

        
    }

    closeSidebar = ( _this, isHandler = false ) => {
        
        var mask = _this.target;

        if( isHandler ) {
            mask = mask.parentNode.querySelector(".mask")
        }

        this.fadeToggle(mask);
        mask.parentNode.querySelector(".close-toggler").style.display = "none";
        mask.parentNode.querySelector(".aside-content").classList.remove("active--aside");

        setTimeout(() => { 
            var _parentElement = mask.parentNode;
            mask.style.display = "none";
            _parentElement.style.display = "none";
        }, 300);
      
        
    }

    render () {
        

        var publicHeader = (
            (
                <>
                    <aside className="aside responsive-aside" ref={this.sidebarRefs}> 
                        <div className="mask fade" onClick={(e) => this.closeSidebar(e)}></div> 
                        <a className="close-toggler close-btn" href="#" onClick={(e) => this.closeSidebar(e, true)}></a> 
                        <div className="aside-content white-bg" id="sidebar-content"> 
                            <div className="flexbox items-center content-center site-logo-container">
                                <a className="site-logo" href="#"><img src={logo} alt="Logo Site" width="135" height="36" /></a>
                            </div>
                            <div className="wrapper side-wrapper">
                                <form className="form-group form-1" action="/" method="get">
                                    <input type="text" placeholder="Search in our tutorials" />
                                    <button type="submit">
                                        <span className="flexbox">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <circle cx="11" cy="11" r="7" className="stroke-color" stroke="#33363F" strokeWidth="2" />
                                                <path d="M20 20L17 17" className="stroke-color" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </form>
                            </div>
                            <div className="wrapper side-wrapper">
                                <ul className="block-list">
                                    <li><a href="#">Home </a></li>
                                    <li className="has-slideitem">
                                        <a href="#">Tutorials </a>
                                        <ul className="slideitem">
                                            <li><a href="#">Pages</a></li>
                                            <li><a href="#">Blocks</a></li>
                                            <li><a href="#">Headers</a></li>
                                            <li><a href="#">Footers</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Contact </a></li>
                                    <li><a href="#">About </a></li>
                                </ul>
                            </div>
                        </div>
                    </aside>
    
                    <header className="wrapper white-bg border-bottom plr-0 sticky">
                        <nav className="flexbox items-center offset-left offset-right plr-15 max-1172">
                            <a className="site-logo" href="#">
                                <img src={logo} alt="Logo Site" width="135" height="36" />
                            </a>
                            
                            <ul className="inline-list left-p-30 main-nav">
                                <li><a href="#">Home </a></li>
                                <li className="has-subitem">
                                    <a href="#">Tutorials </a>
                                    <ul className="subitem">
                                    <li><a href="#">Pages</a></li>
                                    <li><a href="#">Blocks</a></li>
                                    <li><a href="#">Headers</a></li>
                                    <li><a href="#">Footers</a></li>
                                    </ul>
                                </li>
                                <li> <a href="#">Contact </a></li>
                                <li> <a href="#">About </a></li>
                            </ul>
    
    
                            <ul className="inline-list left-p-30 offset-right mlr--15">
                                <li> <a className="btn third-btn radius-5 custom-header-btn" href="#">Sign up </a></li>
                                <li>
                                    <a className="flexbox" href="#">
                                        <span className="flexbox">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <circle className='stroke-color' cx="12" cy="10" r="3" stroke="#222222" strokeLinecap="round"/>
                                                <circle className='stroke-color' cx="12" cy="12" r="9" stroke="#222222"/>
                                                <path className='stroke-color' d="M18 18.7059C17.6461 17.6427 16.8662 16.7033 15.7814 16.0332C14.6966 15.3632 13.3674 15 12 15C10.6326 15 9.30341 15.3632 8.21858 16.0332C7.13375 16.7033 6.35391 17.6427 6 18.7059" stroke="#222222" strokeLinecap="round"/>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li> <a className="nav-toggler aside-toggler remove-anchor-paddings" href="#" data-sidebar-id="#aside-wrapper" ref={this.sidebarHandlerRefs} onClick={this.animatedSidebar}><span> </span><span></span><span>  </span></a></li>
                            </ul>
    
                        </nav>
                    </header>
                </>
            )
        ); 
        
        return publicHeader;

    }

}

export { Header };