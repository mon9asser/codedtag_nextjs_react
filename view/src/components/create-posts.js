import React, { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { createReactEditorJS } from 'react-editor-js';
import StickyBox from "react-sticky-box";


// tools.js
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'  
import Hyperlink from "editorjs-hyperlink";


import {CustomCodeBlok} from "./parts/codeblock.js"

const ReactEditorJS = createReactEditorJS();

var Tools = {
    
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
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    raw: Raw,
    inlineCode: InlineCode,
    embed: Embed,
    paragraph: {
        class: Paragraph,
        inlineToolbar: ["bold", "hyperlink", "italic", "marker", "inlineCode"],
    }, 
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: 'http://yourdomain.com/upload-image', // URL for image uploads by file
            }
        }
    },
    code: CustomCodeBlok 
 
};

class CreatePost extends Component {
    
    constructor(props) {
    
        super(props);
        
        this.state = { 

            pos_type: 0, /* 1 => page --|-- 0 => post */
            settings: {
                site_name: "https://codedtag.com"
            },
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
            }
        };

        this.editorInstance = null;
        
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
     
    componentDidMount = () => {

        // => Load Assets
        //this.loadDashboardAssets(); 
        
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
      

    render() {

        const stats = [
            { title: 'Total Words', value: this.state.initialState.total_words },
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
                                        <input placeholder="Meta Title" style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} type="text" />
                                    </label> 

                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '80px'}}>
                                            Slug
                                        </span>
                                        <input placeholder="Slug of url" style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} type="text" />
                                    </label> 

                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Meta Description 
                                        </span>
                                        <textarea placeholder="Meta Description" style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}></textarea>
                                    </label> 

                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Tutorial
                                        </span>
                                        <select style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}>
                                            <option defaultValue>PHP Tutorial</option>
                                            <option>Python Tutorial</option>
                                        </select>
                                    </label> 

                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '120px'}}>
                                            Keyphrase
                                        </span>
                                        <input placeholder="Keyphrase" style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} type="text" />
                                    </label>
                                    
                                    <label style={{display:"flex",  flexDirection: "column", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span>
                                            Allow search engines to show this Article in search results?
                                        </span>
                                        <select style={{border: "1px solid #dfdfdf", outline: "none", padding: "8px", flexGrow: "1", backgroundColor: "transparent", marginTop: "5px"}}>
                                            <option defaultValue>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </label> 

                                    <label style={{display:"flex", alignItems: "center", background:"#fff", padding: "20px", color:"#333"}}>
                                        <span style={{flexBasis: '120px'}}>
                                            Canonical URL
                                        </span>
                                        <input placeholder="Canonical URL" style={{border: "1px solid #dfdfdf", outline: "none", marginLeft: "10px", padding: "8px", flexGrow: "1", backgroundColor: "transparent"}} type="text" />
                                    </label>  

                                </div>

                                
                            </div>
                            
                        </div>
                    </div> 
                </section>

                

                <div style={{position: "sticky", display: "flex", justifyContent: "space-between", bottom: "0", width: "90%", padding: "20px", background: "#f9f9f9", margin: "0 auto"}}>
                    <a className="button red" style={{marginTop: "15px"}}>Delete this article</a>
                    <div style={{display: "flex", gap: 10}}>
                        <a className="button blue" style={{marginTop: "15px"}}>Save</a>
                        <a className="button tan" style={{marginTop: "15px"}}>
                            <span>
                                Publish
                            </span>

                            <span>
                                Unpublish
                            </span>                                        </a>
                    </div>
                </div>
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

export { CreatePost };