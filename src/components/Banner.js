import React from 'react';

export default class Banner extends React.Component {

    render() {

        return (
            <div style={{backgroundImage: `url(${this.props.src})`, backgroundSize: 'cover', backgroundPosition: 'bottom', height: '512px', padding: 1, fontFamily: `${this.props.font}`}}>
                <div style={{float: 'right', display: 'flex', width: '50%', height: '100%', alignItems: 'center'}}>
                    <div style={{paddingRight: '10%'}}>
                        <h1 style={{fontSize: '64px'}}>{this.props.title}</h1>
                        <p>{this.props.children}</p>

                        {(this.props.hasButton)?
                        <button style={{cursor: 'pointer', fontSize: '16px', color: 'white', borderRadius: '8px', padding: '18px 24px 18px 24px', border: 'none', backgroundColor: '#f86338', marginTop: '30px'}} onClick={this.props.onClick}>{this.props.buttonText}</button>
                        :null}
                        
                    </div>
                </div>
            </div>
        )
    }
    

};