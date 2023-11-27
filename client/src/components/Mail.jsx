import React from 'react';
import axios from 'axios';

const Mail = () => {
    const handleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:8000/sendmail',{
                mail:"raghusai126@gmail.com"
            });
            if (response.status === 200) {
                console.log('Mail sent successfully');
            } else {
                console.error('Error sending mail:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending mail:', error.message);
        }
    };
    return (
        <div>
        <button onClick={handleSubmit}>send mail</button>
        </div>
    )
}

export default Mail