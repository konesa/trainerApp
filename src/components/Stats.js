import React, { useEffect, useState } from "react";
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from "lodash";

function Stats() {

    const [isLoaded, setIsLoaded] = useState([])
    const [groupedData, setGroupedData] = useState([])
    const [summedData, setSummedData] = useState([])
    const [dataReady, setDataReady] = useState(false)

/*======================================= Fetch the data from the server ==============================================*/

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => {
                if (!response.ok)
                    throw new Error(response.statusText)
                return response
            })
            .then(response => response.json())
            .then(data => {
                setGroupedData(_.groupBy(data, 'activity'))
                setIsLoaded(true)
            }
            )
    }, [])

/*================================= After fetching, the status of data is set to true so the filtering can be done ==============*/
/*================================= Final product is an array with training name and the total time =============================*/

    if (isLoaded) {
        setSummedData([])
        var totalMinutes = 0;
        var groupedArray = Object.entries(groupedData)
        for (var i = 0; i < groupedArray.length; i++) {
            totalMinutes = 0;
            const name = groupedArray[i][0];
            for (var n = 0; n < groupedArray[i][1].length; n++) {
                var duration = groupedArray[i][1][n].duration
                totalMinutes += duration;
            }
            if (totalMinutes > 0) {
                const newEntry = { name, totalMinutes }
                setSummedData(prevState => [...prevState, newEntry])
            }
        }
        setDataReady(true)
        setIsLoaded(false)
    }

/*========================================= Return the component ============================================*/

    if (!dataReady) {
        return <div>Loading</div>
    }
    else {
        return (
            <BarChart width={1200} height={600} data={summedData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis dataKey="totalMinutes" />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="totalMinutes" fill="#8884d8" barSize={30} />
            </BarChart>
        )
    }
}

export default Stats;