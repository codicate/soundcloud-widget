export interface SoundcloudStreamPlayer {

  /**
   * Starts to play the sound. Returns a Promise that resolves when playback starts, and may reject if the browser refuses playback.
  */
  play: () => Promise<void>;

  /**
   * Pauses the player
  */
  pause: () => Promise<void>;

  /**
   * Seeks to the position in the song (in milliseconds). Returns a Promise that resolves when the seek completes, or may reject if the seek is not possible.
   * @param time - time (in milliseconds)
  */
  seek: (time: number) => Promise<void>;

  /**
   * @returns Returns the current position (in milliseconds)
  */
  currentTime: () => Promise<number>;

  /**
   * @param volume - Sets the volume (from 0 to 1)
  */
  setVolume: (volume: number) => Promise<void>;

  /**
   * @returns Returns the current volume (from 0 to 1)
  */
  getVolume: () => Promise<number>;

  /**
   * @returns Returns the duration (in milliseconds)
  */
  getDuration: () => Promise<number>;

  /**
   * @returns Returns true whilst the player is buffering
  */
  isBuffering: () => Promise<boolean>;

  /**
   * @returns Returns true whilst the intended state is to be playing. This flips with play() and pause() calls.
  */
  isPlaying: () => Promise<boolean>;

  /**
   * @returns Returns true whilst the player is actually playing
  */
  isActuallyPlaying: () => Promise<boolean>;

  /**
   * @returns Returns true if the player is dead because of an error
  */
  hasErrored: () => Promise<boolean>;

  /**
   * @returns Returns true if the player is dead
  */
  isDead: () => Promise<boolean>;

  /**
   * @returns Returns 'playing', 'paused', 'loading', 'ended', 'error' or 'dead'
  */
  getState: () => Promise<'playing' | 'paused' | 'laoding' | 'ended' | 'error' | 'dead'>;

  /**
   * Kill the player. Call this when you do not need it anymore.
  */
  kill: () => void;

  /**
   * `Subscribes` the handler to the given event
   * 
   * `state`-change: when audio controller changes state (e.g. from pause to play). Possible values: 'playing', 'paused', 'loading', 'ended', 'error' or 'dead'
   * `play`: when play method is called
   * 
   * `play`-start: when playback actually starts, the first time
   * 
   * `play`-resume: when playback starts, the second time onwards
   * 
   * `play`-rejection: if a play request is rejected by the browser
   * 
   * `pause`: when playback is paused
   * 
   * `finish`: when sound is finished
   * 
   * `seek`: when seek method is called
   * 
   * `seeked`: when a seek completes
   * 
   * `seek`-rejection: when a seek is rejected for some reason
   * 
   * `geo_blocked`: when there's no available streams for a sound, as it is not    * allowed to be played in the user's territory.
   * 
   * `buffering_start`: when buffering starts
   * 
   * `buffering_end`: when buffering stops
   * 
   * `audio_error`: when an error occurs
   * 
   * `time`: when playback position is updated
   * 
   * `no_streams`: when we failed fetching stream information
   * 
   * `no_protocol`: when no supported protocol could be found
   * 
   * `no_connection`: when we failed to connect to an endpoint due to missing    * transport or request timeout
  */
  on: (event: OnEvents, handler: () => void) => Promise<void>;
}

type OnEvents = 'state-change' | 'play' | 'play-start' | 'play-resume' | 'play-rejection' | 'pause' | 'finish' | 'seek' | 'seeked' | 'seek-rejection' | 'geo_blocked' | 'buffering_start' | 'buffering_end' | 'audio_error' | 'time' | 'no_streams' | 'no_protocol' | 'no_connection';