import React, { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import {YouTubeEmbed} from "./parts/embed-iframe.js"
import { createReactEditorJS } from 'react-editor-js';
import StickyBox from "react-sticky-box";
import { CustomImageTool, CustomImageTool2 } from "./parts/image-class.js"
import withRouter from "./parts/with-router.js";
import withNavigate from "./parts/with-navigate.js";

// tools.js 
import Iframe from "@hammaadhrasheedh/editorjs-iframe";
import Table from '@editorjs/table'
import Header from "editorjs-header-with-alignment";
import Paragraph from 'editorjs-paragraph-with-alignment';
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw' 
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'  
import Hyperlink from "editorjs-hyperlink";

import { Settings } from "../settings.js";

import {CustomCodeBlok} from "./parts/codeblock.js"
import { Helper } from "../helper.js"; 

const ReactEditorJS = createReactEditorJS();

var Tools = {
    youtubeEmbed: {
        class: YouTubeEmbed,
        inlineToolbar: true,
        config: {
          placeholder: 'Enter YouTube video URL'
        }
    },
  
    hyperlink: {
        class: Hyperlink
    },
    header:  {
        class: Header,
        config: {
          placeholder: 'Headline Title',
        } 
    },
    table: {
        class: Table,
        inlineToolbar: ["bold", "hyperlink", "italic", "marker", "inlineCode"]
    },
    list: { 
        class: List,
        inlineToolbar: ["bold", "hyperlink", "italic", "marker", "inlineCode"]
    },
    // warning: Warning, 
    //quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    raw: Raw,
    inlineCode: InlineCode,
    
    paragraph: {
        class: Paragraph,
        inlineToolbar: ["bold", "hyperlink", "italic", "marker", "inlineCode"],
    }, 
    image: {
        class: CustomImageTool,
        config: {
            endpoints: {
                byFile: `${Settings.server.api}/upload-image`,  
                //byUrl: `${Settings.server.api}/get-image`,
            }, 
            uploader: { 

                uploadByUrl(url) {
                    return new Promise((resolve) => {
                        // Directly resolve the URL without server interaction
                        resolve({
                            success: 1,
                            file: {
                                url: url // Pass the URL directly to the editor
                            }
                        });
                    });
                },

            }, 
            additionalRequestHeaders: {
                // Any additional headers if needed
            },
            additionalRequestPayload: {
                // Any additional payload data if needed
            },
            onUpload: (file) => {
                //console.log("Uploading file:", file);
            },
            onUploadComplete: (response) => {
               // console.log("Upload complete response:", response);
            },
            onUploadError: (error) => {
               // console.log("Upload error:", error);
            },
            onUploadStart: () => {
               // console.log("Upload started");
            },
            
        }
    },
    customImage: {
        class: CustomImageTool2,
        inlineToolbar: true,
    },
    
    code: CustomCodeBlok 
 
};

class wrappedEditPost extends Component {
    
    constructor(props) {
    
        super(props);
        
        this.state = { 
            
            post_type: 0, /* 1 => page --|-- 0 => post */
            settings: {
                site_name: ""
            },
            calculate_meta_title_chars: 0,
            initialState: {
                total_words:0, 
                total_chars: 0,
                links: [],
                _id: "",
                blocks: [
                    {
                        chars_counts: 0,
                        words_counts: 0,
                        id: "header-level-1",
                        type: "header",
                        data: {
                            placeholder: "Post Title",
                            text: "Post Title",
                            level: 1
                        }
                    },
                    {
                        chars_counts: 0,
                        words_counts: 0,
                        id: "paragraph-item-data",
                        type: "paragraph",
                        data: {
                            placeholder: "Start adding your content here.",
                            text: "Start adding your content here." 
                        }
                    } 
                ]
            },
            
            deletion_confirm_modal_open: false,
            delete_pressed: false,

            selected_tab: null, //{_id: "root", title: "/Root", slug: ""}, // object
            selected_tabs: null, // array  
            post_id: "", 
            meta_title: "",
            enable_beside_title: true,
            slug: "",
            keyphrase: "", 
            meta_description: "",
            article_thumbnail_url: "",
            tutorials: [],
            tutorial: {
                name: "",
                id: "",
                slug: ""
            },
            allow_search_engine: true, 
            enable_ads: true, 

            canonical_url: "",
            is_published: false, 

            is_pressed: false, 
            show_message: "",
            request_status_class: "",
            request_message: ""

        };

        this.editorInstance = null;
        
    }

    deletePost = async () => {

        this.setState({ delete_pressed: true });

        try {
            const response = await Helper.sendRequest({
                api: 'post/delete',
                method: 'POST',
                data: {object_data: { post_id: this.state.post_id }}
            });

            if (!response.is_error) {

                this.setState({
                    deletion_confirm_modal_open: false,
                    delete_pressed: false,
                    show_message: "show_message",
                    request_status_class: "success",
                    request_message: "Article deleted successfully!",
                });

                // Redirect or handle post-deletion actions
                this.props.navigate("/dashboard/posts");
        
                
            } else {
                this.setState({
                    show_message: "show_message",
                    request_status_class: "error",
                    request_message: response.message,
                    delete_pressed: false
                });
            }
        } catch (error) {
            console.error("An error occurred while deleting the user:", error);
            this.setState({
                show_message: "show_message",
                request_status_class: "error",
                request_message: "An error occurred while deleting the user.",
                delete_pressed: false
            });
        }
    }

    DeletionConfirm = () => {
        return (
            <div className={`modal ${this.state.deletion_confirm_modal_open ? "open_this_modal" : ""}`}>
                <div className="modal-background --jb-modal-close" onClick={() => this.setState({ deletion_confirm_modal_open: false })}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Confirm Deletion</p>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure you want to delete this article?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => this.setState({ deletion_confirm_modal_open: false })} className="button">Cancel</button>
                        <button onClick={this.deletePost} className="button red">
                            {this.state.delete_pressed ? <span className="loader"></span> : "Confirm"}
                        </button>
                    </footer>
                </div>
            </div>
        );
    }

    initializedEditorComponents = async (instanceObj) => {
        
        this.editorInstance = instanceObj;
        
        if( this.editorInstance == null ) {
            return;
        }

        // access editor instance
        this.editorInstance._editorJS.isReady.then(() => {
            
            
            // attach events to the editor components
            this.attach_event_to_editor(); 
            
            // make a placeholder text for first two elements onlu 
            this.placeholderDefaultBlocks();

        })

    }

    wordCounters = _ => _.trim().split(/\s+/).length;
    
    charachtersLength = _ => _.trim().length;

    calculateTotalWords() {
        const { blocks } = this.state.initialState;
        const totalWords = blocks.reduce((acc, block) => {
            // Check if 'words_counts' exists in the object
            if ('words_counts' in block) {
                return acc + block.words_counts;
            }
            return acc; // Continue with the existing accumulator if 'words_counts' is not present
        }, 0);
        //console.log( totalWords );
        return totalWords;
    }

    setChangedBlock = (e, id) => {
         
        // placeholder actions 
        var target = document.querySelector(".ce-block[data-id='"+id+"']")
        if( target ) {
            var text = target.innerText.trim();
            if( text.indexOf("Post Title") != -1 &&  text.length >= "Post Title".length) {
                var new_text = text.replace("Post Title", "")
                target.querySelector(".ce-header").innerText = new_text;
                target.classList.remove("placeholder-block-item");
            }   

            if( text.indexOf("Start adding your content here.") != -1 &&  text.length >= "Start adding your content here.".length) {
                var new_text = text.replace("Start adding your content here.", "")
                target.querySelector(".ce-paragraph").innerText = new_text;
                target.classList.remove("placeholder-block-item"); 
            }  
        }
 
      //console.log(id)
        
    }

    placeholderDefaultBlocks = () => {
        
        var blocks = this.editorInstance._editorJS.blocks;

        if( ! blocks.getBlocksCount() ) {
            return;
        }

        const titleBlock = blocks.getBlockByIndex(0);
        if( titleBlock == undefined ) {
            return;
        }
        const title = titleBlock.holder.innerText.trim();
        if( title == "Post Title") {
            titleBlock.holder.classList.add("placeholder-block-item")
        }  
        

        const paragraphBlock = blocks.getBlockByIndex(1);
         
        if( paragraphBlock == undefined ) {
            return;
        }
        const paragraph = paragraphBlock.holder.innerText.trim();
        if( paragraph == "Start adding your content here.") {
            paragraphBlock.holder.classList.add("placeholder-block-item")
        }  
 
    }

    setFocusedBlock = (id) => { 
        
    };

    extractDomainAndSubdomain(url) {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
    
        // Split the hostname into parts
        const parts = hostname.split('.');
    
        // Prepare the return object
        let result = {
            domain: '',
            subdomain: ''
        };
       
        if (parts.length > 2) {
            // Set the domain to the second-to-last part
            result.domain = parts[parts.length - 2];
    
            // Join the remaining parts except the last two as the subdomain
            result.subdomain = parts.slice(0, -2).join('.');
        } else if (parts.length === 2) {
            // Only the domain is present, no subdomain
            result.domain = parts[0];
        }
    
        return result;
    }

    attach_event_to_editor = ( blks = null ) => {
        
        if( this.editorInstance._editorJS.blocks == undefined ) {
            return;
        }

        var blocks =  blks == null ? this.editorInstance._editorJS.blocks: blks;
        if (!blocks) {
            console.error('Blocks API is not accessible');
            return;
        }

        var counts = blocks.getBlocksCount();
        for (let index = 0; index < counts; index++) {

            const block = blocks.getBlockByIndex(index);
            const blockElement = block.holder;

            if (blockElement) { 
                
                blockElement.removeEventListener('click', () => this.setFocusedBlock(block.id));
                blockElement.addEventListener('click', () => this.setFocusedBlock(block.id));

                blockElement.removeEventListener('focus', () => this.setFocusedBlock(block.id));
                blockElement.addEventListener('focus', () => this.setFocusedBlock(block.id));

                blockElement.removeEventListener('keydown', (e) => this.setChangedBlock(e,block.id));
                blockElement.removeEventListener('keyup', (e) => this.setChangedBlock(e,block.id));
                blockElement.removeEventListener('input', (e) => this.setChangedBlock(e,block.id)); 

                blockElement.addEventListener('keydown', (e) => this.setChangedBlock(e,block.id));
                blockElement.addEventListener('keyup', (e) => this.setChangedBlock(e,block.id));
                blockElement.addEventListener('input', (e) => this.setChangedBlock(e,block.id)); 


            } 
        }

        
    }

    setBlocks =  async () => {
        
        var save = await this.editorInstance.save();
        
        var blocks = save.blocks.map( x => {

            var text_value = "";
            if( x.type == "paragraph") {
                text_value = x.data.text;
            } else if ( x.type == "header" ) {
                text_value = x.data.text;
            } else if ( x.type == "table" ) { 
                text_value = x.data.content.map(innerArray => innerArray.join(' ')).join('\n');
            } else if ( x.type == "list" ) {
                text_value = x.data.items.join(' ');
            } else if ( x.type == "warning" ) {
                text_value = ( x.data.title == undefined ? "": x.data.title ) + " " ( x.data.message == undefined ? "": x.data.message )
            } else if ( x.type == "quote" ) {
                text_value = ( x.data.text == undefined ? "": x.data.text ) + " " ( x.data.caption == undefined ? "": x.data.caption )
            } else if ( x.type == "checklist" ) { 
                text_value =  x.data.items.map(x => x.text == undefined? "":  x.text).join( " ");
            }

            
            var wordsCounts = this.wordCounters(text_value)
            var charsCounts = this.charachtersLength(text_value);
            
            var new_object = {
                ...x,
                chars_counts: charsCounts,
                words_counts: wordsCounts,
            }; 

            return new_object; 
        })

        
        
        var total_chars = blocks.reduce((a, b) =>(Math.round(a + b.chars_counts)), 0); 
        var total_words = blocks.reduce((a, b) => (Math.round(a + b.words_counts)), 0);
        
       
        const parser = new DOMParser();
        
        var links = save.blocks.map( x => {
            var text_value = "";
            if( x.type == "paragraph") {
                text_value = x.data.text;
            } else if ( x.type == "header" ) {
                text_value = x.data.text;
            } else if ( x.type == "table" ) { 
                text_value = x.data.content.map(innerArray => innerArray.join(' ')).join('\n');
            } else if ( x.type == "list" ) {
                text_value = x.data.items.join(' ');
            } else if ( x.type == "warning" ) {
                text_value = ( x.data.title == undefined ? "": x.data.title ) + " " ( x.data.message == undefined ? "": x.data.message )
            } else if ( x.type == "quote" ) {
                text_value = ( x.data.text == undefined ? "": x.data.text ) + " " ( x.data.caption == undefined ? "": x.data.caption )
            } else if ( x.type == "checklist" ) { 
                text_value =  x.data.items.map(x => x.text == undefined? "":  x.text).join( " ");
            }

            

            const doc = parser.parseFromString(text_value, "text/html");
            const _link = doc.querySelectorAll('a');
 
            
            var all_links = [];

            _link.forEach( link_item => { 

                var is_external = link_item.getAttribute("href").toString().indexOf( this.state.settings.site_name ) == -1 ? true: false;
                var site_names = this.extractDomainAndSubdomain(link_item.getAttribute("href"));
                
                var object_link = { 
                    paragraph_id: x.id,
                    element: link_item.outerHTML,
                    link_type: link_item.getAttribute("rel") == undefined ? "": link_item.getAttribute("rel"),
                    target: link_item.getAttribute("target") == undefined ? "": link_item.getAttribute("target"),
                    rel: link_item.getAttribute("rel") == undefined ? "": link_item.getAttribute("rel"),
                    keyword: link_item.innerText,
                    url: link_item.getAttribute("href"),
                    domain_name: site_names.domain,
                    subdomain: site_names.subdomain,
                    is_external: is_external
                }

                all_links.push(object_link);
            });         
             
 
            if(all_links.length) {
                return all_links;
            } 
            return null;
        }).filter( a => a != null );  
         
         
        this.setState({
            initialState: {
                links: links.flat(),
                total_chars: isNaN( total_chars ) ? 0: total_chars,
                total_words: isNaN( total_words ) ? 0: total_words,
                blocks: blocks
            }
        }); 
    }

    changedElements = (el) => {
        
        // add focus and higlighted blocks  
        this.attach_event_to_editor(el.blocks);
        
        // sore instance to state
        setTimeout( async () => { 
            await this.setBlocks();
        }, 500 )
        
    }
     
    load_site_settings = async () => {

        // settings
        var settings_object = {};
        
        // send ajax
        var request = await Helper.sendRequest({
            api: "settings/get",
            method: "get",
            data: {}
        }); 

        if(! request.is_error && request.data.length ) {
            settings_object = request.data[0];
        }
         
        setTimeout(() => {
            var site = document.querySelector("#current-site-name");

            if(site) {
                site = site.innerText.toLowerCase()
            }

            this.setState({
                settings: { site_name: site, ...settings_object }
            });
        }, 1000);
    }

    loadAllTutorials = async () => {
        
        /* tutorial: {
            name: "",
            id: ""
        },*/

        var request = await Helper.sendRequest({
            api: "tutorials",
            method: "get",
            data: {} 
        });

        if(request.is_error || ! request.data.length) {
            return; 
        }
 
        return request.data; 

    }

     
    componentDidMount = async () => {
         

        // load all tutorials 
        var tutorials = await this.loadAllTutorials();
         
        // store site name
        this.load_site_settings(); 
        
        //post_id
        if( this.props.params == undefined || this.props.params.post_id == undefined ) {
            this.props.navigate( "/dashboard/posts" );
            return; 
        } 
        // location
        var post_id = this.props.params.post_id;

        var request = await Helper.sendRequest({
            api: `post/get?post_id=${post_id}&post_type=${this.state.post_type}`,
            method: "get",
            data: {}
        });

        if (request.is_error || !request.data.length) {
            return;
        }

        var post = request.data[0];

        this.set_meta_title(post.meta_title);

        var initialState = {
            total_words: post.total_words,
            total_chars: post.total_charachters,
            links: post.links,
            _id: post_id,
            blocks: post.blocks,
        };
        
        // getting target tutorial 
        var tabs = {};
        var tut = tutorials.filter( x => x._id == post?.tutorial.id)
        if( tut.length ) {
            tabs = {
                selected_tabs: tut[0].tabs
            }
        }
        this.setState({
            ...tabs,
            tutorials: tutorials,
            post_id: post_id,
            initialState: initialState,
            slug: post.slug,
            selected_tab: post.selected_tab,
            keyphrase: post.keyphrase,
            meta_description: post.meta_description,
            enable_beside_title: post.enable_beside_title,
            article_thumbnail_url: post.article_thumbnail_url,
            tutorial: post?.tutorial || {},
            allow_search_engine: post.allow_search_engine,
            enable_ads: post.enable_ads, 
            canonical_url: post.canonical_url,
            is_published: post.is_published
        }, () => {
            
            // Re-initialize the editor with the new data
            setTimeout(() => { 
                this.editorInstance.render(initialState);
            }, 1000);

        });
        
    }   

    StatsCard({ title, value }) {
        return (
          <div className="card" style={{backgroundColor: "#f9f9f9", border: "1px solid #dfdfdf", flex: "1"}}>
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div className="widget-label">
                  <h3 style={{ color: 'rgb(108, 114, 110)', fontSize: '14px' }}>{title}</h3>
                  <h1 style={{ fontSize: '32px', marginTop: '5px', color: 'rgb(22, 27, 24)' }}>{value}</h1>
                </div>
              </div>
            </div>
          </div>
        );
    }
      
    save_post = async (e) => {

        
        e.preventDefault(); 

         

        this.setState({ 
            is_pressed: true, 
            show_message: "",
            request_status_class: "",
            request_message: ""
        }); 

        if( this.state.is_pressed ) {
            return; 
        }

        // prepare post title 
        var post_title = "";
        var post_title_index = this.state.initialState.blocks.findIndex( x => x.id == "header-level-1");
        if(post_title_index != -1 ) {
            post_title = this.state.initialState.blocks[post_title_index].data.text; 
        }

        var object_data = { 
            keyphrase: this.state.keyphrase,
            selected_tab: this.state.selected_tab,
            post_type: this.state.post_type,
            post_title: post_title,
            total_words: this.state.initialState.total_words,
            total_charachters: this.state.initialState.total_chars,
            links: this.state.initialState.links,
            blocks: this.state.initialState.blocks,
            meta_title: this.state.meta_title,
            enable_beside_title: this.state.enable_beside_title,
            slug: this.state.slug,
            meta_description: this.state.meta_description, 
            article_thumbnail_url: this.state.article_thumbnail_url,
            tutorial: this.state.tutorial,
            allow_search_engine: this.state.allow_search_engine,
            enable_ads: this.state.enable_ads,
            canonical_url: this.state.canonical_url,
            is_published: this.state.is_published 
        }
        
        if( this.state.meta_title == "" || this.state.slug == "" ) {
            
            this.setState({
                is_pressed: false,
                show_message: "show_message",
                request_status_class: "error",
                request_message: "Meta title and slug are required!"
            });

            return;

        }

        if( this.state.selected_tab == null ) {
            this.setState({
                is_pressed: false,
                show_message: "show_message",
                request_status_class: "error",
                request_message: "Subfolder is required!"
            });

            return;
        }
        
        if( this.state.post_id != "" ) {
            object_data.post_id = this.state.post_id;
        }
        var request = await Helper.sendRequest({
            api: "post/create-update",
            method: "post",
            data: {...object_data},
            is_create: object_data.post_id != undefined ? false: true 
        });

        if(request.is_error) {
            // NotificationManager.error(reqs.message, "Error"); 
            this.setState({
                show_message: "show_message",
                request_status_class: "error",
                is_pressed: false,
                request_message: request.message
            })
            return;
        }

        this.setState({ 
            is_pressed: false ,
            show_message: "show_message",
            request_status_class: "success",
            request_message: request.message
        });  

    }

    selected_tabs_order = (e) => {

        if(this.state.tutorial == null ) {
            return; 
        }

       
        var index = this.state.tutorials.findIndex( x => x._id == this.state.tutorial.id);
        var objx = this.state.tutorials[index];
        
        var tabs = objx.tabs;
        var tab_index = tabs.findIndex(x => x._id == e.target.value );

        if( tab_index == -1 ) {
            
            this.setState({
                selected_tab: {
                    _id: "root",
                    title: "/Root",
                    slug: ""
                }
            });

            return; 
        }

        var selected_tab = tabs[tab_index]; 
        this.setState({selected_tab});

    }

    assign_tutorial_data = (e, is_selected_box = true) => {

        // tutorial_title
        var value = e;

        if( is_selected_box ) {
            value = e.target.value
        }

        var index = this.state.tutorials.findIndex( x => x._id == value );
        if( index == -1 ) {
            return; 
        }

        this.setState({
            selected_tabs: this.state.tutorials[index].tabs, 
            tutorial: {
                id: this.state.tutorials[index]._id, 
                name: this.state.tutorials[index].tutorial_title ,
                slug: this.state.tutorials[index].slug
            }
        }) 
       
    }

    set_meta_title = (text) => {

        var value_text = text;
        var value_settings = this.state.settings.beside_post_title;

        var collected = `${value_text} ${value_settings}`;
        
        var lens = this.charachtersLength(collected);
         
        this.setState({
            meta_title: value_text, 
            calculate_meta_title_chars: lens
        });
   }

    render() {

        console.log("editor page is loaded ...")
        const stats = [
            { title: 'Total of Words', value: this.state.initialState.total_words },
            { title: 'Total Charachters', value: this.state.initialState.total_chars },
            { title: 'Total Links', value:  this.state.initialState.links.length },
            { title: 'Total Blocks', value: this.state.initialState.blocks.length },
            { title: 'External Links', value: this.state.initialState.links.filter( x => x.is_external == true).length },
            { title: 'Internal Links', value: this.state.initialState.links.filter( x => x.is_external != true).length }
        ];
        
       

        return (
            <div id="app">
                
                <NavbarContainer/> 
                <SidebarContainer />

                <section style={{maxWidth: "90%", margin: "0 auto", background: "#222", padding: "30px", justifyContent: "center", alignItems: "center"}}>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
                        {stats.map((stat, index) => (
                            <this.StatsCard key={index} title={stat.title} value={stat.value} />
                        ))}
                    </div>
                </section>

                <section className="row direction-col">
                    <div className="box-85 p-15">
                        <div className="post-container">
                            
                            <ReactEditorJS 
                                onChange={this.changedElements}
                                onInitialize={this.initializedEditorComponents}
                                autofocus={true} 
                                
                                //placeholder="Start typing your article now!"  
                                tools={Tools} 
                                data={this.state.initialState}  
                            />

                            <div className="ce-block__content">
                               
                                <div style={{border: "1px solid #ddd", marginTop: "10px", backgroundColor: '#f9f9f9'}}>
                                    <b style={{padding: "20px", display: "block", borderBottom: "1px solid #dfdfdf", background: "#fff"}}>Seo Section</b>

                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '80px'}}>
                                            Meta Title 
                                        </span>
                                        <input 
                                            value={this.state.meta_title}
                                            onChange={(e) => this.set_meta_title(e.target.value)}
                                            placeholder="Meta Title" 
                                            style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} 
                                            type="text" 
                                        />
                                        {
                                            this.state.settings.beside_post_title == undefined? "":
                                            <span style={{background: "#f9f9f9", border: "1px solid #eee", padding: "5px"}}>{this.state.settings.beside_post_title}</span>
                                        }
                                        <span style={{color: "blue"}}>
                                            {this.state.calculate_meta_title_chars} Characters
                                        </span>
                                    </label> 
                                    
                                    <label className="flexbox items-center"  style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <input 
                                            checked={this.state.enable_beside_title} 
                                            onChange={() => this.setState(prevState => ({ 
                                                enable_beside_title: !prevState.enable_beside_title 
                                            }))} 
                                            className="mr-8" 
                                            type="checkbox" 
                                        />
                                        <span style={{ marginLeft: 5, fontSize: "14px" }}>
                                            Enable Beside Meta Title
                                        </span>
                                    </label>
 
                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '80px'}}>
                                            Slug
                                        </span>
                                        <input 
                                            onChange={(e) => this.setState({ slug: e.target.value })}
                                            value={this.state.slug}
                                            placeholder="Slug of url" 
                                            style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} 
                                            type="text" 
                                        />
                                    </label> 

                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Meta Description 
                                        </span>
                                        <textarea 
                                            onChange={(e) => this.setState({ meta_description: e.target.value })}
                                            value={this.state.meta_description}
                                            placeholder="Meta Description" 
                                            style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}
                                        ></textarea>
                                    </label> 
                                    
                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '120px'}}>
                                            Article Thumbnail URL
                                        </span>
                                        <input 
                                            placeholder="Article Thumbnail URL" 
                                            style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} 
                                            type="text" 
                                            onChange={(e) => this.setState({ article_thumbnail_url: e.target.value })}
                                            value={this.state.article_thumbnail_url}
                                        />
                                    </label>

                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Tutorial
                                        </span>
                                        <select value={this.state.tutorial.id} onChange={e => this.assign_tutorial_data(e)} style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}>
                                            <option value="">Select a Tutorial</option>
                                            {this.state.tutorials.map((x, key) => (<option key={key} value={x._id}>{x.tutorial_title}</option>))} 
                                        </select>
                                    </label> 

                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Sub Folder
                                        </span>
                                        <select value={this.state.selected_tab != null ? this.state.selected_tab._id: ""} onChange={e => this.selected_tabs_order(e)} style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}>
                                            <option value={""}>Select Sub Folder</option>
                                            <option value={"root"}>/Root</option>
                                            {
                                                this.state.selected_tabs != null ? 
                                                this.state.selected_tabs.map( x => {
                                                    return (<option key={x._id} value={x._id}>{x.title}</option>)
                                                }): ""
                                            }
                                        </select>
                                    </label> 

                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '120px'}}>
                                            Keyphrase
                                        </span>
                                        <input 
                                            placeholder="Keyphrase" 
                                            style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} 
                                            type="text" 
                                            onChange={(e) => this.setState({ keyphrase: e.target.value })}
                                            value={this.state.keyphrase}
                                        />
                                    </label>
                                    
                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Allow search engines to show this Article in search results?
                                        </span>
                                        <select value={this.state.allow_search_engine} onChange={e => this.setState({ allow_search_engine: e.target.value })} style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </label> 

                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Enable Google Ads
                                        </span>
                                        <select value={this.state.enable_ads} onChange={e => this.setState({ enable_ads: e.target.value })} style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}>
                                        <option value={''}>Enable Ads</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </label>

                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '120px'}}>
                                            Canonical URL
                                        </span>
                                        <input 
                                            onChange={(e) => this.setState({ canonical_url: e.target.value })}
                                            value={this.state.canonical_url}
                                            placeholder="Canonical URL" 
                                            style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} 
                                            type="text" 
                                        />
                                    </label>  

                                </div>

                                
                            </div>
                            
                        </div>
                    </div> 
                </section>

                
                <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                    {this.state.request_message}
                </div>


                <div style={{position: "sticky", zIndex: "200", display: "flex", justifyContent: "space-between", bottom: "0", width: "90%", padding: "20px", background: "#f9f9f9", margin: "0 auto"}}>
                    <button onClick={() => this.setState({deletion_confirm_modal_open: true})} className="button red" style={{marginTop: "15px"}}>Delete this article</button>
                    <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                        
                        <label style={{display: "flex", gap: "10px", marginRight: "40px"}}>
                            <input checked={this.state.is_published} onChange={e => this.setState({ is_published: !this.state.is_published })} type="checkbox" />
                            Publish
                        </label>
                         
                        <a onClick={this.save_post} className="button blue">
                            {
                                ( this.state.is_pressed ) ?
                                <span className="loader"></span> : 
                                "Save"
                            }
                        </a>
                    </div>
                </div>
                
                <this.DeletionConfirm />

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
 
var wrappedLocation = withRouter(wrappedEditPost);
var EditPost = withNavigate(wrappedLocation);

export { EditPost }; 