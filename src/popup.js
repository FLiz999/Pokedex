import React from "react";
import './App.css';


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.sendData
        }
        this.close = this.close.bind(this)
    }

    close = () => {
        this.props.openClose(false)
    }

    render() {


        return (
            <div onClick={this.close} className="popup">
                <p onClick={this.close}>X</p>
                <div className="popup-card">
                    <img alt="Pokemon images" className="popup-images" src={this.props.data.sprites.front_shiny}></img>
                    <h2>{this.props.data.name}</h2>
                    <div className="poke-card-bottom">
                        {this.props.data.types.length > 1 ? (
                            <p><strong>Type: </strong>{this.props.data.types[0].type.name + ", " + this.props.data.types[1].type.name}</p>
                        ) :
                            <p><strong>Type: </strong>{this.props.data.types[0].type.name}</p>
                        }
                        <p><strong>{this.props.data.stats[0].stat.name + ": "}</strong>{this.props.data.stats[0].base_stat}</p>
                        {this.props.data.abilities.length > 2 ? (
                            <p><strong>Abilities: </strong>{this.props.data.abilities[0].ability.name + ", " + this.props.data.abilities[1].ability.name}</p>
                        ) :
                            <p><strong>Abilities: </strong>{this.props.data.abilities[0].ability.name}</p>
                        }
                        {this.props.data.abilities.length > 3 ? (
                            <p><strong>Abilities: </strong>{this.props.data.abilities[0].ability.name + ", " + this.props.data.abilities[1].ability.name + ", " + this.props.data.abilities[2].ability.name}</p>
                        ) : null

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;