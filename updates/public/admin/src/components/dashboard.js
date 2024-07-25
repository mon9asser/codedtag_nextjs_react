import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
import withNavigate from "./parts/with-navigate.js";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportsByCountries: [],
            report: {},
            posts: [],
            currentPage: 1,
            recordsPerPage: 15,
            sortColumn: 'country',
            sortOrder: 'asc',
        };
    }

    async componentDidMount() {
        var [reportsByCountriesResponse, reportResponse, postsResponse, anlyticsResponse] = await Promise.all([
            Helper.sendRequest({ api: 'reports/by-countries', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'reports/total', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'post/get', method: 'GET', data: {} }),
            Helper.sendRequest({ api: 'reports', method: 'GET', data: {} }),
        ]);
 
        this.setState({
            reportsByCountries: reportsByCountriesResponse.data,
            report: reportResponse.data,
            posts: postsResponse.data,
            analytics: anlyticsResponse.data,

            count_users: anlyticsResponse.data.length ? anlyticsResponse.data.reduce((total, group) => total + group.activeUsers, 0): 0,
            count_engagedSessions: anlyticsResponse.data.length ? anlyticsResponse.data.reduce((total, group) => total + group.engagedSessions, 0): 0 ,
            count_sessions: anlyticsResponse.data.length ? anlyticsResponse.data.reduce((total, group) => total + group.sessions, 0): 0 ,
            count_engagementRate: anlyticsResponse.data.length ? anlyticsResponse.data.reduce((total, group) => total + group.engagementRate, 0) / (100 * anlyticsResponse.data.length ): 0 ,
            count_bounceRate: ( anlyticsResponse.data.length ? anlyticsResponse.data.reduce((total, group) => total + group.bounceRate, 0): 0 ) / (100 * anlyticsResponse.data.length ) ,
            count_activeUsers: anlyticsResponse.data.length ? anlyticsResponse.data.reduce((total, group) => total + group.activeUsers, 0): 0 ,
            count_totalUsers: anlyticsResponse.data.length ? anlyticsResponse.data.reduce((total, group) => total + group.totalUsers, 0): 0 ,
        });
    }

    handleSort = (column) => {
        const { sortColumn, sortOrder, reportsByCountries } = this.state;
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';

        const sortedData = [...reportsByCountries].sort((a, b) => {
            if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        this.setState({
            reportsByCountries: sortedData,
            sortColumn: column,
            sortOrder: newSortOrder,
        });
    }

    renderTableRows = () => {
        const { reportsByCountries, currentPage, recordsPerPage } = this.state;
        const indexOfLastUser = currentPage * recordsPerPage;
        const indexOfFirstUser = indexOfLastUser - recordsPerPage;
        const currentReports = reportsByCountries.slice(indexOfFirstUser, indexOfLastUser);

        return currentReports.map((report, index) => (
            <tr key={index}>
                <td style={{ display: "flex", gap: 15, alignItems: "center", justifyContent: "flex-start" }}>
                    <img src={report.flagUrl} width={25} height={"auto"} alt={`Flag of ${report.country}`} />
                    <small>{report.country}</small>
                </td>
                <td>{Helper.formatNumber(report.pageViews)}</td>
                <td>{Helper.formatNumber(report.activeUsers)}</td>
                <td>{Helper.formatNumber(report.sessions)}</td>
                <td>{report.averageBounceRate}</td>
                <td>{(report.averageSessionDuration / 60).toFixed(2)} mins</td>
                <td>{report.screenPageViewsPerSession.toFixed(2)}</td>
                <td>{Helper.formatNumber(report.eventCount)}</td>
                <td>{Helper.formatNumber(report.newUsers)}</td>
            </tr>
        ));
    }

    renderPagination = () => {
        const { reportsByCountries, recordsPerPage, currentPage } = this.state;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(reportsByCountries.length / recordsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="table-pagination">
                <div className="flex items-center justify-between">
                    <div className="buttons">
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => this.setState({ currentPage: number })} className={`button ${currentPage === number ? "active" : ""}`}>{number}</button>
                        ))}
                    </div>
                    <small>Page {currentPage} of {pageNumbers.length}</small>
                </div>
            </div>
        );
    }

    render() {
        const { sortColumn, sortOrder } = this.state;
        var total = this.state.report;

        const sortIcon = (column) => {
            if (sortColumn === column) {
                return sortOrder === 'asc' ? '' : '';
            }
            return '';
        };

        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />

                <section className="section main-section">
                    <div className="grid gap-6 grid-cols-1 md-grid-5 mb-6">
                        <div className="card">
                            <div className="card-content bg2">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>Views</h3>
                                        <h1>{Helper.formatNumber(parseInt(total.pageViews))}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg9">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>Total Users</h3>
                                        <h1>{parseInt(this.state.count_users).toLocaleString()}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg7">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>Event Count</h3>
                                        <h1>{Helper.formatNumber(parseInt(total.eventCount))}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg8">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>Sessions</h3>
                                        <h1>{Helper.formatNumber(parseInt(total.sessions))}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                        <div className="card">
                            <div className="card-content bg10">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>New Users</h3>
                                        <h1>{Helper.formatNumber(parseInt(total.newUsers))}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg5">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>Page Views Per Session</h3>
                                        <h1>{(total.screenPageViewsPerSession || 0).toFixed(2)}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg4">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>Average Bounce Rate</h3>
                                        <h1>{total.averageBounceRate}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg6">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>Session Duration</h3>
                                        <h1>{(total.averageSessionDuration / 60).toFixed(2)} mins</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card has-table mt-30">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                Total Users
                            </p>
                            <a href="#" className="card-header-icon">
                                <span className="icon"><i className="mdi mdi-filter-outline"></i></span>
                            </a>
                        </header>

                        <div className="card-content tble">
                            <table>
                                <thead>
                                    <tr style={{borderBottom: "2px solid #ddd"}}>
                                        <th></th>
                                        <th>
                                            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                                <span>Users</span>
                                                <span style={{fontWeight:"normal"}}>{parseFloat(this.state.count_users).toLocaleString()}</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                                <span>Bounce Rate</span>
                                                <span style={{fontWeight:"normal"}}>{parseFloat(this.state.count_bounceRate * 100).toFixed(2) + "%"}</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                                <span>Engagement Rate</span>
                                                <span style={{fontWeight:"normal"}}>{parseFloat(this.state.count_engagementRate * 100).toFixed(2) + "%"}</span>
                                            </div>
                                        </th> 
                                        <th>
                                            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                                <span>Sessions</span>
                                                <span style={{fontWeight:"normal"}}>{parseFloat(this.state.count_sessions).toLocaleString()}</span>
                                            </div>
                                        </th>  
                                        <th>
                                            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                                <span>Engaged Sessions</span>
                                                <span style={{fontWeight:"normal"}}>{parseFloat(this.state.count_engagedSessions).toLocaleString()}</span>
                                            </div>
                                        </th>   
                                        <th>
                                            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                                <span>Total Users</span>
                                                <span style={{fontWeight:"normal"}}>{parseFloat(this.state.count_totalUsers).toLocaleString()}</span>
                                            </div>
                                        </th>    
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                            this.state.analytics?.map((x, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{x.channelGroup}</td>
                                                        <td>{parseFloat(x.activeUsers).toLocaleString()}</td>
                                                        <td>{parseFloat(x.bounceRate).toFixed(2) + "%"}</td>
                                                        <td>{parseFloat(x.engagementRate).toFixed(2) + "%"}</td>
                                                        <td>{parseFloat(x.sessions).toLocaleString()}</td>
                                                        <td>{parseFloat(x.engagedSessions).toLocaleString()}</td>
                                                        <td>{parseFloat(x.totalUsers).toLocaleString()}</td>
                                                    </tr> 
                                                );
                                            })
                                        }                                         
                                </tbody>
                            </table> 
                        </div>
                    </div>
                    <div className="card has-table mt-30">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                Visitors by Countries
                            </p>
                            <a href="#" className="card-header-icon">
                                <span className="icon"><i className="mdi mdi-filter-outline"></i></span>
                            </a>
                        </header>

                        <div className="card-content tble">
                        <table>
                                <thead>
                                    <tr>
                                        <th onClick={() => this.handleSort('country')}>Country {sortIcon('country')}</th>
                                        <th onClick={() => this.handleSort('activeUsers')}>Users {sortIcon('activeUsers')}</th>
                                        <th onClick={() => this.handleSort('pageViews')}>Views {sortIcon('pageViews')}</th>
                                        <th onClick={() => this.handleSort('sessions')}>Sessions {sortIcon('sessions')}</th>
                                        <th onClick={() => this.handleSort('averageBounceRate')}>Bounce Rate {sortIcon('averageBounceRate')}</th>
                                        <th onClick={() => this.handleSort('averageSessionDuration')}>Session Duration {sortIcon('averageSessionDuration')}</th>
                                        <th onClick={() => this.handleSort('screenPageViewsPerSession')}>Page View Per Session {sortIcon('screenPageViewsPerSession')}</th>
                                        <th onClick={() => this.handleSort('eventCount')}>Event Counts {sortIcon('eventCount')}</th>
                                        <th onClick={() => this.handleSort('newUsers')}>New Users {sortIcon('newUsers')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableRows()}
                                </tbody>
                            </table>
                            {this.renderPagination()}
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

export {
    Dashboard
}
