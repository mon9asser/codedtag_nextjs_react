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

        this.state = {
            links: [],
            currentPage: 1,
            totalPages: 1,
        };
    }

    componentDidMount() {
        this.fetchLinks();
    }

    fetchLinks = async () => {
        try {
            const response = await Helper.sendRequest({
                api: "/post/get",
                method: "get",
                data: {}
            });

            if (response.is_error || !response.data.length) {
                return;
            }

            const posts = response.data;
            const links = posts.reduce((acc, post) => acc.concat(post.links.map(link => ({
                ...link,
                post_id: post._id,
                post_title: post.post_title,
            }))), []);
            this.setState({ links, totalPages: Math.ceil(links.length / 10) }, this.checkRedirects);
        } catch (error) {
            console.error("Failed to fetch links:", error);
        }
    };

    checkRedirects = () => {
        const { links } = this.state;
        links.forEach(link => {
            this.checkIfRedirects(link.url).then(isRedirect => {
               
                this.setState(prevState => ({
                    links: prevState.links.map(l =>
                        l.url === link.url ? { ...l, is_redirect: isRedirect } : l
                    )
                }));
            });
        });
    };

    checkIfRedirects = async (url) => {
       
        const encodedUrl = encodeURIComponent(url);
        console.log(encodedUrl);

        alert("We're here !! /api/proxy")
        /* response with
            is_error: false, 
            data: {
               status: status,
                type: statusText,
                is_redirect: is_redirect,
                url: url 
            }, 
            message:
        */
    };

    handleView = (link) => {
        // Handle view logic here
        console.log("View link:", link);
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

    render() {
        const { links, currentPage, totalPages } = this.state;
        const linksPerPage = 10;
        const displayedLinks = links.slice((currentPage - 1) * linksPerPage, currentPage * linksPerPage);

        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
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
                                        <th>Redirects</th>
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
                                            <td data-label="Redirects">{link.is_redirect ? "Yes" : "No"}</td>
                                            <td className="actions-cell">
                                                <button
                                                    className="button small blue --jb-modal"
                                                    type="button"
                                                    onClick={() => this.handleView(link)}
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
