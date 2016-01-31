import { expect } from 'chai';
import React from 'react';
import connectData from '../connectData';

describe('connectData', () => {
    let fetchData;
    let fetchDataDeferred;
    let WrappedComponent;
    let DataComponent;

    beforeEach(() => {
        fetchData = () => {};
        fetchDataDeferred = () => {};

        WrappedComponent = () => <div />;

        DataComponent = connectData(fetchData, fetchDataDeferred)(WrappedComponent);
    });

    it('should set fetchData as a static property of the final component', () => {
        expect(DataComponent.fetchData).to.equal(fetchData);
        expect(DataComponent.fetchData).to.not.equal(fetchDataDeferred);
    });

    it('should set fetchDataDeferred as a static property of the final component', () => {
        expect(DataComponent.fetchDataDeferred).to.equal(fetchDataDeferred);
        expect(DataComponent.fetchDataDeferred).to.not.equal(fetchData);
    });
});
