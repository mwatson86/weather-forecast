
import sinon from 'sinon';
import { expect } from 'chai';

import renderer from 'server/middleware/renderer';

describe('server renderer middleware', () => {

  it('calls render method with expected args', () => {

    const renderStub = sinon.stub();

    const mockResponse = {
      render: renderStub
    };

    const mockAssets = {
      mock: 'assets'
    };

    renderer.__Rewire__('assets', mockAssets);

    renderer({}, mockResponse);

    expect(renderStub.calledOnce).to.be.true;
    expect(renderStub.calledWith('index', { assets: mockAssets })).to.be.true;

    renderer.__ResetDependency__('assets');

  });

});
