declare module 'soundcloud' {

  interface PaginatedSearchResult {
    collection: SoundcloudTrack[];
    next_href?: string;
  }

  export function initialize(
    options: {
      client_id?: string;
      oauth_token?: string;
      redirect_uri?: string;
      baseURL?: string;
      connectURL?: string;
    }
  ): void;

  export function get(
    path: string,
    params?: {}
  ): Promise<SoundcloudTrack[] | PaginatedSearchResult>;

  export function stream(
    trackPath: string,
    secretToke?: string
  ): Promise<SoundcloudStreamPlayer>;

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
    currentTime: () => number;

    /**
     * @param volume - Sets the volume (from 0 to 1)
    */
    setVolume: (volume: number) => void;

    /**
     * @returns Returns the current volume (from 0 to 1)
    */
    getVolume: () => number;

    /**
     * @returns Returns the duration (in milliseconds)
    */
    getDuration: () => number;

    /**
     * @returns Returns true whilst the player is buffering
    */
    isBuffering: () => boolean;

    /**
     * @returns Returns true whilst the intended state is to be playing. This flips with play() and pause() calls.
    */
    isPlaying: () => boolean;

    /**
     * @returns Returns true whilst the player is actually playing
    */
    isActuallyPlaying: () => boolean;

    /**
     * @returns Returns true if the player is dead because of an error
    */
    hasErrored: () => boolean;

    /**
     * @returns Returns true if the player is dead
    */
    isDead: () => boolean;

    /**
     * @returns Returns 'playing', 'paused', 'loading', 'ended', 'error' or 'dead'
    */
    getState: () => 'playing' | 'paused' | 'laoding' | 'ended' | 'error' | 'dead';

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

  export interface SoundcloudUserFilter {
    q?: string;
  }

  export interface SoundcloudUserMini {
    avatar_url: string;
    id: number;
    kind: string;
    permalink_url: string;
    uri: string;
    username: string;
    permalink: string;
    last_modified: string;
  }

  export interface SoundcloudUser {
    kind: "user";
    id: number;
    permalink: string;
    subscriptions: [];
    username: string;
    uri: string;
    permalink_url: string;
    avatar_url: string;
    country: string;
    full_name: string;
    city: string;
    description: string;
    discogs_name: string | null;
    myspace_name: string | null;
    website: string | null;
    website_title: string;
    online: boolean;
    track_count: number;
    playlist_count: number;
    followers_count: number;
    followings_count: number;
    likes_count: number;
    comments_count: number;
    public_favorites_count: number;
    avatar_data?: string;
    quota?: {
      unlimited_upload_quota: boolean;
      upload_seconds_used: number;
      upload_seconds_left: number;
    };
    private_playlists_count?: number;
    primary_email_confirmed?: boolean;
    private_tracks_count?: number;
    locale?: string;
    last_modified: string;
    first_name: string;
    last_name: string;
    reposts_count: number;
    upload_seconds_left?: number;
    plan: string;
  }

  export interface SoundcloudWebProfile {
    kind: "web-profile";
    id: number;
    service: string;
    title: string;
    url: string;
    username: string | null;
    created_at: string;
  }

  export interface SoundcloudUserCollection {
    collection: SoundcloudUser;
    next_href: string | null;
  }

  export interface SoundcloudVisual {
    urn: string;
    entry_time: number;
    visual_url: string;
  }

  export interface SoundcloudCreatorSubscription {
    product: {
      id: string;
    };
  }

  export type SoundcloudLicense =
    | "no-rights-reserved"
    | "all-rights-reserved"
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa";

  export type SoundcloudTrackType =
    | "original"
    | "remix"
    | "live"
    | "recording"
    | "spoken"
    | "podcast"
    | "demo"
    | "in progress"
    | "stem"
    | "loop"
    | "sound effect"
    | "sample"
    | "other";

  export interface SoundcloudTrackFilter {
    q?: string;
    tags?: string;
    filter?: "public" | "private" | "all";
    license?: SoundcloudLicense;
    bpm_from?: number;
    bpm_to?: number;
    duration_from?: number;
    duration_to?: number;
    created_at_from?: Date;
    created_at_to?: Date;
    ids?: string;
    genres?: string;
    types?: string;
  }

  export interface SoundcloudTrack {
    comment_count: number;
    release: number | "";
    original_content_size: number;
    track_type: SoundcloudTrackType | null;
    original_format: string;
    streamable: boolean;
    download_url: string | null;
    id: number;
    state: "processing" | "failed" | "finished";
    last_modified: string;
    favoritings_count: number;
    kind: string;
    purchase_url: string;
    release_year: number | null;
    sharing: string;
    attachments_uri: string;
    license: SoundcloudLicense;
    user_id: number;
    user_favorite: boolean;
    waveform_url: string;
    permalink: string;
    permalink_url: string;
    playback_count: number;
    downloadable: boolean;
    created_at: string;
    description: string;
    title: string;
    duration: number;
    artwork_url: string;
    video_url: string | null;
    tag_list: string;
    release_month: number | null;
    genre: string;
    release_day: number | null;
    reposts_count: number;
    label_name: string | null;
    commentable: boolean;
    bpm: number | null;
    policy: string;
    key_signature: string;
    isrc: string | null;
    uri: string;
    download_count: number;
    likes_count: number;
    purchase_title: string;
    embeddable_by: string;
    monetization_model: string;
    user: SoundcloudUserMini;
    user_playback_count: number | null;
    stream_url: string;
    label?: SoundcloudUserMini;
    label_id: number | null;
    asset_data?: string;
    artwork_data?: string;
  }

  export interface SoundcloudSecretToken {
    kind: "secret-token";
    token: string;
    uri: string;
    resource_uri: string;
  }

  export interface SoundcloudTranscoding {
    url: string;
    preset: string;
    duration: number;
    snipped: boolean;
    format: {
      protocol: string;
      mime_type: string;
    };
    quality: string;
  }
}