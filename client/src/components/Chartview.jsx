import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';

const Chartview = ({ title }) => {
    Chart.register(ArcElement);
    Chart.register(Tooltip);
    const email = localStorage.getItem('mail');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/items/${email}/${title}`);
            if (response.status === 200) {
                const data = response.data;

                const totalCalories = data.reduce((sum, item) => sum + item.cal, 0);
                const totalProteins = data.reduce((sum, item) => sum + item.proteins, 0);

                setChartData({
                    labels: ['Total Proteins (g)', 'Calories(kcal)'],
                    datasets: [
                        {
                            data: [totalProteins, totalCalories],
                            backgroundColor: ['#F4CE14', '#45474B'],
                            // hoverBackgroundColor: ['#1640D6', '#1640D6'],
                            radius: 150,
                        },
                    ],
                });
                console.log(chartData.datasets[0].data);
            } else {
                console.error('Error fetching items:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching items:', error.message);
        }
    };

    return (
        <div>
            {chartData && chartData.datasets && parseInt(chartData.datasets[0].data[0]) > 0 ? (
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (label) => { return label.formattedValue; },
                                },
                            },
                            legend: {
                                display: false, // Optionally, you can hide the legend if not needed
                            },
                        },
                        layout: {
                            padding: 0,
                            margin: 0,
                        },
                        elements: {
                            arc: {
                                borderWidth: 0, // Optionally, you can remove the border of the arc elements
                            },
                        },
                        height: 40,
                    }}
                />
            ) : (
                <p>You didn't add any item</p>
            )}
        </div>
    );
};
export default Chartview;
