import { shallow } from 'enzyme';
import React from 'react';
import Header from '../../components/Header';
import toJSON from 'enzyme-to-json';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={()=>{ }} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});
