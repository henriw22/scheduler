import React, { useState } from "react";

import "./styles.scss";
// import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const { student, interviewer } = props.interview || {};

  return (
    <div className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer.name}
        />
      )}
      {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={() => console.log("onSave")} 
            onCancel={() => back()} 
          />
      )}

        

      {/* {props.interview ? 
        <Show student={student} interviewer={interviewer.name} /> : 
        <Empty />} */}
    </div>
  )
}