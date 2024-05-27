import { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
 
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            page_name: "settings",

            banner_site_title: "",
            banner_site_description: "",
            site_address: "",
            admin_email: "",
            meta_title: "",
            meta_description: "",
            google_analytics: {
                enable: false, 
                analytics_id: "", 
            },
            google_ads_1: {
                enable: false, 
                url: ""
            }, 
            google_ads_2: {
                enable: false, 
                url: ""
            }
        };
    }

    async componentDidMount(){
        
        // check user capabilities 
        var access = await Helper.checkUserCapabilities(this.state.page_name);
         
        if( !access.is_accessed ) {
            window.location.href = access.redirect_to;
        }

        // load data 
        this.setState({
            banner_site_title: "",
            banner_site_description: "",
            site_address: "",
            admin_email: "",
            meta_title: "",
            meta_description: "",
            google_analytics: {
                enable: false, 
                analytics_id: "", 
            },
            google_ads_1: {
                enable: false, 
                url: ""
            }, 
            google_ads_2: {
                enable: false, 
                url: ""
            }
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
                                            <input className="input" type="text" placeholder="Banner Site Title" />
                                        </div> 
                                    </div>  

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Banner Description</label>
                                        <div className="control">
                                            <textarea placeholder="Banner Description" className="input" style={{minHeight:"100px"}}></textarea>
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Site Address (URL)</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Site Address (URL)" />
                                        </div> 
                                    </div>

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Administration Email Address</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Administration Email Address" />
                                        </div> 
                                    </div>

                                    
                                    

                                     
                                        
                                </div> 
            
                            </div>

                            <div className="md-6" style={{margin:"0 auto"}}>
                                <div className="block-container"> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Meta Title</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Meta Title" />
                                        </div> 
                                    </div> 

                                    

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Meta Description</label>
                                        <div className="control">
                                            <textarea className="input" style={{minHeight:"100px"}} placeholder="Meta Description"></textarea>
                                        </div> 
                                    </div>

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Google Analytics</label>
                                        <div className="control">
                                            <label>
                                                <input type="checkbox" />
                                                Enable
                                            </label>
                                            <input className="input" type="text" placeholder="Google Analytics" />
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