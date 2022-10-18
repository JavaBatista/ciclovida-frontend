import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';

import { useTheme } from '@mui/material/styles';

const Datepicker = () => {

    const theme = useTheme();

    const defaultValue = {
        year: 2019,
        month: 10,
        day: 5
    };

    const [selectedDay, setSelectedDay] = useState(defaultValue);
    return (
        <Calendar 
        value={selectedDay} 
        onChange={setSelectedDay} 
        shouldHighlightWeekends 
        // colorPrimary={theme.palette.primary} 
        // colorPrimaryLight={theme.palette.primary.light}
        />
        );
        
};

export default Datepicker;
