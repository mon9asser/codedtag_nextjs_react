import React, { Component, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helper } from '../../helper';

const withNavigation = (Component) => {
    return (props) => {
        const navigate = useNavigate(); 
        const location = useLocation();

        return <Component {...props} navigate={navigate} location={location} />;
    };
};

const isMongoDBObjectId = (value) => {
    if (typeof value !== 'string') {
      return false;
    }
  
    // Check if the string is exactly 24 characters long
    if (value.length !== 24) {
      return false;
    }
  
    // Check if the string contains only hexadecimal characters
    const hexRegEx = /^[0-9a-fA-F]{24}$/;
    return hexRegEx.test(value);
};


// Create the context
const Authentication = createContext();

// Create a provider component
class AuthWrapperContext extends Component {

   
    constructor( props ) {
        super( props);

        this.state = {
            value: "data",
            updateValues: this.updateValue
        };
    }

    componentDidMount() { 
        
        const { navigate, location } = this.props;
        
        var page = "dashboard"
        if( location.pathname !== undefined ) {
            
            var cutted = location.pathname;
            if( cutted.indexOf("/") !== -1 ) {
                var lens = location.pathname.split("/");
                cutted = lens[lens.length - 1];
            }
            
            if( cutted === "/" || cutted === "" ) {
                cutted = lens[lens.length - 2];
            } 
            
            page = cutted;
        }
        
        if( isMongoDBObjectId(page) ) {
            var slugs = location.pathname.split("/");
            page = slugs[slugs.length - 2];
        }

        if( page === "register" || page === "login" ) {
            return;
        }
        // check if the passname already variable 
        
        
        var session = JSON.parse(localStorage.getItem("session"));
        
        if( session === null || session.token === undefined ) {
            setTimeout(() => {
                navigate('/login');
            }, 0)
        }
         
        Helper.checkUserCapabilities( page ).then(result => { 

            if( result.is_accessed === false || result.is_accessed === undefined ) {
                navigate('/login');
            }
        }); 

    }

    updateValue = (newValue) => {
        this.setState({
            value: newValue
        })
    }


    render() {
        return (
            <Authentication.Provider value={this.state}>
                {this.props.children}
            </Authentication.Provider>
        );
    }


};
  

var AuthWrapper = withNavigation(AuthWrapperContext);
 
export { Authentication, AuthWrapper };

