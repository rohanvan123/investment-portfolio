export const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate;
};

export const getTwoDaysBefore = (date: Date) => {
  const twoDaysBefore = new Date(date);
  twoDaysBefore.setDate(date.getDate() - 4);
  return twoDaysBefore;
};

export const getEightDaysBefore = (date: Date) => {
  const fiveDaysBefore = new Date(date);
  fiveDaysBefore.setDate(date.getDate() - 9);
  return fiveDaysBefore;
};

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDateRange = () => {
  // Get the current date
  const currentDate = getCurrentDate();

  // Get the dates for 2 days before the current date and 5 days before that
  const twoDaysBeforeDate = getTwoDaysBefore(currentDate);
  const eightDaysBeforeDate = getEightDaysBefore(currentDate);

  const res: string[] = [];
  res.push(formatDateToYYYYMMDD(eightDaysBeforeDate));
  res.push(formatDateToYYYYMMDD(twoDaysBeforeDate));
  return res;
};
