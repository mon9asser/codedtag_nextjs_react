import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";

class Tutorials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorials: [],
            bounceRates: {},
            pageViews: {},
            totalPosts: 0,
            totalAverageBounceRate: 0,
            totalViews: 0,
            totalPublishedPosts: 0,
            averageSessionDuration: 0,
            screenPageViewsPerSession: 0,
            sessions: 0,
            isError: false,
            message: ''
        };
    }

    async componentDidMount() {
        try {
            const [tutorialsResponse, reportsResponse] = await Promise.all([
                Helper.sendRequest({
                    api: 'tutorials',
                    method: 'GET',
                    data: {}
                }),
                Helper.sendRequest({
                    api: 'reports/by-pages',
                    method: 'GET',
                    data: {}
                })
            ]);

            if (tutorialsResponse.is_error) {
                this.setState({ isError: true, message: tutorialsResponse.message });
            } else {
                const tutorials = this.parseTutorials(tutorialsResponse.data);
                const { bounceRates, pageViews, totalAverageBounceRate, totalViews, totalPublishedPosts, averageSessionDuration, screenPageViewsPerSession, sessions } = this.parseReports(reportsResponse.data);

                this.setState({
                    tutorials,
                    bounceRates,
                    pageViews,
                    totalPosts: tutorials.length,
                    totalAverageBounceRate,
                    totalViews,
                    totalPublishedPosts,
                    averageSessionDuration,
                    screenPageViewsPerSession,
                    sessions
                });
            }
        } catch (error) {
            this.setState({ isError: true, message: error.message });
        }
    }

    parseTutorials(data) {
        return data.map(tutorial => ({
            id: tutorial._id,
            title: tutorial.tutorial_title,
            chapters: tutorial.duration || 0,
            status: tutorial.options.publish ? 'Published' : 'Draft',
            category: 'Programming', // Assuming category is static or derived from some data
            views: 0, // Placeholder for views, update based on your data structure
            review: 0, // Placeholder for review, update based on your data structure
            slug: tutorial.slug
        }));
    }

    parseReports(data) {
        const bounceRates = {};
        const pageViews = {};
        let totalAverageBounceRate = 0;
        let totalViews = 0;
        let totalPublishedPosts = 0;
        let totalSessions = 0;
        let totalDuration = 0;
        let totalPageViewsPerSession = 0;

        data.forEach(item => {
            const parts = item.landingPage.split('/').filter(part => part !== '');
            const normalizedLandingPage = parts.pop();
            bounceRates[normalizedLandingPage] = parseFloat(item.averageBounceRate);
            pageViews[normalizedLandingPage] = item.pageViews;

            totalAverageBounceRate += parseFloat(item.averageBounceRate);
            totalViews += item.pageViews;
            totalPublishedPosts += item.pageViews > 0 ? 1 : 0; // Example logic for counting published pages
            totalSessions += item.sessions;
            totalDuration += item.averageSessionDuration;
            totalPageViewsPerSession += item.screenPageViewsPerSession;
        });

        const reportCount = data.length;
        totalAverageBounceRate = reportCount ? (totalAverageBounceRate / reportCount).toFixed(2) : 0;
        totalPublishedPosts = reportCount ? (totalPublishedPosts / reportCount).toFixed(2) : 0;
        const averageSessionDuration = reportCount ? (totalDuration / reportCount).toFixed(2) : 0;
        const screenPageViewsPerSession = reportCount ? (totalPageViewsPerSession / reportCount).toFixed(2) : 0;

        return { bounceRates, pageViews, totalAverageBounceRate, totalViews, totalPublishedPosts, averageSessionDuration, screenPageViewsPerSession, sessions: totalSessions };
    }

    render() {
        const { tutorials, bounceRates, pageViews, totalPosts, totalAverageBounceRate, totalViews, totalPublishedPosts, averageSessionDuration, screenPageViewsPerSession, sessions, isError, message } = this.state;

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

                        <div className="card" style={{ flexBasis: "23%" }}>
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

                        <div className="card" style={{ flexBasis: "23%" }}>
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

                        <div className="card" style={{ flexBasis: "23%" }}>
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
                                <>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox" />
                                                </th>
                                                <th>Tutorial Name</th>
                                                <th>Chapters</th>
                                                <th>Review</th>
                                                <th>Status</th>
                                                <th>Category</th>
                                                <th>Views</th>
                                                <th>Bounce Rate</th>
                                                <th>Sessions</th>
                                                <th>Views per Session</th>
                                                <th>Session Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tutorials.map(tutorial => (
                                                <tr key={tutorial.id}>
                                                    <td className="image-cell">
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td data-label="Name">{tutorial.title} <small className="number-of-posts">{tutorial.chapters} posts</small></td>
                                                    <td data-label="Chapters">{tutorial.chapters}</td>
                                                    <td data-label="Review">{tutorial.review}</td>
                                                    <td data-label="Status"><small className="text-gray-500" title="Programming">{tutorial.status}</small></td>
                                                    <td data-label="Category"><small className="text-gray-500" title="Programming">{tutorial.category}</small></td>
                                                    <td data-label="Views"><small className="text-gray-500" title="Programming">{Helper.formatNumber(pageViews[tutorial.slug] || 0)}</small></td>
                                                    <td data-label="Bounce Rate"><small className="text-gray-500" title="Programming">{bounceRates[tutorial.slug] !== undefined ? bounceRates[tutorial.slug] + '%' : 'N/A'}</small></td>
                                                    <td data-label="Sessions"><small className="text-gray-500" title="Programming">{Helper.formatNumber(this.state.sessions)}</small></td>
                                                    <td data-label="Views per Session"><small className="text-gray-500" title="Programming">{Helper.formatNumber(this.state.screenPageViewsPerSession)}</small></td>
                                                    <td data-label="Session Duration"><small className="text-gray-500" title="Programming">{Helper.formatNumber(this.state.averageSessionDuration)}</small></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="table-pagination">
                                        <div className="flex items-center justify-between">
                                            <div className="buttons">
                                                <button type="button" className="button active">1</button>
                                                <button type="button" className="button">2</button>
                                                <button type="button" className="button">3</button>
                                            </div>
                                            <small>Page 1 of 3</small>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center justify-start space-x-3">
                            <div>
                                © 2021, CodedTag.com
                            </div>

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

export { Tutorials };
