import './assets/css/main-css.min.css';
import React, {Component} from 'react'
import ReCAPTCHA from "react-google-recaptcha";

import { Helper } from '../helper';

// import { NotificationContainer, NotificationManager } from 'react-notifications';
//import 'react-notifications/lib/notifications.css';
import { Settings } from '../settings';

class Login extends Component {

    constructor(props) {
        
        super(props);

        this.recaptchaRef = React.createRef();
        this.request_result_ref = React.createRef();

        this.state = {

            captcha: null, // dev mode

            user_name_or_email: "", 
            password: "", 
            is_pressed: false,

            show_message: "",
            request_status_class: "",
            request_message: ""
        }

    }
    
    async componentDidMount() {

    }

    changedCapcha = (value) => { 
        this.setState({
            captcha: value
        })
    }

    loginuser = async (e) => {
        
        e.preventDefault(); 

        this.setState({ 
            is_pressed: true, 
            show_message: "",
            request_status_class: "",
            request_message: ""
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
                is_pressed: false,
                show_message: "show_message",
                request_status_class: "error",
                request_message: "Please confirm that you are not a robot" 
            }); 
            // NotificationManager.error("Please confirm that you are not a robot.", "Error"); 
            return 

        }  

        var data_object = { 
            password: this.state.password, 
            email_username: this.state.user_name_or_email
        }

        var reqs = await Helper.sendRequest({
            api: "user/login",
            method: "post",
            data: data_object
        });
        
        if(reqs.is_error) {
            // NotificationManager.error(reqs.message, "Error"); 
            this.setState({
                show_message: "show_message",
                request_status_class: "error",
                is_pressed: false,
                request_message: reqs.message
            })
            return;
        }
         
        if( reqs.data.id ) {
             
            this.setState({ 
                is_pressed: false ,
                show_message: "show_message",
                request_status_class: "success",
                request_message: reqs.message
            });  
            
            // store  localstorage  
            localStorage.setItem("session", JSON.stringify(reqs.data) );

            // redirect after moments 
            setTimeout(() => { 
                window.location.href = "/dashboard"
            }, 1000);
        }


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
                        <b style={{marginBottom: "20px", display: "block"}}>Login</b>
                         

                        <div className="field spaced">
                            <label className="label">Username or Email</label>
                            <p className="control"> 
                                <input value={this.state.user_name_or_email} onChange={(x) => this.setState({user_name_or_email: x.target.value})} className="input" type="text" placeholder="Username or Email" />
                            </p> 
                        </div>

                        

                        <div className="field spaced">
                            <label className="label">Password</label>
                            <div className="control">
                            <input value={this.state.password} onChange={(x) => this.setState({password: x.target.value})} className="input" type="password" placeholder="Password" />
                            </div> 
                        </div>

                        

                        <ReCAPTCHA
                            ref={this.recaptchaRef}
                            sitekey={Settings.google.captcha.public}
                            onChange={this.changedCapcha} 
                            onReset={this.handleCaptchaReset}
                        />

                        <hr/>
 
                        
                        <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                            {this.state.request_message}
                        </div>

                        <div className="field grouped">
                            <div className="control">
                                <button type="submit" onClick={this.loginuser} className="button blue">
                                    {
                                        ( this.state.is_pressed ) ?
                                        <span className="loader"></span> : 
                                        "Login"
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

export { Login }
