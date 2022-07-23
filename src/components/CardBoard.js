import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

export default class CardBoard extends React.Component {

    cardStyle = {
        regular: (isEnd) => {
            return {
                display: 'inline-block',
                backgroundColor: '#E5E5E5',
                height: '100%',
                width: '425px',
                marginRight: (isEnd?'0px':'15px'),
                borderRadius: '6px'
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
            speed: 0
        };
    }

    componentDidMount = () => {
        this.scroller.scrollLeft = this.state.currPos;
    }

    handleScroll = () => {

        if (this.scroller == null) return;
        const { scrollWidth, scrollLeft, clientWidth } = this.scroller;
        const scroll = scrollWidth - scrollLeft - clientWidth;

        this.setState({speed: (scroll-this.state.currPos), currPos: scroll});
        if (this.state.speed < 2) this.setState({speed: (this.state.speed/2)});
        this.scroller.scrollTo({left: (this.state.currPos - this.state.speed), behavior: 'smooth'});

        if (scroll <= 1100) this.setState({indicatorPos: 4});
        else if (scroll <= 2400) this.setState({indicatorPos: 3});
        else if (scroll <= 3700) this.setState({indicatorPos: 2});
        else if (scroll <= 5000) this.setState({indicatorPos: 1});
        else this.setState({indicatorPos: 0});

        console.log(this.state.speed);
        this.setState({speed: 0});
    }

    render() {

        const cards = [];
        for (let i = 0; i < 15; i++) cards.push(<div key={i} style={this.cardStyle.regular((i===14)?true:false)}></div>)

        return (
            <div style={this.props.style}>
                <div style={{backgroundColor: 'white', height: '960px'}}>
                    <div style={{textAlign: 'center', marginBottom: 60, paddingTop: 60}}>
                        <h1 style={{fontSize: '48px'}}>{this.props.title}</h1>
                        <p style={{width: '51%', margin: 'auto'}}>{this.props.children}</p>
                    </div>
                    <ScrollContainer innerRef={element => this.scroller = element} style={{height: '451px', whiteSpace: 'nowrap'}} vertical={false} onScroll={this.handleScroll}>
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