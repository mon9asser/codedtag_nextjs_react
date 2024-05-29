import React, { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
// import { Helper } from "../helper.js";
import { Authentication } from "./helpers/context.js";
import { Helper } from "../helper.js";
 
class Settings extends Component {
    static contextType = Authentication;
    constructor(props) {
        
        super(props); 

        this.state = {

            page_name: "settings",

            banner_site_title: "",
            banner_site_description: "",
            site_address: "",
            admin_email_address: "",
            site_meta_title: "",
            site_meta_description: "",
            google_analytics: {
                enabled: false, 
                field: "", 
            },
            script_url_1: {
                enabled: false, 
                url_field: ""
            }, 
            script_url_2: {
                enabled: false, 
                url_field: ""
            }


        };

    }

    async componentDidUpdate() {
        
        

    }
    
    async componentDidMount(){
        
        

        // load data 
        var getter = await Helper.sendRequest({
            api: "/settings/get",
            data: {}, 
            method: "get"
        });

        if( getter.is_error ) {
            return; 
        }
         
        // setup data 
        if( ! getter.data.length ) {
            return; 
        }

        var settings = getter.data[0]; 

        this.setState({
            banner_site_title: settings.banner_site_title,
            banner_site_description : settings.banner_site_description,
            site_address: settings.site_address, 
            admin_email_address: settings.admin_email_address,
            site_meta_title: settings.site_meta_title,    
            site_meta_description: settings.site_meta_description,
            google_analytics: settings.google_analytics,
            script_url_1: settings.script_url_1,
            script_url_2: settings.script_url_2,
        })
    }

    render() {
        return (
            <div id="app">
                
                <NavbarContainer/>

                <SidebarContainer />
                   
                <section className="section main-section"> 
                    <div>
                        <div className="container" style={{textAlign: "left", paddingLeft:"15px"}}>
                             <h1 style={{fontSize:"30px", marginBottom:"30px", fontWeight: "bold"}}>Settings</h1>
                        </div>
                        <div style={{display: "flex", marginTop: "10px"}}>
                            
                            <div className="md-6" style={{margin:"0 auto"}}>
                                <div className="block-container"> 
                                    
                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Banner Site Title</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ banner_site_title: e.target.value })} value={this.state.banner_site_title} className="input" type="text" placeholder="Banner Site Title" />
                                        </div> 
                                    </div>  

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Banner Description</label>
                                        <div className="control">
                                            <textarea onChange={e => this.setState({ banner_site_description: e.target.value })} value={this.state.banner_site_description} placeholder="Banner Description" className="input" style={{minHeight:"100px"}}></textarea>
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Site Address (URL)</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ site_address: e.target.value })} value={this.state.site_address} className="input" type="text" placeholder="Site Address (URL)" />
                                        </div> 
                                    </div>

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Administration Email Address</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ admin_email_address: e.target.value })} value={this.state.admin_email_address} className="input" type="text" placeholder="Administration Email Address" />
                                        </div> 
                                    </div>
 
                                </div> 
            
                            </div>

                            <div className="md-6" style={{margin:"0 auto"}}>
                                <div className="block-container"> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Meta Title</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ site_meta_title: e.target.value })} value={this.state.site_meta_title} className="input" type="text" placeholder="Meta Title" />
                                        </div> 
                                    </div> 

                                    

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Meta Description</label>
                                        <div className="control">
                                            <textarea onChange={e => this.setState({ site_meta_description: e.target.value })} value={this.state.site_meta_description} className="input" style={{minHeight:"100px"}} placeholder="Meta Description"></textarea>
                                        </div> 
                                    </div>

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Google Analytics</label>
                                        <div className="control">
                                            <label>
                                                <input type="checkbox" />
                                                Enable
                                            </label>
                                            <input onChange={e => this.setState({ google_analytics: { ...this.state.google_analytics, field: e.target.value } })} value={this.state.google_analytics.field} className="input" type="text" placeholder="Google Analytics" />
                                        </div> 
                                    </div>

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Script Url 1</label>
                                        <div className="control">
                                            <label>
                                                <input type="checkbox" />
                                                Enable
                                            </label>
                                            <textarea className="input" style={{minHeight:"100px"}} placeholder="Example: Google AdSense"></textarea>
                                        </div> 
                                    </div>

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Script Url 2</label>
                                        <div className="control">
                                            <label>
                                                <input type="checkbox" />
                                                Enable
                                            </label>
                                            <textarea className="input" style={{minHeight:"100px"}} placeholder="Example: Google Adx"></textarea>
                                        </div> 
                                    </div>

                                </div> 
            
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-5 sticky-btns space-between">
                        <div className="flex gap-5"> 
                            
                            <a href="/test" className="button light">Visit site</a>
                        </div>
                        <div className="flex gap-5">
                        <a href="/test" className="button blue">Save</a> 
                        </div>
                    </div>
                </section> 

                <footer className="footer">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center justify-start space-x-3">
                        <div>
                            © 2021, CodedTag.com
                        </div>

                        <div>
                            <p>Developed By: <a href="/test" target="_blank">Montasser Mossallem</a></p>
                        </div>
                         
                        </div> 
                    </div>
                    </footer>

                    <div id="sample-modal" className="modal">
                    <div className="modal-background --jb-modal-close"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Sample modal</p>
                        </header>
                        <section className="modal-card-body">
                        <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
                        <p>This is sample modal</p>
                        </section>
                        <footer className="modal-card-foot">
                        <button className="button --jb-modal-close">Cancel</button>
                        <button className="button red --jb-modal-close">Confirm</button>
                        </footer>
                    </div>
                    </div>

                    <div id="sample-modal-2" className="modal">
                    <div className="modal-background --jb-modal-close"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Sample modal</p>
                        </header>
                        <section className="modal-card-body">
                        <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
                        <p>This is sample modal</p>
                        </section>
                        <footer className="modal-card-foot">
                        <button className="button --jb-modal-close">Cancel</button>
                        <button className="button blue --jb-modal-close">Confirm</button>
                        </footer>
                    </div>
                    </div>

            </div>            
        );
    }
}

export { Settings };