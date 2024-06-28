import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings";
import ReCAPTCHA from "react-google-recaptcha";
// disable_ads - page_template


class ContactPageComponents extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            content: null,

            full_name: '',
            email: '',
            subject: '',
            message: '',
            captcha: null,

            result_class: '',
            result_text: '',
            is_pressed: false
        };

        this.recaptchaRef = React.createRef();
    }

    handleCaptchaReset = () => {

        if (this.recaptchaRef.current) {
          this.recaptchaRef.current.reset();
        }

        this.setState({ capcha: null });
    };
    
    goBack = () => {
        this.props.navigate(-1); // Go back in the history stack
    };
 
    componentDidMount = async () => {
        
        // get content of not found page 
        var reqs = await Helper.sendRequest({
            api: "post/get?post_type=1",
            method: "get",
            data: {}
        })
        
        if(reqs.is_error ) { return ; }
        
        var pages = reqs.data.filter( x => x.page_template == "contact_page");
        if( pages.length ) {
            
            var contact_page = pages[pages.length - 1]; 
            console.log(contact_page);
            this.setState({ content: contact_page })
            
        }


    }
     
    changedCapcha = (value) => { 
        this.setState({
            captcha: value
        })
    }

    submitContactMessage = async (e) => {
        
        e.preventDefault();

        this.setState({
            is_pressed: true, 
            result_class: '',
            result_text: '', 
        });


        if( this.state.is_pressed ) {
            return;
        }

        if( this.state.captcha == null ) {

            this.setState({
                is_pressed: false, 
                result_class: 'show-msg error',
                result_text: 'Confirm that you are not robot!', 
            });

            return;
        }

        var email_validator = Helper.validateEmail(this.state.email);
        if( !email_validator ) {
  
            this.setState({
                is_pressed: false, 
                result_class: 'show-msg error',
                result_text: 'Email is not valid!', 
            });

            return; 

        }
        
        if( this.state.email == '' || this.state.full_name == "" || this.state.subject == '' || this.state.message == '' ) {
  
            this.setState({
                is_pressed: false, 
                result_class: 'show-msg error',
                result_text: 'All fileds are required !', 
            });

            return; 

        }

        var object_to_send = {
            name: this.state.full_name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
        };

        var res = await Helper.sendRequest({ api: "contact-message", method: "post", data: object_to_send })
        
        if( res.is_error) {
            
            this.setState({
                is_pressed: false, 
                result_class: 'show-msg error',
                result_text: res.message, 
            });

            return;
        } 

        // success 
        this.setState({
            is_pressed: false, 
            result_class: 'show-msg success',
            result_text: "Thank you for reaching out to us. We will get back to you within a few days.", 
        });

    }

    render() {
        
        return (
            <>

                <Helmet>
                    <title>{this.state.content?.meta_title || "Contact Us"}</title>
                    <meta name="description" content={this.state.content?.meta_description || "Discover top-notch programming tutorials and web development resources at CodedTag. Enhance your coding skills with our comprehensive guides. Contact us today!"} />
                </Helmet>

                <Header/>

                <div className="container ptb-50">

                    <div className="wrapper max-960 offset-left offset-right mt-20 mb-10">
                        <header className="container-col-75">
                            <h1 className="headline">Contact Us</h1>
                        </header>
                    </div>

                    <div className="wrapper max-960 offset-left offset-right">

                        <form className="container-col-75 content content-section" action="">
                            

                            <p>Greetings! If you have any questions or suggestions regarding our tutorials or products, please use the form below to send us a message. We will respond as soon as we can. Have a great day! 🙂</p>
                            
                            <input onChange={e => this.setState({full_name: e.target.value})} value={this.state.full_name} className="full-border grey-border mb-20" type="text" placeholder="Full Name"/>
                            <input onChange={e => this.setState({email: e.target.value})} value={this.state.email} className="full-border grey-border mb-20" type="text" placeholder="Email"/>
                            <input onChange={e => this.setState({subject: e.target.value})} value={this.state.subject} className="full-border grey-border mb-20" type="text" placeholder="Subject"/>
                            <textarea onChange={e => this.setState({message: e.target.value})} value={this.state.message}  className="full-border grey-border mb-20" name="" cols="15" rows="5" aria-invalid="false" placeholder="Message"></textarea>
                             
                            <ReCAPTCHA
                                ref={this.recaptchaRef}
                                sitekey={Settings.google.captcha.public}
                                onChange={this.changedCapcha} 
                                onReset={this.handleCaptchaReset}
                            />

                            <div className={`response-msg ${this.state.result_class}`}>{this.state.result_text}</div>

                            <div className="flexbox items-center">
                                <button onClick={this.submitContactMessage} className="btn primary-btn third-btn btn-fit" type="submit" id="submit-contact-form">
                                    {
                                        this.state.is_pressed ?
                                        <span className="loader"></span>: 
                                        "Send Message"
                                    }
                                </button>
                            </div>
                        </form>
                        
                    </div>

                </div> 

                <Footer/>
            </>
        );
    }
}

var ContactPage = withNavigation(ContactPageComponents); 
export { ContactPage };
