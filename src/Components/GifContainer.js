import React from 'react';
import '../App.css';
import data from '../gifs.json'
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import GifCard from './GifCard';

class GifContainer extends React.Component {

    state = {
        test: 123,
        inputValue: '',
        gifs: []
    };

    componentDidMount() {
        this.setState({ gifs: data.gifs });
    }

    gifFilterOnChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    render() {
        const filteredGifs = this.state.gifs.filter(gif => {
            return gif.name.toLowerCase().includes(this.state.inputValue.toLowerCase());
        });
        console.log(filteredGifs);

        return (
            <div>
                <Form className="search-bar">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Search for gif tags</Form.Label>
                        <Form.Control type="text" value={this.inputValue} onChange={this.gifFilterOnChange} />
                    </Form.Group>
                </Form>

                <CardColumns>
                    {filteredGifs.map((gif, index) =>
                        <GifCard gif={gif} index={index} key={index} />
                    )}
                </CardColumns>
            </div>
        );
    }
}

export default GifContainer;