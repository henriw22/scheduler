import React from "react";
import classnames from 'classnames/bind';

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (num) => {
    // let result = "";
    // if (num === 0) {
    //   result = "no spots remaining";
    // } else if (num === 1) {
    //   result = `1 spot remaining`;
    // } else {
    //   result = `${num} spots remaining`;
    // }
    // return result;

    return `${num === 0 ? 'no' : num} ${num === 1 ? 'spot' : 'spots'} remaining`;
  }


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}