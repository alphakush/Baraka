import React, { Component } from 'react';
import BarCards from "./BarCards";
import Api from "../api/api.js";

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
                adresse={nombre_de_bars[i].address}
                image={nombre_de_bars[i].image}
                note={nombre_de_bars[i].note}
                phone={nombre_de_bars[i].phone}
                position={i}
            />);
        }
        return (
            <div className="container-fluid">
                <div className='row'>
                    {rows}
                </div>
            </div>
        )
    }
}
export default Bars;


