import { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
 

class Posts extends Component { 

    render (){
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
                                                Total Posts
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
                                                Total Comments
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
                                            Total Reviews
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
                                            Bounce Rate
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
                                                Total Views
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
                                                Total Published Posts
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
                        All Posts
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
                        <tr>
                            <td className="image-cell">
                                <input type="checkbox" />
                            </td>
                            <td data-label="Name">PHP Data Types <small className="number-of-posts">111 Words</small></td>
                            <td data-label="Company"><small className="text-gray-500" title="Programming">PHP Tutorial</small></td>
                            <td data-label="City">4.2</td>
                            <td data-label="City"><small className="text-gray-500" title="Programming">Published</small></td>
                            <td data-label="Created">
                            <small className="text-gray-500" title="Programming">25%</small>
                            </td>
                            <td data-label="Created">
                            <a href="#">
                            <small className="text-gray-500" title="Programming">5K</small>
                            </a>
                            </td>
                            <td data-label="Created">
                            <small className="text-gray-500" title="Programming">11K</small>
                            </td>
                            <td className="actions-cell">
                            <div className="buttons right nowrap">
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
        )
    }

}


export { Posts } 