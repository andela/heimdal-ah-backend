import eventEmitter from '../helpers/eventEmitter';

import highlightsLogic from '../lib/highlightsLogic';

const { updateHighlights } = highlightsLogic;

const events = {
  register() {
    eventEmitter.on('UPDATEHIGHLIGHT', (highlightedPortions, body, userId) => {
      updateHighlights(highlightedPortions, body, userId);
    });
  }
};

export default events;
