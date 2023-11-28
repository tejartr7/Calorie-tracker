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
      console.log(`Item added to ${title}: ${itemName}, ${itemGrams} grams`);
      const response = await axios.post('http://localhost:8000/add', {
        email: mail,
        title: title.toLowerCase(),
        itemName: itemName.toLowerCase(),
        itemGrams: itemGrams,
        itemProteins: itemProteins,
      });
      localStorage.setItem('value', 0);
      if (response.status === 200) {
        //localStorage.setItem('value',0);
        //console.log(localStorage.getItem('value'));
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
    <BootstrapForm>
      <Row>
        <Col md={12} className="text-center">
          <BootstrapForm.Label className="fw-bold mb-3" size="4">
            Log an item to {title}:
          </BootstrapForm.Label>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4} className="text-center">
          <BootstrapForm.Label className="size-4 fw-bold">Item Name:</BootstrapForm.Label>

          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'Enter item name',
              value: itemName,
              onChange: (event, { newValue }) => setItemName(newValue),
              className: 'form-control fw-bold',
            }}
            theme={{
              container: 'autosuggest-container',
              suggestionsContainer: 'suggestions-container',
              suggestionsList: 'suggestions-list',
            }}
          />
        </Col>
        <Col md={4} className="text-center">
          <BootstrapForm.Label className="size-4 fw-bold">Item in Grams/Calories:</BootstrapForm.Label>
          <BootstrapForm.Control
            type="text"
            placeholder={placeholder}
            value={itemGrams}
            className="form-control fw-bold"
            onChange={(e) => setItemGrams(e.target.value)}
          />
        </Col>
        <Col md={4} className="text-center">
          <BootstrapForm.Label className="size-4 fw-bold">Proteins(g)</BootstrapForm.Label>
          <BootstrapForm.Control
            type="text"
            placeholder="Enter proteins in grams"
            value={itemProteins}
            className="form-control fw-bold"
            onChange={(e) => setItemProteins(e.target.value)}
          />
        </Col>
        <Col md={12} className="d-flex align-items-center justify-content-center mt-4">
          <Button variant="primary" onClick={handleAdd} className="bg-black text-white">
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <List title={title} />
      </Row>
    </BootstrapForm>
  );
};

export default Form;