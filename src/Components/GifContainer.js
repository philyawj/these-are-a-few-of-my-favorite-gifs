import React from 'react';
import '../App.css';
import data from '../gifs.json'
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import GifCard from './GifCard';
import GifBadges from './GifBadges';

class GifContainer extends React.Component {

    // #TODO sort in random order on load
    // #TODO add more columns
    state = {
        inputValue: '',
        gifs: [],
        topTags: []
    };

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    componentDidMount() {

        // join the tags array into comma seperated tag string to filter with toLowerCase() for filteredGifs
        this.shuffleArray(data.gifs).forEach(gif => {
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

    handleBadgeClick = (event) => {
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
            <div className="container">
                <Form className="search-bar" onSubmit={this.formPreventDefault}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control placeholder="Search" size="lg" type="text" value={this.state.inputValue} onChange={this.gifFilterOnChange} />
                    </Form.Group>
                </Form>

                <GifBadges tags={this.state.topTags} handleBadgeClick={this.handleBadgeClick} />

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