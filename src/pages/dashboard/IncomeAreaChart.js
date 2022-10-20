import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import dayjs from 'dayjs';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot, month }) => {
    const theme = useTheme();

    const userId = useSelector((state) => state.session.userId);
    const authorization = useSelector((state) => state.session.authorization);
    const date = useSelector((state) => state.session.date);

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);
    const [days, setDays] = useState([]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories: getXAxis(),
                    // slot === 'distance'
                    //     ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    //     : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary
                        ]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount: days.length  //slot === 'distance' ? 11 : 7
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, secondary, line, theme, slot, days]);

    const [series, setSeries] = useState([
        // {
        //     name: 'Distância',
        //     data: [0, 86, 28, 115, 48, 210, 136]
        // },
        // {
        //     name: 'Duração',
        //     data: [0, 43, 14, 56, 24, 105, 68]
        // }
    ]);

    useEffect(() => {
        setSeries([
            {
                name: slot === 'distance' ? 'Distância (Km)':`Duração (h)`,
                data: slot === 'distance' ? getDistances() : getDurations()
                // slot === 'distance' ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
            }
            // {
            //     name: 'Duração (h)',
            //     data: getDurations()
            //     // slot === 'distance' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
            // }
        ]);
    }, [slot, days]);



    function dados() {

        const config = {
            "headers": {
                "Authorization": `Basic ${authorization}`
            }
        };
        const url = `http://localhost:8080/user/${userId}/days/month?date=${month}`;

        axios.get(url, config)
            .then(res => {
                console.log(res.data)
                setDays(res.data);
                // alert(res.data);
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        dados();
    },[month]);

    function getXAxis() {
        const xAxis =days.map((day) => {
           return day.date;
        });

        return xAxis;
    }

    function getDistances() {
        const distances =days.map((day) => {
            return day.distance;
         });
 
         return distances;
    }

    function getDurations() {
        const durations =days.map((day) => {
            const finishTime = dayjs(day.finishTime)
            // startTime.diff(day.startTime, 'hour', true)
            return finishTime.diff(day.startTime, 'hour', true).toFixed(2)
         });
 
         return durations;
    }

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
    slot: PropTypes.string
};

export default IncomeAreaChart;
