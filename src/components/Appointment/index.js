import React, { useState } from "react";

import "./styles.scss";
// import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const { student, interviewer } = props.interview || {};
  console.log('props = ', props);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true))
    // transition(SHOW)
  }
  
  function onDelete () {
    transition(CONFIRM);
  }

  function onConfirm() {
    const id = props.id;
    transition(DELETE, true);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
  }

  function onEdit () {
    transition(EDIT);
  }

  return (
    <div className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer.name}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save} 
            onCancel={() => back()} 
          />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETE && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Delete the appointment?"
          onConfirm={onConfirm} 
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={student}
          interviewer={interviewer.id}
          interviewers={props.interviewers}
          onSave={save} 
          onCancel={() => back()} 
      />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment." 
          onClose={() => back()} 
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment."
          onClose={() => back()} 
          // onClose={() => transition(CREATE, true)} 
        />
      )}

      {/* {props.interview ? 
        <Show student={student} interviewer={interviewer.name} /> : 
        <Empty />} */}
    </div>
  )
}