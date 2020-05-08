import React from 'react';
import '../App.css';
import data from '../gifs.json'
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import GifCard from './GifCard';

class GifList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { test: true }
    }

    render() {
        return (
            <div>
                <Form className="search-bar">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Search for gif tags</Form.Label>
                        <Form.Control type="text" placeholder="Search gif title" />
                    </Form.Group>
                </Form>

                <CardColumns>
                    {data.gifs.map((gif, index) =>
                        <GifCard gif={gif} index={index} />
                    )}
                </CardColumns>
            </div>
        );
    }
}

export default GifList;