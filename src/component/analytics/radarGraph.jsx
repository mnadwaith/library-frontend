import { Radar } from 'react-chartjs-2'
import { useEffect, useState } from "react"
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, LineElement, PointElement, Filler, Title, Tooltip, Legend);

const radar = () => {



    const [graphData, setGraphData] = useState(null)


    useEffect(() => {

        const getAvgReview = async () => {
            try {
                const authToken = JSON.parse(sessionStorage.getItem('authToken'))
                const response = await axios.get('http://localhost:3007/analytics/avgRating', { headers: { Authorization: `Bearer ${authToken.token}` } })
                const data = response.data
                const labels = data.map((item) => item._id)
                const rating = data.map((item) => item.avgRating)

                setGraphData({
                    labels,
                    datasets: [
                        {
                            data: rating,
                            fill: true,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            pointBackgroundColor: 'rgb(54, 162, 235)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(54, 162, 235)'
                        }
                    ]
                })

            } catch (error) {
                console.log(error.message)
            }
        }
        getAvgReview()
    }, [])


    const options = {
        responsive: true,  // Makes the chart responsive
        maintainAspectRatio: false,  // Prevents aspect ratio from being constrained
        plugins: {
            legend: {
                display: false,  // Display the legend
            },
            tooltip: {
                enabled: true,  // Enable tooltips
                mode: 'index',  // Display tooltips based on index
                intersect: false,  // Tooltips don't intersect
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: true,  // Display radial lines
                },
                ticks: {
                    stepSize: 1,  // Spacing between ticks
                    backdropColor: 'transparent',
                    color: '#000',  // Tick text color
                    font: {
                        size: 0.1,
                    },
                },
                pointLabels: {
                    font: {
                        size: 12,  // Font size for point labels
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.2)',  // Light grid color
                },
            },
        },

    };


    return (
        <>
            {graphData ? (
                <div className="h-100 rounded-3">
                    <Radar data={graphData} options={options} />
                </div>
            ) : (
                <div>Loading chart...</div>
            )}
        </>
    )

}
export default radar