import React, { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
 
class CreateTutorial extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            categories: [],
            selected_category: null,


            tabs: [
                {
                    title: "",
                    description: "",
                    slug: "",
                    keyphrase: "",
                    meta_title: "",
                    meta_description: "",
                    hide_from_search_engines: false,
                }
            ]
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

        this.setState((prevState) => {

            var categories = prevState.categories;
            
            categories.push({
                category_name: '',
                _id: Helper.generateObjectId()
            });

            return {
                categories: categories
            }
            
        })

    }
    save_data = () => {
        
        console.log(this.state.tabs);
        /** PROPS to save 
         * this.state.selected_category
         */
    }

    save_categories_data = async () => {

        // delete empt 
        this.setState((prevState) => {
            
            var cats = prevState.categories.filter( x => x.category_name != '');

            return {
                categories: cats
            };
        });

        var reqs = await Helper.sendRequest({
            api: "category/blk-create-update",
            method: "post",
            data: { 
                data_array: this.state.categories
            },
            is_create: true
        });

        if( ! reqs.is_error ) {
            return; 
        } 

    }

    add_to_category = (value, index) => {
        
        var cats = [...this.state.categories];
        if( cats[index] == undefined ) {
            var objx = {
                _id: Helper.generateObjectId(),
                category_name: value
            };
            cats.push(objx)
        } else {
            cats[index].category_name = value
        }
        
        this.setState({
            categories: cats
        });

    }
    
    delete_category = async (id) => {
        
        var res = await Helper.sendRequest({
            api: "category/blk-delete",
            data: {
                data_array: [{_id: id}]
            },
            method: "post"
        });
        
        if(! res.is_error ) {

            var reqs = await Helper.sendRequest({
                api: "categories",
                data: {},
                method: "get"
            })

            if(reqs.is_error) {
                return; 
            }

            this.setState({
                categories: reqs.data
            })

        }

    }

    change_tap = (e, key, index) => {
        this.setState((prevState) => {
                                                                            
            prevState.tabs[index][key] = e.target.value;
            
            return {
                tabs: prevState.tabs
            }

        });
    }

    Categories_List_Modal = () => {
        return (
            <div id="categories-list-modal" className="modal">
                    <div className="modal-background --jb-modal-close"></div>
                    <div className="modal-card">
                        <header className="modal-card-head" style={{display:"flex", justifyContent: "space-between"}}>
                            <p className="modal-card-title">Categories</p>
                            <a className="button blue" onClick={this.add_category}>Add Category</a>
                        </header>
                        <section className="modal-card-body">
                            
                            {
                                ( ! this.state.categories.length ) ?
                                    <span>
                                        No Categories Found!
                                    </span>
                                :
                                this.state.categories.map((category, index) => (
                                    <div key={index} style={{display: "flex", border: "1px solid #ddd", alignItems: "center", marginBottom: "10px", width: "100%", backgroundColor: "red"}}>
                                        <input onChange={e => this.add_to_category(e.target.value, index)} value={category.category_name} style={{display: "block", width: "100%", padding: "10px", outline: "none"}} placeholder="Category name" />
                                        <a className="button red" onClick={() => this.delete_category(category._id)}>Delete</a>
                                    </div> 
                                ))                                
                            } 

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button --jb-modal-close">Cancel</button>
                            <button onClick={this.save_categories_data} className="button blue --jb-modal-close">Confirm</button>
                        </footer>
                    </div>
            </div>
        )
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
                                            <a data-target="categories-list-modal" className="--jb-modal" href="#" style={{color:"blue", fontWeight:"bold", fontSize: "14px"}}>Add new</a>
                                        </div>
                                        <this.Categories_List_Modal/> 
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
                                        
                                        {
                                            this.state.tabs.map((x, index) => (
                                                <div key={index} className="tutorial-tab-container">
                                                    <div className="tutorial-tab-header">
                                                        Tab {index + 1}
                                                    </div> 
                                                    <div className="tutorial-tab-block">
                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Title</label>
                                                            <div className="control">
                                                                <input 
                                                                    value={x.title} 
                                                                    onChange={(e) => this.change_tap = (e, "title", index) } 
                                                                    className="input" 
                                                                    type="text" 
                                                                    placeholder="e.g. Leran to code with python " 
                                                                />
                                                            </div> 
                                                        </div> 

                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Description</label>
                                                            <div className="control">
                                                                <textarea 
                                                                    value={x.description} 
                                                                    onChange={(e) => this.change_tap = (e, "description", index) } 
                                                                    className="input" 
                                                                    style={{minHeight:"100px"}}></textarea>
                                                            </div> 
                                                        </div>     

                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Slug Name</label>
                                                            <div className="control">
                                                                <input 
                                                                    value={x.slug} 
                                                                    onChange={(e) => this.change_tap = (e, "slug", index) } 
                                                                    className="input" 
                                                                    type="text" 
                                                                    placeholder="Slug name" 
                                                                />
                                                            </div> 
                                                        </div>

                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Keyphrase</label>
                                                            <div className="control">
                                                                <input 
                                                                    value={x.keyphrase} 
                                                                    onChange={(e) => this.change_tap = (e, "keyphrase", index) } 
                                                                    className="input" 
                                                                    type="text" 
                                                                    placeholder="Keyphrase if two more than one use comma(,)" 
                                                                />
                                                            </div> 
                                                        </div> 

                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Meta Title</label>
                                                            <div className="control">
                                                                <input 
                                                                    value={x.meta_title} 
                                                                    onChange={(e) => this.change_tap = (e, "meta_title", index) }
                                                                    className="input" 
                                                                    type="text" 
                                                                    placeholder="Meta Title" 
                                                                />
                                                            </div> 
                                                        </div> 

                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Meta Description</label>
                                                            <div className="control">
                                                                <textarea 
                                                                    value={x.meta_description} 
                                                                    onChange={(e) => this.change_tap = (e, "meta_description", index) }
                                                                    className="input" 
                                                                    style={{minHeight:"100px"}}
                                                                ></textarea>
                                                            </div>  
                                                        </div>   
                                                            

                                                        <div className="field" style={{marginTop: "25px", display:"flex", flexDirection: "column"}}>
                                                            <label className="flexbox items-center"> 
                                                                <input 
                                                                    onChange={(e) => this.change_tap = (e, "hide_from_search_engines", index) }
                                                                    checked={x.hide_from_search_engines} 
                                                                    className="mr-8" 
                                                                    type="checkbox" 
                                                                />
                                                                <span style={{marginLeft: 5, fontSize: "14px"}}>Hide from search engine </span> 
                                                            </label>
                                                        </div>   
                                                    </div>
                                                </div>    
                                            ))
                                        } 

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

 