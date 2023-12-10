import React, { useState, useEffect } from 'react';
import { Form as BootstrapForm, Button, Col, Row } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import itemData from './Items';

const CommonInput = ({ title, addItem }) => {
    const { enqueueSnackbar } = useSnackbar();
    const mail = localStorage.getItem('mail');

    const [itemName, setItemName] = useState('');
    const [itemGrams, setItemGrams] = useState('');
    const [itemProteins, setItemProteins] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Breakfast'); // Default category
    const [isXSScreen, setIsXSScreen] = useState(false);

    const placeholder = title === 'water' ? 'Add items in ml' : 'Enter item in grams';

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

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!itemName || !itemGrams) {
            enqueueSnackbar('Please enter all required fields', { variant: 'error' });
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/add', {
                email: mail,
                title: selectedCategory.toLowerCase(),
                itemName: itemName.toLowerCase(),
                itemGrams: itemGrams,
                itemProteins: itemProteins,
            });
            if (response.status === 200) {
                enqueueSnackbar('Item added successfully', { variant: 'success' });
            } else {
                enqueueSnackbar('Error in adding item', { variant: 'error' });
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error in adding item', { variant: 'error' });
        }
        setItemName('');
        setItemGrams('');
        setItemProteins('');
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setIsXSScreen(screenWidth <= 1000);
        };

        // Initial call to set the `isXSScreen` state based on the screen width
        handleResize();

        // Add an event listener to update `isXSScreen` when the window is resized
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Row className={`justify-content-center ${isXSScreen ? 'common-input-xs' : ''}`}>
            <Col lg={9} md={9}>
                <div className='common-input' style={{
                    border: '2px solid white',
                    borderRadius: '25px',
                    animation: 'blink-border 1s infinite alternate',
                }}>
                    <BootstrapForm className='ms-1'>
                        <Row className="mb-3">
                            <Col md={12} lg={12} className="text-center">
                                <h1 className="fw-bold m-3" size="4">
                                    Log an item
                                </h1>
                            </Col>
                        </Row>

                        <Row className="mb-3 justify-content-center">
                            {/* Item Name */}
                            <Col md={3} xs={6} className="text-center mb-3" style={{ margin: '0 10px' }}>
                                <div className="scroll-container">
                                    <BootstrapForm.Label className="size-4 fw-bold">Item Name</BootstrapForm.Label>
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={{
                                            placeholder: 'Item name',
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
                                </div>
                            </Col>

                            {/* Grams/Calories/Proteins */}
                            <Col md={3} xs={6} className="text-center mb-3" style={{ margin: '0 10px' }}>
                                <div className="scroll-container">
                                    <BootstrapForm.Label className="size-3 fw-bold">Quantity</BootstrapForm.Label>
                                    <BootstrapForm.Control
                                        type="text"
                                        placeholder='grams/kcal'
                                        value={itemGrams}
                                        className="form-control fw-bold max-width-200" // Add a custom class for styling
                                        onChange={(e) => setItemGrams(e.target.value)}
                                    />
                                </div>
                            </Col>

                            {/* Proteins */}
                            <Col md={3} xs={6} className="text-center mb-3" style={{ margin: '0 10px' }}>
                                <div className="scroll-container">
                                    <BootstrapForm.Label className="size-4 fw-bold">Proteins(g)</BootstrapForm.Label>
                                    <BootstrapForm.Control
                                        type="text"
                                        placeholder="Proteins in grams"
                                        value={itemProteins}
                                        className="form-control fw-bold"
                                        onChange={(e) => setItemProteins(e.target.value)}

                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12} className="text-center mb-3">
                                {/* Toggle Button for selecting meal category */}
                                <Row className="justify-content-center">
                                    {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((category) => (
                                        <Col key={category} xs={6} md={2} className="mb-2">
                                            <Button
                                                variant={selectedCategory === category ? 'success' : 'outline-dark'}
                                                className="w-150 m-2 p-1"
                                                style={{ borderRadius: '5px', border: '2px solid black', backgroundColor: '#005c5c',color:'white' }}
                                                onClick={() => handleCategoryChange(category)}
                                            >
                                                {category}
                                            </Button>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={12} className="d-flex align-items-center justify-content-center">
                                <Button variant="dark" onClick={handleAdd} className="bg-black text-white">
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </BootstrapForm>
                </div>
            </Col>
        </Row>
    );
};

export default CommonInput;