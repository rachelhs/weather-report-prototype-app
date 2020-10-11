import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');

export default class ReplyCare extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomCare1: '',
            randomCare2: '',
            rand1: null,
            rand2: null,
            listOfCare: [],
        };

        this.getRandomCare = this.getRandomCare.bind(this);
    }

    componentDidMount = () => {
        this.getRandomCare();
    }
    
    selectRandomIndex() {
        let randomNumber = Math.floor(Math.random() * this.state.listOfCare.length);
        return randomNumber
    }


    getRandomCare = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfKeys = [];

        database.ref(`users/${uid}/takeCare`)
        .on('value', (snapshot) => {
            // get list of keys for each entry
            snapshot.forEach((childSnapshot) => {
                listOfKeys.push(childSnapshot.key);
            })
            console.log('listOfKeys', listOfKeys)

            this.setState({listOfCare: listOfKeys}) 
            // pick a random entry
            let rand1 = this.selectRandomIndex();
            this.setState({rand1: rand1}) 
            let rand2 = this.selectRandomIndex();
            while (rand2 == this.state.rand1) {
                rand2 = this.selectRandomIndex()
            } 
            if (rand2 !== this.state.rand1) {
                this.setState({rand2: rand2}) 
            }
            database.ref(`users/${uid}/takeCare/${listOfKeys[rand1]}`)
            .on('value', (childSnapshot) => {
                let entry1 = childSnapshot.val();
                this.setState({ randomCare1: entry1 });
            })
            database.ref(`users/${uid}/takeCare/${listOfKeys[rand2]}`)
            .on('value', (childSnapshot) => {
                console.log(childSnapshot.val());
                let entry2 = childSnapshot.val();
                this.setState({ randomCare2: entry2 });
            })
        })
    }

    render() {
        console.log('state1', this.state.randomCare1)
        console.log('state2', this.state.randomCare2)
        return (
            <div className="positive-padding">
                <h2 className='info-box-title-no-padding'>{data[3].shared.replayCare}</h2>
                <div className="gratitudeBox">
                    <p>{this.state.randomCare1}</p>
                    <p>{this.state.randomCare2}</p>
                </div>
                <div className='button-container'>
                    <button className='next-button-dark free-form-submit extra-margin-top' onClick={this.props.buttonClick}>NEXT</button>
                </div>
            </div>
        )
    }
}