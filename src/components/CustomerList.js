import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import AddCustomer from './AddCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

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

    return (
        <div style={{ maxWidth: '100%' }}>
            <AddCustomer />
            <MaterialTable
                actions={[
                    {
                        icon: DeleteIcon,
                        tooltip: 'Delete user',
                        onClick: (event, rowData) => {
                        }
                    },
                    {
                        icon: EditIcon,
                        tooltip: 'Edit user',
                        onClick: (event, rowData) => {
                        }
                    },
                    {
                        icon: AddIcon,
                        tooltip: 'Add training',
                        onClick: (event, rowData) => {
                        }
                    }
                ]}

                icons={{ Filter: () => <div />, Export: DownloadIcon, Search: SearchIcon }}
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