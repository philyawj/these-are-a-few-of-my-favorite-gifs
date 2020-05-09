import React from 'react';
import '../App.css';
import data from '../gifs.json'
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import GifCard from './GifCard';

class GifContainer extends React.Component {

    state = {
        inputValue: '',
        gifs: [],
        topTags: []
    };

    componentDidMount() {
        // join the tags array into comma seperated tag string to filter with toLowerCase() for filteredGifs
        data.gifs.forEach(gif => {
            gif.tagString = gif.tags.join();
        });

        // set state on load to full list of gifs
        this.setState({ gifs: data.gifs });

        this.topArrayTags();
    }

    gifFilterOnChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    handleTagClick = (event) => {
        // clicking tag under gif sets search bar
        let str = event.target.textContent;
        // substr removes front # and ending space
        this.setState({ inputValue: str.substr(1, str.length - 1) })
    };

    handlePillClick = (event) => {
        // clicking tag under gif sets search bar
        let str = event.target.textContent;
        // substr removes front # and ending space
        this.setState({ inputValue: str.substr(1, str.length - 1) })
    };

    formPreventDefault(e) {
        e.preventDefault();
    }

    topArrayTags() {
        // get all tags into one array
        let oneTagArray = [];
        data.gifs.forEach(gif => oneTagArray = oneTagArray.concat(gif.tags))

        // key: value counts
        let tagCounts = {};
        oneTagArray.forEach(function (x) { tagCounts[x] = (tagCounts[x] || 0) + 1; });

        // state set to tags in order of highest usage
        let tagSorted = Object.keys(tagCounts);
        tagSorted = tagSorted.sort(function (a, b) { return tagCounts[b] - tagCounts[a] });
        this.setState({ topTags: tagSorted.slice(0, 10) })
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

                <div>
                    <h4>The top tags go here</h4>
                    {this.state.topTags.map((tag, index) =>
                        <Badge key={index} variant="primary" onClick={(e) => this.handlePillClick(e)}>
                            #{tag}
                        </Badge>
                    )}
                </div>

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