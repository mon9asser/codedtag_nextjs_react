import React, { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js"; // Import Helper from your helper file

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentDetails: [],
            currentPage: 1,
            totalPages: 1,
            showMessageModal: false,
            showCommentsModal: false,
            selectedComment: null,
            show_modal: "none",
            sortKey: null,
            sortOrder: 'desc'
        };
    }

    componentDidMount() {
        this.fetchComments();
    }

    fetchComments = (page = 1) => {
        // Fetch comments using Helper.sendRequest with pagination
        Helper.sendRequest({
            api: `comments?page=${page}&limit=10`,
            method: "get",
            data: { page, limit: 10, sort: { date: -1 } } // Ensure pagination and sorting by date
        }).then(response => {
            if (!response.is_error) {
                this.setState({
                    comments: response.data.comments,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                });
            } else {
                //console.log(response.message);
            }
        }).catch(error => console.error('Error fetching comments:', error));
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page }, () => {
            this.fetchComments(page);
        });
    }

    handleCommentDetailsClick = (commentDetails) => {
        this.setState({ show_modal: "block", commentDetails });
    }

    handleDelete = (commentId) => {
        Helper.sendRequest({
            api: `comments`,
            method: "delete",
            data: { _id: commentId }
        }).then(response => {
            if (!response.is_error) {
                this.setState({
                    comments: this.state.comments.filter(comment => comment._id !== commentId)
                });
            } else {
               // console.log(response.message);
            }
        }).catch(error => console.error('Error deleting comment:', error));
    }

    closeModal = () => {
        this.setState({ show_modal: "none", commentDetails: [] });
    }

    handleSort = (sortKey) => {
        const { sortOrder, comments } = this.state;
        const newSortOrder = this.state.sortKey === sortKey && sortOrder === 'desc' ? 'asc' : 'desc';
        const sortedComments = comments.sort((a, b) => {
            if (sortKey === 'comments.length') {
                return newSortOrder === 'desc' 
                    ? b.comments.length - a.comments.length 
                    : a.comments.length - b.comments.length;
            } else {
                return newSortOrder === 'desc' 
                    ? b[sortKey] - a[sortKey] 
                    : a[sortKey] - b[sortKey];
            }
        });

        this.setState({ comments: sortedComments, sortKey, sortOrder: newSortOrder });
    }

    renderComments = () => {
        
        return (
                this.state.comments.map(comment => (
                <tr key={comment._id}>
                    <td>{comment.post_id == undefined ? "": comment.post_id.post_title}</td>
                    <td>{comment.like_counts}</td>
                    <td>{comment.dis_like_counts}</td>
                    <td>{comment.views}</td>
                    <td>
                        <button
                            className="button small blue"
                            onClick={() => this.handleCommentDetailsClick(comment.comments)}
                        >
                            {comment.comments.length}
                        </button>
                    </td>
                    <td>
                        <button
                            className="button small red"
                            onClick={() => this.handleDelete(comment._id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
    
        );
    }

    renderCommentDetails = () => {
        return this.state.commentDetails.map((detail, index) => (
            <div key={index} className="comment-item">
                <div style={{border: "1px solid #ddd", padding: "10px", display: "flex", marginBottom: "15px"}}>
                    <p style={{flexGrow: 1}}>{detail.text}</p> 
                    <span>{detail.counts}</span> 
                </div> 
            </div>
        ));
    }

    render() {
        const { comments, currentPage, totalPages, show_modal } = this.state;

        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div className="card has-table mt-30">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                All Comments
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
                                        <th onClick={() => this.handleSort('like_counts')} style={{ cursor: 'pointer' }}>Likes</th>
                                        <th onClick={() => this.handleSort('dis_like_counts')} style={{ cursor: 'pointer' }}>Dislikes</th>
                                        <th onClick={() => this.handleSort('views')} style={{ cursor: 'pointer' }}>Views</th>
                                        <th onClick={() => this.handleSort('comments.length')} style={{ cursor: 'pointer' }}>Comments</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.comments.length && this.state.comments != null ? this.renderComments(): ""}
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

                {/* Modal for viewing comment details */}
                <div id="modal-comments" className="modal" style={{ display: show_modal }}>
                    <div className="modal-background --jb-modal-close" onClick={this.closeModal}></div>
                    <div className="modal-card" style={{ marginTop: "25px" }}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">Comments</p>
                        </header>
                        <section className="modal-card-body">
                            {this.renderCommentDetails()}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button --jb-modal-close" onClick={this.closeModal}>Close</button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export { Comments };
