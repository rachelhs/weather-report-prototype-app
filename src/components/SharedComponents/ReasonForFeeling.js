// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import React, {useState} from 'react';
import moment from 'moment';import database from '../../firebase/firebase';
import { CSSTransition } from 'react-transition-group';
import { storage } from "../../firebase/firebase";
import { Link } from 'react-router-dom';

// Is there anything you are aware of that has made you feel like this INPUT BOX
export class ReasonForFeelingsInputAndReminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showInput: true,
            showReminder: false,
            wantsReminding: false,
            showTakePhoto: null,
            takePhoto: null,
            value: '',
            time:  moment(), 
            image: null,
            url: "nothing",
            progress: 0,
            createdAt: props.entry ? moment(props.entry.createdAt) : moment()
        };
    }

    // functions for photo upload
    yesTakePhoto() {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/reasonForFeeling/${this.state.time}`).update({
            photoReminder: "yes"
        })
        this.setState({ takePhoto: true})
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
          this.setState({ image: e.target.files[0] });
        }
    };
    
    handleUpload = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress: progress });
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(this.state.image.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({ url: url });
                    const data = {
                        url: this.state.url,
                        savedOn: this.state.createdAt.valueOf()
                    }
                    database.ref(`users/${uid}/reasonForFeeling/${this.state.time}`).push(data)
                });
            }
        );
    };

    // functions for reason for feeling upload
    handleNoteSubmit = (e) => {
        e.preventDefault();
        this.setState({ showInput: false});
    }

    handleNoteChange = (e) => { this.setState({ value: e.target.value }) }

    // do you want reminding show
    setReminder() { this.setState({ showReminder: true, wantsReminding: true}) }
    // take a photo
    askPhoto() { this.setState({ showTakePhoto: true})}
    // do you want reminding false
    yesSetReminder() {
        console.log('remind yes')
        this.setState({ showReminder: false})
    }
    // send input to database
    sendInput(remind) {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/reasonForFeeling/${this.state.time}`).update({
            reason: this.state.value,
            remind: remind,
        })
        this.setState({ showReminder: false})
    }

    render() {
        const feedback = this.state.progress == 100 ? <h2>Thank you for uploading this memory</h2> : <h2></h2>;
        return (
            <div>
                <CSSTransition in={this.state.showInput} timeout={2000} classNames="fade" appear unmountOnExit onExited={() => this.setReminder()}>
                    <div>
                        <h1 className='info-box-title'>{data[3].shared.reason}</h1>
                        <form className='button-container-vertical' onSubmit={this.handleNoteSubmit.bind(this)}>
                            <textarea className='free-form-input input-paragraph' type="text" value={this.state.value} onChange={this.handleNoteChange} />
                            <button className='next-button free-form-submit center' onClick={this.props.buttonClick}>Submit</button>
                        </form>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.showReminder} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.askPhoto()}>
                    <div>
                        <h1 className='info-box-title'>{data[3].shared.reminderQuestion}</h1>
                        <div className='button-container'>
                            <button className='next-button' onClick={this.yesSetReminder.bind(this)}>Yes</button>
                            <button className='next-button'
                                onClick={(e) => {
                                    this.sendInput(false);
                                    this.props.onClick(true);
                                }}>No
                            </button>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.showTakePhoto} timeout={2000} classNames="fade" unmountOnExit>
                    <div>
                        <h1 className='info-box-title'>{data[3].shared.photoAsk}</h1>
                        <div className='button-container'>
                            <button className='next-button' onClick={this.yesTakePhoto.bind(this)}>Yes</button>
                            <button className='next-button'
                                onClick={(e) => {
                                    this.sendInput(true);
                                    this.props.onClick(true);
                                }}>No
                            </button>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.takePhoto} timeout={2000} classNames="fade" unmountOnExit>
                <div>
                    <input type="file" onChange={this.handleChange} />
                    <button onClick={this.handleUpload}>Upload</button>
                    { feedback }
                    <div className='button-container'>
                        <button className='next-button' onClick={(e) => this.props.onClick(true)}>Next</button>
                    </div>
                </div>
                </CSSTransition>
            </div>
        )
    }
}