import React, { Component } from 'react';
<<<<<<< HEAD:src/Components/bars.js
import * as data from '../data/info-bar.json';
import Bar_cards from "./bar_cards";
class bars extends Component  {
=======
import BarCards from "./BarCards";
import Api from "./api/api.js";
>>>>>>> fbae34b16615f5fb54693b5c992634eab4df388f:src/bars.js

class Bars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre_de_bars: null
        };
    }

    async componentDidMount() {
        await Api.get('/allbars').then(userData => {
            this.setState({ nombre_de_bars: userData.data })    
        });
    }

    render() {
        var rows = [];
<<<<<<< HEAD:src/Components/bars.js
        for (var i = 0; i < nombre_de_bars; i++) {
            rows.push(<Bar_cards 
                description={data.features[i].properties.FACILITY_F}
                name={data.features[i].properties.NAME_FR}
                adresse={data.features[i].properties.ADDRESS_FR}
                image={data.features[i].properties.IMG}
=======
        const { nombre_de_bars } = this.state
        if (nombre_de_bars === null)
            return (
                <div>
                    {}
                </div>
            )
        for (var i = 0; i < nombre_de_bars.length; i++) {
            rows.push(<BarCards
                key={i}
                description={nombre_de_bars[i].description}
                name={nombre_de_bars[i].name}
                adresse={nombre_de_bars[i].adress}
                image={nombre_de_bars[i].image}
>>>>>>> fbae34b16615f5fb54693b5c992634eab4df388f:src/bars.js
                position={i}
            />);
        }
        return (
            <div>
                {rows}
            </div>
        )
    }
}
export default Bars;


