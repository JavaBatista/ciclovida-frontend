// import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import React, { useState, useEffect, forwardRef } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import axios from "axios";

// material-ui
import { Typography, Grid, TextField } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import StatisticsCard from 'components/cards/statistics/StatisticsCard';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialDay = {
	"id": 0,
	"date": "2022-07-08",
	"startTime": "2022-07-08T08:30:00Z",
	"finishTime": "2022-07-08T10:00:00Z",
	"cyclingTime": "00:00:00",
	"distance": 0.0,
	"odometer": 0.0,
	"maxSpeed": 0.0,
	"avgSpeed": 0.0,
	"windCondition": "WEAK",
	"comments": "",
	"totalTime": "00:00:00",
	"cyclingQuality": 0.0
}

const meses = [
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

  const semana = [
      "Domingo", 
      "Segunda-Feira", 
      "Terça-Feira", 
      "Quarta-Feira", 
      "Quinta-Feira", 
      "Sexta-Feira", 
      "Sábado"
    ];



const DayDialog = ({ openDialog, date }) => {
    const [open, setOpen] = useState(false);
    const [day, setDay] = useState(initialDay);

    useEffect(() => {

        if (typeof date != "undefined") {
            getDay();
            handleClickOpen();
        }

    }, [date]);

    const userId = useSelector((state) => state.session.userId);
    const authorization = useSelector((state) => state.session.authorization);

    const getDay = () => {

        // console.log(userId);
        // console.log(authorization);
    
        const config = {
            "headers": {
                "Authorization": `Basic ${authorization}`
            }
        };
        const url = `http://localhost:8080/user/${userId}/day?date=${date.format('YYYY-MM-DD')}`;
    
        axios.get(url, config)
            .then(res => {
                // console.log(res.data)
                setDay(res.data);
            })
            .catch(err => console.log(err))
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function dialogTitle() {

        let title = `${semana[dayjs(date).day()]}, ${dayjs(date).date()} de ${meses[dayjs(date).month()]} de ${dayjs(date).year()}`;
        return title;
    }
 

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth={true}
            maxWidth='lg'
        >
            <DialogTitle><Typography variant="h4">{`${dialogTitle()}`}</Typography></DialogTitle> 
            <DialogContent>

                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Hora de saída" value={`${dayjs(day.startTime).format('HH:mm:ss')} AM`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Hora de chegada" value={`${dayjs(day.finishTime).format('HH:mm:ss')} AM`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Tempo total" value={` ${day.totalTime}`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Tempo de atividade" value={` ${day.cyclingTime}`} />
                    </Grid>

                    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Velocidade média" value={`${day.avgSpeed} Km/h`} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Velocidade máxima" value={`${day.maxSpeed} Km/h`} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Distância" value={`${day.distance} Km`} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Odômetro" value={`${day.odometer} Km`} />
                    </Grid>

                    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                    <Grid item xs={12} md={30} lg={30}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item >
                                <Typography variant="h5">Comentários</Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    size="small"
                                    onClick={() => { }}
                                    // color={slot === 'distance' ? 'primary' : 'secondary'}
                                    variant={'text'}
                                >
                                    Editar
                                </Button>
                            </Grid>
                        </Grid>
                        <TextField
                            id="outlined-multiline-static"
                            //   label="Multiline"
                            multiline
                            rows={4}
                            defaultValue={day.comments.length == 0 ? "Sem comentários":day.comments}
                            disabled
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined'>Voltar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DayDialog;