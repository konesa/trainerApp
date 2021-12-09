import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, TextField } from '@mui/material';
import { Stack } from '@mui/material';
import moment from 'moment';

export default function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [activity, setactivity] = useState('');
    const [duration, setDuration] = useState('');
    const [customer, setCustomer] = useState('');

    const dateChanged = (event) => { setDate(event.target.value); }
    const timeChanged = (event) => { setTime(event.target.value); }
    const activityChanged = (event) => { setactivity(event.target.value); }
    const durationChanged = (event) => { setDuration(event.target.value); }
    const customerChanged = (event) => { setCustomer(event.target.value); }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = (props) => {
        var dateString = date+" "+time;
        dateString = moment().toISOString(dateString);
        console.log(dateString)
        const data = {
            date:date,
            activity: activity,
            duration: duration,
            customer: props.links[0].href
        }

        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(data);
                if (!response.ok) {
                    alert("User registration failed!")
                    throw new Error(response.statusText)
                } else {
                    alert('New user created!')
                    window.location.replace("/customers");
                }
            })
    }

    
    const handleClick = () => {
        handleSubmit();
        handleClose();
    }

    console.log(time)
    console.log(date)

    return (
        <div>
            <Button onClick={handleOpen}>Add training</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add training
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack component="form" noValidate spacing={3}>
                                <TextField
                                    id="date"
                                    label="Date"
                                    type="date"
                                    defaultValue=""
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={dateChanged}
                                />
                                <TextField
                                    id="time"
                                    label="Time"
                                    type="time"
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300
                                    }}
                                    sx={{ width: 150 }}
                                    onChange={timeChanged}
                                />
                                <TextField
                                    id="activity"
                                    label="Activity"
                                    type="text"
                                    defaultValue=""
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={activityChanged}
                                />
                                <TextField
                                    id="duration"
                                    label="Duration"
                                    type="number"
                                    defaultValue=""
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 15,
                                        min:15
                                    }}
                                    onChange={durationChanged}
                                />
                            </Stack>
                            <Button onClick={handleClick}>Add training</Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
