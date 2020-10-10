import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';
let listOfGrateful = [];
let listOfAnchors = [];
import ReactModal from 'react-modal';
let listOfPebbles = [];
import { TextWithButton } from '../SharedComponents/SharedComponents'
import { Button, Modal } from 'react-bootstrap';
import { AddAnchor, PositiveThingQuestion } from '../SharedComponents/MentalHealthQuestions'

// What are you grateful for?
export class OneGratefulQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gratefulOne: ''
        };
        this.handlegratefulQuestionSubmit = this.handlegratefulQuestionSubmit.bind(this);
    }

    handlegratefulQuestionSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulOne);
    }

    handlegratefulOne = (e) => {
        this.setState({ gratefulOne: e.target.value });
    }

    render() {
        return (
            <div>
                <form className='button-container-vertical' onSubmit={this.handlegratefulQuestionSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handlegratefulOne} />
                    <div className='button-container'>
                        <button className='transparent-button free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

export class FishModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: null,
            listOfGrateful: [],
            addButtonClicked: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }
    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    componentDidMount() {
        this.getListOfGratitudes();
    }

    getListOfGratitudes = () => {
        listOfGrateful = [];
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/grateful`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let gratitude = childSnapshot.val();
                    listOfGrateful.push(gratitude);
                })
                this.setState({ listOfGrateful: listOfGrateful })
            })
    }

    toggleAddGratitude(res) {
        res ? (this.setState({ toggleAddGratitude: true, addButtonClicked: true }), listOfGrateful = []) : this.setState({ toggleAddGratitude: false })
    }

    render() {
        let renderedOutput = this.state.listOfGrateful.map((item, index) => <h1 key={index}>{item}</h1>)
        const customStyles = {
            overlay: {zIndex: 1000}
        };
        return (
            <div>
                {(this.props.fishAppears === true) ?
                <Button className='clickableFish' variant="primary" onClick={this.handleShow.bind(this)}></Button> 
                : ''}
                <ReactModal style={customStyles} className='modalPebbles' isOpen={this.state.show} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleClose.bind(this)}>
                            CLOSE
                        </button>
                    </div>
                    <h1 className='info-box-title'>{data[10].home.fish}</h1>
                    {renderedOutput}
                    {this.state.addButtonClicked ? 
                        <h3>{data[10].home.addToFish}</h3> :
                        <TextWithButton buttonText='add' text={data[10].home.addToFish} onClick={this.toggleAddGratitude.bind(this)} />
                    }
                    {this.state.toggleAddGratitude ? <OneGratefulQuestion /> : ''}
                </ReactModal>
            </div>
        );
    }
}

export class AnchorsModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: null,
            listOfAnchors: [],
            addButtonClicked: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }
    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    componentDidMount() {
        this.getListOfAnchors();
    }

    getListOfAnchors = () => {
        listOfAnchors = [];
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/anchors`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let names = childSnapshot.val().name;
                    let numbers = childSnapshot.val().number;
                    listOfAnchors.push(names);
                    listOfAnchors.push(numbers);
                })
                this.setState({ listOfAnchors: listOfAnchors })
            })
    }

    toggleAddAnchor(res) {
        res ? (this.setState({ toggleAddAnchor: true, addButtonClicked: true }), listOfAnchors = []) : this.setState({ toggleAddAnchor: false })
    }

    render() {
        let renderedOutput = this.state.listOfAnchors.map((item, index) => <h1 key={index}>{item}</h1>)
        const customStyles = {
            overlay: {zIndex: 1000}
        };
        return (
            <div>
                <Button className='clickablePlant' variant="primary" onClick={this.handleShow.bind(this)}></Button>
                <ReactModal style={customStyles} className='modalPebbles' isOpen={this.state.show} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleClose.bind(this)}>
                            CLOSE
                        </button>
                    </div>
                    <h1 className='info-box-title'>{data[10].home.anchors}</h1>
                    {renderedOutput}
                    {this.state.addButtonClicked ?
                    <h3>{data[10].home.addToAnchors}</h3>
                    :
                    <TextWithButton buttonText='add' text={data[10].home.addToAnchors} onClick={this.toggleAddAnchor.bind(this)} />}
                    {this.state.toggleAddAnchor ? <AddAnchor /> : ''}
                </ReactModal>
            </div>
        );
    }
}

export class PebblesModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: null,
            listOfPebbles: [],
            pebbleToShow: null,
            addButtonClicked: false,
            arrayIndex: null
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    componentDidMount() {
        this.getListOfPebbles().then(this.setRandomPebble);
    }

    getListOfPebbles() {
        return new Promise(function(resolve) {
            listOfPebbles = [];
            const user = firebase.auth().currentUser;
            const uid = user.uid;
            database.ref(`users/${uid}/pebbles`).on('value', function(snap){
                for (let key in snap.val()) {
                    for (let key2 in snap.val()[key]) {
                        let pebbleObj = {}
                        pebbleObj['date'] = key;
                        pebbleObj['time'] = key2;
                        pebbleObj['reason'] = snap.val()[key][key2]['reason'];
                        if (snap.val()[key][key2]['photoUrl'] != undefined) {
                            pebbleObj['url'] = snap.val()[key][key2]['photoUrl'];
                        }
                        listOfPebbles.push(pebbleObj);
                    }
                }
                resolve();
            });
        })
    }

    setRandomPebble = () => {
        this.setState({listOfPebbles: listOfPebbles})
        let number = this.selectRandomIndex()
        this.setState({arrayIndex: number}) 
        let randomPebble = this.state.listOfPebbles[number];
        this.setState({pebbleToShow: randomPebble})
    }

    selectAnotherMemory() {
        let number = this.selectRandomIndex()
        while (number == this.state.arrayIndex) {
            number = this.selectRandomIndex()
        } 
        if (number !== this.state.arrayIndex) {
            this.setState({arrayIndex: number}) 
            let randomPebble = this.state.listOfPebbles[number];
            this.setState({pebbleToShow: randomPebble})
            // console.log('random memory', this.state.pebbleToShow)
        }
    }

    selectRandomIndex() {
        let randomNumber = Math.floor(Math.random()*this.state.listOfPebbles.length)
        // console.log('listOfPebbles.length', listOfPebbles.length)
        // console.log('randomNumber', randomNumber)

        return randomNumber
    }

    toggleAddPebble(res) {
        res ? (this.setState({ toggleAddPebble: true, addButtonClicked: true }), listOfPebbles = []) : this.setState({ toggleAddPebble: false })
    }

    render() {
        console.log('random',this.state.arrayIndex)
        let renderedOutput = this.state.listOfPebbles.map((item, index) => <h1 key={index}>{item}</h1>)
        const customStyles = {
            overlay: {zIndex: 1000}
        };
        const photoMemory = this.state.pebbleToShow && this.state.pebbleToShow.url ?
        <img src={this.state.pebbleToShow.url} alt="photo of your recorded memory" width="100%"/>
        : '';
        return (
            <div>
                <Button className='clickablePebble' variant="primary" onClick={this.handleShow.bind(this)}></Button>
                <a className='clickablePebbleArea' onClick={this.handleShow.bind(this)}></a>
                <ReactModal style={customStyles} className='modalPebbles' isOpen={this.state.show} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleClose.bind(this)}>
                            CLOSE
                        </button>
                    </div>
                    <h1>Pebble Memories</h1>
                    { this.state.pebbleToShow && <h3>{this.state.pebbleToShow.date} - {this.state.pebbleToShow.time}</h3> }
                    { this.state.pebbleToShow && <h3>{this.state.pebbleToShow.reason}</h3> }
                    { photoMemory }
                    <div className="flex-center">
                        <button className="transparent-button" onClick={this.selectAnotherMemory.bind(this)}>Look at another memory</button>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
