import { useState, useEffect, useReducer } from "react";

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData(props) {
  // const SET_DAY = "SET_DAY";
  // const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  // const SET_INTERVIEW = "SET_INTERVIEW";


  // const getAppointments = (state, id, interview) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: interview
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return appointments;
  // }

  // const getDays = (state, id, interview) => {
  //   const isEdit = Boolean(state.appointments[id].interview);
  //   const days = state.days.map((day) => {
  //     if (day.appointments.includes(id)) {
  //       const newSpots = !interview ? day.spots + 1 : isEdit ? day.spots : day.spots - 1;
  //       return { ...day, spots: newSpots }; 
  //     }
  //     return day;
  //   })
  //   return days;
  // }

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case SET_DAY:
  //       return { ...state, day: action.day };
  //     case SET_APPLICATION_DATA:
  //       return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
  //     case SET_INTERVIEW: {
  //       return { ...state, appointments: getAppointments(state, action.id, action.interview), days: getDays(state, action.id, action.interview) };
  //     }
  //     default:
  //       throw new Error(
  //         `Tried to reduce with unsupported action type: ${action.type}`
  //       );
  //   }
  // }

  const initialState = {
    days: [],
    appointments: {},
    interviewers: {},
    day: 'Monday'
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log('before = ', state.days[0].spots);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      })
    }

  function cancelInterview(id) {
    return axios.delete(`api/appointments/${id}`)
      .then(res => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      })
    }
    
  const setDay = day => dispatch({ type: SET_DAY, day });


  useEffect(() => {
    const days = "/api/days";
    const appointments = "/api/appointments";
    const interviewers = "/api/interviewers";
    Promise.all([
      axios.get(days),
      axios.get(appointments),
      axios.get(interviewers)
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    })
  }, [])
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};
