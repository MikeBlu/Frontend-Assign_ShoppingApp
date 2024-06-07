import React from "react";
import HeartIcon from '../assets/Heart_Icon.svg'; import ShopIcon from '../assets/Shop_Icon.svg'; import NotifIcon from '../assets/Notif_Icon.svg';
import Banner from "../components/Banner.js";
import CardList from "../components/CardList";
import CardBoard from "../components/CardBoard";

const homeStyle = {
    navLink : {
        fontFamily: 'DM Sans', fontSize: '16px',
        fontWeight: 400
    },
    searchBar : {
        fontFamily:'DM Sans', fontSize: '16px',
        marginLeft: '5%',
        marginRight: '3%',
        paddingLeft: '2%',
        paddingRight: '28%',
        borderRadius: 2, borderColor: 'rgba(0, 0, 0, 0)'
    },
    sectionTitle : {
        fontFamily: 'DM Sans',
        fontSize: '48px',
        textAlign: 'center',
        marginTop: '120px'
    }
};

export default function Home () {
    let placeholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    return (
        <div >
            <div style={{marginTop: '15vh'}}>
                <div style={{margin: '0% 5% 0% 5%', display: 'flex', paddingTop: '2.5%', paddingBottom: '2.5%', justifyContent: 'space-after', columnGap: '35px', alignContent: 'center'}}>

                    <h3 style={homeStyle.navLink}>Shop</h3> <h3 style={homeStyle.navLink}>Promo</h3>
                    <h3 style={homeStyle.navLink}>About</h3> <h3 style={homeStyle.navLink}>Blog</h3>

                    <input style={homeStyle.searchBar} placeholder={"Search What you need"}></input>
                    <div style={{alignSelf: 'center', display: 'flex', justifyContent: 'space-between', columnGap: '3vw', height: '50%'}}>
                        <img src={HeartIcon} alt='like this page'/>
                        <img src={ShopIcon} alt='shop now'/>
                        <img src={NotifIcon} alt='notifications'/>
                    </div>
                </div>
            </div>
            <Banner src={process.env.PUBLIC_URL+"/images/EarPhones.jpg"} title='Your Premium Sound, Unplugged!' font='DM Sans' hasButton={true} buttonText='Find out More'>{placeholder}</Banner>
            <h2 style={homeStyle.sectionTitle}>Our Premium Collection</h2>
            <div style={{margin: '50px 5% 0% 5%', fontFamily: 'DM Sans'}}>
                <ul style={{cursor: "pointer", fontSize: '24px', fontWeight: 700, color: '#9a9ab0', display: 'flex', justifyContent: 'space-between', listStyle: 'none', alignItems: 'center', width: '95%', float: 'left', marginBottom: 90}}>
                    <li>All Products</li>
                    <li>Coats and Jacket</li>
                    <li>Dressed</li>
                    <li>Playsuit</li>
                    <li>Short</li>
                    <li>Skirt</li>
                    <li>T-shirt</li>
                </ul>
                <CardList style={{clear: 'both', display: 'block'}} dataURL={'https://fakestoreapi.com/products?limit=6'}/>
                <div style={{fontSize: '16px', display: 'flex', marginTop: 80, justifyContent: 'center'}}>
                    <button style={{cursor: "pointer", borderRadius: '8px', color: 'white', border: 'none', padding: '18px 24px 18px 24px', backgroundColor: '#f86338'}}>Find out More</button>
                </div>
            </div>
            <CardBoard style={{fontFamily: 'DM Sans', marginTop: 150}} title='Top Items' dataURL={'https://fakestoreapi.com/products?sort=desc&limit=15'}>{placeholder}</CardBoard>
            <div style={{marginTop: '120px', marginBottom: '20px', fontFamily: 'DM Sans'}}>
                <div style={{display: 'grid', gridAutoFlow: 'column', gridColumnGap: '10px', textAlign: 'center'}}>
                    <div>Conditions of Use</div>
                    <div>Privacy Notice</div>
                    <div>Consumer Health Data Privacy Disclosure</div>
                    <div>{'{sample website}'}</div>
                    <div>Contact Us: +971 50 224 3478</div>
                </div>
            </div>
        </div>
    )
}