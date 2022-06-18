import React from 'react';

export default class CardList extends React.Component {

    cellStyle = {
        alignContent: 'top',
        backgroundColor: '#ffffff'
    };

    constructor(props) {
        super(props);
        this.card = this.card.bind(this);
        this.state = {
            data: [],
            isLoaded: false
        };
    }

    getProductData() {
        return fetch(`${this.props.dataURL}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
        })
                .then(response => response.json())
                .catch(er => console.error(er));
    }

    componentDidMount() {
        this.getProductData().then(response => {
            this.setState({
              data: response,
              isLoaded: true
            });
        });
    }

    //  `${entry['image']}`

    card(cardNumber) {
        const entry = this.state.data[cardNumber-1];

        return (
            <div>
                <div style={{backgroundImage: `url(${entry['image']})`, backgroundSize: 'cover', width: 400, height: 640}}></div>
                <div>
                    <h6>Category {entry['category']}</h6>
                    <h1 style={{fontSize: '48px'}}>{entry['title']}</h1>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <table style={{borderSpacing: '30', borderCollapse: 'separate'}}>
                    <tr>
                        <td style={this.cellStyle}>{this.state.isLoaded?this.card(1):null}</td>
                        <td style={this.cellStyle}>{this.state.isLoaded?this.card(2):null}</td>
                        <td style={this.cellStyle}>{this.state.isLoaded?this.card(3):null}</td>
                    </tr>
                    <tr>
                        <td style={this.cellStyle}>{this.state.isLoaded?this.card(4):null}</td>
                        <td style={this.cellStyle}>{this.state.isLoaded?this.card(5):null}</td>
                        <td style={this.cellStyle}>{this.state.isLoaded?this.card(6):null}</td>
                    </tr>
                </table>
            </div>
        )
    }
    

};