import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
import withRouter from "./parts/with-router.js";
import withNavigate from "./parts/with-navigate.js";



class tutorialWrapper extends Component {
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
            object_to_delete: null,
            delete_pressed: false, 
            deletion_confirm_modal_open: false, 
            currentPage: 1,
            tutorialsPerPage: 10,
            sortConfig: {
                key: null,
                direction: 'asc'
            }
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

    toggleStatisticsModal = (tutorialSlug) => {
        const data = this.getAnalyticsData(tutorialSlug);

        this.setState(prevState => ({
            statisticsModal: {
                isOpen: !prevState.statisticsModal.isOpen,
                data: data || null
            }
        }));
    }

    confirmDeletion = async (id, title) => {
        this.setState({
            object_to_delete: {
                id,
                title 
            },
            deletion_confirm_modal_open: true
        });
    } 

    deleteTutorial = async () => {
        try {
            if( this.state.object_to_delete == null ) {
                return; 
            }

            this.setState({
                delete_pressed: true 
            });

            var tutorialId = this.state.object_to_delete.id;

            const response = await Helper.sendRequest({
                api: 'tutorial/delete',
                method: 'POST',
                data: { tutorial_id: tutorialId }
            });

            if (!response.is_error) {
                this.setState(prevState => ({
                    tutorials: prevState.tutorials.filter(tutorial => tutorial._id !== tutorialId),
                    deletion_confirm_modal_open: false,
                    delete_pressed: false
                }));
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("An error occurred while deleting the tutorial:", error);
        }
    }

    getAnalyticsData = (tutorialSlug) => {
        let totalSessions = 0;
        let totalPageViews = 0;
        let totalSessionDuration = 0;
        let totalPageViewsPerSession = 0;
        let totalActiveUsers = 0;
        let totalNewUsers = 0;
        let totalEventCount = 0;
        let totalBounceRate = 0;
        let reportCount = 0;

        this.state.analytics.forEach((report) => {
            const landingPageSlug = report.landingPage.split('/').filter(Boolean).pop();
            if (landingPageSlug === tutorialSlug) {
                totalSessions += report.sessions;
                totalPageViews += report.pageViews;
                totalSessionDuration += report.averageSessionDuration;
                totalPageViewsPerSession += report.screenPageViewsPerSession;
                totalActiveUsers += report.activeUsers;
                totalNewUsers += report.newUsers;
                totalEventCount += report.eventCount;
                const numericBounceRate = parseFloat(report.averageBounceRate.replace('%', ''));
                if (!isNaN(numericBounceRate)) {
                    totalBounceRate += numericBounceRate;
                }
                reportCount++;
            }
        });

        if (reportCount === 0) {
            return null;
        }

        return {
            slug: tutorialSlug,
            totalSessions,
            totalPageViews,
            averageSessionDuration: (totalSessionDuration / reportCount / 60).toFixed(2) + " mins",
            pageViewsPerSession: (totalPageViewsPerSession / reportCount).toFixed(2),
            activeUsers: totalActiveUsers,
            newUsers: totalNewUsers,
            eventCount: totalEventCount,
            averageBounceRate: (totalBounceRate / reportCount).toFixed(2) + '%'
        };
    }

    DeletionModal = () => {
        const { deletion_confirm_modal_open } = this.state;
 
        return (
            <div className={`modal ${deletion_confirm_modal_open ? "open_this_modal" : ""}`}>
                <div className="modal-background --jb-modal-close"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Confirm Deletion</p>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure to delete <b>{this.state.object_to_delete?.title}</b></p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => this.setState({ deletion_confirm_modal_open: false })} className="button">Cancel</button>
                        <button onClick={this.deleteTutorial} className="button blue">
                            {this.state.delete_pressed ? <span className="loader"></span> : "Confirm"}
                        </button>
                    </footer>
                </div>
            </div>
        );
    }

    StatisticsModal = () => {
        const { statisticsModal } = this.state;
        return (
            <div className={`modal ${statisticsModal.isOpen ? "open_this_modal" : ""}`}>
                <div className="modal-background --jb-modal-close" onClick={() => this.toggleStatisticsModal()}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Statistics {statisticsModal.data ? "of " : ""}<b>{statisticsModal.data ? statisticsModal.data.slug : ""}</b></p>
                    </header>
                    <section className="modal-card-body">
                        {statisticsModal.data ? (
                            <div>
                                <ul className="list-items-data"> 
                                    <li>
                                        <span>Views:</span> <b>{Helper.formatNumber(statisticsModal.data.totalPageViews)}</b>
                                    </li>
                                    <li>
                                        <span>Bounce Rate:</span> <b>{statisticsModal.data.averageBounceRate}</b>
                                    </li> 
                                    <li>
                                        <span>Page Views per Session:</span> <b>{statisticsModal.data.pageViewsPerSession}</b>
                                    </li>
                                    <li>
                                        <span>Sessions:</span> <b>{Helper.formatNumber(statisticsModal.data.totalSessions)}</b>
                                    </li>
                                    <li>
                                        <span>Average Session Duration:</span> <b>{statisticsModal.data.averageSessionDuration}</b>
                                    </li>
                                    <li>
                                        <span>Active Users:</span> <b>{Helper.formatNumber(statisticsModal.data.activeUsers)}</b>
                                    </li>
                                    <li>
                                        <span>New Users:</span> <b>{Helper.formatNumber(statisticsModal.data.newUsers)}</b>
                                    </li>
                                    <li>
                                        <span>Event Counts:</span> <b>{Helper.formatNumber(statisticsModal.data.eventCount)}</b>
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

    getTotalAnalyticsForCurrentTutorials = () => {
        const { currentPage, tutorialsPerPage, tutorials } = this.state;
        const indexOfLastTutorial = currentPage * tutorialsPerPage;
        const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
        const currentTutorials = tutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);

        let totalViews = 0;
        let totalPublishedPages = 0;
        let totalSessionDuration = 0;
        let totalPageViewsPerSession = 0;
        let totalSessions = 0;
        let totalBounceRate = 0;
        let reportCount = 0;

        currentTutorials.forEach((tutorial) => {
            const tutorialSlug = tutorial.slug;
            this.state.analytics.forEach((report) => {
                const landingPageSlug = report.landingPage.split('/').filter(Boolean).pop();
                if (landingPageSlug === tutorialSlug) {
                    totalViews += report.pageViews;
                    totalSessions += report.sessions;
                    totalSessionDuration += report.averageSessionDuration;
                    totalPageViewsPerSession += report.screenPageViewsPerSession;
                    const numericBounceRate = parseFloat(report.averageBounceRate.replace('%', ''));
                    if (!isNaN(numericBounceRate)) {
                        totalBounceRate += numericBounceRate;
                    }
                    reportCount++;
                }
            });
            
            if (tutorial.options?.publish) totalPublishedPages += 1;
        });

        const averageBounceRate = (totalBounceRate / reportCount).toFixed(2) + '%';
        const averageSessionDuration = (totalSessionDuration / reportCount / 60).toFixed(2) + ' mins';
        const averagePageViewsPerSession = (totalPageViewsPerSession / reportCount).toFixed(2);

        return {
            totalViews,
            totalPublishedPages,
            totalSessionDuration: averageSessionDuration,
            totalPageViewsPerSession: averagePageViewsPerSession,
            totalSessions,
            totalBounceRate: averageBounceRate
        };
    }

    handleSort = (key) => {
        let direction = 'asc';
        if (this.state.sortConfig.key === key && this.state.sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        this.setState({
            sortConfig: {
                key,
                direction
            }
        });
    }

    sortTutorials = (tutorials) => {
        const { sortConfig } = this.state;
        if (sortConfig.key) {
            tutorials.sort((a, b) => {
                let aValue, bValue;
                switch (sortConfig.key) {
                    case 'Chapters':
                        aValue = this.getChapterCount(a._id);
                        bValue = this.getChapterCount(b._id);
                        break;
                    case 'Review':
                        aValue = parseFloat(this.calculateRating(a._id));
                        bValue = parseFloat(this.calculateRating(b._id));
                        break;
                    case 'Status':
                        aValue = a.options?.publish ? "Published" : "Draft";
                        bValue = b.options?.publish ? "Published" : "Draft";
                        break;
                    case 'Views':
                        aValue = this.getViews(a.slug);
                        bValue = this.getViews(b.slug);
                        break;
                    case 'Bounce Rate':
                        aValue = parseFloat(this.getBounceRate(a.slug));
                        bValue = parseFloat(this.getBounceRate(b.slug));
                        break;
                    default:
                        return 0;
                }
                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return tutorials;
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

    navigateToEdit = (tutorial_id) => { 
        this.props.navigate(`/dashboard/edit-tutorial/${tutorial_id}`);
    }

    render() {
        const { tutorials, isError, message, currentPage, tutorialsPerPage } = this.state;
        const indexOfLastTutorial = currentPage * tutorialsPerPage;
        const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
        const currentTutorials = this.sortTutorials(tutorials.slice(indexOfFirstTutorial, indexOfLastTutorial));

        const {
            totalViews,
            totalPublishedPages,
            totalSessionDuration,
            totalPageViewsPerSession,
            totalSessions,
            totalBounceRate
        } = this.getTotalAnalyticsForCurrentTutorials();

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
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>{tutorials.length}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Bounce Rate</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>{totalBounceRate}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Total Views</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>{totalViews}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Total Published Pages</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>{totalPublishedPages}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Average Session Duration</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>{totalSessionDuration}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Page Views per Session</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>{totalPageViewsPerSession}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ flexBasis: "23%" }}>
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3 style={{ color: "#6c726e", fontSize: "14px" }}>Sessions</h3>
                                        <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>{totalSessions}</h1>
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
                                            <th onClick={() => this.handleSort('tutorial_title')}>Tutorial Name</th>
                                            <th onClick={() => this.handleSort('Chapters')}>Chapters</th>
                                            <th onClick={() => this.handleSort('Review')}>Review</th>
                                            <th onClick={() => this.handleSort('Status')}>Status</th>
                                            <th onClick={() => this.handleSort('Category')}>Category</th>
                                            <th onClick={() => this.handleSort('Views')}>Views</th>
                                            <th onClick={() => this.handleSort('Bounce Rate')}>Bounce Rate</th>
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
                                                        <button className="button small blue" type="button" onClick={() => this.toggleStatisticsModal(tutorial.slug)}>
                                                            <span className="icon"><i className="mdi mdi-chart-arc"></i></span>
                                                        </button>
                                                        <button className="button small grey" onClick={() => this.navigateToEdit(tutorial._id)} type="button">
                                                            <span className="icon"><i className="mdi mdi-pencil"></i></span>
                                                        </button>
                                                        <button className="button small green" data-target="sample-modal-2" type="button">
                                                            <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                        </button>
                                                        <button className="button small red" data-target="sample-modal" type="button" onClick={() => this.confirmDeletion(tutorial._id, tutorial.tutorial_title)}>
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
 
                <this.DeletionModal />
                <this.StatisticsModal />
            </div>
        );
    }
}


var Tutorials = withNavigate(withRouter(tutorialWrapper));

export { Tutorials };
