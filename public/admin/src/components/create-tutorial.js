import React, { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
 
class CreateTutorial extends Component {

    constructor(props) {
        
        super(props);
        this.request_result_ref = React.createRef();
        this.state = {
            
            shortcode_modal: false,
            category_modal: false, 

            tutorial_id: "",

            categories: [],
            selected_category: null,
            enable_beside_title:true,
            tutorial_title: "",
            duration: "",
            description: "", 
            content: "",
            tutorial_svg_icon: "",
            reviews: 0,
            meta_title: "",
            slug: "",
            keyphrase: "",
            meta_description: "",
            thumbnail_url: "",
            tag: '',
            options: {
                show_total_of_tutorial: false,
                enable_beside_title: true,
                show_duration_time: false,
                enable_reviews: false,
                show_views: false,
                publish: false,
                hide_from_search_engines: false,
                publish_chapters: false,
                sidebar_content: 'none',
            },

            tab_copy: {
                title: "",
                description: "",
                content: "",
                slug: "",
                keyphrase: "",
                meta_title: "",
                meta_description: "",
                thumbnail_url: "",
                tag: "",
                tutorial_svg_icon: "",
                reviews: 0,
                hide_from_search_engines: false,
                publish_chapters: false,
                sidebar_content: 'none',
                is_open: false,
                
            },
            tabs: [],

            is_pressed: false,

            show_message: "",
            request_status_class: "",
            request_message: ""
        };

    }

    ShortCodeComponentModal = () => {
        const { shortcode_modal } = this.state;
        return (
            <div className={`modal ${shortcode_modal ? "open_this_modal" : ""}`}>
                <div className="modal-background --jb-modal-close"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Shortcode Modal</p>
                    </header>
                    <section className="modal-card-body">
                        <ul>
                            <li style={{display:'flex', alignItems: "center", marginBottom: "10px"}}>
                                <b style={{flexBasis: '150px', border: '1px solid #ddd', marginRight: '12px', background: '#fff', padding: '11px'}}>
                                    |
                                </b>
                                <span>
                                    Break line between elements 
                                </span>
                            </li>

                            <li style={{display:'flex', alignItems: "center", marginBottom: "10px"}}>
                              
                                <b style={{flexBasis: '150px', border: '1px solid #ddd', marginRight: '12px', background: '#fff', padding: '11px'}}>
                                    [youtube src="URL OF VIDEO"]
                                </b>
                                <span>
                                    Youtube Iframe 
                                </span>
                            </li>

                            <li style={{display:'flex', alignItems: "center", marginBottom: "10px"}}>
                              
                                <b style={{flexBasis: '150px', border: '1px solid #ddd', marginRight: '12px', background: '#fff', padding: '11px'}}>
                                    [youtube src="URL OF VIDEO"]
                                </b>
                                <span>
                                    Youtube Iframe 
                                </span>
                            </li>

                            <li style={{display:'flex', alignItems: "center", marginBottom: "10px"}}>
                              
                                <b style={{flexBasis: '150px', border: '1px solid #ddd', marginRight: '12px', background: '#fff', padding: '11px'}}>
                                    [h(1 to 6)]
                                </b>
                                <span>
                                    Headline 
                                </span>
                            </li>

                            <li style={{display:'flex', alignItems: "center", marginBottom: "10px"}}>
                              
                                <b style={{flexBasis: '150px', border: '1px solid #ddd', marginRight: '12px', background: '#fff', padding: '11px'}}>
                                    [chapters-posts]
                                </b>
                                <span>
                                    Chapter or Posts List 
                                </span>
                            </li>
                        </ul>
                    </section>
                    <footer className="modal-card-foot"> 
                        <button onClick={e => this.setState({shortcode_modal: false})} className="button red">Ok</button>
                    </footer>
                </div>
            </div>
        )
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

    delete_tab = (e, index) => {
        
        e.preventDefault();

        var tabs = [...this.state.tabs];

        var deleted_tabs = tabs.filter((el, key) => key != index ); 
        
        this.setState({
            tabs: deleted_tabs
        })
    }

    save_data = async (e) => {
        
        e.preventDefault(); 

        this.setState({ 
            is_pressed: true, 
            show_message: "",
            request_status_class: "",
            request_message: ""
        }); 

        if( this.state.selected_category == null ) {
            this.setState({ 
                is_pressed: false, 
                show_message: "show_message",
                request_status_class: "error",
                request_message: "Category is required"
            }); 

            return;
        }

        if( this.state.is_pressed ) {
            return; 
        }

        var data_to_send = {
            tutorial_title: this.state.tutorial_title,
            enable_beside_title: this.state.enable_beside_title,
            duration: this.state.duration,
            description: this.state.description,
            content: this.state.content,
            meta_title: this.state.meta_title,
            slug: this.state.slug,
            keyphrase: this.state.keyphrase,
            meta_description: this.state.meta_description, 
            thumbnail_url: this.state.thumbnail_url, 
            tag: this.state.tag,
            tutorial_svg_icon: this.state.tutorial_svg_icon, 
            reviews: this.state.reviews, 
            options: this.state.options, 
            tabs: this.state.tabs,
            selected_category: {
                name: this.state.selected_category.category_name,
                id: this.state.selected_category._id,
            }
        };

        if(this.state.tutorial_id != "") {
            data_to_send.tutorial_id = this.state.tutorial_id;
        }

        var request = await Helper.sendRequest({
            api: "tutorial/create-update", 
            method: "post", 
            data: {...data_to_send},
            is_create: (data_to_send.tutorial_id != undefined && data_to_send.tutorial_id == true ) ? true: false
        })
        
        if( request.is_error ) {
            this.setState({ 
                is_pressed: false, 
                show_message: "show_message",
                request_status_class: "error",
                request_message: request.message
            }); 

            return;
        }
        //console.log(request);
        this.setState({ 
            is_pressed: false, 
            show_message: "show_message",
            request_status_class: "success",
            request_message: request.message
        }); 
        /** PROPS to save 
         * this.state.selected_category
         */
    }

    save_categories_data = async () => {

        // delete empt 
        this.setState((prevState) => {
            
            var cats = prevState.categories.filter( x => x.category_name != '');

            return {
                categories: cats,
                category_modal: false
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
        var  { category_modal } = this.state;
        return (
            <div className={`modal ${category_modal ? "open_this_modal" : ""}`}>
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
                            <button className="button" onClick={e => this.setState({category_modal: false})}>Cancel</button>
                            <button onClick={this.save_categories_data} className="button blue">Confirm</button>
                        </footer>
                    </div>
            </div>
        )
    }
    
    add_new_tab = (e) => {
        
        e.preventDefault();

        this.setState((prevState) => {

            var tabs = prevState.tabs;
            var new_tab = this.state.tab_copy;

            tabs.push(new_tab);

            return {
                tabs: tabs
            };

        })
    };

    expand_collapse_element = ( index ) => {
        
        var tabs = [...this.state.tabs];
        var objx = {...tabs[index]};
            objx.is_open = !this.state.tabs[index].is_open;
            tabs[index] = objx;

        this.setState({tabs: tabs});
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
                                            <input 
                                                onChange={e => this.setState({
                                                    tutorial_title: e.target.value
                                                })}
                                                value={this.state.tutorial_title}
                                                className="input" 
                                                type="text" 
                                                placeholder="e.g. Python Tutorial" 
                                            />
                                        </div> 
                                    </div> 
                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Enable Beside Title</label>
                                        <div className="control">
                                            <input 
                                                onChange={e => this.setState({
                                                    enable_beside_title: ! this.state.enable_beside_title
                                                })}
                                                checked={this.state.enable_beside_title}
                                                type="checkbox"  
                                            />
                                        </div> 
                                    </div> 
                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Duration</label>
                                        <div className="control">
                                            <input 
                                                onChange={e => this.setState({
                                                    duration: e.target.value
                                                })}
                                                value={this.state.duration}
                                                className="input" 
                                                type="text" 
                                                placeholder="The duration required for completion" 
                                            />
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                                            <label className="label">Description</label>
                                            <button onClick={e => this.setState({shortcode_modal: true})} style={{color:"blue", fontWeight:"bold", fontSize: "14px"}}>Shortcode</button>
                                        </div>
                                        <div className="control">
                                            <textarea 
                                                onChange={e => this.setState({
                                                    description: e.target.value
                                                })}
                                                value={this.state.description}
                                                className="input" 
                                                style={{minHeight:"100px"}}
                                            ></textarea>
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                         
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                                            <label className="label">Turorial Content</label>
                                            <button onClick={e => this.setState({shortcode_modal: true})} style={{color:"blue", fontWeight:"bold", fontSize: "14px"}}>Shortcode</button>
                                        </div>

                                        <div className="control">
                                            <textarea 
                                                onChange={e => this.setState({
                                                    content: e.target.value
                                                })}
                                                value={this.state.content}
                                                className="input" 
                                                style={{minHeight:"100px"}}
                                            ></textarea>
                                        </div> 

                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                                            <label className="label">Category</label>
                                            <button onClick={e => this.setState({category_modal: true})} style={{color:"blue", fontWeight:"bold", fontSize: "14px"}}>Add new</button>
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
                                            <input 
                                                onChange={e => this.setState({
                                                    meta_title: e.target.value
                                                })}
                                                value={this.state.meta_title}
                                                className="input" 
                                                type="text" 
                                                placeholder="e.g. Leran to code with python" 
                                            />
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Slug Name</label>
                                        <div className="control">
                                            <input 
                                                onChange={e => this.setState({
                                                    slug: e.target.value
                                                })}
                                                value={this.state.slug}
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
                                                onChange={e => this.setState({
                                                    keyphrase: e.target.value
                                                })}
                                                value={this.state.keyphrase}
                                                className="input" 
                                                type="text" 
                                                placeholder="Keyphrase if two more than one use comma(,)" 
                                            />
                                        </div> 
                                    </div> 
                                    
                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Tutorial Thumbnail (Image URL)</label>
                                        <div className="control">
                                            <input 
                                                onChange={e => this.setState({
                                                    thumbnail_url: e.target.value
                                                })}
                                                value={this.state.thumbnail_url}
                                                className="input" 
                                                type="text" 
                                                placeholder="Image URL" 
                                            />
                                        </div> 
                                    </div> 
                                    
                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Tag</label>
                                        <div className="control">
                                            <input 
                                                onChange={e => this.setState({
                                                    tag: e.target.value
                                                })}
                                                value={this.state.tag}
                                                className="input" 
                                                type="text" 
                                                placeholder="Example: JavaScript" 
                                            />
                                        </div> 
                                    </div> 

                                    <div className="field" style={{marginTop: "25px"}}>
                                        <label className="label">Meta Description</label>
                                        <div className="control">
                                            <textarea 
                                                onChange={e => this.setState({
                                                    meta_description: e.target.value
                                                })}
                                                value={this.state.meta_description}
                                                className="input" 
                                                style={{minHeight:"100px"}}
                                            ></textarea>
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
                                            <label className="flexbox items-center mr-15"> 
                                                <input checked={this.state.options.show_total_of_tutorial} onChange={(e) => this.setState({options: { ...this.state.options, show_total_of_tutorial: !this.state.options.show_total_of_tutorial }})} className="mr-8" type="checkbox" />
                                            <span style={{marginLeft: 5, fontSize: "14px"}}>Show total of tutorial</span> </label>
                                            <label className="flexbox items-center"> <input checked={this.state.options.enable_beside_title} onChange={(e) => this.setState({options: { ...this.state.options, enable_beside_title: !this.state.options.enable_beside_title }})} className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Enable Beside Meta Title </span> </label>
                                            <label className="flexbox items-center"> <input checked={this.state.options.show_duration_time} onChange={(e) => this.setState({options: { ...this.state.options, show_duration_time: !this.state.options.show_duration_time }})} className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Show duration time </span> </label>
                                            <label className="flexbox items-center"> <input checked={this.state.options.enable_reviews} onChange={(e) => this.setState({options: { ...this.state.options, enable_reviews: !this.state.options.enable_reviews }})} className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Enable reviews </span> </label>
                                            <label className="flexbox items-center"> <input checked={this.state.options.show_views} onChange={(e) => this.setState({options: { ...this.state.options, show_views: !this.state.options.show_views }})} className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Show views</span> </label>
                                            <label className="flexbox items-center"> <input checked={this.state.options.publish} onChange={(e) => this.setState({options: { ...this.state.options, publish: !this.state.options.publish }})} className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Publish</span> </label>
                                            <label className="flexbox items-center"> <input checked={this.state.options.hide_from_search_engines} onChange={(e) => this.setState({options: { ...this.state.options, hide_from_search_engines: !this.state.options.hide_from_search_engines }})} className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Hide from Search Engines</span> </label>
                                            {/* <label className="flexbox items-center"> <input checked={this.state.options.publish_chapters} onChange={(e) => this.setState({options: { ...this.state.options, publish_chapters: !this.state.options.publish_chapters }})} className="mr-8" type="checkbox" /><span style={{marginLeft: 5, fontSize: "14px"}}>Publish Chapters</span> </label> */}
                                            <label className="flexbox items-center contain-selectbox"> 
                                                <span style={{marginLeft: 5, fontSize: "14px"}}>Sidebar Type</span>
                                                <select value={this.state.options.sidebar_content} onChange={e => this.setState({ options: { ...this.state.options, sidebar_content: e.target.value } })}>
                                                    <option value={'none'}>Disable Sidebar</option>
                                                    <option value={'chapters'}>Chapters</option>
                                                    <option value={'posts'}>Posts Links</option>
                                                </select> 
                                            </label>
                                        </div> 
                                    </div>
                                </div>

                                <div className="block-container">
                                    <div style={{display:"flex", justifyContent: "space-between"}}>
                                        <h1>Logo of tutorials in SVG code</h1>
                                    </div>
                                    <div className="tab-wrap">
                                        <div className="field" style={{marginTop: "5px", display:"flex", flexDirection: "column"}}>
                                            <textarea 
                                                onChange={e => this.setState({
                                                    tutorial_svg_icon: e.target.value
                                                })}
                                                value={this.state.tutorial_svg_icon}
                                                className="input" 
                                                style={{minHeight:"100px"}}
                                            ></textarea>
                                        </div> 
                                    </div>

                                    <div style={{display:"flex", marginTop: "30px", justifyContent: "space-between"}}>
                                        <h1>Reviews</h1>
                                    </div>
                                    <div className="tab-wrap">
                                        <div className="field" style={{marginTop: "5px", display:"flex", flexDirection: "column"}}>
                                            <input 
                                                onChange={e => this.setState({
                                                    reviews: e.target.value
                                                })}
                                                value={this.state.reviews}
                                                className="input"  
                                            />
                                        </div> 
                                    </div>
                                </div>
                                    
                                <div className="block-container">
                                    <div style={{display:"flex", justifyContent: "space-between"}}>
                                        <h1>Tutorial Tabs</h1>
                                        <a href="#" onClick={this.add_new_tab} style={{color:"blue", fontWeight:"bold", fontSize: "14px"}}>Add new</a>
                                    </div>
                                    <div className="tab-wrap">
                                        
                                        {
                                            this.state.tabs.length ?
                                            this.state.tabs.map((x, index) => (
                                                <div key={index} className="tutorial-tab-container">
                                                    <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                                                        <a href="#" onClick={(e) => this.delete_tab(e, index)} style={{background: "tomato", color: "#fff", padding: "2px 10px", borderRadius: "2px"}}>
                                                            <span className="mdi mdi-delete"></span>
                                                        </a>
                                                        <div style={{flexGrow: 1}} onClick={() => this.expand_collapse_element(index)} className="tutorial-tab-header">
                                                            Tab {index + 1}
                                                        </div> 
                                                    </div>
                                                    <div className={`tutorial-tab-block ${x.is_open? "block": ""}`}>
                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Title</label>
                                                            <div className="control">
                                                                <input 
                                                                    value={x.title} 
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].title = value;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
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
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].description = value;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
                                                                    className="input" 
                                                                    style={{minHeight:"100px"}}></textarea>
                                                            </div> 
                                                        </div>     

                                                        <div className="field" style={{marginTop: "25px"}}>
                                                            <label className="label">Slug Name</label>
                                                            <div className="control">
                                                                <input 
                                                                    value={x.slug} 
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].slug = value;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
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
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].keyphrase = value;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
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
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].meta_title = value;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
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
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].meta_description = value;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
                                                                    className="input" 
                                                                    style={{minHeight:"100px"}}
                                                                ></textarea>
                                                            </div>  
                                                        </div>   
                                                            
                                                        
                                                        <div className="field" style={{marginTop: "25px", display:"flex", flexDirection: "column"}}>
                                                            <label className="flexbox items-center"> 
                                                                <input 
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].hide_from_search_engines = !this.state.tabs[index].hide_from_search_engines;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
                                                                    checked={x.hide_from_search_engines} 
                                                                    className="mr-8" 
                                                                    type="checkbox" 
                                                                />
                                                                <span style={{marginLeft: 5, fontSize: "14px"}}>Hide from search engine </span> 
                                                            </label>
                                                        </div>  

                                                        <div className="field" style={{marginTop: "10px", display:"flex", flexDirection: "column"}}>
                                                            <label className="flexbox items-center"> 
                                                                <input 
                                                                    onChange={(e) => {
                                                                        var value = e.target.value;
                                                                        this.setState((prevState) => {
                                                                            
                                                                            prevState.tabs[index].publish_chapters = !this.state.tabs[index].publish_chapters;
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
                                                                    checked={x.publish_chapters} 
                                                                    className="mr-8" 
                                                                    type="checkbox" 
                                                                />
                                                                <span style={{marginLeft: 5, fontSize: "14px"}}>Publish Chapters</span> 
                                                            </label>
                                                        </div> 

                                                        <div className="field" style={{marginTop: "10px", display:"flex", flexDirection: "column"}}>
                                                        <label className="flexbox items-center contain-selectbox-tabs"> 
                                                                <span style={{marginLeft: 5, fontSize: "14px"}}>Sidebar Type</span> 
                                                                <select 
                                                                    onChange={(e) => {
                                                                        
                                                                        this.setState((prevState) => {
                                                                            var value = e.target.value;
                                                                            prevState.tabs[index].sidebar_content = value
                                                                            return {
                                                                                tabs: prevState.tabs
                                                                            }
                                                                        })
                                                                    }} 
                                                                    value={x.sidebar_content} 
                                                                    className="mr-8" 
                                                                    type="checkbox" 
                                                                >
                                                                    <option value={'none'}>Disable Sidebar</option>
                                                                    <option value={'chapters'}>Chapters</option>
                                                                    <option value={'posts'}>Posts Links</option>
                                                                </select>
                                                                
                                                            </label>
                                                        </div> 
                                                    </div>
                                                </div>    
                                            )):
                                            <span>No Tabs here, click to add new</span>
                                        } 

                                    </div>
                                </div> 

                                 

                                
                            </div>
                        </div>
                    </div>

                    <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                        {this.state.request_message}
                    </div>
                    
                    <div className="flex gap-5 sticky-btns space-between">
                        <div className="flex gap-5">
                            <a className="button red">Delete</a>
                            
                            <a className="button light">Visit tutorial</a>
                        </div>
                        <div className="flex gap-5" style={{alignItems: "center"}}>
                            <label style={{display: "flex", gap: "10px", marginRight: "40px"}}>
                                <input checked={this.state.options.publish} onChange={(e) => this.setState({options: { ...this.state.options, publish: !this.state.options.publish }})} type="checkbox" />
                                Publish
                            </label>
                            <a className="button blue" onClick={this.save_data}>
                                {
                                    ( this.state.is_pressed ) ?
                                    <span className="loader"></span> : 
                                    "Save"
                                }
                            </a>
                        </div>
                    </div>
                </section> 
                
                <this.ShortCodeComponentModal/>

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
                    
                     

            </div>            
        );
    }
    
} 

export { CreateTutorial };

 