import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import axios from "axios"
import {
    Chart as ChartJS,
    BarElement
} from 'chart.js'

ChartJS.register(BarElement)

const bar = () => {

    const [graphData, setGraphData] = useState(null)

    useEffect(() => {

        const labels = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]
        const getBooksAdded = async () => {
            try {
                const response = await axios.get('https://library-analytics-microservices.onrender.com/analytics/bookPerMonth')
                const data = response.data
                const count = data.map((item) => {
                    const lastTwoDigits = item._id.slice(-2);
                    return {
                        index: lastTwoDigits,
                        count: item.count
                    };
                })
                let counts = []
                let y = 0;
                for (let i = 0; i < 12; i++) {
                    if (count[y] && i + 1 == count[y].index) {
                        counts[i] = count[y].count
                        y++;
                    } else {
                        counts[i] = 0;
                    }

                }

                setGraphData({
                    labels,
                    datasets: [
                        {
                            data: counts,
                            fill: true,
                            backgroundColor: 'rgb(234, 0, 0)',
                            borderColor: 'rgb(255, 72, 0)',
                            borderWidth: 1
                        }
                    ]
                })
            } catch (error) {
                console.log(error.message)
            }


        }
        getBooksAdded()
    }, [])


    const options = {
        responsive: true,                 // Make the chart responsive
        maintainAspectRatio: false,       // Disable maintaining the aspect ratio
        plugins: {
            legend: {
                display: false,              // Display the legend
            },
            tooltip: {
                enabled: true,              // Enable tooltips
                mode: 'index',               // Tooltip displays based on index (category)
                intersect: false,            // Tooltip doesn't intersect on multiple bars
            },
            title: {
                display: false,              // Optionally display a title above the chart
            }
        },
    };


    return (
        <>
            {graphData ? (
                <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                    <Bar data={graphData} options={options} />
                </div>
            ) : (
                <div>Loading chart...</div>
            )}
        </>
    )
}


export default bar