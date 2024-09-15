import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SubscribeComponents} from '../services/components';

export default function Footer({settings, menus}) {
      
    var { company_links, follow_links, nav_links } = menus;

    var site_url = settings.site_address;

    return(
        <footer className="wrapper white-bg plr-0 footer">
                <div className="wrapper offset-left offset-right plr-15 max-1170 ptb-25">
                    <div className="row mlr--15">
                        {
                            company_links.length ?
                            <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                                <h2 className="title">Company</h2>
                                <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                    {company_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} href={x.link}>{x.title}</Link></li>)}
                                </ul>
                            </div>: ''
                        }

                        {
                            follow_links.length ?
                            <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                                <h2 className="title">Follow Us</h2>
                                <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                    {follow_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} href={x.link}>{x.title}</Link></li>)}
                                </ul>
                            </div>: ''
                        } 

                        {   
                            nav_links.length ?
                            <div className="lg-4 md-6 plr-15 ptb-15"> 
                                <h2 className="title">Tags</h2>
                                <ul className="inline-list tag-list custom-widget-links font-14 no-borders-list no-effect flex-wrap">
                                    {nav_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} href={x.link}>{x.title}</Link></li>)}
                                </ul>
                            </div>: ''
                        } 

                        <div className="lg-4 md-6 plr-15 ptb-15"> 
                            <SubscribeComponents 
                                is_footer={true}
                                settings={settings}
                                title={settings.subscribe_title}
                                description={settings.subscribe_description}
                            />  
                        </div>
                    </div>
                </div>
            </footer>
    )
    
}