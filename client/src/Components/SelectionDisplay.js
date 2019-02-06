import React, { Component } from 'react';
import axios from 'axios';
import { getHashParams } from './Authenticate/utils';
import ImageLoad from 'image-preview-react';
import {
	MoodifyUpload,
	MoodifyCapture,
	ErrorComponent,
	RecommendationsDisplay
} from './index';

export default class SelectionDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tracks: [],
			feedback: {},
			file: null,
			seedGenres: [],
			imageSrc: ''
		};
		this.moodifyFromUpload = this.moodifyFromUpload.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.moodifyFromCapture = this.moodifyFromCapture.bind(this);
		this.savePlaylistToSpotify = this.savePlaylistToSpotify.bind(this);
		this.refButton = React.createRef();
		this.refImage = React.createRef();
		this.setRef = this.setRef.bind(this);
	}

	componentDidMount() {
		ImageLoad({ button: this.refButton, image: this.refImage });
	}

	setRef = webcam => {
		this.webcam = webcam;
	};

	handleFileUpload = event => {
		this.setState({ file: event.target.files });
	};

	moodifyFromUpload = async event => {
		try {
			event.preventDefault();
			const formData = new FormData();
			formData.append('file', this.state.file[0]);
			const query = await axios.post('/api/s3/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			this.setState({
				feedback: query.data
			});
			if (query.data.spotifyQuery) {
				const token = getHashParams();
				const { data } = await axios.get(
					`/api/spotify/find?token=${token.access_token}${
						query.data.spotifyQuery
					}`
				);
				this.setState({
					tracks: data.tracks,
					seedGenres: data.seeds
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	moodifyFromCapture = async event => {
		try {
			event.preventDefault();
			const imageSrc = this.webcam.getScreenshot();
			const query = await axios.post('/api/s3/capture', { url: imageSrc });
			this.setState({
				feedback: query.data,
				imageSrc
			});
			if (query.data.spotifyQuery) {
				const token = getHashParams();
				const { data } = await axios.get(
					`/api/spotify/find?token=${token.access_token}${
						query.data.spotifyQuery
					}`
				);
				this.setState({
					tracks: data.tracks,
					seedGenres: data.seeds,
					feedback: query.data
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	savePlaylistToSpotify = async () => {
		const token = getHashParams();
		const { data } = await axios.post(
			`/api/playlist?token=${token.access_token}`
		);
		let uris = this.state.tracks.map(track => `spotify:track:${track.id}`);
		await axios.post(
			`/api/playlist/add?token=${token.access_token}&uris=${uris.join(
				','
			)}&playlistId=${data}`
		);
	};

	render() {
		return (
			<div>
				<MoodifyUpload
					submit={this.moodifyFromUpload}
					onChange={this.handleFileUpload}
					refButton={this.refButton}
					imageSrc={this.state.imageSrc}
					refImage={this.refImage}
				/>

				<MoodifyCapture submit={this.moodifyFromCapture} ref={this.setRef} />

				{this.state.feedback.hasOwnProperty('spotifyQuery') &&
					!this.state.feedback.spotifyQuery && <ErrorComponent />}

				{this.state.tracks && this.state.tracks.length > 0 && (
					<div>
						<RecommendationsDisplay
							feedback={this.state.feedback}
							genres={this.state.seedGenres}
							tracks={this.state.tracks}
							onClick={this.savePlaylistToSpotify}
						/>
					</div>
				)}
			</div>
		);
	}
}
