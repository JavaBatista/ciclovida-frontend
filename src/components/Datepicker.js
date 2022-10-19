import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers';

import { useSelector } from 'react-redux';
import axios from "axios";

const minDate = dayjs('2022-10-01T00:00:00.000');
const maxDate = dayjs('2022-10-30T00:00:00.000');

const tdate = dayjs('2022-10-15');

const Datepicker = () => {
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState(dayjs('2022-10-07'));

  useEffect(() => {
    getDates();
  }, []);

  const userId = useSelector((state) => state.session.userId);
  const authorization = useSelector((state) => state.session.authorization);
  const date = useSelector((state) => state.session.date);

  const getDates = () => {

    // console.log(userId);
    // console.log(authorization);

    const config = {
        "headers": {
            "Authorization": `Basic ${authorization}`
        }
    };
    const url = `http://localhost:8080/user/${userId}/dates/year?date=${date}`;

    axios.get(url, config)
        .then(res => {
            console.log(res.data)
            setDates(res.data);
        })
        .catch(err => console.log(err))
  }

  const renderDays = (day, selectedDays, pickersDayProps) => {

        // let select = day.isSame('2022-10-10', 'day');
        let select = dates.includes(day.format('YYYY-MM-DD'));

    return (
        <PickersDay {...pickersDayProps} day={day}  selected={select} disabled={!select} /> 
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker 
            // minDate={minDate}
            maxDate={maxDate}
            displayStaticWrapperAs="desktop"
            value={value} 
            onChange={(newValue) => {
                setValue(newValue);
              }}
            renderDay={renderDays}
            renderInput={(params) => <TextField {...params} />}
            />
    </LocalizationProvider>
  );
}


export default Datepicker;