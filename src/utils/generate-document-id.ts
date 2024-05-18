//create a functino that will generate a unid id with format doc-date-time-randomnumber
// import moment from 'moment';

import moment from 'moment';

export const generateDocumentId = () => {
  const date = moment().format('DDMMYYYYhhmmss');
  const random = Math.floor(Math.random() * 1000);
  return `doc-${date}-${random}`;
};
