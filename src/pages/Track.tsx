import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMenuItem } from '../contexts';
import { getTrackInfo, getYear } from '../utils';
import { ITrack, IAudioAnalysis, IAudioFeatures } from '../interfaces';
import { Loader } from '../layouts';
import { 
  TrackContainer, TopContainer, CoverImage, 
  Info, TrackName, ArtistName, Album, GreenButton,
  AudioFeatures, Features 
} from '../components';

function Track() {
  const { trackId } = useParams();
  const { setActiveItem } = useMenuItem();
  const [track, setTrack] = useState<ITrack | null>(null);
  const [audioAnalysis, setAudioAnalysis] = useState<IAudioAnalysis | null>(null);
  const [audioFeatures, setAudioFeatures] = useState<IAudioFeatures | null>(null);

  useEffect(() => {
    setActiveItem(null);
  }, []);

  useEffect(() => {
    getTrackData();
  }, [trackId]);

  const getTrackData = async () => {
    if (trackId) {
      const { track, audioAnalysis, audioFeatures } = await getTrackInfo(trackId);

      setTrack(track);
      setAudioAnalysis(audioAnalysis);
      setAudioFeatures(audioFeatures);
    }
  }

  return (
    <>
      {track ? (
        <TrackContainer>
          <TopContainer>
            <CoverImage src={track.album.images[0].url} alt='track cover image' />
            <Info>
              <TrackName>{track.name}</TrackName>
              <ArtistName>
                {track.artists.map(({ name }, index) => (
                  <span key={index}>
                    {name}
                    {track.artists.length > 0 && index === track.artists.length - 1 ? '' : ','}
                    &nbsp;
                  </span>
                ))}
              </ArtistName>
              <Album>
                <a 
                  href={track.album.external_urls.spotify}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {track.album.name}
                </a>
                &nbsp;&middot;&nbsp;
                {getYear(track.album.release_date)}
              </Album>
              <GreenButton
                href={track.external_urls.spotify}
                target='_blank'
                rel='noopener noreferrer'
              >
                play on spotify
              </GreenButton>
            </Info>
          </TopContainer>
          {audioAnalysis && audioFeatures && (
            <AudioFeatures>
              <Features>
                {/* Generate Each Feature Here */}
              </Features>
            </AudioFeatures>
          )}
        </TrackContainer>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Track;
