import React from 'react';
//import PropTypes from 'prop-types';
import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
      document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
      document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>{"\n"}
          <span className="value">{movie.description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.genre.name}</span>
          <div>
            <span className="label">Description: </span>
            <span className="value">{movie.genre.description}</span>
          </div>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.director.name}</span>
          <div>
            <span className="label">Bio: </span>
            <span className="value">{movie.director.bio}</span>
          </div>
          <div>
            <span className="label">Birth Date: </span>
            <span className="value">{movie.director.birth}</span>
          </div>
        </div>

        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>

    );
  }
}