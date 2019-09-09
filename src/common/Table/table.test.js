import React from 'react';
import { shallow, mount } from 'enzyme';
import Table from './table';
import Row from './row';
import Header from './header';
import DialogTable from './DialogTable';
import PinnedTable from './PinnedTable';
import { Dialog } from '@material-ui/core';

import {
    TableRow,
    TableHeader,
} from './SharedStyles';

describe('Table Component', () => {
    it('It should render a Table with Pinned and Dialog table options', async (done) => {
        const wrapper = shallow(<Table />);
        expect(wrapper.find('div')).to.have.lengthOf(1);
        done();
    }, 10000);
});

describe('Row Component', () => {
    it('It should render a Table with Pinned and Dialog table options', async (done) => {
        const wrapper = shallow(<Row row={{}} headers={[{}]} />);
        expect(wrapper.find(TableRow)).to.have.lengthOf(1);
        done();
    }, 10000);
});

describe('Header Component', () => {
    it('It should render a Table with Pinned and Dialog table options', async (done) => {
        const wrapper = shallow(<Header headers={[{}]} />);
        expect(wrapper.find(TableHeader)).to.have.lengthOf(1);
        done();
    }, 10000);
});

describe('DialogTable Component', () => {
    it('It should render a Table with Pinned and Dialog table options', async (done) => {
        const wrapper = shallow(<DialogTable showCmpDialog showCmpDialog closeDialog={()=>{}} compareRows={[{}]} compareHeaders={[{}]} />);
        expect(wrapper.find(Dialog)).to.have.lengthOf(1);
        done();
    }, 10000);
});

describe('PinnedTable Component', () => {
    it('It should render a Table with Pinned and Dialog table options', async (done) => {
        const wrapper = shallow(<PinnedTable pinnedHeaders={[{}]} />);
        expect(wrapper.find('div')).to.have.lengthOf(1);
        done();
    }, 10000);
});

// it('clicking on reset button', () =>{
//     const onClick = jest.fn();
//     let wrapper = mount(<Table />);
//     wrapper.find('button.reset-btn').first().simulate('click');
//     expect('onClick').toBe.true;
// });

// it('clicking on rewind button', () =>{
//     const onClick = jest.fn();
//     let wrapper = mount(<Table />);
//     wrapper.find('button.rewind-btn').first().simulate('click');
//     expect('onClick').toBe.true;
// });
