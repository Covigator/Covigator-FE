import NavigationButton from '../navigation/NavigationButton';

import HomeIcon from '../../assets/image/common/navigation/home.svg?react';
import CommunityIcon from '../../assets/image/common/navigation/chat-bubble-left-right.svg?react';
import UserIcon from '../../assets/image/common/navigation/user.svg?react';

const Navigation = () => {
  return (
    <nav className="bg-white w-full h-16 mx-auto flex items-center justify-between rounded-t-lg">
      <div className="w-full max-w-5xl mx-auto px-11 flex items-center justify-between">
        <NavigationButton
          Icon={<HomeIcon width={24} height={24} stroke="black" />}
          title="홈"
        />
        <NavigationButton
          Icon={<CommunityIcon width={24} height={24} stroke="black" />}
          title="커뮤니티"
        />
        <NavigationButton
          Icon={<UserIcon width={24} height={24} stroke="black" />}
          title="유저"
        />
      </div>
    </nav>
  );
};

export default Navigation;
