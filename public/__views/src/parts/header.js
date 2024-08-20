import React, {Component} from "react"; 
import logo from './../assets/img/logo-1.png'; 
import {Helper} from './../helper';
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import { Helmet } from "react-helmet";
 
/*
 <Helper.DynamicHelmet elements={upcoming.settings.header_elms} />
                {Helper.renderElements(upcoming.settings?.footer_elms)}  
                */


var Header = ({menus, settings}) => {
     
    var session = JSON.parse(localStorage.getItem("session"));
  
    var [upcoming, upcoming_change] = React.useState({
        nav_left: null,
        nav_right: null,
        settings: null,
        site_url: null
    })

    React.useEffect(() => {
        
        var nav_left = menus?.filter( x=> x.menu_name === "main_menu")
        var nav_right = menus?.filter( x=> x.menu_name === 'main_nav_right');

        // build site url 
        var site_url = settings?.site_address;

        if( nav_left == undefined ) nav_left = null
        if( nav_right == undefined ) nav_right = null
        if( site_url == undefined ) site_url = null
        
        if(site_url) {
            var url_array = site_url.split('/');
            if( url_array[url_array.length - 1] != '' ) {
                site_url = site_url + '/';
            }
        } 
        upcoming_change({
            nav_left: nav_left,
            nav_right: nav_right,
            settings: settings,
            site_url: site_url
        })
    }, [menus, settings]);
    // <Helper.PreLoader type="text" lines="2" /> 
    
    var ItemElement = ({text}) => {
        
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
            item = <span  className="nav-toggler aside-toggler remove-anchor-paddings"><span></span><span></span><span></span></span>
        } 

        return item;

    }
    

    var InitHeaderComponents = () => {
        
        var sidebarRef = React.useRef();
        var sidebarContentRef = React.useRef();
        var maskRef = React.useRef();
        var closeSidebarRef = React.useRef();

        var sidebar_toggle = (e) => {

           

            var mask = maskRef.current; 
            var sidebar = sidebarRef.current;
            var asideContent = sidebarContentRef.current;
            var closeToggler = closeSidebarRef.current;
            
            sidebar.style.display = "block";

            if (mask.style.display === 'none' || mask.style.display == "") { 
                
                mask.style.display = "block";
                setTimeout(() => {
                    
                    mask.classList.toggle('fade');  
                    closeToggler.style.display = "block"; 
                    asideContent.classList.add("active--aside");

                }, 5);
            }

             // Prevent the default action of the event
             e.preventDefault(); 
        }



        var close_sidebar = (e) => {
            e.preventDefault();
            
            var mask = maskRef.current; 
            var sidebar = sidebarRef.current;
            var asideContent = sidebarContentRef.current;
            var closeToggler = closeSidebarRef.current;
            
            mask.classList.toggle('fade');  
            closeToggler.style.display = "none";
            asideContent.classList.remove("active--aside");

            setTimeout(() => {  
                mask.style.display = "none";
                sidebar.style.display = "none";
            }, 300);
        }

        var expand_collapse_item = (e, id) => {
            e.preventDefault();
            var doc_id = document.querySelector(`#collapsed-item-${id}`); 
            var anchor = document.querySelector(`#nav-anchor-${id}`); 

            if( doc_id.classList.contains('expanded') ) {
                anchor.classList.remove('expanded-a')
                doc_id.classList.remove('expanded'); 
            } else {
                doc_id.classList.add('expanded');
                anchor.classList.add('expanded-a')
            }
            
        }

        return (
            <>
                <Helmet>
                    {
                        upcoming?.settings?.site_icon == "" || upcoming?.settings?.site_icon == undefined? "": 
                        <link rel="icon" type="image/webp" sizes="16x16" href={upcoming?.settings?.site_icon}/>
                    }
                </Helmet>
                <Helper.DynamicHelmet elements={upcoming.settings?.header_elms} />
                
                <aside ref={sidebarRef} className="aside responsive-aside"> 

                    {/* Maske to fade in or our */}
                    <div ref={maskRef} className="mask fade" onClick={close_sidebar}></div> 

                    {/* Close Button */}
                    <Link ref={closeSidebarRef} className="close-toggler close-btn" to='#' onClick={close_sidebar}></Link> 

                    <div ref={sidebarContentRef} className="aside-content white-bg" id="sidebar-content"> 
                        <div className="flexbox items-center content-center site-logo-container">
                            <a className="site-logo" href="#"><img src={ (upcoming.settings != null && upcoming.settings?.site_logo != "")? upcoming.settings.site_logo: logo} alt="Logo Site" width="135" height="36" /></a>
                        </div>
                        
                        <div className="wrapper side-wrapper">
                            <Helper.SearchComponent searchType='sidebar'/> 
                        </div>

                        <div className="wrapper side-wrapper">
                            <ul className="block-list">
                                {
                                    upcoming.nav_left.map(x => { 
                                        
                                        var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}><ItemElement text={x.title}/></Link></li>;
                                        
                                        if(x.subitems.length) {
                                            _return = (
                                                <li className="has-slideitem" key={x._id}> 
                                                    <Link id={`nav-anchor-${x._id}`} onClick={(e) => expand_collapse_item(e, x._id)} target={x.openInNewTab?"_blank": ""} to={x.link}><ItemElement text={x.title}/></Link>
                                                    <ul className="slideitem collapsible" id={`collapsed-item-${x._id}`}>
                                                        {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} to={y.link}>{y.title}</Link></li>)}
                                                    </ul>
                                                </li>
                                            );
                                        }

                                        return _return;
                                    })
                                }  
                            </ul>
                        </div>
                    </div>
                </aside>
                
                <header className="wrapper white-bg border-bottom plr-0 sticky">
                    <nav className="flexbox items-center offset-left offset-right plr-15 max-1172 default-height">
                        <Link to={upcoming.site_url} className="site-logo">
                            <LazyLoadImage 
                                alt={upcoming.settings.site_name}
                                width="135" 
                                height="36"
                                src={(upcoming.settings != null && upcoming.settings?.site_logo != "")? upcoming.settings.site_logo: logo}  
                            /> 
                        </Link>

                        <ul className="inline-list left-p-30 main-nav">
                            {
                               upcoming.nav_left?.map(x => { 
                                    
                                var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}><ItemElement text={x.title}/></Link></li>;
                                
                                if(x.subitems.length) {
                                    _return = (
                                        <li className="has-subitem" key={x._id}> 
                                            <Link target={x.openInNewTab?"_blank": ""} to={x.link}>
                                                <ItemElement text={x.title}/>
                                            </Link>
                                            <ul className="subitem">
                                                {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} to={y.link}>{y.title}</Link></li>)}
                                            </ul>
                                        </li>
                                    );
                                }

                                return _return;
                            })
                            }
                        </ul>

                        <ul className="inline-list left-p-30 offset-right mlr--15 update-html">
                            {
                               upcoming.nav_right.map(x => { 
                                    
                                    var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}><ItemElement text={x.title}/></Link></li>;
                                    
                                    // handling sidebar event 
                                    if( x.title.indexOf('[burgericon]') != -1 ) {
                                        _return = <li key={x._id}>
                                            <Link to='#' onClick={sidebar_toggle}>
                                                <ItemElement text={x.title}/>
                                            </Link>
                                        </li>;
                                    }

                                    if(x.subitems.length) {
                                        _return = (
                                            <li className="has-subitem" key={x._id}> 
                                                <Link target={x.openInNewTab?"_blank": ""} to={x.link}>
                                                    <ItemElement text={x.title}/>
                                                </Link>
                                                <ul className="subitem">
                                                    {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} to={y.link}>{y.title}</Link></li>)}
                                                </ul>
                                            </li>
                                        );
                                    }

                                    return _return;
                                })
                            }
                            
                        </ul>
                    </nav>
                </header>
            </>
        );
    }

    var PreLoaderHeaderComponents = () => {
        return (
            <header className="wrapper white-bg border-bottom plr-0 sticky">
                <nav className="flexbox items-center offset-left offset-right plr-15 max-1172 header-preloaders">
                    <span className="logo-preloader"></span>
                    <ul className="inline-list left-p-30 main-nav">
                        <li>
                            <span className="item-preloader"></span>
                        </li>
                        <li>
                            <span className="item-preloader"></span>
                        </li>
                        <li>
                            <span className="item-preloader"></span>
                        </li>
                        <li>
                            <span className="item-preloader"></span>
                        </li> 
                    </ul>
                    <ul className="inline-list left-p-30 offset-right mlr--15 update-html">
                        <li>
                            <span className="item-preloader"></span>
                        </li>
                        <li>
                            <span className="item-preloader"></span>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }

    return (
       <>
            {
                (upcoming.nav_left == null || upcoming.settings == null) ?
                <PreLoaderHeaderComponents/>: 
                <InitHeaderComponents/>
            }
       </>
    );

}



export { Header };