import React, { useState } from 'react';
import { Form as BootstrapForm, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import List from './List';
import { useSnackbar } from 'notistack';
import Autosuggest from 'react-autosuggest'; // Import Autosuggest
// Import your CSS file with the suggested styles

const Form = ({ title, token }) => {
  const itemData =
    // Your item data here
    [
      {
        "name": "panner",
      },
      {
        "name": "rice",
      },
      {
        "name": "dal",
      },
      {
        "name": "roti",
      },
      {
        "name": "chicken",
      },
      {
        "name": "potato",
      },
      {
        "name": "bread",
      },
      {
        "name": "egg",
      },
      {
        "name": "milk",
      },
      {
        "name": "banana",
      },
      {
        "name": "apple",
      },
      {
        "name": "orange",
      },
      {
        "name": "carrot",
      },
      {
        "name": "broccoli",
      },
      {
        "name": "lettuce",
      },
      {
        "name": "tomato",
      },
      {
        "name": "cucumber",
      },
      {
        "name": "onion",
      },
      {
        "name": "garlic",
      },
      {
        "name": "ginger",
      },
      {
        "name": "mushroom",
      }
      , {
        "name": "fish",
      },
      {
        "name": "curd",
      }
    ];

  const [itemName, setItemName] = useState('');
  const [itemGrams, setItemGrams] = useState('');
  const [itemProteins, setItemProteins] = useState(''); //added by me
  const { enqueueSnackbar } = useSnackbar();

  const [suggestions, setSuggestions] = useState([]);
  // const [value, setValue] = useState('');

  const placeholder = title === 'Water' ? 'Add items in ml' : 'Enter item in grams';

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-item">
      {suggestion.name}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    setSuggestions(
      inputLength === 0
        ? []
        : itemData.filter((item) =>
          item.name.toLowerCase().includes(inputValue)
        )
    );

  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const handleAdd = async () => {
    const mail = localStorage.getItem('mail');
    try {
      if (itemName === '' || itemGrams === '') {
        return alert('Please fill all the fields');
      }
      //console.log(`Item added to ${title}: ${itemName}, ${itemGrams} grams , ${itemProteins} proteins`);
      if (itemProteins === '') {
        setItemProteins('');
      }
      const response = await axios.post('http://localhost:8000/add', {
        email: mail,
        title: title.toLowerCase(),
        itemName: itemName.toLowerCase(),
        itemGrams: itemGrams,
        itemProteins: itemProteins,
      });

      if (response.status === 200) {
        //localStorage.setItem('value',0);

        enqueueSnackbar('Item added successfully', {
          variant: 'success',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          /* onClose: () => {
             window.location.reload();
           },*/
        });
      } else alert('Error adding item');
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setItemName('');
    setItemGrams('');
    setItemProteins('');
  };

  return (
    <BootstrapForm className='ms-1'>
      <Row>
        <List title={title} />
      </Row>
    </BootstrapForm>
  );
};

export default Form;