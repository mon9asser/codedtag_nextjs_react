
import React, {Component} from "react";
import { Helper } from "./helper";

const DataContext = React.createContext();

class DataProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menus: []
        }
    }

    
    componentDidMount = async () => {

        // getting menus
        var [menusResponse] = await Promise.all([
            Helper.sendRequest({
                api: "menus",
                method: "get",
                data: {}
            })
        ]);

        if( menusResponse.is_error ) {
            menusResponse.data = [];
        }

        console.log("menusResponse");
        this.setState({
            menus: menusResponse.data
        })
    }

    render() {
        
        var data = {
            menus: this.state.menus
        };

        return (
            <DataContext.Provider value={data}>
                {this.props.children}
            </DataContext.Provider>
        );
    }

}

export {DataProvider, DataContext}