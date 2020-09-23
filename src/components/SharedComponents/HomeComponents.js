import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';
let listOfGrateful = [];
let listOfAnchors = [];
let listOfPebbles = [];
let hideOtherButtons = null;
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
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
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
            modalsOpen: false,
            listOfGrateful: [],
            addButtonClicked: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
            modalsOpen: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true,
            modalsOpen: true
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

        return (
            <div>
                {(this.state.modalsOpen === false && this.props.fishAppears === true) ? <Button className='clickableFish' variant="primary" onClick={this.handleShow.bind(this)}></Button> : ''}
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName="modal-dialog modal-dialog-centered"
                >
                    <Modal.Header closeButton>
                    </Modal.Header>

                    <Modal.Title className='modal-title'><h1 className='info-box-title'>{data[10].home.fish}</h1>
                    </Modal.Title>
                    <Modal.Body>
                        {renderedOutput}
                        {this.state.addButtonClicked ? <h1>{data[10].home.addToFish}</h1> : <TextWithButton buttonText='add' text={data[10].home.addToFish} onClick={this.toggleAddGratitude.bind(this)} />}
                        {this.state.toggleAddGratitude ? <OneGratefulQuestion /> : ''}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export class AnchorsModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: null,
            modalsOpen: false,
            listOfAnchors: [],
            addButtonClicked: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
            modalsOpen: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true,
            modalsOpen: true
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

        return (
            <div>
                {(this.state.modalsOpen) ? '' : <Button className='clickablePlant' variant="primary" onClick={this.handleShow.bind(this)}></Button>}
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName="modal-dialog modal-dialog-centered"
                >
                    <Modal.Header closeButton>
                    </Modal.Header>

                    <Modal.Title className='modal-title'><h1 className='info-box-title'>{data[10].home.anchors}</h1>
                    </Modal.Title>
                    <Modal.Body>
                        {renderedOutput}
                        {this.state.addButtonClicked ? <h1>{data[10].home.addToAnchors}</h1> : <TextWithButton buttonText='add' text={data[10].home.addToAnchors} onClick={this.toggleAddAnchor.bind(this)} />}
                        {this.state.toggleAddAnchor ? <AddAnchor /> : ''}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export class PebblesModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: null,
            modalsOpen: false,
            listOfPebbles: [],
            addButtonClicked: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
            modalsOpen: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true,
            modalsOpen: true
        })
    }

    componentDidMount() {
        this.getListOfPebbles();
    }

    getListOfPebbles = () => {
        listOfPebbles = [];
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/positiveThings`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let pebbles = childSnapshot.val();
                    listOfPebbles.push(pebbles);
                })
                this.setState({ listOfPebbles: listOfPebbles })
            })
    }

    toggleAddPebble(res) {
        res ? (this.setState({ toggleAddPebble: true, addButtonClicked: true }), listOfPebbles = []) : this.setState({ toggleAddPebble: false })
    }

    render() {
        let renderedOutput = this.state.listOfPebbles.map((item, index) => <h1 key={index}>{item}</h1>)

        return (
            <div>
                {this.state.modalsOpen ? '' : <Button className='clickablePebble' variant="primary" onClick={this.handleShow.bind(this)}></Button>}
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    </Modal.Header>

                    <Modal.Title className='modal-title'><h1 className='info-box-title'>{data[10].home.pebbles}</h1>
                    </Modal.Title>
                    <Modal.Body>
                        {renderedOutput}
                        {this.state.addButtonClicked ? <h1>{data[10].home.addToPebbles}</h1> : <TextWithButton buttonText='add' text={data[10].home.addToPebbles} onClick={this.toggleAddPebble.bind(this)} />}
                        {this.state.toggleAddPebble ? <PositiveThingQuestion /> : ''}
                        </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}