import { Component } from "react";
import { Link } from "react-router-dom";
import { Helper } from "../../helper";

class NavbarContainer extends Component { 
    
    constructor(props) {
        super(props);
        
        this.state = {
            domain: "",
            name: "", 
            index: -1,

            user: null
        };

    }

    async componentDidMount() {
 
 

        var request = await Helper.sendRequest({
            api: "current-site",
            method: "get",
            data: {}
        });

        if( request.is_error) {
            return; 
        }

        var {name, domain, index } = request.data;
  
        this.setState({
            domain: domain,
            name: name,
            index: index,
            user: JSON.parse(localStorage.getItem("session"))
        }); 
    }

    change_site_data = (e) => {
         
        this.setState({
            index: e.target.value
        });

    }

    apply_changes = async (e) => {

        // Close Modal
        e.currentTarget.closest('.modal').classList.remove('active');
        document.documentElement.classList.remove('is-clipped');

        var reqs = await Helper.sendRequest({
            api: "switcher",
            method: "post",
            data: {
                index: this.state.index
            }
        }); 

        if(reqs.is_error) {
            return console.log("something wrong in switcher"); 
        }

        this.setState({
            index: reqs.data.index, 
            domain: reqs.data.domain, 
            name: reqs.data.name
        });

        await this.logout();
    }

    logout = async () => {
        
        var resp = await Helper.logut();
        if( resp ) {
            window.location.href = "/login"
        }
    }

    render() {
        return (
            <>
                <nav id="navbar-main" className="navbar is-fixed-top">
                    
                    <div className="navbar-brand is-right">
                        <span className="navbar-item --jb-navbar-menu-toggle" data-target="navbar-menu">
                            <span className="icon"><i className="mdi mdi-dots-vertical mdi-24px"></i></span>
                        </span>
                    </div>
                    <div className="navbar-menu" id="navbar-menu">
                        <div className="navbar-start">
                            <div className="navbar-item">

                                <Link target="_blank" to={"https://" + this.state.domain.toLowerCase()} className="button light">
                                    <span>Visit Site</span>
                                </Link> 

                                <label style={{marginLeft: "50px"}}>
                                    Current Site is: <b id="current-site-name">{this.state.name}</b>
                                </label>
                                
                            </div>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item dropdown has-divider has-user-avatar">
                                <span className="navbar-link">
                                    <div className="user-avatar">
                                        <img src="https://cdn-icons-png.freepik.com/512/147/147142.png" alt="John Doe" className="rounded-full" />
                                    </div>
                                    <div className="is-user-name"><span>{this.state.user == null ? "" : this.state.user.name}</span></div>
                                    <span className="icon"><i className="mdi mdi-chevron-down"></i></span>
                                </span>
                                <div className="navbar-dropdown">
                                    <a href="/test" className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-account"></i></span>
                                        <span>My Profile</span>
                                    </a>
                                    <Link to={"/dashboard/settings"} className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-settings"></i></span>
                                        <span>Settings</span>
                                    </Link>
                                    <a href="/test" className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-email"></i></span>
                                        <span>Messages</span>
                                    </a>
                                    <hr className="navbar-divider" />
                                    <span onClick={this.logout} className="navbar-item">
                                        <span className="icon"><i className="mdi mdi-logout"></i></span>
                                        <span>Log Out</span>
                                    </span>
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
                            <select id="switcher-selector" value={this.state.index} onChange={(e) => this.change_site_data(e)}>
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