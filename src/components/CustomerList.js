import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import AddCustomer from './AddCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

export default function CustomerList() {
    const [customers, setCustomers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

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
                console.log(data.content)
            })
    }

    /*============================================ Deletes the user ===============================================================*/


    const deleteConfirm = (props) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this user?"
        )
        if (confirmBox) {
            fetch(props.links[0].href, {
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
            <AddCustomer />
            <MaterialTable
                cellEditable={{
                    cellStyle: {},
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                        return new Promise((resolve, reject) => {
                            console.log('newValue: ' + newValue);
                            setTimeout(resolve, 4000);
                        });
                    }
                }}
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
                        }
                    }
                ]}

                icons={{ Filter: () => <div />, Export: DownloadIcon, Search: SearchIcon, SortArrow: ArrowDownwardIcon, NextPage:ArrowForwardIcon,
                PreviousPage:ArrowBackIcon, LastPage:FastForwardIcon, FirstPage:FastRewindIcon, Clear:ClearIcon, Check:DoneIcon
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
        </div>
    )
}