import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { ReactSortable } from "react-sortablejs";
import { Helper } from "../helper.js";

class Chapters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tutorials: [],
            selectedTutorial: '',
            items: [],
            list: [],
            newChapterName: '',
        };
    }

    async componentDidMount() {
        const tutorial_reqs = await Helper.sendRequest({
            method: "get",
            api: "tutorials",
            data: {},
        });
        if (!tutorial_reqs.is_error) {
            this.setState({ tutorials: tutorial_reqs.data });
        }
    }

    handleTutorialChange = async (event) => {
        const selectedTutorial = event.target.value;
        this.setState({ selectedTutorial });

        const articles_reqs = await Helper.sendRequest({
            method: "get",
            api: `post/get?post_type=0&tutorial=${selectedTutorial}`,
            data: {},
        });
        if (!articles_reqs.is_error) {
            this.setState({ list: articles_reqs.data });
        }
    };

    handleAddOnAllPosts = (evt) => {
        const newItem = evt.item;
        const newItemData = JSON.parse(newItem.dataset.id);

        if (!this.state.list.some(item => item.id === newItemData.id)) {
            const newState = [...this.state.list, newItemData];
            this.setState({ list: newState });
        } else {
            console.log("Item already exists!");
        }
    };

    handleNewChapterChange = (event) => {
        this.setState({ newChapterName: event.target.value });
    };

    addNewChapter = () => {
        if (this.state.newChapterName.trim() !== '') {
            this.setState(prevState => ({
                items: [...prevState.items, { id: Date.now().toString(), name: this.state.newChapterName }],
                newChapterName: ''
            }));
        }
    };

    render() {
        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div className="card has-table">
                        <header className="card-header">
                            <div className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                Chapters of 
                                <div className="select card-header-icon">
                                    <select onChange={this.handleTutorialChange}>
                                        <option value="">Select a Tutorial</option>
                                        {this.state.tutorials.map(tutorial => (
                                            <option key={tutorial.id} value={tutorial.id}>{tutorial.tutorial_title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="select card-header-icon">
                                <input
                                    type="text"
                                    placeholder="New Chapter Name"
                                    value={this.state.newChapterName}
                                    onChange={this.handleNewChapterChange}
                                />
                                <button className="button blue" onClick={this.addNewChapter}>Add Chapter</button>
                            </div>
                        </header>
                        <div className="tutorial-conainers">
                            <div className="box-75">
                                <div className="tutorial-conainers">
                                    <div className="box-50">
                                        <div className="blx">
                                            <div className="line-bottom">
                                                <input placeholder="Chapter title" type="text" />
                                            </div>
                                            <ReactSortable
                                                className="box-to-drag-drop"
                                                list={this.state.items}
                                                setList={(newState) => this.setState({ items: newState })}
                                                group={{ name: 'shared', pull: true, put: true }}
                                                animation={200}
                                                onAdd={(evt) => console.log('Added item:', evt.item)}
                                                onRemove={(evt) => console.log('Removed item:', evt.item)}
                                            >
                                                {this.state.items.map((item, index) => (
                                                    <div key={item.id}>
                                                        {item.name}
                                                    </div>
                                                ))}
                                            </ReactSortable>
                                            <a href="#" className="chapter-deletion">
                                                <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-25">
                                <b>Posts</b>
                                <ReactSortable
                                    className="box-to-drag-drop"
                                    list={this.state.list}
                                    setList={(newState) => this.setState({ list: newState })}
                                    group={{ name: 'shared', pull: true, put: true }}
                                    animation={200}
                                    onAdd={this.handleAddOnAllPosts}
                                    onRemove={(evt) => console.log('Removed item:', evt.item)}
                                >
                                    {this.state.list.map((item, index) => (
                                        <div key={item.id} data-id={JSON.stringify(item)}>
                                            {item.post_title}
                                        </div>
                                    ))}
                                </ReactSortable>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center justify-start space-x-3">
                            <div>© 2021, CodedTag.com</div>
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

export { Chapters };
