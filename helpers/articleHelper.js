const articleHelper = {
  /**
   * @description This method is used to calculate an articles reading time
   * @param {String} bodyText - sentences, phrases, paragraphs etc
   * @returns {String} readingTime
   */
  calcReadingTime(bodyText) {
    // const matches = bodyText.match(/\w+/g);
    // const matches = bodyText.match(/[\w\d\’\'-]+/gi);
    // const matches = bodyText.trim().split(/\s+/);

    const matches = bodyText.match(/\S+/g);
    const numberOfWords = matches ? matches.length : 0;
    const averageWPM = 225;
    const readingTime = Math.ceil(numberOfWords / averageWPM);

    console.log('numberOfWords::', numberOfWords);

    return readingTime > 1 ? `${readingTime} mins read` : `${readingTime} min read`;
  }
};

export default articleHelper;
