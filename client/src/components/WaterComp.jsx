import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const WaterComp = () => {
  const [item, setItem] = useState([]);
  const title = "water";
  const email = localStorage.getItem('mail');

  useEffect(() => {
    fetchItems();
  }, []); // Fetch items on component mount

  const fetchItems = async () => {
    try {
      const response = await fetch(`https://calorie-tracker-backend-cwwr.onrender.com/items/${email}/${title}`);
      if (response.status === 200) {
        const data = await response.json();
        setItem(data);
      } else {
        console.error('Error fetching items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };

  const handleDelete = async (itemName, itemGrams) => {
    try {
      const response = await fetch(`https://calorie-tracker-backend-cwwr.onrender.com/delete/`, {
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
        // No need to manually fetch items here
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  // Use useEffect to re-fetch items after deletion
  useEffect(() => {
    fetchItems();
  }, [item]); // Fetch items whenever the 'item' state changes

  return (
    <div className="d-flex justify-content-center align-items-center vh-75 m-5">
      <Card style={{ width: '18rem', border: '2px solid black' }}>
        <Card.Header>
          <h5 className="text-center">Water Consumption</h5>
        </Card.Header>
        <Card.Body>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity(ml)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {item.map((item) => (
                <tr key={item.itemid}>
                  <td>{item.itemName}</td>
                  <td>{item.itemGrams}</td>
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
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WaterComp;
