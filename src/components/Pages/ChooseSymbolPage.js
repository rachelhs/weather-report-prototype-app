import React from 'react';
import { AnimationsCombined } from '../SharedComponents/SharedComponents';
const data = require('../../data/data.json');
import { Link } from 'react-router-dom';

export class ChooseSymbolPage extends React.Component {
    render() {
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box-landing'>
                    <h3 className='info-box-text'>{ data[0].regularLogin[2] }</h3>
                    <div className='weather-symbols-grid'>
                        {data[10].symbols.map((symbol) => (
                            <Link className='symbol-button' key={symbol}
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: {symbol} }
                                }}><img className='symbol' src={require(`../../images/${symbol}.png`).default}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseSymbolPage;
