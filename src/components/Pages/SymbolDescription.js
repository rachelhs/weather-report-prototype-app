import React from 'react';
const data = require('../../data/data.json');
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { BackButton } from '../../actions/route-functions';
import { Link } from 'react-router-dom';

export default class SymbolDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherSymbol: this.props.location.state.weather,
            mainWord: null
        }
    }

    mainWord(word) {
        this.setState({ mainWord: word.word})
    }

    render() {
        return (
            <div className='background-box'>
                <AnimationsLayered speeds={[0.2]} animations={['neutralTreesNoLily']} />
                <div className='center-vertical'>
                    <div className='info-box-choose'>
                        <h3 className='info-box-text'>{ data[0].regularLogin[3] }</h3>
                        <div className='word-grid'>
                            {data[10]['words'][this.state.weatherSymbol].map((word) => (
                                <div className='words' key={word}>
                                    <button 
                                    className={this.state.mainWord === word ? 'active-symbol-button-border' : 'symbol-button-border'}
                                    onClick={(e) => { this.mainWord({word})}}>{word.toUpperCase()}</button>
                                </div>
                            ))}
                        </div>
                        <div className="button-container">
                            <BackButton/>
                            <Link className='next-button-dark' 
                                to={{
                                    pathname: '/symbol-more-detail',
                                    state: 
                                        {
                                            weather: this.state.weatherSymbol,
                                            mainWord: this.state.mainWord
                                        }
                                }}>NEXT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}