import React, { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js"; // Import Helper from your helper file

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            currentPage: 1,
            totalPages: 1,
            selectedContact: null,
            showMessageModal: false,

            contact_email: "",
            contact_message: ""
        };
    }

    fetchSettings = () => {
        // settings
        Helper.sendRequest({
            api: "settings/get",
            method: "get",
            data: {} // Ensure pagination and sorting by date
        }).then(response => {
            if (!response.is_error && response.data.length ) {
                
                this.setState({ 
                    contact_email: response.data[0].contact_email
                });
            } else {
                console.error(response.message);
            }
        }).catch(error => console.error('Error fetching contacts:', error));
    }

    componentDidMount() {
        this.fetchContacts();

        this.fetchSettings();
    }

    fetchContacts = (page = 1) => {
        
        // Fetch contacts using Helper.sendRequest with pagination
        Helper.sendRequest({
            api: `contacts?page=${page}&limit=50`,
            method: "get",
            data: { page, limit: 10, sort: { date: -1 } } // Ensure pagination and sorting by date
        }).then(response => {
            
            if (!response.is_error) {
                this.setState({ 
                    contacts: response.data.contacts || [],
                    currentPage: response.data.currentPage || 1,
                    totalPages: response.data.totalPages || 1 
                });
            } else {
                console.error(response.message);
            }
        }).catch(error => console.error('Error fetching contacts:', error));
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page }, () => {
            this.fetchContacts(page);
        });
    }

    handleReply = (contactId) => {
        // Implement reply functionality
       // console.log('Reply to contact:', contactId);
    }

    handleDelete = (contactId) => {
         
        // Delete contact using Helper.sendRequest
        Helper.sendRequest({
            api: "contacts",
            method: "delete",
            data: { contact_id: contactId }
        }).then(response => {
            if (!response.is_error) {
                this.setState({
                    contacts: this.state.contacts.filter(contact => contact._id !== contactId)
                });
            } else {
                console.error(response.message);
            }
        }).catch(error => console.error('Error deleting contact:', error));
    }

    handleView = (contact) => { 
         
        // Show message modal
        this.setState({ selectedContact: contact, showMessageModal: true });
    }

    closeModal = () => {
        this.setState({ showMessageModal: false, selectedContact: null });
    }

    render() {
        const { contacts, currentPage, totalPages, selectedContact, showMessageModal } = this.state;

        return (
            <div id="app">
                <div id="contact-message-data" className="modal">
                    <div className="modal-background --jb-modal-close"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title"><b>{this.state.selectedContact == null? "":this.state.selectedContact.subject}</b> by {this.state.selectedContact == null?"":this.state.selectedContact.name}</p>
                        </header>
                        <section className="modal-card-body">
                            <p>Email: {this.state.selectedContact == null?"":this.state.selectedContact.email}</p>
                            {this.state.selectedContact == null ? "": <div className="html_msg" dangerouslySetInnerHTML={{ __html: this.state.selectedContact.message }}/>}
                            
                            
                            <textarea value={this.state.contact_message} onChange={e => this.setState({contact_message: e.target.value})} placeholder="Write your message here!" style={{width: "100%", border: "1px solid #ddd", padding: "10px"}}></textarea>
                            <div style={{fontSize: "14px"}}>
                            Send using this email : <input style={{padding: "5px"}} onChange={e => this.setState({contact_email: e.target.value})} value={this.state.contact_email} />
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button --jb-modal-close">Cancel</button>
                            <button className="button red --jb-modal-close">Reply</button>
                        </footer>
                    </div>
                </div>
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div className="card has-table mt-30">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                All Contacts
                            </p>
                            <a href="#" className="card-header-icon">
                                <span className="icon"><i className="mdi mdi-filter-outline"></i></span>
                            </a>
                        </header>
                        <div className="card-content tble">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>View</th> 
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(contact => (
                                        <tr key={contact._id}>
                                            <td data-label="Name">{contact.name}</td>
                                            <td data-label="Email">{contact.email}</td>
                                            <td data-label="Subject">{contact.subject}</td>
                                            <td className="actions-cell">
                                                <button
                                                    className="button small blue --jb-modal"
                                                    data-target="contact-message-data"
                                                    type="button"
                                                    onClick={() => this.handleView(contact)}
                                                >
                                                    <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                </button>
                                            </td> 
                                            <td className="actions-cell">
                                                <button
                                                    className="button small red"
                                                    type="button"
                                                    onClick={() => this.handleDelete(contact._id)}
                                                >
                                                    <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="table-pagination">
                                <div className="flex items-center justify-between">
                                    <div className="buttons">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                type="button"
                                                className={`button ${currentPage === i + 1 ? 'active' : ''}`}
                                                onClick={() => this.handlePageChange(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <small>Page {currentPage} of {totalPages}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal for viewing message */}
                    

                    {showMessageModal && selectedContact && (
                        <div className={`modal ${showMessageModal ? 'is-active' : ''}`}>
                            <div className="modal-background" onClick={this.closeModal}></div>
                            <div className="modal-content">
                                <div className="box">
                                    <h3 className="title is-4">Message from {selectedContact.name}</h3>
                                    <p>{selectedContact.message}</p>
                                    <button className="button is-primary mt-4" onClick={this.closeModal}>Close</button>
                                </div>
                            </div>
                            <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
                        </div>
                    )}
                </section>
            </div>
        );
    }
}

export { Contacts };