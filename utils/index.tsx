export const calculateTime = (unit: string, date) => {
  const birthDate = new Date(date);
  const monthEl = birthDate.getMonth();
  const dayEl = birthDate.getDay();
  const currentDate = new Date();
  const diff = currentDate.getTime() - birthDate.getTime();
  let elapsedTime = 0;
  switch (unit) {
    case 'weeks':
      let elapsedYears = new Date(diff).getUTCFullYear() - 1970;
      let isThisYearsBirthdayPassed =
        currentDate.getTime() >
        new Date(currentDate.getUTCFullYear(), monthEl, dayEl).getTime();
      let birthdayYearOffset = isThisYearsBirthdayPassed ? 0 : 1;
      let dateOfLastBirthday = new Date(
        currentDate.getUTCFullYear() - birthdayYearOffset,
        monthEl,
        dayEl,
      );
      let elapsedDaysSinceLastBirthday = Math.floor(
        (currentDate.getTime() - dateOfLastBirthday.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      let elapsedWeeks =
        elapsedYears * 52 + Math.floor(elapsedDaysSinceLastBirthday / 7);
      elapsedTime = elapsedWeeks;
      break;
    case 'months':
      elapsedTime = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
      break;
    case 'years':
      elapsedTime = new Date(diff).getUTCFullYear() - 1970;
      break;
  }
  return elapsedTime;
};

export const calculateElapsedPercentage = (
  elapsedTime: number,
  total: number,
) => {
  return Math.floor((elapsedTime / total) * 100);
};
