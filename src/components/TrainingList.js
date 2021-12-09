import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TrainingList() {

    const [trainings, setTrainings] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    /*================================ Used to fetch the data =======================================================================*/

    if (!isLoaded) {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => {
                if (!response.ok)
                    throw new Error(response.statusText)
                return response
            })
            .then(response => response.json())
            .then(data => {
                setTrainings(data)
                setIsLoaded(true)
                console.log(data)
            })
    }

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
             actions={[
                {
                    icon: DeleteIcon,
                    tooltip: 'Delete user',
                    onClick: (event, rowData) => {
                    }
                }]}
                icons={{ Filter: () => <div />, Export: DownloadIcon, Search: SearchIcon }}
                options={{
                    filtering: true,
                    exportButton: true,
                    tableLayout: 'fixed'
                }}
                columns={[
                    {
                        title: "Time", field: "date",
                        render: rowData => dayjs(rowData.value).format('DD MMM YYYY HH:MM')

                    },
                    {
                        title: "Activity", field: "activity"
                    },
                    {
                        title: "Duration (minutes)", field: "duration"
                    },
                    {
                        title: 'First name', field: 'customer.firstname'
                    },
                    {
                        title: 'Last name', field: 'customer.lastname'
                    }
                ]}
                data={trainings}
                title="Trainings"
            />
        </div>
    )
}