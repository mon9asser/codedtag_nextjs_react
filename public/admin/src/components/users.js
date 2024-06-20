import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";

class Users extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            
            analytics: [], 
            statisticsModal: {
                isOpen: false,
                data: null
            },

        };

    }

    async componentDidMount() {

        var [analyticsResponse, usersResponse, postsResponse] = await Promise.all([
            Helper.sendRequest({ api: 'reports/by-pages', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'user/get', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'post/get?post_type=0', method: 'GET', data: {} }),
        ]); 

        this.setState({ 
            analytics: analyticsResponse.data, 
            post:postsResponse.data, 
            users: usersResponse.data, 
        });

        alert("make username unique - allow in search engine - user job name or title")

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

    toggleStatisticsModal = (tutorialSlug) => {
        const data = this.getAnalyticsData(tutorialSlug);

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
                <div className="modal-background --jb-modal-close" onClick={() => this.toggleStatisticsModal("php")}></div>
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

    render() {

        return (
            <div id="app">
                
                <NavbarContainer/>

                <SidebarContainer />

                   
                <section className="section main-section">

                    <div className="h-full row-container static-cols">
                        
                        <div className="container-tribble" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="flex items-center justify-between">
                                        <div className="widget-label">
                                            <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                                                Total Users
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                92.2k
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
                                                Total Subscribers
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                6.2k
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
                                                Total Admins
                                            </h3>
                                            <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                                                6.2k
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
                            All Users
                        </p>
                        <a href="#" className="card-header-icon">
                        <span className="icon"><i className="mdi mdi-filter-outline"></i></span>
                        </a>
                    </header>
                    <div className="card-content tble">
                        <table>
                        <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th> 
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Rule</th>
                            <th>Posts</th>
                            <th>Updates</th>
                            <th>Date</th> 
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="image-cell">
                                <input type="checkbox" />
                            </td>
                            <td data-label="Name">Montasser Mossallem</td>
                            <td data-label="Company"><small className="text-gray-500" title="Programming">montasser@gmail.com</small></td>
                            <td data-label="City">Subscriber</td>
                            <td data-label="City"><small className="text-gray-500" title="Programming">11k</small></td>
                            <td data-label="Created">
                            <small className="text-gray-500" title="Programming">20</small>
                            </td>
                            <td data-label="Created">
                            <a href="#">
                            <small className="text-gray-500" title="Programming">20/02/2020</small>
                            </a>
                            </td> 
                            <td className="actions-cell">
                            <div className="buttons right nowrap">
                                <button className="button small blue" type="button" onClick={() => this.toggleStatisticsModal("php")}>
                                    <span className="icon"><i className="mdi mdi-chart-arc"></i></span>
                                </button>

                                <button className="button small grey --jb-modal"  data-target="sample-modal-2" type="button">
                                    <span className="icon"><i className="mdi mdi-pencil"></i></span>
                                </button>
                                <button className="button small green --jb-modal"  data-target="sample-modal-2" type="button">
                                    <span className="icon"><i className="mdi mdi-eye"></i></span>
                                </button>
                                <button className="button small red --jb-modal" data-target="sample-modal" type="button">
                                <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                </button>
                            </div>
                            </td>
                        </tr> 

                         
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

                    <this.StatisticsModal />

            </div>            
        );
    }

}


export { Users };