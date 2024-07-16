
import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { useParams, useNavigate  } from 'react-router-dom';
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings"; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
 
 
import {PageNotFound} from './404'

import bannerImage from './../assets/img/banner.png';
import underlineBg from './../assets/img/underline.png';

var HomepageComponents = () => {

    var [ upcoming, upcoming_change ] = React.useState({
        posts: null,
        is_redirect: null
    });

    var SubscriptSection = () => {
        return (
            <>
                
                <div className="lg-7 md-7 sm-12 flexbox content-center items-start column-direction p-all-30"> 
                    {/*offset-left offset-right*/}
                    <h1 className="custom-headline section-head">Learn to <span>code</span> for free</h1>
                    
                    <div>
                        <p>Open the door to coding without any cost. Grab the opportunity to learn through free coding lessons. Begin your journey today! </p>
                    </div>

                    <form className="set-center form-group set-focus" action="/" method="get">
                        <input type="text" placeholder="example@email.com" />
                        <button className="btn third-btn" type="submit">Subscribe </button>
                    </form>
                    
                </div>
                
                <div className="lg-5 md-5 sm-12 flexbox content-center items-center column-direction p-all-15">
                    <figure> 
                        <LazyLoadImage
                            className={'half'}
                            alt={"Learn Programming"}
                            height={'auto'} 
                            width={'320px'}
                            src={bannerImage}  
                        /> 
                  </figure>
                </div>
            </>
        )
    }

    var TutorialsSection = () => {
        return (
            <>
                <div className="header-section text-center">
                    <h2 className="custom-headline section-head text-center mb-25 mt-25">Check our latest tutorials</h2>
                    <p>
                        Open the door to coding without any cost. Grab the opportunity to learn through free coding lessons. Begin your journey today!
                    </p>
                </div>

                <div className="row content-center">
                    
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                    <div className="sm-6 md-4 lg-4 text-center p-all-15">
                        <div className="tutorial-box">
                            <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                    <path
                                        d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                            <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                            <a className="floating-all" href="tutorial.html"></a>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    var SiteFeaturesSection = () => {
        return (
            <div className="row content-center">
                <h2 className="custom-headline section-head text-center mb-25 mt-25">Why CodedTag ?</h2>
                <div className='row'>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="codedtag-icon">
                            <span className='flexbox items-center content-center'>
                                <svg className='flexbox' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 8C5 5.17157 5 3.75736 5.87868 2.87868C6.75736 2 8.17157 2 11 2H13C15.8284 2 17.2426 2 18.1213 2.87868C19 3.75736 19 5.17157 19 8V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V8Z" stroke="#ffff" strokeWidth="1.5"></path> <path opacity="0.5" d="M5 4.07617C4.02491 4.17208 3.36857 4.38885 2.87868 4.87873C2 5.75741 2 7.17163 2 10.0001V14.0001C2 16.8285 2 18.2427 2.87868 19.1214C3.36857 19.6113 4.02491 19.828 5 19.9239" stroke="#ffff" strokeWidth="1.5"></path> <path opacity="0.5" d="M19 4.07617C19.9751 4.17208 20.6314 4.38885 21.1213 4.87873C22 5.75741 22 7.17163 22 10.0001V14.0001C22 16.8285 22 18.2427 21.1213 19.1214C20.6314 19.6113 19.9751 19.828 19 19.9239" stroke="#ffff" strokeWidth="1.5"></path> <path opacity="0.7" d="M9 13H15" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M9 9H15" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.4" d="M9 17H12" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                            </span>
                            
                        </div>
                        <h5>Free Tutorials</h5>
                    </div>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="codedtag-icon">
                            <span className='flexbox bg2 items-center content-center'>
                                <svg className='flexbox' width="40px" height="40px" fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 1.6437 32.5493 L 8.3327 32.5493 C 8.9491 32.5493 9.5198 32.1840 9.6796 31.5220 L 10.3417 28.5770 L 13.5606 43.4845 C 13.8574 44.8543 16.0946 44.8543 16.3001 43.4617 L 19.0852 25.1526 L 22.3498 53.3924 C 22.5553 55.0818 24.9752 55.0589 25.1122 53.3924 L 28.1256 19.7192 L 31.1163 53.3696 C 31.2761 55.0818 33.6731 55.0818 33.8786 53.3696 L 37.1432 25.1526 L 39.9512 43.4845 C 40.1566 44.8771 42.3711 44.8771 42.6909 43.4845 L 45.8641 28.7596 L 46.5486 31.5220 C 46.7543 32.2753 47.2794 32.5493 47.8956 32.5493 L 54.3795 32.5493 C 55.2926 32.5493 56.0000 31.8416 56.0000 30.9512 C 56.0000 30.0609 55.2926 29.3304 54.3795 29.3304 L 48.9004 29.3304 L 47.0741 22.2533 C 46.6632 20.7237 44.6770 20.7237 44.3572 22.2533 L 41.5264 35.5856 L 38.3075 14.5598 C 38.0564 12.8933 35.7506 12.9390 35.5451 14.5827 L 32.6687 39.5351 L 29.5182 3.9214 C 29.3812 2.2092 26.8700 2.2092 26.7102 3.9214 L 23.5598 39.5351 L 20.6833 14.5827 C 20.5007 12.8933 18.1949 12.8933 17.9210 14.5598 L 14.7020 35.5856 L 11.8940 22.2533 C 11.5744 20.8379 9.5426 20.8379 9.1545 22.2533 L 7.3282 29.3304 L 1.6437 29.3304 C .7305 29.3304 0 30.0609 0 30.9512 C 0 31.8416 .7305 32.5493 1.6437 32.5493 Z"></path></g></svg>
                            </span>
                            
                        </div>
                        <h5>Free Online Compilers</h5>
                    </div>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="codedtag-icon">
                            <span width='30px' className='bg3 flexbox items-center content-center'>
                                <svg className='flexbox' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.26022 2H16.7302C17.3802 2 17.9602 2.02003 18.4802 2.09003C21.2502 2.40003 22.0002 3.70001 22.0002 7.26001V13.58C22.0002 17.14 21.2502 18.44 18.4802 18.75C17.9602 18.82 17.3902 18.84 16.7302 18.84H7.26022C6.61022 18.84 6.03022 18.82 5.51022 18.75C2.74022 18.44 1.99023 17.14 1.99023 13.58V7.26001C1.99023 3.70001 2.74022 2.40003 5.51022 2.09003C6.03022 2.02003 6.61022 2 7.26022 2Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M13.5801 8.31982H17.2601" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M6.74023 14.1099H6.76022H17.2702" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M7 22H17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M7.1947 8.2998H7.20368" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M10.4945 8.2998H10.5035" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </span>
                            
                        </div>
                        <h5>Solving Problems</h5>
                    </div>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="codedtag-icon">
                            <span className='flexbox bg4 items-center content-center'>
                                <svg className='flexbox' width="40px" height="40px" fill="#f5f5f5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002" xmlSpace="preserve" stroke="#f5f5f5"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <rect x="406.324" y="145.007" transform="matrix(0.9808 -0.1951 0.1951 0.9808 -50.3631 87.2844)" width="23.173" height="308.599"></rect> </g> </g> <g> <g> <rect x="458.948" y="134.53" transform="matrix(0.9808 -0.1951 0.1951 0.9808 -47.3079 97.3498)" width="23.173" height="308.599"></rect> </g> </g> <g> <g> <path d="M0,99.049V457.58h77.646V99.049H0z M54.065,422.886H23.582V133.744h30.482V422.886z"></path> </g> </g> <g> <g> <rect x="108.132" y="219.882" width="98.347" height="237.692"></rect> </g> </g> <g> <g> <path d="M108.128,54.422v14.145v120.837h98.343V60.972v-6.55H108.128z M182.275,160.792h-49.949v-30.482h49.949V160.792z M182.275,113.516h-49.949V83.034h49.949V113.516z"></path> </g> </g> <g> <g> <path d="M236.955,457.58h108.191V91.454H236.955V457.58z M255.335,351.716h71.43v30.482h-71.43V351.716z M255.335,398.99h71.43 v30.482h-71.43V398.99z"></path> </g> </g> </g></svg>
                            </span>
                            
                        </div>
                        <h5>Books and Resources</h5>
                    </div>
                </div>
            </div>
        );
    }

    var HomepageComponentsParts = () => {
        return (
            <>
                <section className="hero white-bg hero">
                    <div className="wrapper-no-padding offset-left offset-right">
                        <div className="banner-gray">
                            <div className="row offset-left offset-right max-1172 mlr--30 ptb-50 section-subscribe">
                                <SubscriptSection/>
                            </div>
                        </div>
                        <div className="feature-block">
                            <div className="max-1172 offset-left offset-right row plr-15 mlr--30 ptb-50 section-tutorials">
                                <SiteFeaturesSection/>
                            </div>
                        </div>
                        <div className="row offset-left offset-right plr-15 mlr--30 ptb-50 max-1172">
                            <TutorialsSection/>
                        </div>
                        
                    </div>
                </section>


            </>
        );
    }

    return (
        <>
            <Header/>
                <HomepageComponentsParts />
                {/*<Helper.PreLoader type={'article'} />*/}
            <Footer/>
        </>       
    );
}

export { HomepageComponents }