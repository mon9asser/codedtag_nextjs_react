import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";
import withNavigate from "./parts/with-navigate.js";

class Dashboard extends Component {
    render(){
        return (
            <div id="app">
                
                <NavbarContainer/>

                <SidebarContainer />

                   
                <section className="section main-section">
                <div className="grid gap-6 grid-cols-1 md-grid-5 mb-6">
                        
                        
                
                        <div className="card">
                            <div className="card-content bg2">
                            <div className="flex items-center justify-between">
                                <div className="widget-label">
                                <h3>
                                    Views
                                </h3>
                                <h1>
                                    7,770
                                </h1>
                                </div> 
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg7">
                            <div className="flex items-center justify-between">
                                <div className="widget-label">
                                <h3>
                                    Event Count
                                </h3>
                                <h1>
                                    500k
                                </h1>
                                </div> 
                            </div>
                            </div>
                        </div>

                         
                        <div className="card">
                            <div className="card-content bg8">
                            <div className="flex items-center justify-between">
                                <div className="widget-label">
                                <h3>
                                    Sessions
                                </h3>
                                <h1>
                                    500k
                                </h1>
                                </div> 
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content bg9">
                            <div className="flex items-center justify-between">
                                <div className="widget-label">
                                <h3>
                                    Active Users
                                </h3>
                                <h1>
                                    500k
                                </h1>
                                </div> 
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content bg10">
                            <div className="flex items-center justify-between">
                                <div className="widget-label">
                                <h3>
                                    New Users
                                </h3>
                                <h1>
                                    500k
                                </h1>
                                </div> 
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content bg5">
                            <div className="flex items-center justify-between">
                                <div className="widget-label">
                                <h3>
                                    Page Views Per Session
                                </h3>
                                <h1>
                                    7,770
                                </h1>
                                </div> 
                            </div>
                            </div>
                        </div>
                        
                        <div className="card">
                            <div className="card-content bg4">
                            <div className="flex items-center justify-between">
                                <div className="widget-label">
                                <h3>
                                    Average Bounce Rate
                                </h3>
                                <h1>
                                    512
                                </h1>
                                </div> 
                            </div>
                            </div>
                        </div>
                        

                        <div className="card">
                            <div className="card-content bg6">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>
                                            Session Duration
                                        </h3>
                                        <h1>
                                            500k
                                        </h1>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
 
                    <div className="card mb-6">
                        <header className="card-header">
                            <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-finance"></i></span>
                                Last 30 Days
                            </p>
                            <a href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                            </a>
                        </header>
                        <div className="card-content">
                            <div className="chart-area">
                                <div className="h-full row-container">
                                    <div className="md-6">
                                        <div className="chartjs-size-monitor">
                                            <div className="chartjs-size-monitor-expand">
                                                <div></div>
                                            </div>
                                            <div className="chartjs-size-monitor-shrink">
                                                <div></div>
                                            </div>
                                        </div>
                                        <canvas id="big-line-chart" width="100%" height="1000" className="chartjs-render-monitor block" style={{height: "250px", width: "1197px"}}></canvas>
                                    </div>
                                    <div className="md-6">

                                    <div className="h-full row-container static-cols" >
                                            
                                            <div style={{display:"flex", flexDirection: "row", width:"100%"}}>
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="flex items-center justify-between">
                                                            <div className="widget-label">
                                                                <h3 style={{color: "#6c726e", fontSize:"14px"}}>
                                                                Total Unique Visitors
                                                                </h3>
                                                                <h1 style={{fontSize: "32px", marginTop:"5px", color: "#161b18"}}>
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
                                                                <h3 style={{color: "#6c726e", fontSize:"14px"}}>
                                                                Avg. Time on Page
                                                                </h3>
                                                                <h1 style={{fontSize: "32px", marginTop:"5px", color: "#161b18"}}>
                                                                    6.2k
                                                                </h1>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div style={{display:"flex", flexDirection: "row", width:"100%"}}>
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="flex items-center justify-between">
                                                            <div className="widget-label">
                                                                <h3 style={{color: "#6c726e", fontSize:"14px"}}>
                                                                Total Unique Visitors
                                                                </h3>
                                                                <h1 style={{fontSize: "32px", marginTop:"5px", color: "#161b18"}}>
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
                                                                <h3 style={{color: "#6c726e", fontSize:"14px"}}>
                                                                Avg. Time on Page
                                                                </h3>
                                                                <h1 style={{fontSize: "32px", marginTop:"5px", color: "#161b18"}}>
                                                                    6.2k
                                                                </h1>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        

                                    </div>
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
        );
    }
}

export {
    Dashboard
}