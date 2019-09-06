import React from 'react';
import { shallow, mount } from 'enzyme';
import Table from './table';
import Cell from './cell';

describe('Table Component', () => {
        it('It should render a box with 9 Cells components', async (done) => {
            const wrapper = shallow(<Table />);
            expect(wrapper.find(Cell).length).toBe(9);
            done();
        }, 10000);
});

it('clicking on reset button', () =>{
    const onClick = jest.fn();
    let wrapper = mount(<Table />);
    wrapper.find('button.reset-btn').first().simulate('click');
    expect('onClick').toBe.true;
});

it('clicking on rewind button', () =>{
    const onClick = jest.fn();
    let wrapper = mount(<Table />);
    wrapper.find('button.rewind-btn').first().simulate('click');
    expect('onClick').toBe.true;
});
