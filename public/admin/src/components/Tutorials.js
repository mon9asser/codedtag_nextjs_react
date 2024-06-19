import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";

class Tutorials extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tutorials: [],
            analytics: [],
            posts: [],
            reviews: [],
            chapters: [],
            statisticsModal: {
                isOpen: false,
                data: null
            },
            currentPage: 1,
            tutorialsPerPage: 10
        };
    }

    async componentDidMount() {
        var [tutorialsRespons, analyticsResponse, postsResponse, reviewsResponse, chaptersResponse] = await Promise.all([
            Helper.sendRequest({ api: 'tutorials', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'reports/by-pages', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'post/get?post_type=0', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'comments/all', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'chapters', method: 'GET', data: {} }),
        ]);

        if (tutorialsRespons.is_error) {
            return;
        }

        this.setState({
            tutorials: tutorialsRespons.data,
            analytics: analyticsResponse.data,
            posts: postsResponse.data,
            reviews: reviewsResponse.data,
            chapters: chaptersResponse.data
        });
    }

    toggleStatisticsModal = (data) => {
        this.setState(prevState => ({
            statisticsModal: {
                isOpen: !prevState.statisticsModal.isOpen,
                data: data || null
            }
        }));
    }

    StatisticsModal = () => {
        const { statisticsModal } = this.state;
        return (
            <div className={`modal ${statisticsModal.isOpen ? "open_this_modal" : ""}`}>
                <div className="modal-background --jb-modal-close" onClick={() => this.toggleStatisticsModal()}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Statistics</p>
                    </header>
                    <section className="modal-card-body">
                        {statisticsModal.data ? (
                            <div>
                                <ul className="list-items-data">
                                    <li>
                                        Total of articles: <b>xxxxxx</b>
                                    </li>
                                    <li>
                                        Session Duration: <b>xxxxxx</b>
                                    </li>
                                    <li>
                                        Page Views per Session: <b>xxxxxx</b>
                                    </li>
                                    <li>
                                        Sessions: <b>xxxxxx</b>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <p>No data available.</p>
                        )}
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => this.toggleStatisticsModal()} className="button --jb-modal-close">Close</button>
                    </footer>
                </div>
            </div>
        );
    }

    getArticleCount = (tutorialId) => {
        return this.state.posts.filter(post => post.tutorial.id === tutorialId).length;
    }

    getChapterCount = (tutorialId) => {
        return this.state.chapters.filter(chapter => chapter.tutorial.id === tutorialId).length;
    }

    calculateRating = (tutorialId) => {
        const posts = this.state.posts.filter(post => post.tutorial.id === tutorialId);
        let totalLikes = 0;
        let totalDislikes = 0;
        let reviewCount = 0;

        posts.forEach(post => {
            const review = this.state.reviews.find(review => review.post_id === post._id);
            if (review) {
                totalLikes += review.like_counts;
                totalDislikes += review.dis_like_counts;
                reviewCount++;
            }
        });

        if (reviewCount === 0) {
            return 'N/A';
        }

        const rating = ((totalLikes / (totalLikes + totalDislikes)) * 5).toFixed(1);
        return isNaN(rating) ? 'N/A' : rating;
    }

    getCategoryName = (tutorial) => {
        return tutorial.selected_category && tutorial.selected_category.name
            ? tutorial.selected_category.name
            : 'N/A';
    }

    getViews = (tutorialSlug) => {
        return this.state.analytics.reduce((totalViews, report) => {
            const landingPageSlug = report.landingPage.split('/').filter(Boolean).pop();
            if (landingPageSlug === tutorialSlug) {
                totalViews += report.pageViews;
            }
            return totalViews;
        }, 0);
    }

    getBounceRate = (tutorialSlug) => {
        let totalBounceRate = 0;
        let matchingReportsCount = 0;
    
        this.state.analytics.forEach((report) => {
            const landingPageSlug = report.landingPage.split('/').filter(Boolean).pop();
            if (landingPageSlug === tutorialSlug) {
                const numericBounceRate = parseFloat(report.averageBounceRate.replace('%', ''));
                if (!isNaN(numericBounceRate)) {
                    totalBounceRate += numericBounceRate;
                    matchingReportsCount++;
                }
            }
        });
    
        if (matchingReportsCount === 0) {
            return 'N/A';
        }
    
        const averageBounceRate = (totalBounceRate / matchingReportsCount).toFixed(2) + '%';
        return averageBounceRate;
    }
    
    

    renderPagination = () => {
        const { currentPage, tutorialsPerPage, tutorials } = this.state;
        const totalPages = Math.ceil(tutorials.length / tutorialsPerPage);

        return (
            <div className="table-pagination">
                <div className="flex items-center justify-between">
                    <div className="buttons">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`button ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => this.setState({ currentPage: index + 1 })}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <small>Page {currentPage} of {totalPages}</small>
                </div>
            </div>
        );
    }

    render() {
        const { tutorials, isError, message, currentPage, tutorialsPerPage } = this.state;
        const indexOfLastTutorial = currentPage * tutorialsPerPage;
        const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
        const currentTutorials = tutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);

        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div className="container-tribble" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Total Tutorials</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>xxxxxx</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Bounce Rate</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>xxxxxx</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Total Views</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>xxxxxx</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Total Published Pages</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>xxxxxx</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Average Session Duration</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>xxxxxx</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Page Views per Session</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>xxxxxx</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Sessions</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>xxxxxx</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card has-table">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                All Tutorials
                            </p>
                            <a href="#" className="card-header-icon">
                                <span className="icon"><i className="mdi mdi-reload"></i></span>
                            </a>
                        </header>
                        <div className="card-content tble">
                            {isError ? (
                                <p className="has-text-danger">{message}</p>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" /></th>
                                            <th>Tutorial Name</th>
                                            <th>Chapters</th>
                                            <th>Review</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th>Views</th>
                                            <th>Bounce Rate</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTutorials.map((tutorial) => (
                                            <tr key={tutorial._id}>
                                                <td className="image-cell"><input type="checkbox" /></td>
                                                <td data-label="Name">{tutorial.tutorial_title} <small className="number-of-posts">{this.getArticleCount(tutorial._id)} Articles</small></td>
                                                <td data-label="Chapters">{this.getChapterCount(tutorial._id)}</td>
                                                <td data-label="Review">{this.calculateRating(tutorial._id)}</td>
                                                <td data-label="Status"><small className="text-gray-500" title="Programming">{tutorial.options?.publish ? "Published" : "Draft"}</small></td>
                                                <td data-label="Category"><small className="text-gray-500" title="Category">{this.getCategoryName(tutorial)}</small></td>
                                                <td data-label="Views"><small className="text-gray-500" title="Views">{this.getViews(tutorial.slug)}</small></td>
                                                <td data-label="Bounce Rate"><small className="text-gray-500" title="Bounce Rate">{this.getBounceRate(tutorial.slug)}</small></td>
                                                <td className="actions-cell">
                                                    <div className="buttons right nowrap">
                                                        <button className="button small blue --jb-modal" type="button" onClick={() => this.toggleStatisticsModal()}>
                                                            <span className="icon"><i className="mdi mdi-chart-arc"></i></span>
                                                        </button>
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
                            )}
                            {this.renderPagination()}
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

                <this.StatisticsModal />
            </div>
        );
    }
}

export { Tutorials };
