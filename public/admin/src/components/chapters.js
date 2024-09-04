import React, { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { ReactSortable } from "react-sortablejs";
import { Helper } from "../helper.js";
 
class Chapters extends Component {
   
    constructor(props) {
        super(props);
        this.request_result_ref = React.createRef("");
        this.state = {
            
            // load all when load page 
            tutorials: null,
            all_posts: null, 
            posts: null, // delete post object from when dropped into list of shapter
            chapters: null, 

            // select a spesific posts and chapters when change tutorials 
            selected_tutorial: null,
            selected_tab: { _id: "root", title: "/Root", slug: "" },
            selected_posts: null,  // delete post object from when dropped into list of shapter
            selected_chapters: null,

            publish_chapters: false,

            is_pressed: false, 
            show_message: "",
            request_status_class: "",
            request_message: ""

        };
    }

    get_all_tutorials = async () => {
        
        var request = await Helper.sendRequest({
            method: "get",
            api: "tutorials",
            data: {},
        });

        if(request.is_error || ! request.data.length ) {
            return; 
        } 
        this.setState({
            tutorials: request.data
        }); 

    }

    get_all_posts = async () => {
        
        var request = await Helper.sendRequest({
            method: "get",
            api: `post/get-published?post_type=0`,
            data: {},
        });

        if(request.is_error ) {
            return null; 
        }
        
        if(! request.data.length) {
            return [];
        }

        return request.data.filter( x => x.is_published == true);
        this.setState({
            all_posts: request.data.filter( x => x.is_published == true),
            posts: request.data.filter( x => x.is_published == true)
        }); 

        

    }

    get_all_chapters = async() => {

        var request = await Helper.sendRequest({
            method: "get",
            api: `chapters`,
            data: {},
        });

        if(request.is_error ) {
            return null; 
        }

        if( ! request.data.length ) {
            return [];
        }
        
        return request.data;
        this.setState({
            chapters: request.data
        }); 
    }

    get_chapters_and_posts = async() => {
        
        // load all post 
        var posts = await this.get_all_posts(); 

        // get all chapters 
        var chapters = await this.get_all_chapters(); 
        
        if(chapters == null || !chapters.length) {
            
            this.setState({
                all_posts: posts == null || ! posts.length ? []: posts.filter( x => x.is_published == true),
                posts: posts == null || ! posts.length ? []: posts.filter( x => x.is_published == true)
            });

            return; 
        }

        // delete posts that appear inside the chapters 
        var chapter_posts = chapters.map(x => x.posts).flat();
        var filtered_posts = posts.filter( x => {
            var ky = chapter_posts.findIndex( y => y._id == x._id);
            if( ky == -1 ) return x;
        })
        
        this.setState({
            chapters: chapters,
            all_posts: posts == null || ! posts.length ? []: posts.filter( x => x.is_published == true),
            posts: filtered_posts == null || ! filtered_posts.length ? []: filtered_posts.filter( x => x.is_published == true)
        });

    }

    async componentDidMount(){

        // load tutorials 
        await this.get_all_tutorials(); 

        // delete posts according to chapters 
        await this.get_chapters_and_posts()
        
    }

    change_tutorial_block = (e) => {

        // selected_posts
        var tutorial_id = e.target.value;
        if( this.state.posts == null || tutorial_id == "" ) {
            return;
        } 

        var selected_posts = this.state.posts.filter( x => x.tutorial.id == tutorial_id)
        var selected_tutorial = this.state.tutorials.filter( x => x._id == tutorial_id);
        var selected_chapters = this.state.chapters == null ? []: this.state.chapters.filter( x => x.tutorial.id == tutorial_id && x.tab._id == this.state.selected_tab._id);
        
        

        if(selected_tutorial.length){
            selected_tutorial = selected_tutorial[0];
        } else {
            selected_tutorial = null; 
        } 
          
        
        if( ! selected_tutorial.tabs.length ) {
            selected_tutorial.tabs = [];
        }

        //  { _id: "root", title: "/Root", slug: "" }
        if(selected_tutorial.tabs.findIndex( x => x._id == "root") == -1 )
            selected_tutorial.tabs = [{ _id: "root", title: "/Root", slug: "" }, ...selected_tutorial.tabs]

        this.setState({
            selected_posts: selected_posts,
            selected_tutorial: selected_tutorial,
            selected_chapters: selected_chapters,
            publish_chapters: selected_tutorial == null ? false: selected_tutorial.options.publish_chapters
        });

        

    }

    add_new_chapter = () => {
        
        if(this.state.selected_tutorial == null ) {
            alert("Please select tutorial first")
            return;
        }

        var chapter_object = {
            _id: Helper.generateObjectId(), 
            chapter_title: "",
            tab: this.state.selected_tab,
            tutorial: {id: this.state.selected_tutorial._id},
            posts: []
        };

        var chapters = this.state.selected_chapters != null ? [...this.state.selected_chapters]: []
        chapters.push(chapter_object);

        var all_chapters = this.state.chapters == null ? []: [...this.state.chapters];
        all_chapters.push(chapter_object);

        this.setState({
            selected_chapters: chapters,

            // insert them also to chapters 
            chapters: all_chapters
        }); 
    }

    post_added_to_list = () => {
        
    }


    removed_post = (id) => {}

    add_post = (id, obx) => {
        
        // Delete Post from Posts
        var posts = [...this.state.posts];
        var post_index = posts.findIndex( x => x._id == id);
        var post_object = posts[post_index];
        var new_posts = posts.filter( x => x._id != id );
         

        this.setState({
            posts: new_posts
        });
    }

    save_chapters = async () => {
        

        this.setState({ 
            is_pressed: true, 
            show_message: "",
            request_status_class: "",
            request_message: ""
        }); 

        if( this.state.is_pressed ) {
            return; 
        }


        var tutorials = this.state.tutorials.map( x => {

            return {
                _id: x._id, 
                publish_chapters: x.options.publish_chapters
            };

        });

        var reqs = await Helper.sendRequest({
            api: "chapters/bulk_insert_update",
            data: {data_array: this.state.chapters, chapter_status: tutorials}, 
            method: "post"
        });

        if( reqs.is_error ) {
            this.setState({ 
                is_pressed: false, 
                show_message: "show_message",
                request_status_class: "error", 
                request_message: reqs.message
            }); 
        }

        this.setState({ 
            is_pressed: false, 
            show_message: "show_message",
            request_status_class: "success", 
            request_message: reqs.message
        }); 

    }

    insert_chapter_title = (value, id) => {

        var chapters = [...this.state.chapters]
        var selected_chapters = [...this.state.selected_chapters];

        var index = chapters.findIndex(x => x._id == id );
        var indexx = selected_chapters.findIndex(x => x._id == id );

        chapters[index].chapter_title = value;
        selected_chapters[indexx].chapter_title = value;

        this.setState({
            chapters,
            selected_chapters
        })
        
    }

    delete_post_from_chapter = (post_id, chapter_id) => {
        
        

        // get post object 
        var all_posts_index = this.state.all_posts.findIndex(x => x._id == post_id);
        var post_object = this.state.all_posts[all_posts_index];


        var posts_update = [...this.state.posts]
        posts_update.push(post_object);

        var selected_posts_update = [...this.state.selected_posts]
        selected_posts_update.push(post_object);

        

        this.setState((prevState) => {
            
            var selected_chapters = prevState.selected_chapters;
            var idxn = selected_chapters.findIndex(x => x._id == chapter_id )
            var chs_posts = [...selected_chapters[idxn].posts];
                chs_posts = chs_posts.filter(x => x._id != post_id );
            selected_chapters[idxn].posts = chs_posts;


            var uchapters = [...this.state.chapters];
            var idxnx = uchapters.findIndex(x => x._id == chapter_id )
            var chs_posts_update = [...uchapters[idxnx].posts];
                chs_posts_update = chs_posts_update.filter(x => x._id != post_id );
            uchapters[idxnx].posts = chs_posts_update;

            return {
                posts: posts_update,
                selected_posts: selected_posts_update,
                selected_chapters,
                chapters: uchapters
            };
        })


    }

     

    changeElementPosition(e){  
        
        if (e.from !== e.to) {
            return; 
        }
    
        const chapter_id = e.from.classList[1];
        const old_index = e.oldIndex;
        const new_index = e.newIndex;
    
        const chapters = [...this.state.chapters];
        const chapterIndex = chapters.findIndex(chapter => chapter._id === chapter_id);
        if (chapterIndex === -1) return;
    
        const posts = [...chapters[chapterIndex].posts];
        const [movedPost] = posts.splice(old_index, 1);
        posts.splice(new_index, 0, movedPost);
    
        chapters[chapterIndex].posts = posts;
    
        const selected_chapters = [...this.state.selected_chapters];
        selected_chapters[chapterIndex].posts = posts;
    
        this.setState({ chapters, selected_chapters, updateKey: Math.random() }, () => {
            
        });
    

    }

    publish_tutorials = () => {
        
        if(this.state.selected_tutorial == null ) {
            alert("You have to select tutorial first")
            return;
        }
        
        var tutorial = {...this.state.selected_tutorial};
        var checkbox_value = !this.state.publish_chapters;
        var tutorials = [...this.state.tutorials]; 

        tutorial.options.publish_chapters = checkbox_value;

        var index = tutorials.findIndex( x => x._id == tutorial._id );
        if( index == -1 ) {
            return; 
        }

        tutorials[index].publish_chapters = checkbox_value;
                 
        this.setState({ 
            tutorials: tutorials,
            selected_tutorial: tutorial,
            publish_chapters: checkbox_value
        });
    }

    change_tab_block = (e) => {
         
        var tab_id = e.target.value;
        
        var state_object = {
            selected_tab: {
                slug: "",
                _id: "root",
                title: "/Root"
            },
        }

        // all chapters 
        var chaptex =  this.state.chapters == null ? []: [...this.state.chapters];

        if(tab_id == "") {
             
            var chpx = chaptex.filter( x => x.tutorial.id == this.state.selected_tutorial._id && x.tab._id == "root");

            this.setState({state_object, selected_chapters: chpx});
            return; 
        }

        if( !this.state.selected_tutorial.tabs.length ) {
            return; 
        }
        
        var index = this.state.selected_tutorial.tabs.findIndex( x => x._id == tab_id );
        var tab_object = this.state.selected_tutorial.tabs[index];

        var chpx = chaptex.filter( x => x.tutorial.id == this.state.selected_tutorial._id && x.tab._id == tab_id);
        state_object = {...state_object,  selected_tab: tab_object, selected_chapters: chpx };

        this.setState(state_object);

    }

    delete_chapter = (chapter_id) => {
        
        var chptrs = [...this.state.selected_chapters];
        var index = chptrs.findIndex( x => x._id == chapter_id);
        var state_objx = {};

        if( index != -1 ) {
            var posts = [...chptrs[index].posts].length?[...chptrs[index].posts]: [];
            if( posts.length ) {
                var all_posts = [...this.state.all_posts];
                var old_posts = [...this.state.posts];
                var selposts = [...this.state.selected_posts];

                posts.map( x => {
                    var _id = x._id;
                    var idx = all_posts.findIndex( x => x._id == _id);
                    old_posts.push( all_posts[idx] );
                    selposts.push( all_posts[idx] );
                });
 
                state_objx = {...state_objx, posts: old_posts, selected_posts: selposts }
            }
        }
        
        var chapters = [...this.state.chapters].filter( x => x._id != chapter_id );
        var selected_chapters = [...this.state.selected_chapters].filter( x => x._id != chapter_id );
        
        state_objx = { ...state_objx, selected_chapters, chapters}
         
        
        this.setState(state_objx)

    }

    render() {
        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div className="card has-table">
                        <header className="card-header">
                            {
                                this.state.tutorials == null? 
                                    <span style={{padding: '15px', textAlign: "center", margin: "0 auto"}}>No tutorials found!</span>:
                                <>
                                    <div className="card-header-title">
                                    <span className="icon"><i className="mdi mdi-table"></i></span>
                                        Chapters of
                                        <div className="select card-header-icon">
                                            <select onChange={this.change_tutorial_block}>
                                                <option value="">Select a Tutorial</option>
                                                {this.state.tutorials.map(tutorial => {
                                                    if( tutorial.tutorial_title != "" ) {
                                                        return (<option key={tutorial._id} value={tutorial._id}>{tutorial.tutorial_title}</option>) 
                                                    }
                                                })}
                                            </select>
                                        </div> 

                                        Tabs:
                                        <div className="select card-header-icon">
                                            <select value={this.state.selected_tab._id} onChange={this.change_tab_block}>
                                                <option value="">Select Tab</option> 
                                                {
                                                    this.state.selected_tutorial != null ?
                                                        this.state.selected_tutorial.tabs.length ?
                                                            this.state.selected_tutorial.tabs.map(tab => {
                                                                if( tab.title != "" )
                                                                return (<option key={tab._id} value={tab._id}>{tab.title}</option>)
                                                            })
                                                        : ""
                                                    : ""
                                                } 
                                            </select>
                                        </div> 
                                    </div>
                                    <div className="card-header-title">
                                        <div className="select card-header-icon" style={{marginLeft: "auto"}}>
                                            <button onClick={this.add_new_chapter} className="button blue">Add New Chapter</button>
                                        </div>
                                    </div>
                                </>

                                

                                
                            }  
                        </header>

                        <div className="tutorial-conainers">
                            <div style={{ width: "75%"}}>
                                
                                <h2 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "15px"}}>
                                    Chapters of {this.state.selected_tab.title}
                                </h2>

                                <div style={{gap: "15px", display: "flex", flexWrap: "wrap", width: "100%"}}>
                                {
                                    this.state.selected_chapters == null || !this.state.selected_chapters.length ? (
                                        <span>No chapters here!</span>
                                    ) : (
                                        this.state.selected_chapters.map((x, k_) => {

                                             
                                            return (
                                                <div key={x._id + k_} className="block-list-items" style={{position: "relative"}}>
                                                    <button onClick={() => this.delete_chapter(x._id)} className="button tomato" style={{position: "absolute", right: "-4px", width: "20px", top: "-2px", height: "20px", cursor: "pointer", background: "red", color: "#fff",  textAlign: "center"}}></button>
                                                    <input
                                                        value={x.chapter_title}
                                                        onChange={(e) => this.insert_chapter_title(e.target.value, x._id)}
                                                        className="chapter-title-block"
                                                        placeholder="Chapter title"
                                                        type="text"
                                                    />
                                                    <ReactSortable 
                                                        className={`box-to-drag-drop ${x._id}`}
                                                        list={x.posts}
                                                        // onChange={this.changeElementPosition.bind(this)}
                                                        setList={(newState) => {
                                                            // Create a map of existing posts for quick lookup
                                                            const existingPostsMap = new Map(x.posts.map(post => [post._id, post]));
    
                                                            // Merge newState with existing posts
                                                            newState.forEach(post => {
                                                                if (post._id !== undefined) {
                                                                    existingPostsMap.set(post._id, {
                                                                        _id: post._id,
                                                                        post_title: post.post_title,
                                                                        slug: post.slug
                                                                    });
                                                                }
                                                            });
    
                                                            // Convert the map back to an array, ensuring uniqueness
                                                            const updatedPosts = Array.from(existingPostsMap.values());
    
                                                            // Update selected chapters
                                                            const updatedChapters = this.state.selected_chapters.map((chapter) => {
                                                                if (chapter._id === x._id) {
                                                                    return { ...chapter, posts: updatedPosts };
                                                                }
                                                                return chapter;
                                                            });
    
                                                            // Update all chapters
                                                            const all_chapters = this.state.chapters.map((chapter) => {
                                                                if (chapter._id === x._id) {
                                                                    return { ...chapter, posts: updatedPosts };
                                                                }
                                                                return chapter;
                                                            });
    
                                                            // Set the updated state
                                                            this.setState({
                                                                selected_chapters: updatedChapters,
                                                                chapters: all_chapters
                                                            });
                                                        }}
                                                        sortId={k_}
                                                        group={{ name: `shared`, pull: true, put: true }}
                                                        // group="chapters"

                                                        animation={200}
                                                        onAdd={(evt) => {
                                                            
                                                        }}
                                                        //onAdd={(evt) => this.add_post(evt.item.getAttribute("data-id"), evt)}
                                                        // onRemove={(evt) => console.log('Removed item:', evt.item)}
                                                    >
                                                        {this.state.selected_chapters[k_].posts.length ?this.state.selected_chapters[k_].posts.map((item, index) => {
                                                            
                                                            return (
                                                                <div key={item._id} data-id={item._id} style={{position:"relative"}}>
                                                                    <button onClick={(e)=>this.delete_post_from_chapter(item._id, x._id)} className="button tomato" style={{position: "absolute", right: "0px", width: "20px", top: "7px", height: "20px", cursor: "pointer", background: "red", color: "#fff",  textAlign: "center"}}></button>
                                                                    <div>
                                                                        {item.post_title}
                                                                    </div>
                                                                </div>
                                                            );

                                                        }) : (
                                                            <span key={k_ + "_new"}>No posts in this chapter</span>
                                                        )}
                                                    </ReactSortable>
                                                </div>
                                            );
                                        })
                                    )
                                }
                                </div>
                            </div>

                            <div style={{width: "25%"}}>
                                <h2 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "15px"}}>
                                    Posts
                                </h2>

                                {
                                    this.state.selected_posts == null ? (
                                        <span>No posts found in this tutorial</span>
                                    ) : (
                                        <ReactSortable
                                        className="box-to-drag-drop"
                                        list={this.state.selected_posts}
                                        setList={(newState) => this.setState({ selected_posts: newState })}
                                        group={{ name: 'shared', pull: true, put: true }}
                                        animation={200} 
                                        onRemove={(evt) => this.removed_post(evt.item.getAttribute("data-id"))}
                                        >
                                        {this.state.selected_posts.map((item, index) => (
                                            <div key={item._id || index} data-id={JSON.stringify(item)}>
                                            {item.post_title}
                                            </div>
                                        ))}
                                        </ReactSortable>
                                    )
                                }
                                
                            </div>
                        </div>
                        
                        <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                            {this.state.request_message}
                        </div>

                        <div style={{position: "sticky", zIndex: "200", display: "flex", justifyContent: "space-between", bottom: "0", width: "90%", padding: "20px", background: "#f9f9f9", margin: "0 auto"}}>
                            
                            <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                                
                                {
                                    ( this.state.selected_tab._id == "root" ) ?
                                    <label style={{display: "flex", gap: "10px", marginRight: "40px"}}>
                                        <input checked={this.state.publish_chapters} onChange={ this.publish_tutorials} type="checkbox" />
                                        Publish
                                    </label>: ""
                                }
                                <a onClick={this.save_chapters} className="button blue">
                                    {
                                        ( this.state.is_pressed ) ?
                                        <span className="loader"></span> : 
                                        "Save"
                                    }
                                </a>
                            </div>
                        </div>


                    </div>
                </section>
            </div>
        );
    }

}

export { Chapters };
