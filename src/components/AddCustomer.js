import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

    const handleSubmit = event => {
        event.preventDefault();
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
                    throw new Error(response.statusText)
                } else {
                    alert('New user created!')
                    window.location.replace("/customers");
                }
            })
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
                        <div className="form-area">
                            <form onSubmit={handleSubmit}>
                                <h1>Add customer</h1>
                                <div>
                                    <label for="firstname">First name:</label>
                                    <input id="firstname" type="text" onChange={firstnamechanged} value={firstname} />
                                </div>
                                <div>
                                    <label for="lastname">Last name:</label>
                                    <input id="lastname" type="text" onChange={lastnamechanged} value={lastname} />
                                </div>
                                <div>
                                    <label for="streetaddress">Street address:</label>
                                    <input id="streetaddress" type="text" onChange={streetaddresschanged} value={streetaddress} />
                                </div>
                                <div>
                                    <label for="postcode">Postcode:</label>
                                    <input id="postcode" type="number" onChange={postcodechanged} value={postcode} />
                                </div>
                                <div>
                                    <label for="city">City:</label>
                                    <input id="city" type="text" onChange={citychanged} value={city} />
                                </div>
                                <div>
                                    <label for="email">Email:</label>
                                    <input id="email" type="text" onChange={emailchanged} value={email} />
                                </div>
                                <div>
                                    <label for="phone">Phone number:</label>
                                    <input id="phone" type="text" onChange={phonechanged} value={phone} />
                                </div>
                                <div>
                                    <input type="submit" value="Register customer"></input>
                                </div>
                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}