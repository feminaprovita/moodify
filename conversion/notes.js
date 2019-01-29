from google:
detectionConfidence: Range[0,1]
landmarkingConfidence: Range[0,1]     // will be useful for AR-ing face
joyLikelihood: enum(Likelihood)
sorrowLikelihood: enum(Likelihood)
angerLikelihood: enum(Likelihood)
surpriseLikelihood: enum(Likelihood)
underexposedLikelihood: enum(Likelihood)
blurredLikelihood: enum(Likelihood)

enum(Likelihood):
  UNKNOWN
  VERY_UNLIKELY
  UNLIKELY
  POSSIBLE
  LIKELY
  VERY_LIKELY


case (detectionConfidence == close to 0) ||
  (blurredLikelihood === 'VERY_LIKELY') ||
  (joyLikelihood === 'UNKNOWN' && sorrowLikelihood === 'UNKNOWN' && angerLikelihood === 'UNKNOWN' && surpriseLikelihood === 'UNKNOWN') ||
  (joyLikelihood === 'VERY_UNLIKELY' && sorrowLikelihood === 'VERY_UNLIKELY' && angerLikelihood === 'VERY_UNLIKELY' && surpriseLikelihood === 'VERY_UNLIKELY'):
  return "Image quality insufficient. Please try a different selfie."


case ((joyLikelihood === VERY_LIKELY || joyLikelihood === LIKELY) && (sorrowLikelihood === VERY_LIKELY || sorrowLikelihood === LIKELY)):
  return


case default:
  return 'max_liveness=0.75&min_speechiness=0.66';

  const functionConversion = 'seed_genres=blues&max_valence=0.5';

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  to spotify:
  genre:
  energy:         // Float[0,1] where 1 === intensity/activity (death metal == 1; bach prelude == 0)
                            // Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy
  danceability:   // Float[0,1] where 1 === v easy to dance to
  loudness:       // Float[-60,1] // the higher the value (db), the louder the song
  liveness:       // Float[0,1], where >= 0.8 is probs a live recording
  valence:        // Float[0,1], the higher the value, the more positive mood for the song (where neg inc angry)        ********
  acousticness:   // Float[0,1] where 1 === def acoustic
  speechiness:    // Float[0,1] where <= 0.33 is music; where .33-.66 is music and speech (inc rap); where >= 0.66 is all words // probs just always > 0.66
  instrumentalness:   // Float[0,1], where values above 0.5 are probs instrumentalness	  ????
  popularity:     // Float[0,1], where the higher the value, the more popular the song
  tempo:          // bpm
  mode:           // major === 1, minor === 0
track_href:       //api endpoint w/full details on track


Encode spaces with the hex code %20 or +.
Operator: The operator NOT can be used to exclude results.
Similarly, the OR operator can be used to broaden the search.
Note: Operators must be specified in uppercase.
Genres: 'http://web.archive.org/web/20120704135200/http://www.spotify.com/us/about/features/advanced-search-syntax/genre-list/'