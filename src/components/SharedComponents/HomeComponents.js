import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';
let listOfGrateful = [];
import { TextWithButton } from '../SharedComponents/SharedComponents'
import { Button, Modal } from 'react-bootstrap';

export default class AllGratitudes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleAddGratitude: false,
            addGratitudeQuestion: true
        }
    }

    componentDidMount() {
        // clear it each time you click on it
        listOfGrateful = [];
        this.getListOfGratitudes();
    }

    getListOfGratitudes = () => {

        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/grateful`)
            .on('value', (snapshot) => {
                console.log(snapshot)
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let gratitude = childSnapshot.val();
                    listOfGrateful.push(gratitude);
                })
            })
    }

    toggleAddGratitude(res) {
        res ? this.setState({ toggleAddGratitude: true, addGratitudeQuestion: false }) : this.setState({ toggleAddGratitude: false })
    }

    render() {
        // need tp assign a unique index to each h1 otherwise get a warning
        // creates an h1 for each gratitude the user has entered (ever)
        const renderedOutput = listOfGrateful.map((item, index) => <h1 key={index}>{item}</h1>)
        return (
            <div>
                <h1 className='info-box-title'>{data[10].home.fish}</h1>
                {renderedOutput}
                {this.state.addGratitudeQuestion ? <TextWithButton buttonText='add' text={data[10].home.addToFish} onClick={this.toggleAddGratitude.bind(this)} /> : ''}
                {this.state.toggleAddGratitude ? <OneGratefulQuestion /> : ''}
            </div>
        )
    }
}

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
            listOfGrateful: []
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
                console.log(snapshot)
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let gratitude = childSnapshot.val();
                    listOfGrateful.push(gratitude);
                })
                this.setState({ listOfGrateful: listOfGrateful })
            })
    }

    toggleAddGratitude(res) {
        res ? (this.setState({ toggleAddGratitude: true, addGratitudeQuestion: false }), listOfGrateful = []) : this.setState({ toggleAddGratitude: false })
    }

    render() {
        let renderedOutput = this.state.listOfGrateful.map((item, index) => <h1 key={index}>{item}</h1>)

        return (
            <div>
                {this.state.modalsOpen ? '' : <Button className='clickableFish' variant="primary" onClick={this.handleShow.bind(this)}></Button>}

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
                        <TextWithButton buttonText='add' text={data[10].home.addToFish} onClick={this.toggleAddGratitude.bind(this)} />
                        {this.state.toggleAddGratitude ? <OneGratefulQuestion /> : ''}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}