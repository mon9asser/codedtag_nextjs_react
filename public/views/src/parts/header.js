import React, {Component} from "react"; 
import logo from './../assets/img/logo-3.png'; 
import {Helper} from './../helper';
import { Link } from "react-router-dom";
import { DataContext } from "../context";

class Header extends Component {

    static contextType = DataContext;

    constructor( props ) {
        
        super( props ); 
 
        
        this.state = {
            nav_left: [],
            nav_right: [],

            is_loaded: false
        };

        this.sidebarHandlerRefs = React.createRef();
        this.sidebarRefs = React.createRef();

    }
    
    componentDidMount() {
        const { menus } = this.context;
        this.updateMenus(menus);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { menus } = this.context;
        this.updateMenus(menus);
    }
    
    updateMenus = (menus) => {
        
        if(menus.length) {
            const nav_left = menus.filter( x=> x.menu_name === "main_menu")
            const nav_right = menus.filter( x=> x.menu_name === 'main_nav_right');
            
            if(this.state.is_loaded) {
                return;
            }

            this.setState({
                nav_left,
                nav_right,
                is_loaded: true
            });
        }
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

    compile_items = (text) => {
        
        var item = text;
        
        if(text.indexOf("[button]") != -1 ) {
            var arr = text.split(']');
            var item_text = arr[arr.length - 1].trim();
            item = <span className="btn third-btn radius-5 custom-header-btn">{item_text}</span>
        } else if ( text.indexOf("[svg]") != -1) {
            var arr = text.split(']');
            var icon = arr[arr.length - 1];
            item = <span className="flexbox" dangerouslySetInnerHTML={{__html: icon}} />
        } else if ( text.indexOf("[burgericon]") != -1 ) {
            item = <span data-sidebar-id="#aside-wrapper" ref={this.sidebarHandlerRefs} onClick={this.animatedSidebar} className="nav-toggler aside-toggler remove-anchor-paddings"><span></span><span></span><span></span></span>
        } 

        return item;

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
                                    {
                                        this.state.nav_left.length ?
                                        this.state.nav_left.map(x => { 
                                            
                                            var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{this.compile_items(x.title)}</Link></li>;
                                            
                                            if(x.subitems.length) {
                                                _return = (
                                                    <li className="has-slideitem" key={x._id}> 
                                                        <Link target={x.openInNewTab?"_blank": ""} to={x.link}>{this.compile_items(x.title)}</Link>
                                                        <ul className="slideitem">
                                                            {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} to={y.link}>{y.title}</Link></li>)}
                                                        </ul>
                                                    </li>
                                                );
                                            }

                                            return _return;
                                        }): ""
                                    }  
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
                                {
                                    this.state.nav_left.length ?
                                    this.state.nav_left.map(x => { 
                                        
                                        var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{this.compile_items(x.title)}</Link></li>;
                                        
                                        if(x.subitems.length) {
                                            _return = (
                                                <li className="has-subitem" key={x._id}> 
                                                    <Link target={x.openInNewTab?"_blank": ""} to={x.link}>{this.compile_items(x.title)}</Link>
                                                    <ul className="subitem">
                                                        {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} to={y.link}>{y.title}</Link></li>)}
                                                    </ul>
                                                </li>
                                            );
                                        }

                                        return _return;
                                    }): ""
                                } 
                            </ul>
    
    
                            <ul className="inline-list left-p-30 offset-right mlr--15 update-html">
                            {
                                    this.state.nav_right.length ?
                                    this.state.nav_right.map(x => { 
                                        
                                        var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{this.compile_items(x.title)}</Link></li>;
                                        
                                        if(x.subitems.length) {
                                            _return = (
                                                <li className="has-subitem" key={x._id}> 
                                                    <Link target={x.openInNewTab?"_blank": ""} to={x.link}>{this.compile_items(x.title)}</Link>
                                                    <ul className="subitem">
                                                        {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} to={y.link}>{y.title}</Link></li>)}
                                                    </ul>
                                                </li>
                                            );
                                        }

                                        return _return;
                                    }): ""
                                }
                                
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