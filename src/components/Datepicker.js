import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers';

const minDate = dayjs('2022-10-01T00:00:00.000');
const maxDate = dayjs('2022-10-30T00:00:00.000');

const tdate = dayjs('2022-10-15');

const Datepicker = () => {
  const [date, setDate] = React.useState(dayjs('2022-10-14'));

  const renderDays = (day, selectedDays, pickersDayProps) => {

        let select = day.isSame('2022-10-10', 'day');

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
            value={minDate} 
            onChange={(newDate) => setDate(newDate)} 
            renderDay={renderDays}
            renderInput={(params) => <TextField {...params} />}
            />
    </LocalizationProvider>
  );
}


export default Datepicker;