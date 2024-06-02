import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { RangePicker } from "react-multi-date-picker";
import "./DateRange.css";
import InputIcon from "react-multi-date-picker/components/input_icon"

const DateRange = ({startDates, endDates,handleStartDateChanges, handleEndDateChanges}) => {
 console.log(startDates, endDates,handleStartDateChanges, handleEndDateChanges)
  return (
    <DatePicker
    // multiple
    range
      value={[startDates, endDates]}
      onChange={(date) => {
        if (date && date.length === 2) {
          handleStartDateChanges(date[0]);
          handleEndDateChanges(date[1]);
        }
      }}
      dateSeparator=" to "
      plugins={<RangePicker />}
      render={<InputIcon/>}
      className="custom-calendar"
    />
  );
};

export default DateRange;
