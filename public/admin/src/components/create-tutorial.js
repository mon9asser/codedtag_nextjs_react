import React, { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
 
class CreateTutorial extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            categories: [],
        };

    }

    tutorial_tabs = () => {
        var hdr = document.querySelectorAll(".tutorial-tab-header");
        if(!hdr.length) {
            return
        }

        hdr.forEach(elem => {
            elem.addEventListener("click", function(){
                
                var pare = this.parentNode;
                var block = pare.querySelector(".tutorial-tab-block");
                if( block.style.display == "none" ) {
                    block.style.display = "block"
                } else {
                    block.style.display = "none"
                }

            })
        })

    }


    loadCategories = async () => {
        
        var request = await Helper.sendRequest({
            api: "categories",
            method: "get",
            data: {}
        });

        if( request.is_error ) {
            return; 
        }

        this.setState({
            categories: request.data,
            selected_category: null
        })

    }

    componentDidMount = async () => {

        // => Load Categoris
        await this.loadCategories();

        // => tabs work 
        this.tutorial_tabs();
    }
    
    select_category = (id) => {

        var index = this.state.categories.findIndex( x => x._id == id );
        if( index == -1 ) {
            return;
        }

        var selected = this.state.categories[index];
        this.setState({
            selected_category: selected
        });
         
    }

    add_category = (e) => {
        
        e.preventDefault();

        alert("add category");

    }
    save_data = () => {
        
        /** PROPS to save 
         * this.state.selected_category
         */
    }

    render() {
        return (
            <div id="app">
                
                <NavbarContainer/>

                <SidebarContainer />

                   
                <section className="section main-section"> 
                    <div>
                        <div className="container" style={{textAlign: "left", paddingLeft:"15px"}}>
                             <h1 style={{fontSize:"30px", marginBottom:"30px", fontWeight: "bold"}}>Tutorial Name</h1>
                        </div>
                        <div style={{display: "flex", marginTop: "10px"}}>
                            
                            <div className="md-6">
                                <div className="block-container">
                                    <h1>General</h1>
                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Tutorial Title</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="e.g. Python Tutorial" />
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Duration</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="The duration required for completion" />
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Description</label>
                                        <div className="control">
                                            <textarea className="input" style={{minHeight:"100px"}}></textarea>
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                                            <label className="label">Category</label>
                                            <a onClick={this.add_category} href="#" style={{color:"blue", fontWeight:"bold", fontSize: "14px"}}>Add new</a>
                                        </div>
                                        <div className="control">
                                            <div className="select">
                                                <select onChange={e => this.select_category(e.target.value)} value={this.state.selected_category != null ? this.state.selected_category._id: ""}>
                                                    {
                                                        this.state.categories.map(x => (
                                                            <option value={x._id} key={x._id}>{x.category_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>    
                                </div> 

                                <div className="block-container">
                                    <h1>Advanced</h1>
                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Meta Title</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="e.g. Leran to code with python " />
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Slug Name</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Slug name" />
                                        </div> 
                                    </div>

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Keyphrase</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Keyphrase if two more than one use comma(,)" />
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Meta Description</label>
                                        <div className="control">
                                            <textarea className="input" style={{minHeight:"100px"}}></textarea>
                                        </div> 
                                    </div>    

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Redirect Options</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Redirect From eg: /php/" />
                                            <input className="input mt-10" type="text" placeholder="Redirect To eg: /tutorial/php-programming/" />
                                        </div> 
                                    </div> 
                                </div> 
                            </div>

                            <div className="md-6">

                                <div className="block-container">
                                    <div style={{display:"flex", justifyContent: "space-between"}}>
                                        <h1>Options</h1>
                                    </div>
                                    <div className="tab-wrap">
                                        <div className="field" style={{marginTop: "5px", display:"flex", flexDirection: "column"}}>
                                            <label className="flexbox items-center mr-15"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Show total of tutorial</span> </label>
                                            <label className="flexbox items-center"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Show duration time </span> </label>
                                            <label className="flexbox items-center"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Enable reviews </span> </label>
                                            <label className="flexbox items-center"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Show views</span> </label>
                                            <label className="flexbox items-center"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Publish</span> </label>
                                            <label className="flexbox items-center"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Hide from Search Engines</span> </label>
                                        </div> 
                                    </div>
                                </div>

                                <div className="block-container">
                                    <div style={{display:"flex", justifyContent: "space-between"}}>
                                        <h1>Tutorial Tabs</h1>
                                        <a href="#" style={{color:"blue", fontWeight:"bold", fontSize: "14px"}}>Add new</a>
                                    </div>
                                    <div className="tab-wrap">
                                        <div className="tutorial-tab-container">
                                            <div className="tutorial-tab-header">
                                                Tab 1
                                            </div> 
                                            <div className="tutorial-tab-block">
                                                <div className="field" style={{marginTop: "25px"}}>
                                                    <label className="label">Title</label>
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="e.g. Leran to code with python " />
                                                    </div> 
                                                </div> 

                                                <div className="field" style={{marginTop: "25px"}}>
                                                    <label className="label">Description</label>
                                                    <div className="control">
                                                        <textarea className="input" style={{minHeight:"100px"}}></textarea>
                                                    </div> 
                                                </div>     

                                                <div className="field" style={{marginTop: "25px"}}>
                                                    <label className="label">Slug Name</label>
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="Slug name" />
                                                    </div> 
                                                </div>

                                                <div className="field" style={{marginTop: "25px"}}>
                                                    <label className="label">Keyphrase</label>
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="Keyphrase if two more than one use comma(,)" />
                                                    </div> 
                                                </div> 

                                                <div className="field" style={{marginTop: "25px"}}>
                                                    <label className="label">Meta Title</label>
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="Meta Title" />
                                                    </div> 
                                                </div> 

                                                <div className="field" style={{marginTop: "25px"}}>
                                                    <label className="label">Meta Description</label>
                                                    <div className="control">
                                                        <textarea className="input" style={{minHeight:"100px"}}></textarea>
                                                    </div> 
                                                </div>   

                                                <div className="field" style={{marginTop: "25px"}}>
                                                    <label className="label">Redirect Options</label>
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="Redirect From eg: /php-reference/" />
                                                        <input className="input mt-10" type="text" placeholder="Redirect To eg: /php-programming/php-reference/" />
                                                    </div> 
                                                </div>

                                                <div className="field" style={{marginTop: "25px", display:"flex", flexDirection: "column"}}>
                                                    <label className="flexbox items-center mr-15"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Enable for artcile editor</span> </label>
                                                    <label className="flexbox items-center"> <input className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Hide from search engine </span> </label>
                                                </div>   
                                            </div>
                                        </div>    
                                    </div>
                                </div> 

                                 

                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-5 sticky-btns space-between">
                        <div className="flex gap-5">
                            <a className="button red">Delete</a>
                            
                            <a className="button light">Visit tutorial</a>
                        </div>
                        <div className="flex gap-5" style={{alignItems: "center"}}>
                            <label style={{display: "flex", gap: "10px", marginRight: "40px"}}>
                                <input type="checkbox" />
                                Publish
                            </label>
                            <a className="button blue" onClick={this.save_data}>Save</a>
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

export { CreateTutorial };

 