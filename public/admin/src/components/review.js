class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            currentPage: 1,
            totalPages: 1,
            showMessageModal: false,
            selectedReview: null
        };
    }

    componentDidMount() {
        this.fetchReviews();
    }

    fetchReviews = (page = 1) => {
        // Fetch reviews using Helper.sendRequest with pagination
        Helper.sendRequest({
            api: `reviews?page=${page}&limit=50`,
            method: "get",
            data: { page, limit: 10, sort: { date: -1 } } // Ensure pagination and sorting by date
        }).then(response => {
            if (!response.is_error) {
                this.setState({
                    reviews: response.data.reviews,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                });
            } else {
                console.error(response.message);
            }
        }).catch(error => console.error('Error fetching reviews:', error));
    }

    closeModal = () => {
        this.setState({ showMessageModal: false, selectedReview: null });
    }

    renderReviews = () => {
        return this.state.reviews.map(review => (
            <div key={review._id} className="review-item">
                <h3>Post ID: {review.post_id}</h3>
                <p>Likes: {review.like_counts}</p>
                <p>Dislikes: {review.dis_like_counts}</p>
            </div>
        ));
    }

    render() {
        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div className="container">
                        <h2>Reviews</h2>
                        {this.renderReviews()}
                        <div className="pagination">
                            {Array.from({ length: this.state.totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => this.fetchReviews(index + 1)}
                                    className={this.state.currentPage === index + 1 ? "active" : ""}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export { Reviews };