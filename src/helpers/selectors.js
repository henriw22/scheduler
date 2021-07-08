export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appointments;
  let result;
  if (state.days.length === 0) {
    result = [];
  } else {
    for (let x of state.days) {
      if (x.name === day) {
        appointments = x.appointments;
        result = appointments.map (key => state.appointments[key]);
        console.log('result: ', result);
        break;
      } else {
        result = [];
      }
    }
  }
  return result;
}