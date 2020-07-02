import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expense-total';
import { Link } from 'react-router-dom';

export const EntrySummary = ({ entryCount }) => {
  const entryWord = entryCount === 1 ? 'entry' : 'entries' ;
  
  return (
    <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">Viewing <span>{entryCount}</span> {entryWord} </h1>
      <div className="page-header__actions">
      <Link className="button" to="/create">Add Entry</Link>
      </div>
      </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(EntrySummary);
