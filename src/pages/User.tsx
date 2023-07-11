import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../utils';
import { useMenuItem } from '../contexts';
import { PageRoutes } from '../constants';
import { Logout } from '../layouts';
import { IUser, IFollowing, IPlaylists } from '../interfaces';
import {
  Main, Header, Avatar, Username,
  Stats, Stat, Number, NumLabel
} from '../components';

function User() {
  const { setActiveItem } = useMenuItem();
  const [user, setUser] = useState<IUser | null>(null);
  const [following, setFollowing] = useState<IFollowing | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylists | null>(null);

  useEffect(() => {
    setActiveItem(1);
    getData();
  }, []);

  const getData = async () => {
    const { user, following, playlists } = await getUserInfo();
    setUser(user);
    setFollowing(following);
    setPlaylists(playlists);
  }

  return (
    <>
      {user ? (
        <Main>
          <Header>
            {user.images.length > 0 ? (
              <Avatar 
                src={user.images[1].url} 
                alt={`${user.display_name}'s avatar`} 
              />
            ) : (
              <div>No Avatar</div>
            )}
            <Username
              href={user.external_urls.spotify}
              target='_blank'
              rel='noopener noreferrer'
            >
              {user.display_name}
            </Username>
            <Stats>
              <Stat>
                <Number>{user.followers.total}</Number>
                <NumLabel>followers</NumLabel>
              </Stat>
              <Stat>
                <Number>{following?.artists.total}</Number>
                <NumLabel>following</NumLabel>
              </Stat>
              <Stat>
                <Link to={PageRoutes.PLAYLISTS}>
                  <Number>{playlists?.total}</Number>
                  <NumLabel>playlists</NumLabel>
                </Link>
              </Stat>
            </Stats>
            <Logout />
          </Header>
        </Main>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default User;