import React from 'react';
import '../App.css';
import Card from 'react-bootstrap/Card';

class GifCard extends React.Component {
    render() {
        return (
            <Card key={this.props.index} className="bg-dark text-white">
                <Card.Img className="gif-img" alt={this.props.gif.alt} src={'/assets/gifs/' + this.props.gif.name + '.gif'} />
                <Card.Body>
                    <Card.Text>
                        {this.props.gif.tags.map((tag, index) =>
                            <span onClick={(e) => this.props.handleTagClick(e)} key={index} className="gif-tag" data-tag={tag}>#{tag}</span>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default GifCard;