import { Component } from "react";
import { Link } from "react-router-dom";

class SidebarContainer extends Component {
     

    render() {
        return (
            <aside className="aside is-placed-left is-expanded">
                    <div className="aside-tools">
                        <div>
                            Coded <b className="font-black">Tag</b>
                        </div>
                    </div>
                    <div className="menu is-menu-main">
                        <p className="menu-label">General</p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/dashboard"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/tutorials"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Tutorials</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/create-tutorial"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create Tutorial</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/chapters"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Chapters</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/posts"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Posts</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/create-post"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create Post</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/pages"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Pages</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/create-page"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create Page</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/users"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Users</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/create-user"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create User</span>
                                </Link>
                            </li>
                        </ul>
                        
                        <p className="menu-label">Utils</p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/menus"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Menus</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to="/widgets"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Widgets</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to="/advertisements"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Advertisement</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to="/messages"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Messages</span>
                                </Link>
                            </li> 
                            
                            <li className="--set-active-forms-html">
                                <a href="forms.html">
                                <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                <span className="menu-item-label">Article Reviews</span>
                                </a>
                            </li>
                            <li className="--set-active-profile-html">
                                <a href="profile.html">
                                <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                <span className="menu-item-label">Manage Links</span>
                                </a>
                            </li> 
                            <li>
                                <Link to="/settings"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Settings</span>
                                </Link>
                            </li> 
                        </ul> 
                    </div>
                </aside>
        );
    }
}

export { SidebarContainer };