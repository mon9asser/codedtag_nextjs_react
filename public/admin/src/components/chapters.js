import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { ReactSortable } from "react-sortablejs";
import { Helper } from "../helper.js";

class Chapters extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            
            // load all when load page 
            tutorials: null,

            posts: null, // delete post object from when dropped into list of shapter
            chapters: null, 

            // select a spesific posts and chapters when change tutorials 
            selected_tutorial: null,
            selected_posts: null,  // delete post object from when dropped into list of shapter
            selected_chapters: null 

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
            api: `post/get?post_type=0`,
            data: {},
        });

        if(request.is_error || ! request.data.length ) {
            return; 
        }
        
        this.setState({
            posts: request.data.filter( x => x.is_published == true)
        }); 

        

    }

    async componentDidMount(){

        // load tutorials 
        await this.get_all_tutorials();

        // load all post 
        await this.get_all_posts();

        
    }

    change_tutorial_block = (e) => {

        // selected_posts
        var tutorial_id = e.target.value;
        if( this.state.posts == null ) {
            return;
        } 

        var selected_posts = this.state.posts.filter( x => x.tutorial.id == tutorial_id)
        var selected_tutorial = this.state.tutorials.filter( x => x._id == tutorial_id);
        var selected_chapters = this.state.chapters == null ? []: this.state.chapters.filter( x => x.tutorial.id == tutorial_id);
        
        /*
        console.log(selected_chapters);

        if(! selected_posts.length) {
            return; 
        }*/ 

        if(selected_tutorial.length){
            selected_tutorial = selected_tutorial[0];
        } else {
            selected_tutorial = null; 
        } 
        
        this.setState({
            selected_posts: selected_posts,
            selected_tutorial: selected_tutorial,
            selected_chapters: selected_chapters,
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
        console.log("data +++")
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

    save_chapters = () => {
        console.log(this.state.chapters);
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
                                    <div className="select card-header-icon" style={{marginLeft: "auto"}}>
                                        <button onClick={this.add_new_chapter} className="button blue">Add New Chapter</button>
                                    </div>
                                </div>
                            }  
                        </header>

                        <div className="tutorial-conainers">
                            <div style={{ width: "75%"}}>
                                
                                <h2 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "15px"}}>
                                    Chapters
                                </h2>

                                <div style={{gap: "15px", display: "flex", flexWrap: "wrap", width: "100%"}}>
                                    {
                                        this.state.selected_chapters == null || ! this.state.selected_chapters.length ?
                                        <span>No chapters here !</span>:
                                        this.state.selected_chapters.map(( x, k_) => {
                                            return (
                                                <div key={x._id + k_} className="block-list-items">
                                                    <input value={x.chapter_title} onChange={(e) => this.insert_chapter_title(e.target.value, x._id)} className="chapter-title-block" placeholder="Chapter title" type="text" />
                                                    <ReactSortable
                                                            className="box-to-drag-drop"
                                                            list={x.posts}
                                                            setList={(newState) => {
                                                                
                                                                var psts = newState.map(x => ({
                                                                    id: x._id, 
                                                                    post_title: x.post_title,
                                                                    slug: x.slug
                                                                }));

                                                                const updatedChapters = this.state.selected_chapters.map((chapter) => {
                                                                  if (chapter._id === x._id) {
                                                                    return { ...chapter, posts: psts };
                                                                  }
                                                                  return chapter;
                                                                });

                                                                const all_chapters = this.state.chapters.map((chapter) => {
                                                                    if (chapter._id === x._id) {
                                                                      return { ...chapter, posts: psts };
                                                                    }
                                                                    return chapter;
                                                                });

                                                                this.setState({ 
                                                                    selected_chapters: updatedChapters,
                                                                    chapters: all_chapters
                                                                });
                                                            }}                                                  
                                                            group={{ name: 'shared', pull: true, put: true }}
                                                            animation={200}
                                                            onAdd={(evt) => this.add_post(evt.item.getAttribute("data-id"), evt)}
                                                            onRemove={(evt) => console.log('Removed item:', evt.item)}
                                                        >
                                                            {x.posts.length ? x.posts.map((item, index) => (
                                                                <div key={item._id + index}>
                                                                    {item.post_title}
                                                                </div>
                                                            )): <span key={k_ + "_new"}>No posts in this chapter</span>}
                                                    </ReactSortable>
                                                </div>
                                            );
                                        })
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

                        <div style={{position: "sticky", zIndex: "200", display: "flex", justifyContent: "space-between", bottom: "0", width: "90%", padding: "20px", background: "#f9f9f9", margin: "0 auto"}}>
                            <a className="button red" style={{marginTop: "15px"}}>Delete this article</a>
                            <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                                
                                <label style={{display: "flex", gap: "10px", marginRight: "40px"}}>
                                    <input checked={this.state.is_published} onChange={e => this.setState({ is_published: !this.state.is_published })} type="checkbox" />
                                    Publish
                                </label>
                                
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
