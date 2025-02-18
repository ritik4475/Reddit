/**
 * @description : function to calculate time elapsed from now to a given date
 * @param {string} targetDate : Date string
 * @returns {string} : Time elapsed in string
 *
 * * Example usage:
 * * const targetDate = new Date("2023-09-20T12:00:00"); // Replace with your target date
 * * calculateTimeElapsed(targetDate);
 */
function formatTime(targetDateString) {
    const currentDate = new Date();
  
    const targetDate = new Date(targetDateString);
  
    if (Number.isNaN(targetDate.getTime())) {
      return "Invalid date format";
    }
  
    const elapsedMilliseconds = currentDate.getTime() - targetDate.getTime();
  
  // Calculate elapsed seconds, minutes, hours, days, weeks, months, years
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedWeeks = Math.floor(elapsedDays / 7);
    const elapsedMonths =
      (currentDate.getFullYear() - targetDate.getFullYear()) * 12 +
      (currentDate.getMonth() - targetDate.getMonth());
    const elapsedYears = Math.floor(elapsedMonths / 12);
  
    if (elapsedYears > 0) {
      return `${elapsedYears} y`;
    }
  //   if (elapsedMonths > 0) {
  //     return `${elapsedMonths} m`;
  //   }
    if (elapsedWeeks > 0) {
      return `${elapsedWeeks} week`;
    }
    if (elapsedDays > 0) {
      return `${elapsedDays} day`;
    }
    if (elapsedHours > 0) {
      return `${elapsedHours} hour`;
    }
    if (elapsedMinutes > 0) {
      return `${elapsedMinutes} minutes`;
    }
    if (elapsedSeconds > 0) {
      return `${elapsedSeconds} second`;
    }
    return "just now";
  }
  
  export default formatTime;