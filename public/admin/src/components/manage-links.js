import React, { Component } from "react";
import axios from "axios";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Authentication } from "./helpers/context.js";
import { Helper } from "../helper.js";

class ManageLinks extends Component {
    static contextType = Authentication;

    constructor(props) {
        super(props);
        this.request_result_ref = React.createRef("");
        this.state = {
            links: [],
            currentPage: 1,
            totalPages: 1,

            selected_link: null,
            link_to_update: {
                url:"",
                keyword: "",
                target: ""
            },
            show_modal: "none",
            is_pressed: false,
            show_message: "",
            request_status_class: "",
            request_message: "",
        };
    }

    componentDidMount() {
        this.fetchLinks();
    }

    fetchLinks = async () => {
        try {
            const response = await Helper.sendRequest({
                api: "/post-links/get",
                method: "get",
                data: {}
            });

            if (response.is_error || !response.data.length) {
                return;
            }

            const links = response.data; 
            console.log(links[0])
            this.setState({ links, totalPages: Math.ceil(links.length / 10) });
        } catch (error) {
            console.error("Failed to fetch links:", error);
        }
    };
 
    handleDelete = async (linkId) => {
        try {
            // Assuming you have an endpoint to delete a link by its ID
            await Helper.delete(`/link/delete/${linkId}`);
            this.fetchLinks();
        } catch (error) {
            console.error("Failed to delete link:", error);
        }
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    show_edit_link = (link) => { 
        this.setState({
            selected_link: {
                post_id: link.post_id,
                paragraph_id: link.paragraph_id,
                url: link.url,
                keyword: link.keyword,
                target: link.target
            },
            link_to_update: {
                url: link.url,
                keyword: link.keyword,
                target: link.target
            },
            show_modal: "block"
        });
    } 

    change_link_data = async () => { 

        this.setState({
            request_status_class: '',
            request_message: '',
            show_message: '',
            is_pressed: true
        });

        if(this.state.is_pressed) {
            return; 
        } 

        try {
            
            const response = await Helper.sendRequest({
              api: 'post/update-link',
              method: 'POST',
              data: {  
                update: this.state.link_to_update,
                old: this.state.selected_link
              } // Include deleted IDs
            });
            console.log(response);
            if (response.is_error) {
              throw new Error(response.message);
            }
            this.setState({
              request_status_class: 'success',
              request_message: 'Menus saved successfully!',
              show_message: 'show_message',
              is_pressed: false,
              deletedIds: [] // Clear deleted IDs after successful save
            });
          } catch (error) {
            this.setState({
              request_status_class: 'error',
              request_message: error.message || 'An error occurred while saving the menus.',
              show_message: 'show_message',
              is_pressed: false,
            });
          }
    }

    render() {
        const { links, currentPage, totalPages } = this.state;
        const linksPerPage = 10;
        const displayedLinks = links.slice((currentPage - 1) * linksPerPage, currentPage * linksPerPage);

        return (
             
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                
                <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                    {this.state.request_message}
                </div>

                <div id="modal-link-data" className="modal" style={{display: this.state.show_modal}}>
                    <div className="modal-background --jb-modal-close"></div>
                    <div className="modal-card" style={{marginTop: "150px"}}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                {this.state.link_to_update.keyword}
                            </p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field" style={{marginTop: "25px"}}>
                                <label className="label">Link or URL</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="URL" value={this.state.link_to_update.url} onChange={(e) => {
                                        this.setState({
                                            link_to_update: {
                                                ...this.state.link_to_update,
                                                url: e.target.value // Update with the new value
                                            }
                                        })
                                    }}/>
                                </div>
                            </div>

                            <div className="field" style={{marginTop: "25px"}}>
                                <label className="label">Keyword</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Keyword" value={this.state.link_to_update.keyword} onChange={(e) => {
                                        this.setState({
                                            link_to_update: {
                                                ...this.state.link_to_update,
                                                keyword: e.target.value // Update with the new value
                                            }
                                        })
                                    }}/>
                                </div>
                            </div>

                            <div className="field" style={{marginTop: "25px"}}>
                                <label className="label">Backlink Type</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Target Attributes" value={this.state.link_to_update.target} onChange={(e) => {
                                        this.setState({
                                            link_to_update: {
                                                ...this.state.link_to_update,
                                                target: e.target.value // Update with the new value
                                            }
                                        })
                                    }}/>
                                </div>
                            </div> 
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button --jb-modal-close" onClick={e => this.setState({show_modal: "none"})}>Cancel</button>
                            <button className="button red --jb-modal-close" onClick={this.change_link_data}>
                            {
                                (this.state.is_pressed) ?
                                <span className="loader"></span> :
                                "Save Changes"
                            }
                            </button>
                        </footer>
                    </div>
                </div>

                <section className="section main-section">
                    <div className="card has-table mt-30">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                All Links
                            </p>
                            <a href="#" className="card-header-icon">
                                <span className="icon"><i className="mdi mdi-filter-outline"></i></span>
                            </a>
                        </header>
                        <div className="card-content tble">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Post Title</th>
                                        <th>Paragraph ID</th>
                                        <th>Link Type</th>
                                        <th>Is External</th>
                                        <th>Keyword</th>
                                        <th>Redirect</th>
                                        <th>Redirect Type</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedLinks.map( ( link, index) => (
                                        <tr key={index}>
                                            <td data-label="Post Title" style={{ maxWidth: "200px" }}>{link.post_title}</td>
                                            <td data-label="Paragraph ID">{link.paragraph_id}</td>
                                            <td data-label="Link Type">{link.link_type}</td>
                                            <td data-label="Is External">{link.is_external ? "Yes" : "No"}</td>
                                            <td data-label="Keyword">
                                                <div style={{ color: "red", textDecoration: "underline" }} dangerouslySetInnerHTML={{ __html: link.element }} />
                                            </td>
                                            <td data-label="Redirect">{link.is_redirect ? "Yes" : "No"}</td>
                                            <td data-label="Redirect Type">{link.type}</td>
                                            <td data-label="Status">{link.status}</td>
                                            <td className="actions-cell">
                                                <button
                                                    className="button small blue --jb-modal"
                                                    type="button"
                                                    data-target="modal-link-data"
                                                    onClick={() => this.show_edit_link(link)}
                                                >
                                                    <span className="icon"><i className="mdi mdi-pencil"></i></span>
                                                </button>
                                            </td>
                                            <td className="actions-cell">
                                                <button
                                                    className="button small red"
                                                    type="button"
                                                    onClick={() => this.handleDelete(link._id)}
                                                >
                                                    <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="table-pagination">
                                <div className="flex items-center justify-between">
                                    <div className="buttons">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                type="button"
                                                className={`button ${currentPage === i + 1 ? 'active' : ''}`}
                                                onClick={() => this.handlePageChange(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <small>Page {currentPage} of {totalPages}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>   
            
        );
    }
}

export { ManageLinks };
