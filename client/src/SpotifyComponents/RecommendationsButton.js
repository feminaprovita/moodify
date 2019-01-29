import React, { Component } from 'react';
import axios from 'axios';
import { getHashParams } from './spotify-functions';

// function converting from google to spotify will have to convert to string before output: key=value.join('&')
// will be importing output of function here (likewise ../../server/api/spotify)
// currently using dummy hard-coding query string for a sad song
const convertedFromFunction = 'seed_genres=blues&max_valence=0.5';

export default class RecommendationsButton extends Component {
	constructor() {
		super();
		this.state = {
			tracks: []
		};
		this.handleRecommendations = this.handleRecommendations.bind(this);
	}
	handleRecommendations = async () => {
		try {
			const token = getHashParams();
			// logs url for testing and debugging
			console.log(
				`localhost:8080/api/spotify/find?token=${
					token.access_token
				}&recommendations?${convertedFromFunction}`
			);
      
			//make request to backend to fetch querry from Spotify API
			//using relative path because of proxy setup for create-react-app
			const { data } = await axios.get(
				`/api/spotify/find?token=${
					token.access_token
				}&recomendations?${convertedFromFunction}`
			);
			//update local state with URL
			this.setState({
				tracks: data.tracks
			});
		} catch (err) {
			console.error(err);
		}
	};
	render() {
		console.log(this.state.tracks);
		return (
			<div>
				<button type="button" onClick={this.handleRecommendations}>
					Get Recommendations
				</button>
				{/* {this.state.tracks.length > 0 ? (
					<div />
				) : (
					// <RecommendationsView tracks={this.state.tracks} />
					<div />
				)} */}
			</div>
		);
	}
}
