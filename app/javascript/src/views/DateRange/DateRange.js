//  import React from 'react';
// import { DateRangePicker } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';

// const DateRange = ({identifier, handleInput}) => {
//   console.log("kgkkg")

//     // const {identifier, handleInput} = props;
  
//     const handleDateRangeChange = (date) => {
//     //   console.log(date);
//       const startDate = formatDate(date[0]);
//       const endDate = formatDate(date[1]);
//       handleInput(identifier, {startDate, endDate});
//     }
  
//     const formatDate = (date) => {
//       console.log("kkffk")
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${year}-${month}-${day}`;
//     }
  
//     return (
//       <DateRangePicker format="dd-MM-yyyy" block showOneCalendar placeholder='DD-MM-YYYY to DD-MM-YYYY'onChange={handleDateRangeChange}/>
//     )
//   }
  
//   export default DateRange;
