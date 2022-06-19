import React from 'react';

export default class CardList extends React.Component {

    cellStyle = {
        alignContent: 'top',
        backgroundColor: '#ffffff',
        textOverflow: 'ellipsis',
        whiteSpace: 'wrap',
        overflow: 'hidden'
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
            <div style={this.cellStyle}>
                <div style={{backgroundImage: `url(${entry['image']})`, backgroundSize: 'cover', height: 406, width: '100%'}}></div>
                <div>
                    <h6>Category {entry['category']}</h6>
                    <h1 style={{fontSize: '48px'}}>{entry['title']}</h1>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={this.props.style}>
                <div style={{display: 'grid', gridTemplateRows: '640px 640px', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px'}}>
                    {this.state.isLoaded?this.card(1):null}
                    {this.state.isLoaded?this.card(2):null}
                    {this.state.isLoaded?this.card(3):null}
                    {this.state.isLoaded?this.card(4):null}
                    {this.state.isLoaded?this.card(5):null}
                    {this.state.isLoaded?this.card(6):null}
                </div>
            </div>
        )
    }
    

};