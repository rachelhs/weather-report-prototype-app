import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
import toJSON from 'enzyme-to-json';

test('should render expense list item with expense data', () => {
    const wrapper = shallow(<ExpenseListItem  {...expenses[0]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});