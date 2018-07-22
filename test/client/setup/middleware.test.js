
import { expect } from 'chai';

import middleware from 'client/js/setup/middleware';

describe('setup middleware', () => {

  it('included', () => {

    const mockThunk = 'MOCK_THUNK';

    middleware.__Rewire__('thunk', mockThunk);

    expect(middleware()).to.eql([mockThunk]);

    middleware.__ResetDependency__('thunk');

  });

});
