import { Component } from "react";
import { DataContext } from "../context";
import { Link } from "react-router-dom";
import { Helper } from "../helper";

class Footer extends Component {
    static contextType = DataContext;

    constructor( props ) {
        super(props);
        this.state = {
            company_links:[],
            follow_links:[],
            nav_links:[],
            subscribe: {
                description: '',
                title: ''
            },
            is_loaded: false
        }
    }
    
    componentDidMount() {
        const { menus, settings } = this.context;
         
        this.updateSettingsData(menus, settings);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { menus, settings } = this.context;
        this.updateSettingsData(menus, settings);
    }
    
    updateSettingsData = (menus, settings) => {
        
         
        var objx_data = null; 
        if(settings.length) {

            var settings_object = settings[0];
             
            objx_data = {
                ...objx_data,
                subscribe: {
                    description: settings_object.subscribe_description,
                    title: settings_object.subscribe_title
                }, 
                is_loaded: true
            };
        }

        if(menus.length) {
            // company_nav_links
            // follow_nav_links
            // tags_nav_links
            const company_links = menus.filter( x=> x.menu_name === "company_nav_links")
            const follow_links = menus.filter( x=> x.menu_name === 'follow_nav_links');
            const nav_links = menus.filter( x=> x.menu_name === 'tags_nav_links');
            
            

            objx_data = {
                ...objx_data,
                company_links,
                follow_links,
                nav_links,
                is_loaded: true
            };
        }

        if(this.state.is_loaded == false && menus.length && settings.length) {
            this.setState({ is_loaded: true, ...objx_data });
        }  


    }    
    render() { 
        return (
            <footer className="wrapper white-bg plr-0 footer">
                <div className="wrapper offset-left offset-right plr-15 max-1170 ptb-25">
                    <div className="row mlr--15">
                        {
                            this.state.company_links.length ?
                            <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                                <h2 className="title">Company</h2>
                                <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                    {this.state.company_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{x.title}</Link></li>)}
                                </ul>
                            </div>: ''
                        }

                        {
                            this.state.follow_links.length ?
                            <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                                <h2 className="title">Follow Us</h2>
                                <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                    {this.state.follow_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{x.title}</Link></li>)}
                                </ul>
                            </div>: ''
                        } 

                        {   
                            this.state.nav_links.length ?
                            <div className="lg-4 md-6 plr-15 ptb-15"> 
                                <h2 className="title">Follow Us</h2>
                                <ul className="inline-list tag-list custom-widget-links font-14 no-borders-list no-effect flex-wrap">
                                    {this.state.nav_links.map(x => <li key={x._id}><Link target={x.openInNewTab?"_blank": ""} to={x.link}>{x.title}</Link></li>)}
                                </ul>
                            </div>: ''
                        } 
                        <div className="lg-4 md-6 plr-15 ptb-15"> 
                            <Helper.SubscribeComponents 
                                is_footer={true}
                                title={this.state.subscribe.title}
                                description={this.state.subscribe.description}
                            /> 
                        </div>
                    </div>
                </div>
                <div className="flexbox items-center offset-left offset-right plr-15 border-top grey-border-1 content-center font-12 ptb-25">© 2022 CodedTag Inc - All right Reserved. Published with CodedTag Team</div>
                </footer> 
        );

    }

}


export { Footer };