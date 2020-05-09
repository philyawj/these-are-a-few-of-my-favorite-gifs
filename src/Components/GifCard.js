import React from 'react';
import '../App.css';
import Card from 'react-bootstrap/Card';

class GifCard extends React.Component {
    render() {
        return (
            <Card key={this.props.index}>
                <Card.Img className="gif-img" alt={this.props.gif.alt} src={'/assets/gifs/' + this.props.gif.name + '.gif'} />
                <Card.Body>
                    <Card.Title>{this.props.gif.name}</Card.Title>
                    <Card.Text>
                        <small className="text-muted">{this.props.gif.tags.map(tag => ' #' + tag)}</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default GifCard;