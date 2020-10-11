import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');
let listOfAnchors = [];

export default class ReplayAnchors extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listOfAnchors: []
        };
    }

    componentDidMount = () => {
        this.getListOfAnchors().then(this.setAnchors);
    }

    getListOfAnchors = () => {
        return new Promise(function(resolve) {
            listOfAnchors = [];
            const user = firebase.auth().currentUser;
            const uid = user.uid;
            database.ref(`users/${uid}/anchors`).on('value', function(snap){
                for (let key in snap.val()) {
                    let anchorObj = {}
                    anchorObj['name'] =  snap.val()[key]['name']
                    anchorObj['number'] =  snap.val()[key]['number']
                    listOfAnchors.push(anchorObj);
                }
                resolve();
            });
        })
    }


    setAnchors = () => {
        this.setState({listOfAnchors: listOfAnchors})
    }

    render() {
        const list = this.state.listOfAnchors
        const listItems = list.map((d) => <p key={d.name}>{d.name} : {d.number}</p>);
        return (
            <div className='info-box'>
                <h1 className='info-box-title'>{data[10].home.anchors}</h1>
                {listItems }
            </div> 
        )
    }
}