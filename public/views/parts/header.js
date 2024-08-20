import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SearchComponent} from '../services/components';
export default function Header({settings, menus}) {
    
    var sidebarRef = useRef();
    var sidebarContentRef = useRef();
    var maskRef = useRef();
    var closeSidebarRef = useRef();

    var { nav_left, nav_right } = menus;
    var site_url = settings.site_address;
     
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

    return(
        <> 
            <header className="wrapper white-bg border-bottom plr-0 sticky">
                <nav className="flexbox items-center offset-left offset-right plr-15 max-1172 default-height">
                    
                <aside ref={sidebarRef} className="aside responsive-aside"> 

                    {/* Maske to fade in or our */}
                    <div ref={maskRef} className="mask fade" onClick={close_sidebar}></div> 

                    {/* Close Button */}
                    <Link ref={closeSidebarRef} className="close-toggler close-btn" href='#' onClick={close_sidebar}></Link> 

                    <div ref={sidebarContentRef} className="aside-content white-bg" id="sidebar-content"> 
                        <div className="flexbox items-center content-center site-logo-container">
                            {
                                settings != null && settings.site_logo != ""?
                                <Link className="site-logo" href={site_url}><Image src={settings.site_logo} alt="Logo Site" width="135" height="36" /></Link>
                                : ""
                            }
                        </div>
                        
                        <div className="wrapper side-wrapper">
                            <SearchComponent searchType='sidebar'/> 
                        </div>

                        <div className="wrapper side-wrapper">
                            <ul className="block-list no-padding">
                                {
                                    nav_left.map(x => { 
                                        
                                        var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} href={x.link}><ItemElement text={x.title}/></Link></li>;
                                        
                                        if(x.subitems.length) {
                                            _return = (
                                                <li className="has-slideitem" key={x._id}> 
                                                    <Link id={`nav-anchor-${x._id}`} onClick={(e) => expand_collapse_item(e, x._id)} target={x.openInNewTab?"_blank": ""} href={x.link}><ItemElement text={x.title}/></Link>
                                                    <ul className="slideitem collapsible" id={`collapsed-item-${x._id}`}>
                                                        {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} href={y.link}>{y.title}</Link></li>)}
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
                        
                        {
                            settings != null && settings?.site_logo != "" ?
                            <Link href={site_url} className="site-logo">
                                <Image 
                                    alt={settings.site_name}
                                    width="135" 
                                    height="36"
                                    src={settings?.site_logo}  
                                /> 
                            </Link>: ""
                        }
                        

                        <ul className="inline-list left-p-30 main-nav">
                            {
                            nav_left?.map(x => { 
                                    
                                var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} href={x.link}><ItemElement text={x.title}/></Link></li>;
                                
                                if(x.subitems.length) {
                                    _return = (
                                        <li className="has-subitem" key={x._id}> 
                                            <Link target={x.openInNewTab?"_blank": ""} href={x.link}>
                                                <ItemElement text={x.title}/>
                                            </Link>
                                            <ul className="subitem">
                                                {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} href={y.link}>{y.title}</Link></li>)}
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
                            nav_right.map(x => { 
                                    
                                    var _return = <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} href={x.link}><ItemElement text={x.title}/></Link></li>;
                                    
                                    // handling sidebar event 
                                    if( x.title.indexOf('[burgericon]') != -1 ) {
                                        _return = <li key={x._id}>
                                            <Link href='#' onClick={sidebar_toggle}>
                                                <ItemElement text={x.title}/>
                                            </Link>
                                        </li>;
                                    }

                                    if(x.subitems.length) {
                                        _return = (
                                            <li className="has-subitem" key={x._id}> 
                                                <Link target={x.openInNewTab?"_blank": ""} href={x.link}>
                                                    <ItemElement text={x.title}/>
                                                </Link>
                                                <ul className="subitem">
                                                    {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab?"_blank": ""} href={y.link}>{y.title}</Link></li>)}
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
                     
                </nav>
            </header>
        </>
    )

    return <b>Header</b>
}