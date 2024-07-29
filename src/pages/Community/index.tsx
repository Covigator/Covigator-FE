import Dropdown from '../../components/common/dropdown';
import Header from '../../components/common/header';
import { sortDropdownItems } from '../../constants/object';

const index = () => {
  return (
    <div className="w-full pt-[67px] px-[30px]">
      <header className="relative">
        <Header
          title={'커뮤니티'}
          subtitle={'다른 사용자들과 코스를 공유해보세요'}
        />
        <div className="absolute bottom-0 right-0">
          <Dropdown
            dropdownItems={sortDropdownItems}
            size={'sm'}
            type={'primary'}
          />
        </div>
      </header>
    </div>
  );
};

export default index;
