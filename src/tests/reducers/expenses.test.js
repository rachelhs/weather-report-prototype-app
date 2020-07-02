import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses'

test('should setup expenses default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action ={
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
    const action ={
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: 
        {id: '4',
        amount: 666,
        description: 'vets',
        createdAt: 444}
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses.concat({id: '4', amount: 666, description: 'vets', createdAt: 444 }));
});

test('should edit an expense', () => {
    const amount = 5.95;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([{id: '1',
    description: 'Gum',
    note: '',
    amount: 5.95,
    createdAt: 0}, expenses[1], expenses[2]]);
});

test('should not edit an expense if expense not found', () => {
    const amount = 5.95;
    const action = {
        type: 'EDIT_EXPENSE',
        id: -5,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
// should not edit expense if expense not found

