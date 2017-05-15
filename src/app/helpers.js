import moment from 'moment';

const helpers = (() => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getCurrentMonth = () => {
    return months[moment().month()];
  };

  const getCurrentTimestamp = () => {
    return new Date().getTime();
  };

  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
  };

  const sortByMonth = (data) => {
    const sortedDataByMonth = [];
    _.forEach(months, (month) => {
      const dataForTheMonth = _.find(data, {_id: month.toLowerCase()});
      if(dataForTheMonth) {
        sortedDataByMonth.push(dataForTheMonth);
      }
    });
    return sortedDataByMonth;
  };

  return {
    months,
    getCurrentMonth,
    getCurrentTimestamp,
    formatDate,
    sortByMonth
  };
})();

export default helpers;
