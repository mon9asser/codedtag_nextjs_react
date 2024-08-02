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
                                <Link to="/dashboard/tutorials"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Tutorials</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/create-tutorial"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create Tutorial</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/chapters"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Chapters</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/posts"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Posts</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/create-post"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create Post</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/pages"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Pages</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/create-page"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create Page</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/users"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Users</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/create-user"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Create User</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/media"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Media</span>
                                </Link>
                            </li>
                        </ul>
                        
                        <p className="menu-label">Utils</p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/dashboard/menus"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Menus</span>
                                </Link>
                            </li>  
                            <li>
                                <Link to="/dashboard/campaigns"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Ad Campaigns</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to="/dashboard/redirects"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Manage Redirects</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to="/dashboard/messages"> 
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Messages</span>
                                </Link>
                            </li>  
                            <li className="--set-active-forms-html">
                                <Link to="/dashboard/comments">
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Comments</span>
                                </Link>
                            </li>
                            <li className="--set-active-profile-html">
                                <Link to="/dashboard/links">
                                    <span className="icon"><i className="mdi mdi-arrow-right"></i></span>
                                    <span className="menu-item-label">Manage Links</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to="/dashboard/settings"> 
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