import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, TextField } from '@mui/material';
import { textAlign } from '@mui/system';

export default function AddCustomer() {

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


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [streetaddress, setstreetaddress] = useState('');
    const [postcode, setpostcode] = useState('');
    const [city, setcity] = useState('');

    const firstnamechanged = (event) => { setfirstname(event.target.value); }
    const lastnamechanged = (event) => { setlastname(event.target.value); }
    const emailchanged = (event) => { setemail(event.target.value); }
    const phonechanged = (event) => { setphone(event.target.value); }
    const streetaddresschanged = (event) => { setstreetaddress(event.target.value); }
    const postcodechanged = (event) => { setpostcode(event.target.value); }
    const citychanged = (event) => { setcity(event.target.value); }

    const handleSubmit = () => {
        const data = {
            firstname: firstname,
            lastname: lastname,
            streetaddress: streetaddress,
            postcode: postcode,
            city: city,
            email: email,
            phone: phone
        }

        fetch('https://customerrest.herokuapp.com/api/customers', {
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

    return (
        <div>
            <Button onClick={handleOpen}>Add customer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add a customer
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
                            <FormControl>
                            <TextField
                                required
                                id="firstname"
                                label="First name"
                                defaultValue=""
                                variant="standard"
                                onChange={firstnamechanged}
                            />
                            <TextField
                                required
                                id="lastname"
                                label="Last name"
                                variant="standard"
                                onChange={lastnamechanged}
                            />
                            <TextField
                                required
                                id="email"
                                label="Email"
                                variant="standard"
                                onChange={emailchanged}
                            />
                            <TextField
                                required
                                id="phonenumber"
                                label="Phone"
                                variant="standard"
                                onChange={phonechanged}
                            />
                            <TextField
                                required
                                id="streetaddress"
                                label="Address"
                                variant="standard"
                                onChange={streetaddresschanged}
                            />
                            <TextField
                                required
                                id="postcode"
                                label="Postcode"
                                variant="standard"
                                onChange={postcodechanged}
                            />
                            <TextField
                                required
                                id="city"
                                label="City"
                                variant="standard"
                                onChange={citychanged}
                            />
                            <br/>
                            <Button onClick={handleClick}>Submit</Button>
                            </FormControl>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}