import React from 'react';
import explainPlaylistData from './PlaylistDataAnalysis';

const GenreComponent = ({ genres, spotifyQuery, feedback }) => (
  <div id="genre-component">
    <p>Happiness: {(feedback.joyLikelihood)} </p>
    <p>Surprise:{feedback.surpriseLikelihood} </p>
    <p>Sorrow:{feedback.sorrowLikelihood} </p>
    <p>Anger: {feedback.angerLikelihood}</p>
    <p>
      {explainPlaylistData(spotifyQuery)}, from the genres {genres[0].id},{' '}
      {genres[1].id}, {genres[2].id}, {genres[3].id}, and {genres[4].id}.
    </p>
  </div>
);

export default GenreComponent;
