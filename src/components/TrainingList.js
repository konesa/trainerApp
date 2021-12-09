import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

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

    /*============================================== Deletes the training =============================================================*/


    function deleteConfirm(prop) {
        const confirmBox = window.confirm(
            "Do you really want to delete this training?"
        )

        if (confirmBox === true) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + prop.id, {
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

    /*================================================== Component return ===========================================================*/

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                actions={[
                    {
                        icon: DeleteIcon,
                        tooltip: 'Delete training',
                        onClick: (event, rowData) => {
                            deleteConfirm(rowData)
                        }
                    }]}
                icons={{
                    Filter: () => <div />, Export: DownloadIcon, Search: SearchIcon, SortArrow: ArrowDownwardIcon, NextPage: ArrowForwardIcon,
                    PreviousPage: ArrowBackIcon, LastPage: FastForwardIcon, FirstPage: FastRewindIcon, Clear:ClearIcon, Check:DoneIcon
                }}
                options={{
                    filtering: true,
                    exportButton: true,
                    tableLayout: 'auto'
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