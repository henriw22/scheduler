import { useState, useEffect, useReducer } from "react";

const axios = require('axios');

export default function useApplicationData(props) {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   // you may put the line below, but will have to remove/comment hardcoded appointments variable
  //   appointments: {},
  //   interviewers: {}
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

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

  function reducer(state, action) {
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

  const initialState = {
    days: [],
    appointments: {},
    interviewers: {},
    day: 'Monday'
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  
  function bookInterview(id, interview) {
    console.log('book interview: ', id, interview);
    // const isEdit = Boolean(state.appointments[id].interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    // setState({ ...state, appointments });

    return axios.put(`api/appointments/${id}`, appointment)
      .then(res => {
        // console.log('respond: ', res);
        // const days = state.days.map((day) => {
        //   if (day.appointments.includes(id)) {
        //     return { ...day, spots: isEdit ? day.spots : day.spots - 1 } 
        //   }
        //   return day;
        // })
        // setState({ ...state, appointments, days })
        dispatch({ type: SET_INTERVIEW, id, interview });
      })
      // .catch(err => console.log(err));
  }

  function cancelInterview(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    // setState({ ...state, appointments })

    return axios.delete(`api/appointments/${id}`)
      .then(res => {
        // console.log('respond: ', res);
        // const days = state.days.map((day) => {
        //   if (day.appointments.includes(id)) {
        //     return { ...day, spots: day.spots + 1 } 
        //   }
        //   return day;
        // })
        // setState({ ...state, appointments, days })
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      })
      // .catch(err => console.log(err));
  }
    
  const setDay = day => dispatch({ type: SET_DAY, day });


  useEffect(() => {
    const days = "api/days";
    const appointments = "api/appointments";
    const interviewers = "api/interviewers";
    Promise.all([
      axios.get(days),
      axios.get(appointments),
      axios.get(interviewers)
    ]).then((all) => {
      console.log('all: ', all[1].data);
      // set your states here with the correct values...
      // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
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
