import { Component } from "react";

import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";

import withNavigate from "./parts/with-navigate.js";

class UsersWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            analytics: [], 
            posts: [],
            users: [],
            subscribers: [],
            admins: [],
            statisticsModal: {
                isOpen: false,
                data: null
            },
            currentPage: 1,
            recordsPerPage: 15,
            object_to_delete: null,
            delete_pressed: false, 
            deletion_confirm_modal_open: false,
        };
    }

    async componentDidMount() {
        var [analyticsResponse, usersResponse, postsResponse] = await Promise.all([
            Helper.sendRequest({ api: 'reports/by-pages', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'user/get', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'post/get?post_type=0', method: 'GET', data: {} }),
        ]); 

        if(usersResponse.is_error) {
            return; 
        }

        var subscribers = usersResponse.data.filter(x => x.rule == 0);
        var admins = usersResponse.data.filter(x => x.rule >= 1);

        this.setState({ 
            analytics: analyticsResponse.data, 
            posts: postsResponse.data, 
            users: usersResponse.data, 
            subscribers,
            admins
        });
    }

    changePage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    getPaginatedUsers = () => {
        const { currentPage, recordsPerPage, users } = this.state;
        const indexOfLastUser = currentPage * recordsPerPage;
        const indexOfFirstUser = indexOfLastUser - recordsPerPage;
        return users.slice(indexOfFirstUser, indexOfLastUser);
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

    confirmDeletion = (id, name) => {
         
        this.setState({
            object_to_delete: {
                id,
                name 
            },
            deletion_confirm_modal_open: true
        });
    }

    deleteUser = async () => {
        try {
            if (this.state.object_to_delete == null) {
                return;
            }

            this.setState({
                delete_pressed: true
            });

            var userId = this.state.object_to_delete.id;

            const response = await Helper.sendRequest({
                api: 'user/delete',
                method: 'POST',
                data: { user_id: userId }
            });

            if (!response.is_error) {
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user._id !== userId),
                    subscribers: prevState.subscribers.filter(user => user._id !== userId),
                    admins: prevState.admins.filter(user => user._id !== userId),
                    deletion_confirm_modal_open: false,
                    delete_pressed: false
                }));
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("An error occurred while deleting the user:", error);
        }
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
                        <p>Are you sure you want to delete <b>{this.state.object_to_delete?.name}</b>?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => this.setState({ deletion_confirm_modal_open: false })} className="button">Cancel</button>
                        <button onClick={this.deleteUser} className="button blue">
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
                <div className="modal-background --jb-modal-close" onClick={() => this.toggleStatisticsModal("")}></div>
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
                        <button onClick={() => this.toggleStatisticsModal("")} className="button --jb-modal-close">Close</button>
                    </footer>
                </div>
            </div>
        );
    }

    get_rule_type = (rule_number) => {
        if (rule_number == 4) {
            return "Author"; 
        } else if (rule_number == 3) {
            return "Administrator";
        } else if (rule_number == 2) {
            return "Contributor";
        } else if (rule_number == 1) {
            return "Editor";
        } else {
            return "Subscriber";
        }
    }

    calculate_post_counts = (user_id) => {
        var user_posts = this.state.posts?.filter(x => x.created_by.id == user_id);

        if (user_posts) return Helper.formatNumber(user_posts.length);
        return 0;
    }

    calculate_post_updates_counts = (user_id) => {
        var user_posts = this.state.posts?.filter(x => x.updated_by.id == user_id);

        if (user_posts) return Helper.formatNumber(user_posts.length);
        return 0;
    }

    edit_data = (obx) => { 
        this.props.navigate(`/dashboard/edit-user/${obx._id}`)
    }

    RenderUserRows = () => {
        var users = this.getPaginatedUsers();

        return (
            users.length ? users.map(x => (
                <tr key={x._id}>
                
                <td data-label="Name" style={{display:"flex", gap: 15, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
                    <img src={Helper.getGravatarUrl(x.email)} style={{borderRadius: "50%"}} width={60} height={60} />
                    <div style={{display:"flex", flexDirection: "column"}}>
                        <b>{x.firstname + ' ' + x.secondname}</b>
                        <small style={{display:"block", color: "#666", fontSize: "16px"}}>{x.username != ""? "@" + x.username: ""}</small>
                    </div>
                </td>
                <td data-label="Company">
                <small className="text-gray-500" title="Programming">{x.email}</small>
                </td>
                <td data-label="City">{this.get_rule_type(x.rule)}</td>
                <td data-label="City">
                <small className="text-gray-500" title="Programming">{this.calculate_post_counts(x._id)}</small>
                </td>
                <td data-label="Created">
                <small className="text-gray-500" title="Programming">{this.calculate_post_updates_counts(x._id)}</small>
                </td>  
                <td className="actions-cell">
                <div className="buttons right nowrap">
                    <button className="button small blue" type="button" onClick={() => this.toggleStatisticsModal(x.username)}>
                    <i className="mdi mdi-chart-arc"></i>
                    </button>
                    <button className="button small grey" type="button" onClick={() => this.edit_data(x)}>
                    <i className="mdi mdi-pencil"></i>
                    </button>
                    <button className="button small green" data-target="sample-modal-2" type="button">
                    <i className="mdi mdi-eye"></i>
                    </button>
                    <button className="button small red" data-target="sample-modal" type="button" onClick={() => this.confirmDeletion(x._id, x.firstname + ' ' + x.secondname)}>
                    <i className="mdi mdi-trash-can"></i>
                    </button>
                </div>
                </td>
                </tr>
            )) : <span>No Users Found!</span>
        );
    }

    renderPagination = () => {
        const { users, recordsPerPage, currentPage } = this.state;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / recordsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="table-pagination">
                <div className="flex items-center justify-between">
                    <div className="buttons">
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => this.changePage(number)} className={`button ${currentPage === number ? "active" : ""}`}>{number}</button>
                        ))}
                    </div>
                    <small>Page {currentPage} of {pageNumbers.length}</small>
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
                                                {Helper.formatNumber(this.state.users.length)}
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
                                                {Helper.formatNumber(this.state.subscribers.length)}
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
                                                {Helper.formatNumber(this.state.admins.length)}
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
                                         
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Rule</th>
                                        <th>Posts</th>
                                        <th>Updates</th> 
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.RenderUserRows()}   
                                </tbody>
                            </table>
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
                <this.DeletionModal />
                <this.StatisticsModal />
            </div>            
        );
    }
}

var Users = withNavigate(UsersWrapper)

export { Users } ;
