import { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";


class CreateUser extends Component {
    
    constructor(props) {
        
        super(props);

        this.state = {
            

            firstname: "",
            secondname: "",
            password: "",
            confirm_password: "",   
            username: "",
            email: "", 
            about: "",
            rule: 0,

            social_links: [],
            
            allow_appears_in_search_engine:false,
            send_newsletter: false,
            is_pressed: false,

            show_message: "",
            request_status_class: "",
            request_message: ""
        };

    }

    componentDidMount = () => {
        
    }
    
    render() {
        return (
            <div id="app">
                
                <NavbarContainer/>

                <SidebarContainer />

                   
                <section className="section main-section"> 
                    <div>
                        <div className="container" style={{textAlign: "left", paddingLeft:"15px"}}>
                             <h1 style={{fontSize:"30px", marginBottom:"30px", fontWeight: "bold"}}>User Name</h1>
                        </div>
                        <div style={{display: "flex", marginTop: "10px"}}>
                            
                            <div className="md-6" style={{margin:"0 auto"}}>
                                <div className="block-container"> 
                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">First Name</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="First Name" />
                                        </div> 
                                    </div> 

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Second Name</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Second Name" />
                                        </div> 
                                    </div>

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Password</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Password" />
                                        </div> 
                                    </div>

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Confirm Password</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Confirm Password" />
                                        </div> 
                                    </div>

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Username</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Username" />
                                        </div> 
                                    </div>

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Email (required)</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="example@gmail.com" />
                                        </div> 
                                    </div> 

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Description</label>
                                        <div class="control">
                                            <textarea className="input" style={{minHeight:"100px"}}></textarea>
                                        </div> 
                                    </div> 

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                                            <label class="label">Rule</label>
                                        </div>
                                        <div class="control">
                                            <div class="select">
                                                <select>
                                                    <option>Author</option>
                                                    <option>Administrator</option>
                                                    <option>Contributer</option>
                                                    <option>Editor</option>
                                                    <option>Subscriber</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                        
                                </div> 
            
                            </div>

                            <div className="md-6" style={{margin:"0 auto"}}>
                                <div className="block-container"> 

                                 
                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Thumbnail</label>
                                        <div class="control">
                                            <div class="flexbox items-center gap-20" style={{display: "flex", gap: "20px", marginTop: "12px"}}>
                                                <img src="https://secure.gravatar.com/avatar/dd70045993d177d305a8fe9f8025c702?s=64&amp;d=mm&amp;r=g" alt="" width="64" height="64" />
                                                <input class="full-border grey-border" type="text" placeholder="Write email here" style={{border: "1px solid #ddd", padding: '15px'}}/>
                                                <button className="button tan">Generate Thumbnail</button>
                                            </div>
                                        </div> 
                                    </div> 

                                    <div class="field" style={{marginTop: "25px"}}>
                                        <label class="label">Social Media</label>
                                        <div class="control" style={{display:"flex", gap: "15px"}}>
                                            <input class="input" style={{flexBasis: "230px"}} type="text" placeholder="Social Name" />
                                            <input class="input" type="text" placeholder="Social Page Link" />
                                        </div> 
                                        <button class="button tan" style={{marginTop: "15px", marginLeft: "auto"}}>Add New Media</button>
                                    </div> 

                                     
                                </div> 
            
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-5 sticky-btns space-between">
                        <div className="flex gap-5">
                            <a className="button red">Delete</a>
                            
                            <a className="button light">Visit page</a>
                        </div>
                        <div className="flex gap-5">
                        <a className="button blue">Save</a> 
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
                            <p>Developed By: <a href="https://codedtag.com/" target="_blank">Montasser Mossallem</a></p>
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

export { CreateUser };