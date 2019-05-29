import dimensions from '../../constants/dimensions';
import { Audio, Video, Icon as ExpoIcon } from 'expo';
import { Icon } from 'native-base';
import {
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//const DEFAULT_VIDEO = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
const DEFAULT_VIDEO = 'https://bit.ly/2EG8FTA';
const DEFAULT_ALBUM_IMAGE = require('../../assets/images/icon.png');

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = dimensions.window;
const BACKGROUND_COLOR = 'black';
const DISABLED_OPACITY = 0.5;
const LOADING_OPACITY = 0.8;
const FONT_SIZE = 20;
const LOADING_STRING = 'loading ...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT - 40 - 20 - 75 - 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: FONT_SIZE,
    width: DEVICE_WIDTH,
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT,
  },
  video: {
    maxWidth: DEVICE_WIDTH,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 20 * 2.0,
    maxHeight: 20 * 2.0,
  },
  playbackSlider: {
    ...Platform.select({
      ios: {
        marginHorizontal: 5,
      },
      android: {
        marginHorizontal: -2,
      },
    }),
    alignSelf: 'stretch',
  },
  timestampRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    minHeight: FONT_SIZE,
  },
  text: {
    fontSize: FONT_SIZE,
    lineHeight: FONT_SIZE,
    minHeight: FONT_SIZE,
    color: 'white',
  },
  buffering: {
    opacity: LOADING_OPACITY,
    textAlign: 'left',
    paddingLeft: 20,
  },
  timestamp: {
    textAlign: 'right',
    paddingRight: 20,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainerTopRow: {
    justifyContent: 'space-evenly',
    marginTop: 10,
    maxHeight: 65,
    width: DEVICE_WIDTH,
  },
  buttonsContainerMiddleRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
    maxHeight: 60,
  },
  buttonsContainerBottomRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
    maxHeight: 35,
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
  rateSlider: {
    ...Platform.select({
      android: {
        marginLeft: -30,
      },
    }),
    width: DEVICE_WIDTH / 2.0,
  },
});

export default class Player extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);

    this.playlist = this.props.navigation.getParam('playlist', [
      { isVideo: true, assetURL: DEFAULT_VIDEO },
    ]);
    const videoIndex = this.playlist.findIndex(
      video => video.id === this.props.navigation.getParam('id', undefined)
    );

    this.index = videoIndex >= 0 ? videoIndex : 0;

    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;

    this.state = {
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: true,
      isPlaying: true,
      isBuffering: false,
      isLoading: true,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      throughEarpiece: false,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      useNativeControls: false,
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();

      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = {
      uri: this.playlist[this.index].isVideo ? this.playlist[this.index].assetURL : DEFAULT_VIDEO,
    };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE,

      /// UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    if (this.playlist[this.index].isVideo) {
      this._video.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      this.playbackInstance = this._video;
      await this._video.getStatusAsync();
    } else {
      const { sound } = await Audio.Sound.create(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );

      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(true);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      const currentMusic = this.playlist[this.index];
      const displayMusicName = currentMusic.name || 'Unknown';
      const displayArtistName = currentMusic.author ? ` - ${currentMusic.author}` : '';

      this.setState({
        playbackInstanceName: `${displayMusicName}${displayArtistName}`,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch,
      });

      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else if (status.error) {
      Alert.alert('Please Try Again', status.error);
    }
  };

  _onReadyForDisplay = event => {
    const widestHeight = DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width;

    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth: VIDEO_CONTAINER_HEIGHT * event.naturalSize.width / event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT,
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight: widestHeight,
      });
    }
  };

  _advanceIndex(forward) {
    this.index = (this.index + (forward ? 1 : this.playlist.length - 1)) % this.playlist.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(this.state.loopingType !== LOOPING_TYPE_ONE);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        Alert.alert('Not Supported', 'Your device does not support this feature.');
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = () => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;

      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return this.state.playbackInstancePosition / this.state.playbackInstanceDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();

      if (number < 10) {
        return `0${string}`;
      }
      return string;
    };

    return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return LOADING_STRING;
  }

  _onFullScreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      Alert.alert('Please Try Again', error.toString());
    }
  };

  _onSpeakerPressed = () => {
    this.setState({ throughEarpiece: !this.state.throughEarpiece }, () =>
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: this.state.throughEarpiece,
      })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{ height: 10 }} />
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{ paddingHorizontal: 20 }}
          >
            <Icon
              name="arrow-back"
              style={{
                color: 'white',
                fontSize: FONT_SIZE,
                opacity: this.state.isLoading ? LOADING_OPACITY : 1.0,
              }}
            />
          </TouchableOpacity>
          <Text style={[styles.text, { opacity: this.state.isLoading ? LOADING_OPACITY : 1.0 }]}>
            {this.state.playbackInstanceName}
          </Text>
          <View style={{ width: 48 }} />
        </View>

        <View style={styles.videoContainer}>
          <Video
            ref={this._mountVideo}
            style={[
              styles.video,
              {
                width: DEVICE_WIDTH,
                height: this.playlist[this.index].isVideo ? VIDEO_CONTAINER_HEIGHT : 0,
              },
            ]}
            resizeMode={Video.RESIZE_MODE_COVER}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={() => {}}
            onLoad={() => {}}
            onError={() => {}}
            onFullscreenUpdate={() => {}}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
          <Image
            style={[
              styles.video,
              {
                width: DEVICE_WIDTH,
                height: !this.playlist[this.index].isVideo ? VIDEO_CONTAINER_HEIGHT : 0,
              },
            ]}
            source={
              this.playlist[this.index].assetURL
                ? { uri: this.playlist[this.index].assetURL }
                : DEFAULT_ALBUM_IMAGE
            }
            resizeMode="cover"
          />
        </View>

        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}
        >
          <Slider
            style={styles.playbackSlider}
            thumbTintColor="white"
            minimumTrackTintColor="white"
            maximumTrackTintColor="grey"
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          <View style={styles.timestampRow}>
            <Text style={[styles.text, styles.buffering]}>
              {this.state.isBuffering ? '...buffering...' : ''}
            </Text>
            <Text style={[styles.text, styles.timestamp]}>{this._getTimestamp()}</Text>
          </View>
        </View>

        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerTopRow,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}
        >
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}
          >
            <Icon name="skip-backward" style={{ color: 'white', fontSize: 35 }} active={true} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}
          >
            {this.state.isPlaying ? (
              <Icon
                name="pause"
                style={{
                  color: 'white',
                  fontSize: 55,
                  ...Platform.select({
                    android: {
                      fontSize: 45,
                    },
                  }),
                }}
                active={true}
              />
            ) : (
              <Icon
                name="play"
                style={{
                  color: 'white',
                  fontSize: 60,
                  ...Platform.select({
                    android: {
                      fontSize: 50,
                    },
                  }),
                }}
                active={true}
              />
            )}
          </TouchableHighlight>
          <TouchableHighlight
            style={{ display: 'none' }}
            underlayColor={BACKGROUND_COLOR}
            onPress={this._onStopPressed}
            disabled={this.state.isLoading}
          >
            <Icon
              name="square"
              style={{
                color: 'white',
                fontSize: 42,
                ...Platform.select({
                  android: {
                    fontSize: 50,
                  },
                }),
              }}
              active={true}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            onPress={this._onForwardPressed}
            disabled={this.state.isLoading}
          >
            <Icon name="skip-forward" style={{ color: 'white', fontSize: 35 }} active={true} />
          </TouchableHighlight>
        </View>

        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerMiddleRow,
            { display: 'none' },
          ]}
        >
          <View style={styles.volumeContainer}>
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} onPress={this._onMutePressed}>
              {this.state.muted ? (
                <Icon
                  name="volume-mute"
                  style={{
                    color: 'white',
                    fontSize: 35,
                    marginLeft: 20,
                    marginRight: 55,
                  }}
                  active={true}
                />
              ) : (
                <Icon
                  name="volume-up"
                  style={{
                    color: 'white',
                    fontSize: 35,
                    marginLeft: 20,
                    marginRight: 42,
                  }}
                  active={true}
                />
              )}
            </TouchableHighlight>
            <Slider
              style={styles.volumeSlider}
              thumbTintColor="white"
              minimumTrackTintColor="white"
              maximumTrackTintColor="grey"
              value={1}
              onValueChange={this._onVolumeSliderValueChange}
            />
          </View>
          <TouchableHighlight underlayColor={BACKGROUND_COLOR} onPress={this._onLoopPressed}>
            {this.state.loopingType === LOOPING_TYPE_ONE ? (
              <ExpoIcon.MaterialIcons name="repeat-one" size={35} color="white" />
            ) : (
              <ExpoIcon.MaterialIcons name="repeat" size={35} color="white" />
            )}
          </TouchableHighlight>
        </View>

        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerBottomRow,
            { display: 'none' },
          ]}
        >
          <TouchableOpacity onPress={() => this._trySetRate(1.0, this.state.shouldCorrectPitch)}>
            <View>
              <Text style={styles.text}>Rate:</Text>
            </View>
          </TouchableOpacity>
          <Slider
            style={styles.rateSlider}
            thumbTintColor="white"
            minimumTrackTintColor="white"
            maximumTrackTintColor="grey"
            value={this.state.rate / RATE_SCALE}
            onSlidingComplete={this._onRateSliderSlidingComplete}
          />
          <TouchableHighlight onPress={this._onSpeakerPressed} underlayColor={BACKGROUND_COLOR}>
            <ExpoIcon.MaterialIcons
              name={this.state.throughEarpiece ? 'speaker-phone' : 'speaker'}
              size={35}
              color="#0C223F"
            />
          </TouchableHighlight>
        </View>

        <View
          style={[styles.buttonsContainerBase, styles.buttonsContainerTextRow, { display: 'none' }]}
        >
          <TouchableOpacity onPress={this._onFullScreenPressed}>
            <View>
              <Text style={styles.text}>Full Screen Mode</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/*<View style={{ height: 10 }} />*/}
      </View>
    );
  }
}
