import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            bounceRates: {},
            pageViews: {},
            commentsData: {},
            totalComments: 0,
            totalReviews: 0,
            currentPage: 1,
            postsPerPage: 10,
            isError: false,
            message: '',
            totalAverageBounceRate: 0,
            totalViews: 0,
            totalPublishedPosts: 0,
            totalPosts: 0
        };
    }

    async componentDidMount() {
        try {
            const [postsResponse, reportsResponse, commentsResponse] = await Promise.all([
                Helper.sendRequest({
                    api: 'post/get?post_type=0',
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
                })
            ]);

            if (postsResponse.is_error) {
                this.setState({ isError: true, message: postsResponse.message });
            } else {
                const posts = this.parsePosts(postsResponse.data);
                const { bounceRates, pageViews } = this.parseReports(reportsResponse.data);
                const { commentsData, totalComments, totalReviews } = this.parseComments(commentsResponse.data);
                this.setState({ posts, bounceRates, pageViews, commentsData, totalComments, totalReviews, totalPosts: posts.length }, this.calculateMetrics);
            }
        } catch (error) {
            this.setState({ isError: true, message: error.message });
        }
    }

    parsePosts(data) {
        return data.map(post => ({
            id: post._id,
            title: post.post_title,
            totalWords: post.total_words,
            status: post.is_published ? 'Published' : 'Draft',
            slug: post.slug,
            tutorial: post.tutorial.name
        }));
    }

    parseReports(data) {
        const bounceRates = {};
        const pageViews = {};
        data.forEach(item => {
            const parts = item.landingPage.split('/').filter(part => part !== '');
            const normalizedLandingPage = parts.pop();
            bounceRates[normalizedLandingPage] = parseFloat(item.averageBounceRate);
            pageViews[normalizedLandingPage] = item.pageViews;
        });
        return { bounceRates, pageViews };
    }

    parseComments(data) {
        const commentsData = {};
        let totalComments = 0;
        let totalReviews = 0;

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
            totalReviews += (review !== 'N/A') ? parseFloat(review) : 0;
        });

        totalReviews = (data.length > 0) ? (totalReviews / data.length).toFixed(1) : 'N/A';

        return { commentsData, totalComments, totalReviews };
    }

    calculateMetrics() {
        this.calculateTotalAverageBounceRate();
        this.calculateTotalViews();
        this.calculateTotalPublishedPosts();
    }

    calculateTotalAverageBounceRate() {
        const { posts, bounceRates, currentPage, postsPerPage } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        let totalBounceRate = 0;
        let count = 0;

        currentPosts.forEach(post => {
            const bounceRate = bounceRates[post.slug];
            if (bounceRate !== undefined) {
                totalBounceRate += bounceRate;
                count++;
            }
        });

        const totalAverageBounceRate = count > 0 ? (totalBounceRate / count).toFixed(2) : 'N/A';
        this.setState({ totalAverageBounceRate });
    }

    calculateTotalViews() {
        const { posts, pageViews, currentPage, postsPerPage } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        let totalViews = 0;

        currentPosts.forEach(post => {
            const views = pageViews[post.slug];
            if (views !== undefined) {
                totalViews += views;
            }
        });

        this.setState({ totalViews });
    }

    calculateTotalPublishedPosts() {
        const { posts } = this.state;
        const totalPublishedPosts = posts.filter(post => post.status === 'Published').length;
        this.setState({ totalPublishedPosts });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.calculateMetrics);
    };

    renderPagination() {
        const { currentPage, postsPerPage, posts } = this.state;
        const totalPages = Math.ceil(posts.length / postsPerPage);

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

    renderPostsTable() {
        const { posts, bounceRates, pageViews, commentsData, currentPage, postsPerPage } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        
        return (
            <table>
                <thead>
                    <tr>
                         
                        <th>Posts Name</th>
                        <th>Tutorial</th>
                        <th>Review</th>
                        <th>Status</th>
                        <th>Bounce Rate</th>
                        <th>Comments</th>
                        <th>Views</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map(post => (
                        <tr key={post.id}> 
                            <td data-label="Name">{post.title} <small className="number-of-posts">{post.totalWords} Words</small></td>
                            <td data-label="Tutorial"><small className="text-gray-500" title="Programming">{post.tutorial}</small></td>
                            <td data-label="Review">{commentsData[post.id] ? commentsData[post.id].review : 'N/A'}</td>
                            <td data-label="Status"><small className="text-gray-500" title="Programming">{post.status}</small></td>
                            <td data-label="Bounce Rate"><small className="text-gray-500" title="Programming">{bounceRates[post.slug] !== undefined ? bounceRates[post.slug] + '%' : 'N/A'}</small></td>
                            <td data-label="Comments"><a href="#"><small className="text-gray-500" title="Programming">{commentsData[post.id] ? commentsData[post.id].commentsCount : 'N/A'}</small></a></td>
                            <td data-label="Views"><small className="text-gray-500" title="Programming">{pageViews[post.slug] !== undefined ? Helper.formatNumber(pageViews[post.slug]) : 'N/A'}</small></td>
                            <td className="actions-cell">
                                <div className="buttons right nowrap">
                                    <button className="button small grey --jb-modal" data-target="sample-modal-2" type="button">
                                        <span className="icon"><i className="mdi mdi-pencil"></i></span>
                                    </button>
                                    <button className="button small green --jb-modal" data-target="sample-modal-2" type="button">
                                        <span className="icon"><i className="mdi mdi-eye"></i></span>
                                    </button>
                                    <button className="button small red --jb-modal" data-target="sample-modal" type="button">
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

    render() {
        const { isError, message, totalAverageBounceRate, totalViews, totalPublishedPosts, totalPosts, totalComments, totalReviews } = this.state;

        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">

                    <div className="h-full row-container static-cols">
                        
                        <div className="container-tribble" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Total Posts
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(totalPosts)}
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
                                                Total Comments
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(totalComments)}
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
                                            Total Reviews
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {totalReviews}
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
                                            Bounce Rate
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {totalAverageBounceRate}%
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
                                                Total Views
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(totalViews)}
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
                                                Total Published Posts
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                {Helper.formatNumber(totalPublishedPosts)}
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
                                All Posts
                            </p>
                            <a href="#" className="card-header-icon">
                                <span className="icon"><i className="mdi mdi-filter-outline"></i></span>
                            </a>
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

export { Posts };
