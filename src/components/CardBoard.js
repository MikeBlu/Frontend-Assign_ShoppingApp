import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

export default class CardBoard extends React.Component {

    cardStyle = {
        regular: (isEnd) => {
            return {
                display: 'inline-block',
                verticalAlign: 'middle',
                backgroundColor: '#E5E5E5',
                height: '100%',
                width: '425px',
                marginRight: (isEnd?'0px':'15px'),
                borderRadius: '6px'
            }
        },
        innerElement: {
            height: '90%',
            width: '90%',
            margin: 'auto',
            textWrap: 'balance',
            fontSize: 30,
            fontWeight: 'bold',
            color: '#DDDDDD'
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
            indicatorPos: 0,
            currPos: 0,
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
        this.scroller.addEventListener("onscrollstart",() => this.setState({currentlyMoving: false}) );
        this.getProductData().then(response => {
            this.setState({
              data: response,
              isLoaded: true
            });
        });
    }

    handleScroll = () => {

        if (this.scroller == null) return;
        const { scrollWidth, scrollLeft, clientWidth } = this.scroller;
        const scroll = scrollWidth - scrollLeft - clientWidth;

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

        this.setState({currPos: scroll});
        this.setState({speed: 0});

    }

    card(cardNumber) {
        const entry = this.state.data[cardNumber-1];

        return (
            <div key={cardNumber} style={this.cardStyle.regular((cardNumber===15)?true:false)}>
                <div style={this.cardStyle.innerElement}>{entry['title']}</div>
            </div>
        )
    }

    render() {

        const cards = [];
        if (this.state.isLoaded) {
            for (let i = 1; i <= 15; i++) {
                cards.push(this.card(i));
            }
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