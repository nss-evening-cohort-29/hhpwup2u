const moneyFormat = (number) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return USDollar.format(number);
};

export default moneyFormat;
