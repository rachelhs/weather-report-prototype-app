import React from 'react';
import { shallow } from 'enzyme';
import AddExpense, { AddExpensePage } from '../../components/AddExpense';
import toJSON from 'enzyme-to-json';

test('should render add expense page correctly', () => {
    const onSubmit = jest.fn();
    const history = { push: jest.fn() };    
    const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});