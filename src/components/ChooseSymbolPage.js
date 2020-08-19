import React from 'react';
import BackgroundAnimation from './BackgroundAnimation'
import ForegroundAnimation from './ForegroundAnimation'
import rainbow from '../images/rainbow.png';
import sun from '../images/sun.png';
import bluesky from '../images/bluesky.jpeg';
import fog from '../images/fog.png';
import greycloud from '../images/greycloud.png';
import darkcloud from '../images/darkcloud.svg';
import thunder from '../images/thunder.png';
import tidalwave from '../images/tidalwave.png';
import tornado from '../images/tornado.png';

export class ChooseSymbolPage extends React.Component {

    render() {
        return (
            <div>
            <div className='background-anim'>
            <BackgroundAnimation />
            </div>
            <div className='foreground-anim'>
            <ForegroundAnimation />
            </div>
            <div className='info-box'>
            <h4 className='info-box-text'>If you were to describe that feeling in a weather symbol, which symbol would it be?</h4>
            <div className='weather-symbols-grid'>
            <button><img className = 'symbol' src={rainbow}/></button>
            <img className = 'symbol' src={sun}/>
            <img className = 'symbol' src={bluesky}/>
            <img className = 'symbol' src={fog}/>
            <img className = 'symbol' src={greycloud}/>
            <img className = 'symbol' src={darkcloud}/>
            <img className = 'symbol' src={thunder}/>
            <img className = 'symbol' src={tidalwave}/>
            <img className = 'symbol' src={tornado}/>
            </div>
            </div>
            </div>
        );
    }
}

export default ChooseSymbolPage;
