import React, { Component } from "react";
import {NavbarContainer} from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Authentication } from "./helpers/context.js";
import { Helper } from "../helper.js";

class Settings extends Component {
    static contextType = Authentication;

    constructor(props) {
        super(props);
        this.request_result_ref = React.createRef();
        this.fileInputRef = React.createRef();

        this.state = {
            page_name: "settings",
            selectedFile: null,
            subscribe_title: "",
            contact_email: "",
            subscribe_description: "",
            basic_id: -1,
            banner_site_title: "",
            site_name: "",
            banner_site_description: "",
            site_address: "",
            beside_post_title: "",
            site_meta_title: "",
            site_meta_description: "",
            google_analytics: {
                enabled: false,
                field: "",
            },
            robots_file_contents: "",
            script_url_1: {
                enabled: false,
                url_field: ""
            },
            script_url_2: {
                enabled: false,
                url_field: ""
            },
            is_pressed: false,
            show_message: "",
            request_status_class: "",
            request_message: ""
        };
    }

    handleFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    resetFileInput = () => {
        this.fileInputRef.current.value = '';
        this.setState({ selectedFile: null });
    };

    async componentDidMount() {
        // load data 
        var getter = await Helper.sendRequest({
            api: "/settings/get",
            data: {},
            method: "get"
        });

        if (getter.is_error) {
            return;
        }

        // setup data 
        if (!getter.data.length) {
            return;
        }

        var settings = getter.data[0];

        this.setState({
            basic_id: settings.id,
            banner_site_title: settings.banner_site_title,
            site_name: settings.site_name,
            banner_site_description: settings.banner_site_description,
            site_address: settings.site_address,
            beside_post_title: settings.beside_post_title,
            site_meta_title: settings.site_meta_title,
            site_meta_description: settings.site_meta_description,
            robots_file_contents: settings.robots_file_contents,
            google_analytics: settings.google_analytics,
            script_url_1: settings.script_url_1,
            script_url_2: settings.script_url_2,
            subscribe_description: settings.subscribe_description,
            subscribe_title: settings.subscribe_title,
            contact_email: settings.contact_email
        })
    }

    uploadFile = async () => {
        if (!this.state.selectedFile) {
            return null;
        }

        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
         
        try { 

            var response = await Helper.sendRequest({
                api: "upload-logo",
                data: formData,
                method: "post",
                is_file: true
            }); 
            
            if (response.success) {
                this.resetFileInput();
                return response.filePath; // Assuming the server returns the file path
            } else {
                alert("File upload failed!");
                return null;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed!");
            return null;
        }
    }

    updateSiteSetting = async () => {
        this.setState({
            is_pressed: true,
            show_message: "",
            request_status_class: "",
            request_message: ""
        });

        let fileUrl = await this.uploadFile();

        var data_object = {
            basic_id: this.state.basic_id,
            banner_site_title: this.state.banner_site_title,
            site_name: this.state.site_name,
            banner_site_description: this.state.banner_site_description,
            site_address: this.state.site_address,
            beside_post_title: this.state.beside_post_title,
            site_meta_title: this.state.site_meta_title,
            site_meta_description: this.state.site_meta_description,
            robots_file_contents: this.state.robots_file_contents,
            google_analytics: this.state.google_analytics,
            script_url_1: this.state.script_url_1,
            script_url_2: this.state.script_url_2,
            subscribe_title: this.state.subscribe_title,
            contact_email: this.state.contact_email,
            subscribe_description: this.state.subscribe_description,
            site_logo: fileUrl // Add the file URL to the data object
        };

        var request = await Helper.sendRequest({
            api: "settings/update",
            data: data_object,
            method: "post"
        });

        if (request.is_error) {
            this.setState({
                is_pressed: false,
                show_message: "show_message",
                request_status_class: "error",
                request_message: request.message
            });
            return;
        }

        this.setState({
            is_pressed: false,
            show_message: "show_message",
            request_status_class: "success",
            request_message: request.message
        });
    }

    render() {
        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div>
                        <div className="container" style={{ textAlign: "left", paddingLeft: "15px" }}>
                            <h1 style={{ fontSize: "30px", marginBottom: "30px", fontWeight: "bold" }}>Settings</h1>
                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                            <div className="md-6" style={{ margin: "0 auto" }}>
                                <div className="block-container">
                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Site Name</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ site_name: e.target.value })} value={this.state.site_name} className="input" type="text" placeholder="Site Name" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Site Logo</label>
                                        <div className="control">
                                            <input
                                                ref={this.fileInputRef}
                                                onChange={this.handleFileChange}
                                                className="input" type="file" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Banner Site Title</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ banner_site_title: e.target.value })} value={this.state.banner_site_title} className="input" type="text" placeholder="Banner Site Title" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Banner Description</label>
                                        <div className="control">
                                            <textarea onChange={e => this.setState({ banner_site_description: e.target.value })} value={this.state.banner_site_description} placeholder="Banner Description" className="input" style={{ minHeight: "100px" }}></textarea>
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Site Address (URL)</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ site_address: e.target.value })} value={this.state.site_address} className="input" type="text" placeholder="Site Address (URL)" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Beside Post Title</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ beside_post_title: e.target.value })} value={this.state.beside_post_title} className="input" type="text" placeholder="- CodedTag" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Contact Email</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ contact_email: e.target.value })} value={this.state.contact_email} className="input" type="text" placeholder="Contact Email" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Subscribe Title</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ subscribe_title: e.target.value })} value={this.state.subscribe_title} className="input" type="text" placeholder="Subscribe Title" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Subscribe Description</label>
                                        <div className="control">
                                            <textarea onChange={e => this.setState({ subscribe_description: e.target.value })} value={this.state.subscribe_description} placeholder="Subscribe Description" className="input" style={{ minHeight: "100px" }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md-6" style={{ margin: "0 auto" }}>
                                <div className="block-container">
                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Meta Title</label>
                                        <div className="control">
                                            <input onChange={e => this.setState({ site_meta_title: e.target.value })} value={this.state.site_meta_title} className="input" type="text" placeholder="Meta Title" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Meta Description</label>
                                        <div className="control">
                                            <textarea onChange={e => this.setState({ site_meta_description: e.target.value })} value={this.state.site_meta_description} className="input" style={{ minHeight: "100px" }} placeholder="Meta Description"></textarea>
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Google Analytics</label>
                                        <div className="control">
                                            <label>
                                                <input checked={this.state.google_analytics.enabled} onChange={e => this.setState({ google_analytics: { ...this.state.google_analytics, enabled: e.target.checked } })} type="checkbox" />
                                                Enable
                                            </label>
                                            <input onChange={e => this.setState({ google_analytics: { ...this.state.google_analytics, field: e.target.value } })} value={this.state.google_analytics.field} className="input" type="text" placeholder="Google Analytics" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Script Url 1</label>
                                        <div className="control">
                                            <label>
                                                <input checked={this.state.script_url_1.enabled} onChange={e => this.setState({ script_url_1: { ...this.state.script_url_1, enabled: e.target.checked } })} type="checkbox" />
                                                Enable
                                            </label>
                                            <textarea onChange={e => this.setState({ script_url_1: { ...this.state.script_url_1, url_field: e.target.value } })} value={this.state.script_url_1.url_field} className="input" style={{ minHeight: "100px" }} placeholder="Example: Google AdSense"></textarea>
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Script Url 2</label>
                                        <div className="control">
                                            <label>
                                                <input checked={this.state.script_url_2.enabled} onChange={e => this.setState({ script_url_2: { ...this.state.script_url_2, enabled: e.target.checked } })} type="checkbox" />
                                                Enable
                                            </label>
                                            <textarea onChange={e => this.setState({ script_url_2: { ...this.state.script_url_2, url_field: e.target.value } })} value={this.state.script_url_2.url_field} className="input" style={{ minHeight: "100px" }} placeholder="Example: Google Adx"></textarea>
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Robots File</label>
                                        <div className="control">
                                            <textarea onChange={e => this.setState({ robots_file_contents: e.target.value })} value={this.state.robots_file_contents} className="input" style={{ minHeight: "100px" }} placeholder="Robots Content"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                        {this.state.request_message}
                    </div>

                    <div className="flex gap-5 sticky-btns space-between">
                        <div className="flex gap-5">
                            <button onClick={this.updateSiteSetting} className="button blue">
                                {
                                    (this.state.is_pressed) ?
                                        <span className="loader"></span> :
                                        "Save updates"
                                }
                            </button>
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
                                <p>Developed By: <a href="/test" target="_blank">Montasser Mossallem</a></p>
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

export { Settings };
