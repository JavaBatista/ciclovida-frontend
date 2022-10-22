import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// material-ui
import { Typography, Grid, TextField } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import StatisticsCard from 'components/cards/statistics/StatisticsCard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DayDialog = ({ openDialog, date }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {

        if (typeof date != "undefined") {
            handleClickOpen();
        }

    }, [date]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //{`${date}`}

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth="xl"
        >
            <DialogTitle><Typography variant="h5">{`${date}`}</Typography></DialogTitle> 
            <DialogContent>

                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Mês" value={"janeiro"} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Total De Dias" value={` 15 ias`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Tempo Total" value={` 1:00:15 horas`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Distância Total" value={`24 Km`} />
                    </Grid>

                    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Mês" value={"janeiro"} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Mês" value={"janeiro"} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Mês" value={"janeiro"} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatisticsCard title="Mês" value={"janeiro"} />
                    </Grid>

                    <Grid item xs={12} md={7} lg={22}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
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
                            defaultValue="Sem comentários"
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