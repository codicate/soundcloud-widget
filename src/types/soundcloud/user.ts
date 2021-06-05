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