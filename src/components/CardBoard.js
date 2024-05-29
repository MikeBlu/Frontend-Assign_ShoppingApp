import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

export default class CardBoard extends React.Component {

    cardStyle = {
        regular: (isEnd, backgroundImageSrc) => {
            return {
                display: 'inline-block',
                backgroundColor: '#E5E5E5',
                height: '100%',
                width: '425px',
                marginRight: (isEnd?'0px':'15px'),
                borderRadius: '6px',
                backgroundImage: `url(${backgroundImageSrc})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center'
            }
        }
    }

    indicatorStyle = {
        circular: (isActive) => {
            return {
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: (isActive?'#7a6005':'#e0e0e0')
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            indicatorPos: 2,
            currPos: 2518,
            speed: 0,
            currentlyMoving: false
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

    componentDidMount = () => {
        this.scroller.addEventListener("onscrollstart",() => {this.setState({currentlyMoving: false}); console.log("started scrolling")});
        this.getProductData().then(response => {
            this.setState({
              data: response,
              isLoaded: true
            });
            console.log(this.state.data);
        });
    }

    handleScroll = () => {

        if (this.scroller == null) return;
        const { scrollWidth, scrollLeft, clientWidth } = this.scroller;
        const scroll = scrollWidth - scrollLeft - clientWidth;

        // console.log(scroll);
        if (scroll <= 1100) this.setState({indicatorPos: 4});
        else if (scroll <= 2400) this.setState({indicatorPos: 3});
        else if (scroll <= 3700) this.setState({indicatorPos: 2});
        else if (scroll <= 5000) this.setState({indicatorPos: 1});
        else this.setState({indicatorPos: 0});
    }
    
    handleInertia = () => {

        if (this.scroller == null) return;
        const { scrollWidth, scrollLeft, clientWidth } = this.scroller;
        const scroll = scrollWidth - scrollLeft - clientWidth;

        this.setState({speed: (scroll-this.state.currPos)});
        
        this.scroller.scrollTo({left: (scrollWidth  - (scroll + this.state.speed)), behavior: 'smooth'});
        // this.scroller.scrollTo({left: ((scroll + this.state.speed)), behavior: 'smooth'});

        console.log(scroll + this.state.speed);

        this.setState({currPos: scroll});
        this.setState({speed: 0});

    }

    card(cardNumber) {
        const entry = this.state.data[cardNumber-1];

        return (
            <div key={cardNumber} style={this.cardStyle.regular( ((cardNumber===15)?true:false),entry['image'] )}></div>
        )
    }

    render() {

        const cards = [];
        for (let i = 1; i <= 15; i++) {
            if (!this.state.isLoaded) break;
            cards.push(this.card(i));
        }

        return (
            <div style={this.props.style}>
                <div style={{backgroundColor: 'white', height: '960px'}}>
                    <div style={{textAlign: 'center', marginBottom: 60, paddingTop: 60}}>
                        <h1 style={{fontSize: '48px'}}>{this.props.title}</h1>
                        <p style={{width: '51%', margin: 'auto'}}>{this.props.children}</p>
                    </div>
                    <ScrollContainer innerRef={element => this.scroller = element} onScroll={this.handleScroll} style={{height: '451px', whiteSpace: 'nowrap'}} vertical={false}>
                        {cards}
                    </ScrollContainer>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '250px', margin: 'auto', marginTop: '12%'}}>
                        {[0,1,2,3,4].map((i) => {
                            return (<div key={i} style={this.indicatorStyle.circular((i===this.state.indicatorPos)?true:false)}></div>)
                        }) }
                    </div>
                </div>
            </div>
        )
    }
    

};