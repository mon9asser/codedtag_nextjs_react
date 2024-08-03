import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";


import withNavigate from "./parts/with-navigate.js";

class postsWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filteredPosts: [],
      analytics: [],
      bounceRates: {},
      pageViews: {},
      commentsData: {},
      averageSessionDurations: {},
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
      totalAverageSessionDuration: 0,
      posts_filter_modal_open: false,
      filterTutorial: '',
      filterStatus: '',
      sortColumn: '',
      sortDirection: 'asc',
      commentsModal: {
        isOpen: false,
        postTitle: '',
        comments: []
      },
      delete_post: {
        post_id: null,
        post_title: "",
        is_deleting: false
      },
      statisticsModal: {
          isOpen: false,
          data: null
      },
      post_confirmation_deletion: false
    };
  }

  navigateToEdit = (post_id) => { 
    this.props.navigate(`/dashboard/edit-post/${post_id}`);
  }

  toggleCommentsModal = (postTitle, comments) => {
    this.setState(prevState => ({
      commentsModal: {
        isOpen: !prevState.commentsModal.isOpen,
        postTitle: postTitle || '',
        comments: comments || []
      }
    }));
  }

  StatisticsModal = () => {
      const { statisticsModal } = this.state;
      return (
          <div className={`modal ${statisticsModal.isOpen ? "open_this_modal" : ""}`}>
              <div className="modal-background" onClick={() => this.toggleStatisticsModal(statisticsModal.data.slug)}></div>
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
                      <button onClick={() => this.toggleStatisticsModal()} className="button">Close</button>
                  </footer>
              </div>
          </div>
      );
  }
  CommentsModal = () => {
    const { commentsModal } = this.state;
    return (
      <div className={`modal ${commentsModal.isOpen ? "open_this_modal" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Comments for {commentsModal.postTitle}</p>
          </header>
          <section className="modal-card-body">
            {commentsModal.comments.length ? (
              commentsModal.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment.text}</p>
                  <p>Counts: <strong>{comment.counts}</strong></p>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </section>
          <footer className="modal-card-foot">
            <button onClick={() => this.toggleCommentsModal()} className="button">Close</button>
          </footer>
        </div>
      </div>
    );
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
        const { bounceRates, pageViews, averageSessionDurations } = this.parseReports(reportsResponse.data);
        const { commentsData, totalComments, totalReviews } = this.parseComments(commentsResponse.data);
        const tutorials = tutorialsResponse.data;
         
        this.setState({
          posts,
          filteredPosts: posts,
          bounceRates,
          pageViews,
          averageSessionDurations,
          commentsData,
          totalComments,
          totalReviews,
          totalPosts: posts.length,
          tutorials,
          analytics: reportsResponse.data
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
    const averageSessionDurations = {};
    data.forEach(item => {
      const parts = item.landingPage.split('/').filter(part => part !== '');
      const normalizedLandingPage = parts.pop();
      bounceRates[normalizedLandingPage] = parseFloat(item.averageBounceRate);
      pageViews[normalizedLandingPage] = item.pageViews;
      averageSessionDurations[normalizedLandingPage] = parseFloat(item.averageSessionDuration);
    });
    return { bounceRates, pageViews, averageSessionDurations };
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
      const comments = item.comments.map(comment => ({
        text: comment.text,
        counts: comment.counts
      }));

      commentsData[postId] = {
        commentsCount,
        review,
        comments
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
    const { filteredPosts, bounceRates, pageViews, commentsData, averageSessionDurations } = this.state;

    this.calculateTotalAverageBounceRate(filteredPosts, bounceRates);
    this.calculateTotalViews(filteredPosts, pageViews);
    this.calculateTotalPublishedPosts(filteredPosts);
    this.calculateTotalCommentsAndReviews(filteredPosts, commentsData);
    this.calculateTotalAverageSessionDuration(filteredPosts, averageSessionDurations);
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

  calculateTotalAverageSessionDuration(posts, averageSessionDurations) {
    let totalSessionDuration = 0;
    let count = 0;

    posts.forEach(post => {
      const sessionDuration = averageSessionDurations[post.slug];
      if (sessionDuration !== undefined) {
        totalSessionDuration += sessionDuration;
        count++;
      }
    });

    const totalAverageSessionDuration = count > 0 ? (totalSessionDuration / count).toFixed(2) : 'N/A';
    this.setState({ totalAverageSessionDuration });
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
    const { filteredPosts, sortColumn, sortDirection, bounceRates, commentsData, pageViews, averageSessionDurations } = this.state;
    let newSortDirection = 'asc';
  
    if (sortColumn === column && sortDirection === 'asc') {
      newSortDirection = 'desc';
    }
  
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      let aValue, bValue;
  
      if (column === 'title') {
        aValue = a.totalWords;
        bValue = b.totalWords;
      } else if (column === 'review') {
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
      } else if (column === 'totalWords') {
        aValue = a.totalWords;
        bValue = b.totalWords;
      } else if (column === 'averageSessionDuration') {
        aValue = averageSessionDurations[a.slug] !== undefined ? parseFloat(averageSessionDurations[a.slug]) : 0;
        bValue = averageSessionDurations[b.slug] !== undefined ? parseFloat(averageSessionDurations[b.slug]) : 0;
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

  renderPostsTable() {
    const { filteredPosts, bounceRates, pageViews, commentsData, averageSessionDurations, currentPage, postsPerPage } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => this.sortPosts('title')}>Posts Name</th>
            <th>Tutorial</th>
            <th onClick={() => this.sortPosts('review')}>Review</th>
            <th onClick={() => this.sortPosts('status')}>Status</th>
            <th onClick={() => this.sortPosts('bounceRate')}>Bounce Rate</th>
            <th onClick={() => this.sortPosts('averageSessionDuration')}>Session Duration</th>
            <th onClick={() => this.sortPosts('comments')}>Comments</th>
            <th onClick={() => this.sortPosts('views')}>Views</th>
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
              <td data-label="Avg. Session Duration"><small className="text-gray-500" title="Programming">{averageSessionDurations[post.slug] !== undefined ? averageSessionDurations[post.slug].toFixed(2) + ' min' : 'N/A'}</small></td>
              <td data-label="Comments">
                <a onClick={() => this.toggleCommentsModal(post.title, commentsData[post.id]?.comments || [])}>
                  <small className="text-gray-500" title="Programming">{commentsData[post.id] ? commentsData[post.id].commentsCount : 'N/A'}</small>
                </a>
              </td>
              <td data-label="Views"><small className="text-gray-500" title="Programming">{pageViews[post.slug] !== undefined ? Helper.formatNumber(pageViews[post.slug]) : 'N/A'}</small></td>
              <td className="actions-cell">
                <div className="buttons right nowrap">
                  <button className="button small blue" type="button" onClick={() => this.toggleStatisticsModal(post.slug)}>
                      <span className="icon"><i className="mdi mdi-chart-arc"></i></span>
                  </button>
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
        // Remove the deleted post from the state
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
            <p>Are you sure to delete post of <b>{this.state.delete_post.post_title}</b></p>
          </section>
          <footer className="modal-card-foot">
            <button onClick={() => this.setState({ post_confirmation_deletion: false })} className="button">Cancel</button>
            <button onClick={this.delete_this_post} className="button red">
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
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Filter Articles by:</p>
          </header>
          <section className="modal-card-body">
            <div className="flexform">
              <span>Tutorial</span>
              <select name="filterTutorial" value={filterTutorial} onChange={this.handleFilterChange}>
                <option value="">All</option>
                {tutorials.map(tutorial => (
                  <option key={tutorial._id} value={tutorial.tutorial_title}>{tutorial.tutorial_title}</option>
                ))}
              </select>
            </div>
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
            <button onClick={this.filterModalToggler} className="button">Cancel</button>
            <button onClick={this.apply_filters} className="button red">Apply</button>
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
    const { isError, message, totalAverageBounceRate, totalViews, totalPublishedPosts, totalPosts, totalComments, totalReviews, totalAverageSessionDuration } = this.state;

    return (
      <div id="app">
        <NavbarContainer />
        <SidebarContainer />
        <section className="section main-section">
          <div className="h-full row-container static-cols">
            <div className="container-tribble" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <div className="card" style={{flexBasis: "23%"}}>
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

              <div className="card" style={{flexBasis: "23%"}}>
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

              <div className="card" style={{flexBasis: "23%"}}>
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

              <div className="card" style={{flexBasis: "23%"}}>
                <div className="card-content">
                  <div className="flex items-center justify-between">
                    <div className="widget-label">
                      <h3 style={{ color: "#6c726e", fontSize: "14px" }}>
                        Session Duration
                      </h3>
                      <h1 style={{ fontSize: "32px", marginTop: "5px", color: "#161b18" }}>
                        {totalAverageSessionDuration} min
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
                      <h1 style={{ fontSize:"32px", marginTop: "5px", color: "#161b18" }}>
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
        <this.CommentsModal />
        <this.StatisticsModal />

      </div>
    );
  }
}

var Posts = withNavigate(postsWrap)

export { Posts };
