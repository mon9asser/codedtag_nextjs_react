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
                url: "",
                keyword: "",
                target: "",
                rel: ""
            },
            start_validating: false, 
            replace_link_target: "_blank",
            replace_link_type: "",
            site_name: "",
            show_modal: "none",
            is_pressed: false,
            show_message: "",
            request_status_class: "",
            request_message: "",
            postsPerPage: 10,
            statusCodeFilter: "all",
            externalFilter: "all",
            find_link: "",
            replace_link: "",
            enable_change_links_by_group: false,
            links_count: null,
            links_in_group: []
        };
    }

    replaceLinkData = () => {

        if(! this.state.links_in_group.length) {
            alert("No Links Selected!")
            return; 
        }

        if(this.state.find_link == "") {
            alert("No link to find!")
            return;
        }

        var new_link = this.state.replace_link;
        if( this.state.replace_link == "" ) {
            alert("Link to replace is not found!")
            return;
        }

        var link_data = [...this.state.links_in_group]
        
         
        // replace link 
        var updatedLinks = link_data.map( x => {
            var replaced_url = x.url.replace(this.state.find_link, this.state.replace_link );
           var links = {
                selected_link: {
                    post_id: x.post_id,
                    paragraph_id: x.paragraph_id,
                    url:  x.url,
                    keyword: x.keyword,
                    target: x.target,
                    rel: x.rel === undefined ? "" : x.rel
                },
                link_to_update: {
                    url: replaced_url,
                    keyword: x.keyword, 
                    rel: this.state.replace_link_type,
                    target: this.state.replace_link_target,
                    site_name: this.state.site_name
                }
           };

           return links;

        });

       

        // replace links to main array => links
        
        
        // send request to save them in database
        updatedLinks.map( async x => {

            var request = await Helper.sendRequest({
                api: 'post/update-link',
                method: 'POST',
                data: {
                    update: x.link_to_update,
                    old: x.selected_link
                }
            });
            // https://xxxxxxxxxxxxx.com/javascript/
            console.log(request);
        });

    }

    findLinkData = () => {
        
        var find_link = this.state.find_link;
        var replace_link = this.state.replace_link;

        if( find_link == "" ) {
            alert("You must add the link to search about it");
            return;  
        } 

        var new_links = this.state.links.filter( x => x.url.indexOf(find_link) !== -1 );
        var number_links = new_links.length ? `${new_links.length} Links`: 'No Links Found !';

        console.log(new_links);
        this.setState({
            links_in_group: new_links,
            links_count: number_links
        });

    }

    ChangeByGroupModal = () => {
        const { enable_change_links_by_group } = this.state;
        return (
            <div className={`modal ${this.state.enable_change_links_by_group ? "open_this_modal" : ""}`}>
                <div className="modal-background-close"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        Change Links by Group ( Find & Replace )
                    </header>
                    <section className="modal-card-body">
                        <div style={{marginBottom: '15px'}}>
                            Number of Found Links: {this.state.links_count == null? " Not Started": <b>{this.state.links_count}</b>}
                        </div>
                        <div>
                            <input onChange={e => this.setState({find_link: e.target.value})} value={this.state.find_link} type="text" placeholder="Find Link"/>
                            <input onChange={e => this.setState({replace_link: e.target.value})} value={this.state.replace_link} type="text" placeholder="Replace the New Link" style={{marginTop:15}}/>
                            <input onChange={e => this.setState({replace_link_type: e.target.value})} value={this.state.replace_link_type} type="text" placeholder="Link Type: example: noreferrer noopener" style={{marginTop:15}}/>
                            <input onChange={e => this.setState({replace_link_target: e.target.value})} value={this.state.replace_link_target} type="text" placeholder="Target: example: _blank" style={{marginTop:15}}/>
                        </div>
                        
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={e => this.setState({enable_change_links_by_group: false})} className="button">Close</button>
                        <div style={{marginLeft: 'auto'}}>
                            <button onClick={this.findLinkData} className="button blue">Find</button>
                            <button onClick={this.replaceLinkData} className="button green">Replace</button>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }

    fetchCurrentSite = async () => {
        var request = await Helper.sendRequest({
            api: "current-site",
            method: "get",
            data: {}
        });

        if (request.is_error) {
            return;
        }

        var { name } = request.data;

        this.setState({ site_name: name.toLowerCase() })
    }

    async componentDidMount() {
        await this.fetchCurrentSite();
        await this.fetchLinks();
    }

    is_valid_url = async ( url ) => {

        var request = await Helper.sendRequest({
            api: "post/validate_urls",
            method: "post",
            data: {
                url: encodeURIComponent(url)
            }
        });

        return request;
    }

    validateLink = async () => {
        

        if(!this.state.links || !this.state.links.length) {
            alert("No links found, wait until load the webpage ");
            return;
        }

        this.setState({start_validating: true })

        var length = this.state.links.length; 
        var links  = [...this.state.links];
        var completed = 0; 

        const updatedLinks = await Promise.all(
            links.map(async (x, i) => {
                var validate = await this.is_valid_url(x.url);
                 
                if(validate.is_error) {
                    return {
                        ...x, 
                        is_redirect: false,
                        status: 404,
                        type: "OK"
                    };
                }
    
                return {
                    ...x,
                    ...validate.data
                };
            })
        );

        if(updatedLinks) {
            this.setState({
                start_validating: false,
                links: updatedLinks
            })
        }

    }

    fetchLinks = () => {
        Helper.sendRequest({
            api: "post-links/get",
            method: "get",
            data: {}
        }).then(response => {

            if (response.is_error || !response.data.length) {
                return;
            }
    
            const links = response.data;
            
            this.setState({
                links,
                totalPages: Math.ceil(links.length / this.state.postsPerPage)
            });

            
        }).catch(error => {
            console.error("Failed to fetch links:", error);
        });
    };

    handleDelete = async (linkId) => {
        try {
            await Helper.delete(`/link/delete/${linkId}`);
            this.fetchLinks();
        } catch (error) {
            console.error("Failed to delete link:", error);
        }
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handlePostsPerPageChange = (event) => {
        const postsPerPage = parseInt(event.target.value);
        this.setState({
            postsPerPage,
            totalPages: Math.ceil(this.state.links.length / postsPerPage),
            currentPage: 1
        });
    };

    handleStatusCodeFilterChange = (event) => {
        this.setState({ statusCodeFilter: event.target.value, currentPage: 1 }, () => {
           // console.log("Status Code Filter Changed:", this.state.statusCodeFilter);
        });
    };

    handleExternalFilterChange = (event) => {
        this.setState({ externalFilter: event.target.value, currentPage: 1 }, () => {
            //console.log("External Filter Changed:", this.state.externalFilter);
        });
    };

    show_edit_link = (link) => {
        if (link.url === "") {
            const parser = new DOMParser();
            const doc = parser.parseFromString(link.element, 'text/html');
            const anchorElement = doc.querySelector('a');
            const href = anchorElement.getAttribute('href');
            link.url = href;
        }

        this.setState({
            selected_link: {
                post_id: link.post_id,
                paragraph_id: link.paragraph_id,
                url: link.url,
                keyword: link.keyword,
                target: link.target,
                rel: link.rel === undefined ? "" : link.rel
            },
            link_to_update: {
                url: link.url,
                keyword: link.keyword,
                rel: link.rel,
                target: link.target,
                site_name: this.state.site_name
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

        if (this.state.is_pressed) {
            return;
        }

        try {
            const response = await Helper.sendRequest({
                api: 'post/update-link',
                method: 'POST',
                data: {
                    update: this.state.link_to_update,
                    old: this.state.selected_link
                }
            });

            if (response.is_error) {
                throw new Error(response.message);
            }

            this.setState({
                request_status_class: 'success',
                request_message: 'Link saved successfully!',
                show_message: 'show_message',
                is_pressed: false,
                deletedIds: []
            });

            await this.fetchLinks();

            setTimeout(() => {
                this.setState({
                    show_modal: "none"
                })
            }, 2000);

        } catch (error) {
            this.setState({
                request_status_class: 'error',
                request_message: error.message || 'An error occurred while saving the menus.',
                show_message: 'show_message',
                is_pressed: false,
            });
        }
    }

    countStatuses = () => {
        const { links } = this.state;
        const statusCounts = {};

        links.forEach(link => {
            const status = link.status;
            if (!statusCounts[status]) {
                statusCounts[status] = 0;
            }
            statusCounts[status]++;
        });

        return statusCounts;
    }

    renderStatusCounts = () => {
        const statusCounts = this.countStatuses();
        const statusNames = {
            "200": "OK",
            "204": "No Content",
            "300": "Multiple Choices",
            "301": "Moved Permanently",
            "302": "Found",
            "307": "Temporary Redirect",
            "400": "Bad Request",
            "404": "Not Found",
            "500": "Internal Server Error",
            "Error": "Error"
        };

        return Object.keys(statusCounts).map(status => (
            <div key={status} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                padding: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                margin: '10px',
                minWidth: "150px"
            }}>
                <span style={{ fontSize: '18px', color: '#333', fontWeight: "bold" }}>{status}</span>
                <span style={{ fontSize: '14px', color: '#666' }}>{statusNames[status] || "Unknown Status"}</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{statusCounts[status]} links</span>
            </div>
        ));
    }

    render() {
        const { links, currentPage, totalPages, postsPerPage, statusCodeFilter, externalFilter } = this.state;
        let filteredLinks = links;

        if (statusCodeFilter !== "all") {
            filteredLinks = filteredLinks.filter(link => link.status.toString() === statusCodeFilter);
        }

        if (externalFilter !== "all") {
            filteredLinks = filteredLinks.filter(link => externalFilter === "true" ? link.is_external : !link.is_external);
        }

        const displayedLinks = filteredLinks.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />

                <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                    {this.state.request_message}
                </div>

                <div id="modal-link-data" className="modal" style={{ display: this.state.show_modal }}>
                    <div className="modal-background --jb-modal-close"></div>
                    <div className="modal-card" style={{ marginTop: "25px" }}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                {this.state.link_to_update.keyword}
                            </p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field" style={{ marginTop: "25px" }}>
                                <label className="label">Link or URL</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="URL" value={this.state.link_to_update.url} onChange={(e) => {
                                        this.setState({
                                            link_to_update: {
                                                ...this.state.link_to_update,
                                                url: e.target.value
                                            }
                                        })
                                    }} />
                                </div>
                            </div>

                            <div className="field" style={{ marginTop: "25px" }}>
                                <label className="label">Keyword</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Keyword" value={this.state.link_to_update.keyword} onChange={(e) => {
                                        this.setState({
                                            link_to_update: {
                                                ...this.state.link_to_update,
                                                keyword: e.target.value
                                            }
                                        })
                                    }} />
                                </div>
                            </div>

                            <div className="field" style={{ marginTop: "25px" }}>
                                <label className="label">Rel Attribute</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Rel Attributes" value={this.state.link_to_update.rel} onChange={(e) => {
                                        this.setState({
                                            link_to_update: {
                                                ...this.state.link_to_update,
                                                rel: e.target.value
                                            }
                                        })
                                    }} />
                                </div>
                            </div>

                            <div className="field" style={{ marginTop: "25px" }}>
                                <label className="label">Target Attribute</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Target Attributes" value={this.state.link_to_update.target} onChange={(e) => {
                                        this.setState({
                                            link_to_update: {
                                                ...this.state.link_to_update,
                                                target: e.target.value
                                            }
                                        })
                                    }} />
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button --jb-modal-close" onClick={e => this.setState({ show_modal: "none" })}>Cancel</button>
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

                        <div style={{ display: 'flex', justifyContent: "center", flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                            {this.renderStatusCounts()}
                        </div>
                       
                        <this.ChangeByGroupModal/>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '50px', justifyContent: "center" }}>
                            
                            <button onClick={e => {
                                this.setState({
                                    enable_change_links_by_group: true
                                })
                            }} className="button green">
                                Change Links
                            </button>

                            <select
                                onChange={this.handlePostsPerPageChange}
                                value={postsPerPage}
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    width: '200px'
                                }}
                            >
                                <option value="10">10 per page</option>
                                <option value="20">20 per page</option>
                                <option value="30">30 per page</option>
                                <option value="100">100 per page</option>
                                <option value={links.length}>All per page</option>
                            </select>
                            <select
                                onChange={this.handleStatusCodeFilterChange}
                                value={statusCodeFilter}
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    width: '200px'
                                }}
                            >
                                <option value="all">All statuses</option>
                                <option value="200">200</option>
                                <option value="204">204</option>
                                <option value="300">300</option>
                                <option value="301">301</option>
                                <option value="302">302</option> 
                                <option value="307">307</option>
                                <option value="400">400</option>
                                <option value="404">404</option>
                                <option value="500">500</option>
                                <option value="Error">Error</option>
                            </select>
                            <select
                                onChange={this.handleExternalFilterChange}
                                value={externalFilter}
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    width: '200px'
                                }}
                            >
                                <option value="all">All links</option>
                                <option value="true">External Links</option>
                                <option value="false">Internal Links</option>
                            </select>

                            <button onClick={this.validateLink} className="button red">
                                
                                {
                                    this.state.start_validating ?
                                    <span className="loader"></span>
                                    : "Validate Links"
                                }
                            </button>
                        </div> 

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
                                        <th>visit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedLinks.map((link, index) => {
                                        
                                        
                                        return (
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
                                            <td className="actions-cell" style={{textAlign: "center"}}>
                                                <button
                                                    className="button small red"
                                                    type="button"
                                                    onClick={() => this.handleDelete(link._id)}
                                                >
                                                    <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                </button>
                                            </td>
                                            <td className="actions-cell">
                                                <button
                                                    className="button small green"
                                                    type="button" 
                                                >
                                                    <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                    )})}
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
