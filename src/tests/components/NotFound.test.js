import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';
import toJSON from 'enzyme-to-json';

test('should render Not Found page', () => {
    const wrapper = shallow(<NotFound />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});