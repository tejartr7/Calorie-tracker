import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const List = ({ title }) => {
    const email = localStorage.getItem('mail');
    const [items, setItems] = useState([]);
    const [cal, setCal] = useState(0);
    const [pro, setPro] = useState(0);
    const [value, setValue] = useState(0);
    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:8000/items/${email}/${title}`);
            if (response.status === 200) {
                const data = await response.json();
                setItems(data);
                if (value === 0) {
                    setCal(prevCal => data.reduce((totalCal, item) => totalCal + item.cal, prevCal));
                    setPro(prevPro => data.reduce((totalPro, item) => totalPro + item.proteins, prevPro));
                }
                setValue(value + 1);
            } else {
                console.error('Error fetching items:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching items:', error.message);
        }
    };

    useEffect(() => {
        // Fetch items initially
        fetchItems();

        // Set up interval to fetch items every second
        const intervalId = setInterval(fetchItems, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [value]); // Empty dependency array ensures the effect runs only once on mount

    const handleDelete = async (itemName, itemGrams) => {
        try {
            const response = await fetch(`http://localhost:8000/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: email,
                    title: title.toLowerCase(),
                    itemName: itemName.toLowerCase(),
                    itemGrams: itemGrams,
                }),
            });

            if (response.status === 200) {
                // Item deleted successfully, update the list
                fetchItems();
            } else {
                console.error('Error deleting item:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };

    return (
        <div className="table-responsive">
            <h3 className='fw-bold'>Items in your {title}</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity(g)</th>
                        <th>Calories(kcal)</th>
                        <th>Proteins(g)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.itemid}>
                            <td>{item.itemName}</td>
                            <td>{item.itemGrams}</td>
                            <td>{item.cal}</td>
                            <td>{item.proteins}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleDelete(item.itemName, item.itemGrams)}
                                    className="bg-black text-white"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                    {/* Total Row */}
                    <tr>
                        <td className="fw-bold">Total</td>
                        <td></td>
                        <td className="fw-bold">{cal}</td>
                        <td className="fw-bold">{pro}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default List;