import React from "react";
import './App.css';
import Popup from "./popup";


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataLoaded: false,
            searchText: [],
            open: false,
            sendData: []
        }
    }

    async componentDidMount() {
        let i = 1;
        let list = []
        for (i; i < 150; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const json = await response.json()
            list.push(json)
            this.setState({ data: list })
        }
        if (this.state.data.length === 149) {
            this.setState({ dataLoaded: true })
        }
    }

    render() {
        console.log(this.state.data)
        const d = (event, param, data) => {
            this.setState({ open: true })
            this.setState({ sendData: param })
        }

        const close = (openClose) => {
            this.setState({ open: openClose })
        }

        const { sendData } = this.state;

        return (
            <div className="page">
                {this.state.open === true ? (
                    <Popup data={sendData} openClose={close} />
                ) : null}
                <div className='left-col'>
                    <img alt="pokemon images" src='./pokemonLogo.png'></img>
                    <div className="info-box">
                        <h1>Welcome</h1>
                        <p>Search for any pokemon to see it stats</p>
                        <input id="searchValue" onChange={event => { this.setState({ searchText: event.target.value }) }} type="text" placeholder="Search..."></input>
                        <p>Click on a card to display it bigger</p>
                    </div>
                </div>
                <div className='right-col'>
                    <div className='card-con'>
                        <div className="poke-card-con">
                            {this.state.dataLoaded ? (
                                this.state.data.filter((val) => {
                                    if (this.state.searchText === "") {
                                        return val;
                                    } else if (val.name.toString().toLowerCase().includes(this.state.searchText.toString().toLowerCase())) {
                                        return val
                                    }
                                }).map((value, index) => (
                                    <div key={index} className="poke-card" onClick={event => d(event, value)}>
                                        <img alt="Pokemon images" src={value.sprites.front_shiny}></img>
                                        <h2>{value.name}</h2>
                                        <div className="poke-card-bottom">
                                            {value.types.length > 1 ? (
                                                <p><strong>Type: </strong>{value.types[0].type.name + ", " + value.types[1].type.name}</p>
                                            ) :
                                                <p><strong>Type: </strong>{value.types[0].type.name}</p>
                                            }
                                            <p><strong>{value.stats[0].stat.name + ": "}</strong>{value.stats[0].base_stat}</p>
                                            {value.abilities.length > 2 ? (
                                                <p><strong>Abilities: </strong>{value.abilities[0].ability.name + ", " + value.abilities[1].ability.name}</p>
                                            ) :
                                                <p><strong>Abilities: </strong>{value.abilities[0].ability.name}</p>
                                            }
                                            {value.abilities.length > 3 ? (
                                                <p><strong>Abilities: </strong>{value.abilities[0].ability.name + ", " + value.abilities[1].ability.name + ", " + value.abilities[2].ability.name}</p>
                                            ) : null

                                            }
                                        </div>
                                    </div>
                                ))
                            ) :
                                <div className="load-con">
                                    <div className="load"></div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;