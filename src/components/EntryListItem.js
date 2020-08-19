import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const EntryListItem = ({ id, weatherSymbol, createdAt }) => {
    return (

        <Link className="list-item" to={`/edit/${id}`}>
            <div><h3 className="list-item__title">{weatherSymbol}</h3>
                <span className="list-item__subtitle"> {moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>
        </Link>

    );
};

export default EntryListItem;