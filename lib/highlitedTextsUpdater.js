/* eslint-disable no-await-in-loop */
import models from '../models';

const { HighlightedText } = models;

const updateAllHighlightedIndexes = async (userId, articleId, reqBody, res) => {
  const { highlightedPortions, body } = reqBody;

  try {
    let count = 0;
    const updatedPortions = [];
    for (let i = 0; i < highlightedPortions.length; i += 1) {
      const { highlightId, text: highlightedText } = highlightedPortions[i];

      const thisHighlight = await HighlightedText.findOne({
        where: {
          id: highlightedPortions[i].id,
          highlightId
        }
      });

      if (thisHighlight) {
        const checkHighlightedText = body.includes(highlightedText);
        console.log('===================== Check', checkHighlightedText);
        console.log('===================== highlightedText', highlightedText);
        console.log('===================== highlightedText', body);

        if (checkHighlightedText) {
          console.log('=====================Check', checkHighlightedText);

          const startIndex = body.indexOf(highlightedText);
          const stopIndex = startIndex + highlightedText.length;
          const newHighlightId = `${startIndex}-${stopIndex}`;

          console.log('===================== startIndex', startIndex);
          // return newHighlightId;
          const thisUpdate = await thisHighlight.update(
            {
              startIndex,
              stopIndex,
              highlightId: newHighlightId,
              stillExist: true
            },
            { returning: true }
          );
          updatedPortions.push(thisUpdate);
          // return res.send(check);
        } else {
          const thisUpdate = await thisHighlight.update(
            {
              stillExist: false
            },
            { returning: true }
          );
          updatedPortions.push(thisUpdate);
        }
      }
      count += 1;

      console.log('\n\n\n\n\n\nCOUNT============================', count);
    }
    return count === highlightedPortions.length ? updatedPortions : false;
  } catch (error) {
    return false;
  }
};

export default updateAllHighlightedIndexes;
