import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function CustomerList() {

    const [customers, setCustomers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

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

    /*============================================== Modal styling ====================================================*/
    /*================================================= NOT MY OWN WORK ==============================================*/

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

    /*============================================ Add training function =============================================*/
    
    function capitalFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleSubmit = () => {
        var dateString = date + "T" + time + ":00.000Z";
        const data = {
            date: dateString,
            activity: capitalFirstLetter(activity),
            duration: duration,
            customer: customer
        }

        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    alert("Adding training failed!")
                    throw new Error(response.statusText)
                } else {
                    alert('New training added!')
                }
            })
        setCustomer('')
    }


    const handleClick = () => {
        handleSubmit();
        handleClose();
    }

    /*================================ Used to fetch the data =======================================================================*/

    if (!isLoaded) {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => {
                if (!response.ok)
                    throw new Error(response.statusText)
                return response
            })
            .then(response => response.json())
            .then(data => {
                setCustomers(data.content)
                setIsLoaded(true)
            })
    }

    /*============================================ Deletes the user ===============================================================*/

    const deleteConfirm = (prop) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this user?"
        )
        if (confirmBox) {
            fetch(prop.links[0].href, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error(response.statusText)
                    return response
                })
                .then(setIsLoaded(false))
        }
    }

    /*=============================================== Component return===============================================================*/

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                editable={{
                    onRowUpdate: (rowData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                fetch(rowData.links[0].href, {
                                    method: "PUT",
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(rowData)
                                })
                                    .then(response => {
                                        if (!response.ok)
                                            throw new Error(response.statusText)
                                        return response
                                    })
                                    .then(setIsLoaded(false))
                                    .then(resolve())
                            }, 500);
                        })
                }
                }
                actions={[
                    {
                        icon: DeleteIcon,
                        tooltip: 'Delete user',
                        onClick: (event, rowData) => {
                            deleteConfirm(rowData);
                        }
                    },
                    {
                        icon: AddIcon,
                        tooltip: 'Add training',
                        onClick: (event, rowData) => {
                            handleOpen();
                            setCustomer(rowData.links[0].href)
                        }
                    }
                ]}

                icons={{
                    Filter: () => <div />, Export: DownloadIcon, Search: SearchIcon, SortArrow: ArrowDownwardIcon, NextPage: ArrowForwardIcon,
                    PreviousPage: ArrowBackIcon, LastPage: FastForwardIcon, FirstPage: FastRewindIcon, Clear: ClearIcon,
                    Check: DoneIcon, Edit: ModeEditIcon
                }}
                options={{
                    filtering: true,
                    exportButton: true,
                    tableLayout: 'auto'
                }}
                columns={[
                    {
                        title: "First name", field: "firstname"
                    },
                    {
                        title: "Lastname", field: "lastname"
                    },
                    {
                        title: "Address", field: "streetaddress"
                    },
                    {
                        title: "Postcode", field: "postcode"
                    },
                    {
                        title: "City", field: "city"
                    },
                    {
                        title: "Email", field: "email"
                    },
                    {
                        title: "Phone", field: "phone"
                    }]}
                data={customers}
                title="Customers"
            />
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add a training
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
                                            min: 15
                                        }}
                                        onChange={durationChanged}
                                    />
                                </Stack>
                                <Button style={{ 'color': "green" }} onClick={handleClick}>Submit</Button>
                                <Button style={{ 'color': "red" }} onClick={() => handleClose()}>Close</Button>
                            </Box>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}