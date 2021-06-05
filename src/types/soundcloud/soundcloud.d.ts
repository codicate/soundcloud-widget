declare module 'soundcloud' {
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
  ): Promise<SoundcloudTrack>;

  export function stream(
    trackPath: string,
    secretToke?: string
  ): Promise<SoundcloudPlayer>;
}