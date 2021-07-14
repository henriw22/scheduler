import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  
  
  function bookInterview(id, interview) {
    console.log('book interview: ', id, interview);
    const isEdit = Boolean(state.appointments[id].interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState({ ...state, appointments });
    console.log('before = ', state.days[0].spots);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {
        console.log('respond: ', res);
        const days = state.days.map((day) => {
          if (day.appointments.includes(id)) {
            return { ...day, spots: isEdit ? day.spots : day.spots - 1 } 
          }
          return day;
        })
        setState({ ...state, appointments, days })
        console.log('after = ', state.days[0].spots);
      })
      // .catch(err => console.log(err));
    }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({ ...state, appointments })
    console.log('before = ', state.days[0].spots);
    return axios.delete(`api/appointments/${id}`)
      .then(res => {
        console.log('respond: ', res);
        const days = state.days.map((day) => {
          if (day.appointments.includes(id)) {
            return { ...day, spots: day.spots + 1 } 
          }
          return day;
        })
        setState({ ...state, appointments, days })
        console.log('after = ', state.days[0].spots);
      })
      // .catch(err => console.log(err));
    }
    
  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    const days = "/api/days";
    const appointments = "/api/appointments";
    const interviewers = "/api/interviewers";
    Promise.all([
      axios.get(days),
      axios.get(appointments),
      axios.get(interviewers)
    ]).then((all) => {
      // console.log('all: ', all[1].data);
      // set your states here with the correct values...
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};
