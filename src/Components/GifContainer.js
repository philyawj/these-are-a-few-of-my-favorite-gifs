import React from 'react';
import '../App.css';
import data from '../gifs.json'
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import GifCard from './GifCard';

class GifContainer extends React.Component {

    state = {
        inputValue: '',
        gifs: []
    };

    componentDidMount() {
        // join the tags array into comma seperated tag string to filter with toLowerCase() for filteredGifs
        data.gifs.forEach(gif => {
            gif.tagString = gif.tags.join();
        });

        // set state on load to full list of gifs
        this.setState({ gifs: data.gifs });
    }

    gifFilterOnChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    handleTagClick = (event) => {
        // clicking tag under gif sets search bar
        let str = event.target.textContent;
        // substr removes front # and ending space
        this.setState({ inputValue: str.substr(1, str.length - 2) })
    };

    formPreventDefault(e) {
        e.preventDefault();
    }

    render() {
        const filteredGifs = this.state.gifs.filter(gif => {
            return gif.tagString.toLowerCase().includes(this.state.inputValue.toLowerCase());
        });

        return (
            <div>
                <Form className="search-bar" onSubmit={this.formPreventDefault}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Search for gif tags</Form.Label>
                        <Form.Control type="text" value={this.state.inputValue} onChange={this.gifFilterOnChange} />
                    </Form.Group>
                </Form>

                <CardColumns>
                    {filteredGifs.map((gif, index) =>
                        <GifCard gif={gif} index={index} key={index} handleTagClick={this.handleTagClick} />
                    )}
                </CardColumns>
            </div>
        );
    }
}

export default GifContainer;