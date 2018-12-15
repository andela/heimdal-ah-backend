/* eslint-disable no-restricted-properties */
import slugify from 'slugify';

const generateSlug = str => (
  `${slugify(str, '-')}`
);

export default generateSlug;
