import React from 'react';
import { connect } from 'react-redux';
import { startAddEntry, startEditEntry } from '../../actions/entries'
import { AnimationsCombined } from '../SharedComponents/SharedComponents';
const data = require('../../data/data.json');
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

export class ChooseSymbolPage extends React.Component {
    // onSubmit = (entry) => {
    //     //create new entry
    //     this.props.startAddEntry(entry);
    //     //get current user
    //     const user = firebase.auth().currentUser;
    //     const uid = user.uid;
    //     let name = '';
    //     //get id for the new entry
    //     database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function(snapshot) {
    //         name = snapshot.key;
    //     })
    //     //go to page for most recent entry
    //     this.props.history.push(`edit/${name}`);
    // };

    onButtonClick() {
        console.log(this.symbol)
        this.symbol.history.push('/choosesymbol');




        // this.context.router.push({ //browserHistory.push should also work here
        //     pathname: './SymbolDescription.js',
        //     state: {yourCalculatedData: data}
        // }); 

        // this.symbol.history.push('./symbol-description', {
        //     symbol: this.props.symbol,
        //     foo: this.symbol
        // })
    }

    

    render() {
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box-landing'>
                    <h3 className='info-box-text'>{ data[0].regularLogin[2] }</h3>
                    <div className='weather-symbols-grid'>
                        {data[10].symbols.map((symbol) => (
                            <form className='symbol' key={symbol}>
                                <button onClick={this.onButtonClick.bind({symbol})} className='symbol-button'><img className='symbol' src={require(`../../images/${symbol}`).default}/></button>
                            </form>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state, props) => {
//     return {
//         entry: state.entries.find((entry) => entry.id === props.match.params.id)
//     };
// };

// const mapDispatchToProps = (dispatch) => ({

//     startAddEntry: (entry) => dispatch(startAddEntry(entry)),
//     startEditEntry: (id, entry) => dispatch(startEditEntry(id, entry))


// });

export default ChooseSymbolPage;
