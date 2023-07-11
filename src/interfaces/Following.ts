import { ISpotifyGeneral } from './General';
import { IExternalUrls } from './External';
import { IFollowers } from './Followers';
import { IImage } from './Image';

export interface IFollowing {
  artists: IFollowingArtists;
}

interface IFollowingArtists {
  items: IArtistItem[];
  href: string;
  limit: number;
  total: number;
}

interface IArtistItem extends ISpotifyGeneral {
  external_urls: IExternalUrls;
  followers: IFollowers;
  genres: string[];
  images: IImage[];
  name: string;
  popularity: string;
}