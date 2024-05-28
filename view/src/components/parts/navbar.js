import { Component } from "react";
import { Link } from "react-router-dom";

class NavbarContainer extends Component { 
     
    render() {
        return (
            <>
                <nav id="navbar-main" className="navbar is-fixed-top">
                    <div className="navbar-brand">
                        <a href="#" className="navbar-item mobile-aside-button">
                            <span className="icon"><i className="mdi mdi-forwardburger mdi-24px"></i></span>
                        </a>
                    </div>
                    <div className="navbar-brand is-right">
                        <a href="/test" className="navbar-item --jb-navbar-menu-toggle" data-target="navbar-menu">
                            <span className="icon"><i className="mdi mdi-dots-vertical mdi-24px"></i></span>
                        </a>
                    </div>
                    <div className="navbar-menu" id="navbar-menu">
                        <div className="navbar-start">
                            <div className="navbar-item">

                                <Link target="_blank" to={"#"} className="button light">
                                    <span>Visit Site</span>
                                </Link>

                                <Link target="_blank" to={"#"} data-target="manage-sites" style={{marginLeft: "10px"}} className="button tan --jb-modal">
                                    <span>Manage Sites</span>
                                </Link>  

                                <label style={{marginLeft: "50px"}}>
                                    Current Site is: <b>CodedTag</b>
                                </label>
                                
                            </div>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item dropdown has-divider has-user-avatar">
                                <a href="/test" className="navbar-link">
                                    <div className="user-avatar">
                                        <img src="https://avatars.dicebear.com/v2/initials/john-doe.svg" alt="John Doe" className="rounded-full" />
                                    </div>
                                    <div className="is-user-name"><span>John Doe</span></div>
                                    <span className="icon"><i className="mdi mdi-chevron-down"></i></span>
                                </a>
                                <div className="navbar-dropdown">
                                    <a href="/test" className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-account"></i></span>
                                        <span>My Profile</span>
                                    </a>
                                    <a href="/test" className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-settings"></i></span>
                                        <span>Settings</span>
                                    </a>
                                    <a href="/test" className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-email"></i></span>
                                        <span>Messages</span>
                                    </a>
                                    <hr className="navbar-divider" />
                                    <a href="/test" className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-logout"></i></span>
                                        <span>Log Out</span>
                                    </a>
                                </div>
                            </div>
                            <a href="/test" title="Log out" className="navbar-item desktop-icon-only">
                                <span className="icon"><i className="mdi mdi-logout"></i></span>
                                <span>Log out</span>
                            </a>
                        </div>
                    </div>
                </nav>


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
                                <button className="button red --jb-modal-close">Confirm</button>
                            </footer>
                        </div>
                    </div>

                    <div id="manage-sites" className="modal">
                    <div className="modal-background --jb-modal-close"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Manage Sites</p>
                        </header>
                        <section className="modal-card-body" style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                            <label>
                                <b>Site Name</b>
                            </label>
                            <select id="switcher-selector">
                                <option value="0">Coded Tag</option>
                                <option value="1">Free Acconting Tutorial</option>
                            </select>
                        </section>
                        <footer className="modal-card-foot">
                        <button className="button --jb-modal-close">Cancel</button>
                        <button className="button blue" onClick={this.apply_changes}>Apply Changes</button>
                        </footer>
                    </div>
                    </div>
            </>
        )
    }

}

export { NavbarContainer };