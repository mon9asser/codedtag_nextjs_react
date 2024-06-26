import { Component } from "react";

class Footer extends Component {

    constructor( props ) {
        super(props);
    }
    
    render() {
        
        return (
            <footer className="wrapper white-bg plr-0 footer">
                <div className="wrapper offset-left offset-right plr-15 max-1170 ptb-25">
                    <div className="row mlr--15">
                    <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                        <h2 className="title">Company</h2>
                        <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Subscribe</a></li>
                        <li><a href="#">Become an editor</a></li>
                        </ul>
                    </div>
                    <div className="lg-2 md-3 sm-6 plr-15 ptb-15"> 
                        <h2 className="title">Follow Us</h2>
                        <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Subscribe</a></li>
                        </ul>
                    </div>
                    <div className="lg-4 md-6 plr-15 ptb-15"> 
                        <h2 className="title">Tags</h2>
                        <ul className="inline-list tag-list custom-widget-links font-14 no-borders-list no-effect flex-wrap">
                        <li><a href="#">JavaScript</a></li>
                        <li><a href="#">Git</a></li>
                        <li><a href="#">C++ Language</a></li>
                        <li><a href="#">Java</a></li>
                        <li><a href="#">PHP</a></li>
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                        </ul>
                    </div>
                    <div className="lg-4 md-6 plr-15 ptb-15"> 
                        <h2 className="title">Subscribe Us</h2>
                        <p className="font-16 pb-15">Don't miss out! Stay informed with our newsletter for the latest tutorials and insights. Subscribe today!</p>
                        <form className="form-group set-focus" action="/" method="get"> 
                        <input type="text" placeholder="example@email.comx" />
                        <button className="btn primary-btn" type="submit">Subscribe </button>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="flexbox items-center offset-left offset-right plr-15 border-top grey-border-1 content-center font-12 ptb-25">© 2022 CodedTag Inc - All right Reserved. Published with CodedTag Team</div>
                </footer> 
        );

    }

}


export { Footer };