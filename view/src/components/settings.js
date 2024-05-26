import { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";


class Settings extends Component {

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
                                    
                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Banner Site Title</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Banner Site Title" />
                                        </div> 
                                    </div>  

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Banner Description</label>
                                        <div class="control">
                                            <textarea placeholder="Banner Description" className="input" style={{minHeight:"100px"}}></textarea>
                                        </div> 
                                    </div> 

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Site Address (URL)</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Site Address (URL)" />
                                        </div> 
                                    </div>

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Administration Email Address</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Administration Email Address" />
                                        </div> 
                                    </div>

                                    
                                    

                                     
                                        
                                </div> 
            
                            </div>

                            <div className="md-6" style={{margin:"0 auto"}}>
                                <div className="block-container"> 

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Meta Title</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Meta Title" />
                                        </div> 
                                    </div> 

                                    

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Meta Description</label>
                                        <div class="control">
                                            <textarea className="input" style={{minHeight:"100px"}} placeholder="Meta Description"></textarea>
                                        </div> 
                                    </div>

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Google Analytics</label>
                                        <div class="control">
                                            <label>
                                                <input type="checkbox" />
                                                Enable
                                            </label>
                                            <input class="input" type="text" placeholder="Google Analytics" />
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