
import { expect } from 'chai';
import sinon from 'sinon';

import reducers from 'client/js/reducers';

describe('app reducers', () => {

  it('combine reducers', () => {

    const result = reducers({}, {
      type: 'FAKE_ACTION'
    });

    expect(result).to.have.all.keys(
      'form',
      'forecasts',
      'location'
    );

  });

});
