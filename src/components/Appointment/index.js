import React, { useState } from "react";

import "./styles.scss";
// import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


export default function Appointment(props) {
  const { student, interviewer } = props.interview || {};

  return (
    <div className="appointment">
      <Header time={props.time} />
      {props.interview ? 
        <Show student={student} interviewer={interviewer.name} /> : 
        <Empty />}
    </div>
  )
}