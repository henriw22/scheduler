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
};

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const dayData = state.days.filter(x => x.name === day);
  if (dayData.length === 0 || !Array.isArray(dayData[0].interviewers)) {
    return [];
  }
  const interviewers = dayData[0].interviewers;
  return interviewers.map(key => state.interviewers[key]);
}

export function getInterview(state, interview) {
  if(interview) {
    const newInterview = { ...interview };
    // console.log ('initial: ', interview);
    // console.log(interview);
    const interviewerId = newInterview.interviewer;
    // console.log(state.interviewers)
    const interviewer = state.interviewers[interviewerId];
    newInterview.interviewer = interviewer;
    // console.log('after: ', interview);
    return  newInterview;
  }
  return null;
}