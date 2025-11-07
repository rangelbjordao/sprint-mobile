export interface Musica {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  popularity: number;
}
