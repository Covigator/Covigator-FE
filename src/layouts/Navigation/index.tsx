import NavigationButton from '../../components/navigation/NavigationButton';
import { ReactComponent as HomeIcon } from '../../assets/image/common/navigation/home.svg';
import { ReactComponent as CommunityIcon } from '../../assets/image/common/navigation/chat-bubble-left-right.svg';
import { ReactComponent as UserIcon } from '../../assets/image/common/navigation/user.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const index = () => {
  // 버튼 클릭 상태
  const [activeButton, setActiveButton] = useState('');

  const navigate = useNavigate();

  const handleNavigation = (path: string, buttonName: string) => {
    setActiveButton(buttonName);
    navigate(path);
  };

  return (
    <section className="fixed w-full h-14 bottom-0">
      <nav className="bg-white w-full h-16 mx-auto flex items-center justify-between rounded-t-lg">
        <div className="w-full max-w-5xl mx-auto px-11 flex items-center justify-between">
          <NavigationButton
            Icon={
              <HomeIcon
                width={24}
                height={24}
                stroke={activeButton === 'home' ? '#606AB1' : 'black'}
              />
            }
            title="홈"
            isActive={activeButton === 'home'}
            onClick={() => handleNavigation('/', 'home')}
          />
          <NavigationButton
            Icon={
              <CommunityIcon
                width={24}
                height={24}
                stroke={activeButton === 'community' ? '#606AB1' : 'black'}
              />
            }
            title="커뮤니티"
            isActive={activeButton === 'community'}
            onClick={() => handleNavigation('/community', 'community')}
          />
          <NavigationButton
            Icon={
              <UserIcon
                width={24}
                height={24}
                stroke={activeButton === 'user' ? '#606AB1' : 'black'}
              />
            }
            title="유저"
            isActive={activeButton === 'user'}
            onClick={() => handleNavigation('/user', 'user')}
          />
        </div>
      </nav>
    </section>
  );
};

export default index;
