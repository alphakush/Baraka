import React, { Component } from 'react';
import * as data from '../data/info-bar.json';
import Bar_cards from "./bar_cards";
class bars extends Component  {

    render() {

        var nombre_de_bars = Object.keys( data.features ).length;
        var rows = [];
        for (var i = 0; i < nombre_de_bars; i++) {
            rows.push(<Bar_cards 
                description={data.features[i].properties.FACILITY_F}
                name={data.features[i].properties.NAME_FR}
                adresse={data.features[i].properties.ADDRESS_FR}
                image={data.features[i].properties.IMG}
                position={i}
            />);
        } 
        return(    
        <div>     
            {rows}
        </div>
        ) 
    } 
}
export default bars;





