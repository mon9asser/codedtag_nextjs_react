import './assets/css/main-css.min.css';
import React, {Component} from 'react'
import ReCAPTCHA from "react-google-recaptcha";

import { Helper } from './../helper';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Settings } from '../settings';

class Register extends Component {

    constructor(props) {
        
        super(props);

        this.recaptchaRef = React.createRef();

        this.state = {

            captcha: null,

            username: "",
            firstname: "",
            secondname: "",
            password: "",
            confirm_password: "", 
            email: "",

            result_message: "",
            result_message_type: "error",
            result_message_appear: false,
            is_pressed: false 
        }

    }

    changedCapcha = (value) => { 
        this.setState({
            captcha: value
        })
    }

    registeruser = async (e) => {
        
        e.preventDefault();
         

        this.setState({
            result_message: "",
            result_message_type: "",
            result_message_appear: false,
            is_pressed: true 
        }); 


        if( this.state.is_pressed ) {
            return; 
        }

        // check for captch  
        if( this.state.captcha === null ) {

            /*
            this.setState({
                result_message: "Please confirm that you are not a robot.",
                result_message_type: "error-result",
                result_message_appear: true,
                is_pressed: false 
            }); 
            */ 
            this.setState({ 
                is_pressed: false 
            }); 
            NotificationManager.error("Please confirm that you are not a robot.", "Error"); 
            return 

        }

        // check for email 
        var email_validator = Helper.validateEmail(this.state.email);
        if( !email_validator ) {
 
            this.setState({ 
                is_pressed: false 
            }); 
            NotificationManager.error("Email is not valid.", "Error"); 
            return;
        }
        
        // check for password
        if(this.state.password !== this.state.confirm_password ) { 

            this.setState({ 
                is_pressed: false 
            }); 

            NotificationManager.error( "The password does not match the confirm password; please ensure both fields are identical.", "Error"); 
            
            return;
            
        }

        var data_object = {

            // capcha: this.state.captcha, 
            username: this.state.username,
            firstname: this.state.firstname,
            secondname: this.state.secondname,
            full_name: this.state.firstname + " " + this.state.secondname,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
            email: this.state.email,

        }

        var reqs = await Helper.sendRequest({
            api: "user/register",
            method: "post",
            data: data_object
        });
         
        if(reqs.is_error) {
            NotificationManager.error(reqs.message, "Error"); 
            return;
        }
        
        // success message
        NotificationManager.success(reqs.message, "Account Created !");  
        
        this.setState({ 
            is_pressed: false 
        }); 
        console.log(reqs.data);
        // store tokens in localstorage 
        // localStorage.setItem("session", )
        // redirect after moments 


    }
    
     

    handleCaptchaReset = () => {

        if (this.recaptchaRef.current) {
          this.recaptchaRef.current.reset();
        }

        this.setState({ capcha: null });
    };

    render(){
        return (
            <section className="section main-section">
                

                <div className="card" style={{maxWidth: "420px", background: "f9f9f9", border:"8px solid #eee", margin: "0 auto", padding: "20px"}}> 
                    <div className="card-content">
                        <form method="get">
                        <b style={{marginBottom: "20px", display: "block"}}>Sign Up</b>
                        
                        <div className="field spaced">
                            <label className="label">First Name</label>
                            <div className="control">
                                <input value={this.state.firstname} onChange={(x) => this.setState({firstname: x.target.value})} className="input" type="text" placeholder="First Name" />
                            </div> 
                        </div>

                        <div className="field spaced">
                            <label className="label">Second Name</label>
                            <div className="control"> 
                                <input value={this.state.secondname} onChange={(x) => this.setState({secondname: x.target.value})} className="input" type="text" placeholder="Second Name" />
                            </div> 
                        </div>

                        <div className="field spaced">
                            <label className="label">Username</label>
                            <p className="control"> 
                                <input value={this.state.username} onChange={(x) => this.setState({username: x.target.value})} className="input" type="text" placeholder="Username" />
                            </p> 
                        </div>

                        <div className="field spaced">
                            <label className="label">Email</label>
                            <p className="control">
                                <input value={this.state.email} onChange={(x) => this.setState({email: x.target.value})} className="input" type="email" placeholder="example@email.com" />
                            </p> 
                        </div>

                        <div className="field spaced">
                            <label className="label">Password</label>
                            <div className="control">
                            <input value={this.state.password} onChange={(x) => this.setState({password: x.target.value})} className="input" type="text" placeholder="Password" />
                            </div> 
                        </div>

                        <div className="field spaced">
                            <label className="label">Confirm Password</label>
                            <div className="control">
                            <input value={this.state.confirm_password} onChange={(x) => this.setState({confirm_password: x.target.value})} className="input" type="text" placeholder="Confirm Password" />
                            </div> 
                        </div>

                        <ReCAPTCHA
                            ref={this.recaptchaRef}
                            sitekey={Settings.google.captcha.public}
                            onChange={this.changedCapcha} 
                            onReset={this.handleCaptchaReset}
                        />

                        <hr/>
 
                            
                        <NotificationContainer /> 
                        <div className="field grouped">
                            <div className="control">
                                <button type="submit" onClick={this.registeruser} className="button blue">
                                    {
                                        ( this.state.is_pressed ) ?
                                        <span class="loader"></span> : 
                                        "Register"
                                    } 
                                    
                                </button>
                            </div> 
                        </div>

                        </form>
                    </div>
                </div>

            </section>
        )
    }
}

export { Register }
