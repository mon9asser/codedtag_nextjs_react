import React from "react";
import { DataContext } from "../context";
import { Link, useOutlet } from "react-router-dom";
import { Helper } from "../helper";

var Footer = ({menus, settings}) => {


    var [upcoming, upcoming_change] = React.useState({
        
        company_links:null,
        follow_links: null,
        nav_links: null, 

        settings: null,
        site_url: null
    })

    React.useEffect(() => {
        
        var company_links = menus?.filter( x=> x.menu_name === "company_nav_links")
        var follow_links = menus?.filter( x=> x.menu_name === 'follow_nav_links');
        var nav_links = menus?.filter( x=> x.menu_name === 'tags_nav_links');

        // build site url 
        var site_url = settings?.site_address;

        if( company_links == undefined ) company_links = null
        if( follow_links == undefined ) follow_links = null
        if( nav_links == undefined ) nav_links = null

        if( site_url == undefined ) site_url = null
        
        if(site_url) {
            var url_array = site_url.split('/');
            if( url_array[url_array.length - 1] != '' ) {
                site_url = site_url + '/';
            }
        } 

        upcoming_change({
            company_links,
            follow_links,
            nav_links,
            settings: settings,
            site_url: site_url
        })
    }, [menus, settings]);


    
    var PreLoaderFooterComponents = () => {
       return (
        <footer className="wrapper white-bg plr-0 footer">
                <div className="wrapper offset-left offset-right plr-15 max-1170 ptb-25 footer-preloaders">
                    <div className="row mlr--15">
                        <div className="lg-2 md-3 sm-6 plr-15 ptb-15">
                            <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                            </ul>
                        </div>

                        <div className="lg-2 md-3 sm-6 plr-15 ptb-15">
                            <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                            </ul>
                        </div>

                        <div className="lg-4 md-6 plr-15 ptb-15">
                            <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                            </ul>
                        </div>

                        <div className="lg-4 md-6 plr-15 ptb-15">
                            <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                                <li><span className="prloader-items-data"></span></li>  
                            </ul>
                        </div>
                    </div>
                    
                </div>
        </footer>
       );
    } 

    var InitFooterComponents = () => {
        return (
            <>
                <footer className="wrapper white-bg plr-0 footer">
                    <div className="wrapper offset-left offset-right plr-15 max-1170 ptb-25">
                        <div className="row mlr--15">
                            {
                                upcoming.company_links.length ?
                                <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                                    <h2 className="title">Company</h2>
                                    <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                        {upcoming.company_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{x.title}</Link></li>)}
                                    </ul>
                                </div>: ''
                            }

                            {
                                upcoming.follow_links.length ?
                                <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                                    <h2 className="title">Follow Us</h2>
                                    <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                        {upcoming.follow_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{x.title}</Link></li>)}
                                    </ul>
                                </div>: ''
                            } 

                            {   
                                upcoming.nav_links.length ?
                                <div className="lg-4 md-6 plr-15 ptb-15"> 
                                    <h2 className="title">Follow Us</h2>
                                    <ul className="inline-list tag-list custom-widget-links font-14 no-borders-list no-effect flex-wrap">
                                        {upcoming.nav_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{x.title}</Link></li>)}
                                    </ul>
                                </div>: ''
                            } 

                            <div className="lg-4 md-6 plr-15 ptb-15"> 
                                <Helper.SubscribeComponents 
                                    is_footer={true}
                                    title={upcoming.settings.subscribe_title}
                                    description={upcoming.settings.subscribe_description}
                                /> 
                            </div>
                        </div>
                    </div>
                </footer>

                {Helper.renderElements(upcoming.settings?.footer_elms)} 
            </>
        )
    }

    return (
       <>
         {
            (upcoming.nav_links == null || upcoming.company_links == null || upcoming.follow_links == null || upcoming.settings == null) ?
            <PreLoaderFooterComponents/>: 
            <InitFooterComponents/>
        }
       </>
    );
}


export { Footer };