import React from 'react';
import '../App.css';
import Badge from 'react-bootstrap/Badge';

class GifBadges extends React.Component {
    render() {
        return (
            <div>
                <h4>
                    {this.props.tags.map((tag, index) =>
                        <Badge key={index} variant="primary" onClick={(e) => this.props.handleBadgeClick(e)}>
                            #{tag}
                        </Badge>
                    )}
                </h4>
            </div>
        );
    }
}

export default GifBadges;