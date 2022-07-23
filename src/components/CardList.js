import React from 'react';
import ArrowIcon from '../assets/ArrowRight_Icon.svg';

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
                <div style={{backgroundImage: `url(${entry['image']})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', height: 406, width: '100%', backgroundPosition: 'center'}}></div>
                <div>
                    <h6 style={{color: '#9a9ab0', marginLeft: '5%', marginBottom: '10px'}}>Category {entry['category']}</h6>
                    <h1 style={{fontSize: '28px', marginLeft: '5%', marginTop: '0'}}>{entry['title']}</h1>
                    <div style={{display: 'flex', cursor: 'pointer', width: '40px', height: '40px', marginLeft: '5%', backgroundColor: '#F86338', borderRadius: '28px', alignContent: 'center'}}><img src={ArrowIcon} style={{display: 'block', width: '50%', marginLeft: 'auto', marginRight: 'auto'}} alt='go-to'/></div>
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