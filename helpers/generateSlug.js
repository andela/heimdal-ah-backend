/* eslint-disable no-restricted-properties */
import slugify from 'slugify';

const generateSlug = str => (
  `${slugify(str, '-')}-${(Math.floor(Math.random() * Math.pow(25, 6))).toString(36)}`
);

export default generateSlug;
