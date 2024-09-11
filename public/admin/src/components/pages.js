import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";

import withNavigate from "./parts/with-navigate.js";

class pageWrapped extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filteredPosts: [],
            bounceRates: {},
            pageViews: {},
            pageSessions: {},
            pageViewsPerSession: {},
            pageAverageSessionDuration: {},
            commentsData: {},
            tutorials: [],
            totalComments: 0,
            totalReviews: 0,
            currentPage: 1,
            postsPerPage: 10,
            isError: false,
            message: '',
            totalAverageBounceRate: 0,
            totalViews: 0,
            totalPublishedPosts: 0,
            totalPosts: 0,
            averageSessionDuration: 0,
            screenPageViewsPerSession: 0,
            sessions: 0,
            posts_filter_modal_open: false,
            filterTutorial: '',
            filterStatus: '',
            sortColumn: '',
            sortDirection: 'asc',
            delete_post: {
                post_id: null,
                post_title: "",
                is_deleting: false
            },
            post_confirmation_deletion: false
        };
    }

    toggleDeletionConfirmation = (post_id, post_title) => {
        this.setState({
            delete_post: {
                post_id: post_id,
                post_title: post_title
            },
            post_confirmation_deletion: !this.state.post_confirmation_deletion
        });
    }

    async componentDidMount() {
        try {
            const [postsResponse, reportsResponse, commentsResponse, tutorialsResponse] = await Promise.all([
                Helper.sendRequest({
                    api: 'post/get?post_type=1',
                    method: 'GET',
                    data: {}
                }),
                Helper.sendRequest({
                    api: 'reports/by-pages',
                    method: 'GET',
                    data: {}
                }),
                Helper.sendRequest({
                    api: 'comments/all',
                    method: 'GET',
                    data: {}
                }),
                Helper.sendRequest({
                    api: 'tutorials',
                    method: 'GET',
                    data: {}
                })
            ]);

            if (postsResponse.is_error) {
                this.setState({ isError: true, message: postsResponse.message });
            } else {
                const posts = this.parsePosts(postsResponse.data);
                const { bounceRates, pageViews, pageSessions, pageViewsPerSession, pageAverageSessionDuration } = this.parseReports(reportsResponse.data);
                const { commentsData, totalComments, totalReviews } = this.parseComments(commentsResponse.data);
                const tutorials = tutorialsResponse.data;
                this.setState({
                    posts,
                    filteredPosts: posts,
                    bounceRates,
                    pageViews,
                    pageSessions,
                    pageViewsPerSession,
                    pageAverageSessionDuration,
                    commentsData,
                    totalComments,
                    totalReviews,
                    totalPosts: posts.length,
                    tutorials
                }, this.calculateMetrics);
            }
        } catch (error) {
            this.setState({ isError: true, message: error.message });
        }
    }

    parsePosts(data) {
        return data.map(post => ({
            id: post._id,
            title: post.post_title,
            totalWords: parseInt(post.total_words, 10),
            status: post.is_published ? 'Published' : 'Draft',
            slug: post.slug,
            tutorial: post.tutorial.name
        }));
    }

    parseReports(data) {
        const bounceRates = {};
        const pageViews = {};
        const pageSessions = {};
        const pageViewsPerSession = {};
        const pageAverageSessionDuration = {};

        data.forEach(item => {
            const parts = item.landingPage.split('/').filter(part => part !== '');
            const normalizedLandingPage = parts.pop();
            bounceRates[normalizedLandingPage] = parseFloat(item.averageBounceRate);
            pageViews[normalizedLandingPage] = item.pageViews;
            pageSessions[normalizedLandingPage] = item.sessions;
            pageViewsPerSession[normalizedLandingPage] = item.screenPageViewsPerSession;
            pageAverageSessionDuration[normalizedLandingPage] = item.averageSessionDuration;
        });

        return { bounceRates, pageViews, pageSessions, pageViewsPerSession, pageAverageSessionDuration };
    }

    parseComments(data) {
        const commentsData = {};
        let totalComments = 0;
        let totalReviews = 0;
        let reviewCount = 0;

        data.forEach(item => {
            const postId = item.post_id;
            const commentsCount = item.comments.length;
            const likeCounts = item.like_counts;
            const dislikeCounts = item.dis_like_counts;
            const review = ((likeCounts + dislikeCounts) > 0) ? ((likeCounts / (likeCounts + dislikeCounts)) * 5).toFixed(1) : 'N/A';

            commentsData[postId] = {
                commentsCount,
                review
            };

            totalComments += commentsCount;
            if (review !== 'N/A') {
                totalReviews += parseFloat(review);
                reviewCount++;
            }
        });

        totalReviews = reviewCount > 0 ? (totalReviews / reviewCount).toFixed(1) : 'N/A';

        return { commentsData, totalComments, totalReviews };
    }

    calculateMetrics() {
        const { filteredPosts, bounceRates, pageViews, commentsData, pageSessions, pageViewsPerSession, pageAverageSessionDuration } = this.state;

        this.calculateTotalAverageBounceRate(filteredPosts, bounceRates);
        this.calculateTotalViews(filteredPosts, pageViews);
        this.calculateTotalPublishedPosts(filteredPosts);
        this.calculateTotalCommentsAndReviews(filteredPosts, commentsData);
        this.calculateAverageSessionDuration(filteredPosts, pageAverageSessionDuration);
        this.calculatePageViewsPerSession(filteredPosts, pageViewsPerSession);
        this.calculateSessions(filteredPosts, pageSessions);
    }

    calculateTotalAverageBounceRate(posts, bounceRates) {
        let totalBounceRate = 0;
        let count = 0;

        posts.forEach(post => {
            const bounceRate = bounceRates[post.slug];
            if (bounceRate !== undefined) {
                totalBounceRate += bounceRate;
                count++;
            }
        });

        const totalAverageBounceRate = count > 0 ? (totalBounceRate / count).toFixed(2) : 'N/A';
        this.setState({ totalAverageBounceRate });
    }

    calculateTotalViews(posts, pageViews) {
        let totalViews = 0;

        posts.forEach(post => {
            const views = pageViews[post.slug];
            if (views !== undefined) {
                totalViews += views;
            }
        });

        this.setState({ totalViews });
    }

    calculateTotalPublishedPosts(posts) {
        const totalPublishedPosts = posts.filter(post => post.status === 'Published').length;
        this.setState({ totalPublishedPosts });
    }

    calculateTotalCommentsAndReviews(posts, commentsData) {
        let totalComments = 0;
        let totalReviews = 0;
        let reviewCount = 0;

        posts.forEach(post => {
            const postId = post.id;
            if (commentsData[postId]) {
                totalComments += commentsData[postId].commentsCount;
                const review = commentsData[postId].review;
                if (review !== 'N/A') {
                    totalReviews += parseFloat(review);
                    reviewCount++;
                }
            }
        });

        totalReviews = reviewCount > 0 ? (totalReviews / reviewCount).toFixed(1) : 'N/A';

        this.setState({ totalComments, totalReviews });
    }

    calculateAverageSessionDuration(posts, pageAverageSessionDuration) {
        let totalSessionDuration = 0;
        let count = 0;

        posts.forEach(post => {
            const sessionDuration = pageAverageSessionDuration[post.slug];
            if (sessionDuration !== undefined) {
                totalSessionDuration += sessionDuration;
                count++;
            }
        });

        const averageSessionDuration = count > 0 ? (totalSessionDuration / count).toFixed(2) : 'N/A';
        this.setState({ averageSessionDuration });
    }

    calculatePageViewsPerSession(posts, pageViewsPerSession) {
        let totalPageViewsPerSession = 0;
        let count = 0;

        posts.forEach(post => {
            const viewsPerSession = pageViewsPerSession[post.slug];
            if (viewsPerSession !== undefined) {
                totalPageViewsPerSession += viewsPerSession;
                count++;
            }
        });

        const screenPageViewsPerSession = count > 0 ? (totalPageViewsPerSession / count).toFixed(2) : 'N/A';
        this.setState({ screenPageViewsPerSession });
    }

    calculateSessions(posts, pageSessions) {
        let totalSessions = 0;

        posts.forEach(post => {
            const sessions = pageSessions[post.slug];
            if (sessions !== undefined) {
                totalSessions += sessions;
            }
        });

        this.setState({ sessions: totalSessions });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.calculateMetrics);
    };

    handleFilterChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    apply_filters = () => {
        const { posts, filterTutorial, filterStatus } = this.state;
        const filteredPosts = posts.filter(post => {
            return (
                (filterTutorial === '' || post.tutorial === filterTutorial) &&
                (filterStatus === '' || post.status === filterStatus)
            );
        });
        this.setState({ filteredPosts, currentPage: 1 }, this.calculateMetrics);
        this.filterModalToggler();
    }

    sortPosts = (column) => {
        const { filteredPosts, sortColumn, sortDirection, bounceRates, commentsData, pageViews, pageSessions, pageViewsPerSession, pageAverageSessionDuration } = this.state;
        let newSortDirection = 'asc';

        if (sortColumn === column && sortDirection === 'asc') {
            newSortDirection = 'desc';
        }

        const sortedPosts = [...filteredPosts].sort((a, b) => {
            let aValue, bValue;

            if (column === 'review') {
                aValue = parseFloat(commentsData[a.id]?.review) || 0;
                bValue = parseFloat(commentsData[b.id]?.review) || 0;
            } else if (column === 'bounceRate') {
                aValue = bounceRates[a.slug] !== undefined ? parseFloat(bounceRates[a.slug]) : 0;
                bValue = bounceRates[b.slug] !== undefined ? parseFloat(bounceRates[b.slug]) : 0;
            } else if (column === 'comments') {
                aValue = commentsData[a.id]?.commentsCount || 0;
                bValue = commentsData[b.id]?.commentsCount || 0;
            } else if (column === 'views') {
                aValue = pageViews[a.slug] || 0;
                bValue = pageViews[b.slug] || 0;
            } else if (column === 'sessions') {
                aValue = pageSessions[a.slug] || 0;
                bValue = pageSessions[b.slug] || 0;
            } else if (column === 'viewsPerSession') {
                aValue = pageViewsPerSession[a.slug] || 0;
                bValue = pageViewsPerSession[b.slug] || 0;
            } else if (column === 'averageSessionDuration') {
                aValue = pageAverageSessionDuration[a.slug] || 0;
                bValue = pageAverageSessionDuration[b.slug] || 0;
            } else if (column === 'totalWords') {
                aValue = a.totalWords;
                bValue = b.totalWords;
            } else {
                aValue = a[column];
                bValue = b[column];
            }

            if (newSortDirection === 'asc') {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });

        this.setState({ filteredPosts: sortedPosts, sortColumn: column, sortDirection: newSortDirection });
    }

    renderPagination() {
        const { currentPage, postsPerPage, filteredPosts } = this.state;
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

        let pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="table-pagination">
                <div className="flex items-center justify-between">
                    <div className="buttons">
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => this.handlePageChange(number)} className={`button ${currentPage === number ? 'active' : ''}`}>
                                {number}
                            </button>
                        ))}
                    </div>
                    <small>Page {currentPage} of {totalPages}</small>
                </div>
            </div>
        );
    }

    navigateToEdit = (post_id) => {
        //, {state: {post_id: post_id }}
        this.props.navigate(`/dashboard/edit-page/${post_id}`);
    }

    renderPostsTable() {
        const { filteredPosts, bounceRates, pageViews, commentsData, pageSessions, pageViewsPerSession, pageAverageSessionDuration, currentPage, postsPerPage } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={() => this.sortPosts('totalWords')}>Page Name</th>
                        <th onClick={() => this.sortPosts('status')}>Status</th>
                        <th onClick={() => this.sortPosts('bounceRate')}>Bounce Rate</th>
                        <th onClick={() => this.sortPosts('views')}>Views</th>
                        <th onClick={() => this.sortPosts('sessions')}>Sessions</th>
                        <th onClick={() => this.sortPosts('viewsPerSession')}>Views per Session</th>
                        <th onClick={() => this.sortPosts('averageSessionDuration')}>Avg. Session Duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map(post => (
                        <tr key={post.id}>
                            <td data-label="Name">{post.title} <small className="number-of-posts">{post.totalWords} Words</small></td>
                            <td data-label="Status"><small className="text-gray-500" title="Programming">{post.status}</small></td>
                            <td data-label="Bounce Rate"><small className="text-gray-500" title="Programming">{bounceRates[post.slug] !== undefined ? bounceRates[post.slug] + '%' : 'N/A'}</small></td>
                            <td data-label="Views"><small className="text-gray-500" title="Programming">{pageViews[post.slug] !== undefined ? Helper.formatNumber(pageViews[post.slug]) : 'N/A'}</small></td>
                            <td data-label="Sessions"><small className="text-gray-500" title="Programming">{pageSessions[post.slug] !== undefined ? Helper.formatNumber(pageSessions[post.slug]) : 'N/A'}</small></td>
                            <td data-label="Views per Session"><small className="text-gray-500" title="Programming">{pageViewsPerSession[post.slug] !== undefined ? pageViewsPerSession[post.slug] : 'N/A'}</small></td>
                            <td data-label="Avg. Session Duration"><small className="text-gray-500" title="Programming">{pageAverageSessionDuration[post.slug] !== undefined ? pageAverageSessionDuration[post.slug] : 'N/A'}</small></td>
                            <td className="actions-cell">
                                <div className="buttons right nowrap">
                                    <button onClick={() => this.navigateToEdit(post.id)} className="button small grey" data-target="sample-modal-2" type="button">
                                        <span className="icon"><i className="mdi mdi-pencil"></i></span>
                                    </button>
                                    <button className="button small green" data-target="sample-modal-2" type="button">
                                        <span className="icon"><i className="mdi mdi-eye"></i></span>
                                    </button>
                                    <button onClick={() => this.toggleDeletionConfirmation(post.id, post.title)} className="button small red" type="button">
                                        <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    delete_this_post = async () => {
        const { delete_post } = this.state;

        this.setState({
            delete_post: {
                ...delete_post,
                is_deleting: true
            }
        });

        try {
            const response = await Helper.sendRequest({
                api: `post/delete`,
                method: 'POST',
                data: {
                    object_data: {
                        post_id: delete_post.post_id
                    }
                }
            });

            if (response.is_error) {
                this.setState({
                    isError: true,
                    message: response.message,
                    delete_post: {
                        ...delete_post,
                        is_deleting: false
                    },
                    post_confirmation_deletion: false
                });
            } else {
                const updatedPosts = this.state.posts.filter(post => post.id !== delete_post.post_id);
                const updatedFilteredPosts = this.state.filteredPosts.filter(post => post.id !== delete_post.post_id);

                this.setState({
                    posts: updatedPosts,
                    filteredPosts: updatedFilteredPosts,
                    totalPosts: updatedPosts.length,
                    post_confirmation_deletion: false,
                    delete_post: {
                        post_id: null,
                        post_title: "",
                        is_deleting: false
                    }
                }, this.calculateMetrics);
            }
        } catch (error) {
            this.setState({ 
                isError: true,
                message: error.message,
                delete_post: {
                    ...delete_post,
                    is_deleting: false
                },
                post_confirmation_deletion: false
            });
        }
    }

    DeleteModalConfirmation = () => {
        return (
            <div className={`modal ${this.state.post_confirmation_deletion ? "open_this_modal" : ""}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    
                    <header className="modal-card-head">
                        <p className="modal-card-title">Confirm Deletion Process</p>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure to delete page of <b>{this.state.delete_post.post_title}</b>?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => this.setState({ post_confirmation_deletion: false })} className="button-close">Cancel</button>
                        <button onClick={this.delete_this_post} className="button red-close">
                            {
                                this.state.delete_post.is_deleting ?
                                    <span className="loader"></span> : "Confirm"
                            }
                        </button>
                    </footer>
                </div>
            </div>
        );
    }

    FilterPostsModal = () => {
        const { tutorials, filterTutorial, filterStatus } = this.state;
        return (
            <div className={`modal ${this.state.posts_filter_modal_open ? "open_this_modal" : ""}`}>
                <div className="modal-background-close"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Filter Articles by:</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="flexform">
                            <span>Post Status</span>
                            <select name="filterStatus" value={filterStatus} onChange={this.handleFilterChange}>
                                <option value="">All</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={this.filterModalToggler} className="button-close">Cancel</button>
                        <button onClick={this.apply_filters} className="button red-close">Apply</button>
                    </footer>
                </div>
            </div>
        );
    }

    filterModalToggler = () => {
        this.setState({
            posts_filter_modal_open: !this.state.posts_filter_modal_open
        })
    }

    render() {
        const { isError, message, totalAverageBounceRate, totalViews, totalPublishedPosts, totalPosts, totalComments, totalReviews, averageSessionDuration, screenPageViewsPerSession, sessions } = this.state;

        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div className="h-full row-container static-cols">
                        <div className="container-tribble" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <div className="card" style={{ flexBasis: "23%" }}>
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Total Pages
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(totalPosts)}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ flexBasis: "23%" }}>
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Bounce Rate
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {totalAverageBounceRate}%
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ flexBasis: "23%" }}>
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Total Views
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(totalViews)}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ flexBasis: "23%" }}>
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Total Published Pages
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(totalPublishedPosts)}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Average Session Duration
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(averageSessionDuration)}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Page Views per Session
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(screenPageViewsPerSession)}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Sessions
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(sessions)}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card has-table mt-30">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                All Pages
                            </p>
                            <button onClick={this.filterModalToggler} className="card-header-icon">
                                <span className="icon"><i className="mdi mdi-filter-outline"></i></span>
                            </button>
                        </header>
                        <div className="card-content tble">
                            {isError ? (
                                <p className="has-text-danger">{message}</p>
                            ) : (
                                <>
                                    {this.renderPostsTable()}
                                    {this.renderPagination()}
                                </>
                            )}
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

                <this.FilterPostsModal />
                <this.DeleteModalConfirmation />
            </div>
        );
    }
}


var Pages = withNavigate(pageWrapped); 
export { Pages };
