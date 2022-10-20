import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import dayjs from 'dayjs';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    Stack,
    Typography
} from '@mui/material';

// project import
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
// import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import StatisticsCard from 'components/cards/statistics/StatisticsCard';
import Datepicker from 'components/Datepicker';
import { func } from 'prop-types';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

function monthDate(monthStats) {
    var meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ];
    return typeof monthStats !== 'undefined' ? `${meses[dayjs(monthStats.date).month()]} de ${dayjs(monthStats.date).year()}`:"";
}

function totalDays(monthStats) {
    return typeof monthStats !== 'undefined' ? monthStats.totalDays:"";
}

function totalDuration(monthStats) {
    return typeof monthStats !== 'undefined' ? monthStats.totalDuration:"";
}

function totalDistance(monthStats) {
    return typeof monthStats !== 'undefined' ? monthStats.totalDistance:"";
}

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [months, setMonths] = useState([]);
    const [month, setMonth] = useState();
    const [monthStats, setMonthStats] = useState();

    useEffect(() => {
        getMonths();

    }, []);

    useEffect(() => {

        if (typeof months !== 'undefined') {

            let stats = months.filter(word => word.date === month);
            // console.log(monthStats[0]);
            setMonthStats(stats[0]);
        }


    }, [month]); //

    const updateMonth = (newMonth) => {
        setMonth(newMonth);
     }

    const userId = useSelector((state) => state.session.userId);
    const authorization = useSelector((state) => state.session.authorization);
    const date = useSelector((state) => state.session.date);


    const getMonths = () => {

        // console.log(userId);
        // console.log(authorization);

        const config = {
            "headers": {
                "Authorization": `Basic ${authorization}`
            }
        };
        const url = `http://localhost:8080/user/${userId}/stats/months/year?date=${date}`;

        axios.get(url, config)
            .then(res => {
                let monthArray = res.data;
                console.log(monthArray)
                setMonths(monthArray);
                setMonth(monthArray[monthArray.length - 1].date);
            })
            .catch(err => console.log(err))
    }

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatisticsCard title="Mês" value={monthDate(monthStats)} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatisticsCard title="Total De Dias" value={`${totalDays(monthStats)} dias`} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatisticsCard title="Tempo Total" value={`${totalDuration(monthStats)} horas`} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatisticsCard title="Distância Total" value={`${totalDistance(monthStats)} Km`} isLoss color="warning" extra="$20,395" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Unique Visitor</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <Button
                                size="small"
                                onClick={() => setSlot('month')}
                                color={slot === 'month' ? 'primary' : 'secondary'}
                                variant={slot === 'month' ? 'outlined' : 'text'}
                            >
                                Month
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setSlot('week')}
                                color={slot === 'week' ? 'primary' : 'secondary'}
                                variant={slot === 'week' ? 'outlined' : 'text'}
                            >
                                Week
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <IncomeAreaChart slot={slot} />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Datas</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        {/* <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                This Week Statistics
                            </Typography>
                            <Typography variant="h3">$7,650</Typography>
                        </Stack> */}
                        <Datepicker updateMonth={updateMonth} />
                    </Box>
                    {/* <MonthlyBarChart /> */}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
