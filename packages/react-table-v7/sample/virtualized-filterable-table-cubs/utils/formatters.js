export const formatDate = (val) => {
  var date = new Date(val);

  let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  return `${day} ${month} ${year}`;
};

export const formatCurrency = (val, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencySign: 'accounting',
    signDisplay: 'never',
  });

  return formatter.format(val);
};
