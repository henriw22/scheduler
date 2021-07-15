import { useState, useEffect, useReducer } from "react";

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData(props) {

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
