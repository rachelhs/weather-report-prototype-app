import React from 'react';
import moment from 'moment';
import database from '../../firebase/firebase';
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { BackButton, GetKeyByValue } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { TextWithNextSmall } from '../SharedComponents/SharedComponents';
import Arrow from '../Animations/Arrow';
require('firebase/auth');
const firebase = require('firebase/app');
const data = require('../../data/data.json');
const fadeTime = 3000;

export default class SymbolDetailedDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherSymbol: this.props.location.state.weather,
            mainWord: this.props.location.state.mainWord,
            secondaryWords: [],
            day: moment(),
            createdAt: props.entry ? moment(props.entry.createdAt) : moment(),
            newUser: false,
            report: false
        }
    }

    componentDidMount() {
        // check if user is still onboarding - user will have 0 entries at this point if so
        const uid = firebase.auth().currentUser.uid;
        // check if a weatherReport entry exists
        database.ref(`users/${uid}/weatherReports`).once("value", snapshot => {
            if (snapshot.exists()) {
                console.log('not new user');
                this.setState({ newUser: false })
            }
            else {
                this.setState({ newUser: true })
                console.log('new user');
            }
        })
    }

    addWords(word) {
        let joined = this.state.secondaryWords.concat(word.word);
        if (this.state.secondaryWords.length > 1) {
            this.state.secondaryWords.push(word.word)
            this.state.secondaryWords.shift()
            this.setState({ secondaryWords: this.state.secondaryWords })
        } else {
            this.setState({ secondaryWords: joined })
        }
    }

    sendData() {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let date = this.state.day.format("DD-MM-YYYY")
        let time = moment().format("kk-mm")
        // work out path to route user based on main word 
        let route = GetKeyByValue(data[10].categories,this.state.mainWord);
        console.log('route', route)
        database.ref(`users/${uid}/weatherReports/${date}/${time}`).update({
            weather: this.state.weatherSymbol,
            mainword: this.state.mainWord,
            secondarywords: this.state.secondaryWords,
            createdAt: this.state.createdAt.valueOf(),
        })
        switch (route) {
            case "one":
                this.props.history.push('/1');
                break;
            case "two":
                this.props.history.push('/2');
                break;
            case "three":
                this.props.history.push('/3');
                break;
            case "four":
                this.props.history.push('/4');
                break;
            case "five":
                this.props.history.push('/5');
                break;
            case "six":
                this.props.history.push('/6');
                break;
            case "seven":
                this.props.history.push('/7');
                break;
            case "eight":
                this.props.history.push('/8');
                break;
            case "nine":
                this.props.history.push('9');
                break;
            default:
                this.props.history.push('/landing');
        }
    }

    showLastPartOnboarding() {
        this.setState({ report: true });
    }

    render() {
        console.log('mainWord', this.state.mainWord)
        let time = moment().format("HH-mm")
        console.log('time', time)
        console.log('secondaryWords', this.state.secondaryWords)
        return (
            <div>
                {(this.state.report) ? '' :
                    <div className='background-box'>
                        <AnimationsLayered speeds={[0]} animations={['neutralBackground']} />
                        <div className='info-box-landing info-box-words'>
                            <h3 className='info-box-text-small-padding'>{data[0].regularLogin[4]}</h3>
                            <div className='word-grid'>
                                {data[10].secondaryWords.map((word) => (
                                    <div className='words' key={word}>
                                        <button
                                            className={this.state.secondaryWords.includes(word) ? 'active-symbol-button-border' : 'symbol-button-border'}
                                            onClick={(e) => { this.addWords({ word }) }}>
                                            {word}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="button-container">
                                <BackButton />
                            </div>
                            {(this.state.newUser) ? <button className='next-button-last-onboarding' onClick={this.showLastPartOnboarding.bind(this)}>Next</button> : <button className='next-button-last-onboarding' onClick={this.sendData.bind(this)}>Next</button>}
                        </div>
                    </div>
                }
                    <CSSTransition in={this.state.report} timeout={fadeTime} classNames="fade" unmountOnExit appear><div className='info-box'><div className='arrow'><Arrow /></div><TextWithNextSmall text={data[10].onboarding.report} onClick={this.sendData.bind(this)} /></div></CSSTransition>
            </div>
        )
    }
}