export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const getAppointments = (state, id, interview) => {
  const appointment = {
    ...state.appointments[id],
    interview: interview
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return appointments;
}

const getDays = (state, id, interview) => {
  const isEdit = Boolean(state.appointments[id].interview);
  const days = state.days.map((day) => {
    if (day.appointments.includes(id)) {
      const newSpots = !interview ? day.spots + 1 : isEdit ? day.spots : day.spots - 1;
      return { ...day, spots: newSpots }; 
    }
    return day;
  })
  return days;
}


export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      return { ...state, appointments: getAppointments(state, action.id, action.interview), days: getDays(state, action.id, action.interview) };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
