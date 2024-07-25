
import React, {Component} from "react";
import { Helper } from "./helper";

const DataContext = React.createContext();

class DataProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            settings: []
        }
    }

    
    componentDidMount = async () => {
        
        // getting menus
        var [menusResponse, settingsResponse] = await Promise.all([
            Helper.sendRequest({
                api: "menus",
                method: "get",
                data: {}
            }),
            Helper.sendRequest({
                api: "settings/get",
                method: "get",
                data: {}
            })
        ]);
        
        if( menusResponse.is_error ) {
            menusResponse.data = [];
        }
        
        if( settingsResponse.is_error ) {
            settingsResponse.data = [];
        } 

        this.setState({
            menus: menusResponse.data,
            settings: settingsResponse.data
        })
    }

    render() {
        
         
        var data = {
            menus: this.state.menus,
            settings: this.state.settings
        };

        return (
            <DataContext.Provider value={data}>
                {this.props.children}
            </DataContext.Provider>
        );
    }

}

export {DataProvider, DataContext}