import React, { Component } from 'react';
import * as data from './data/info-bar.json';
import BarCards from "./BarCards";
import Api from "./api/api.js";

class Bars extends Component {
    async componentDidMount() {
        var userData = await Api.get('/allbars');
        }
    render() {
        var nombre_de_bars = Object.keys(data.features).length;
        var rows = [];
        console.log("Render");
        for (var i = 0; i < nombre_de_bars; i++) {
            rows.push(<BarCards
                key={i}
                description={data.features[i].properties.FACILITY_F}
                name={data.features[i].properties.NAME_FR}
                adresse={data.features[i].properties.ADDRESS_FR}
                image={data.features[i].properties.IMG}
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


