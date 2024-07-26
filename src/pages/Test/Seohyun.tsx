import { HiOutlineMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import Dropdown from '../../components/common/dropdown';
import Input from '../../components/common/input';
import { regionDropdownItems, sortDropdownItems } from '../../constants/object';
import Textarea from '../../components/common/textarea';
import { Topbar } from '../../layouts';

const Seohyun = () => {
  const navigate = useNavigate();
  const handleTopbar = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col gap-3 pt-4 px-2">
      {/* common dropdown 테스트 */}
      <Dropdown dropdownItems={sortDropdownItems} size="sm" type={'primary'} />
      <Dropdown dropdownItems={regionDropdownItems} size="lg" type={'sub'} />
      {/* topbar 테스트 */}
      <Topbar handleClick={(e: React.MouseEvent) => handleTopbar()} />
      {/* common textarea 테스트 */}
      <Textarea maxLength={50} placeholder={'md textarea'} size={'md'} />
      <Textarea maxLength={150} placeholder={'lg textarea'} size={'lg'} />
      {/* common input 테스트 */}
      <div className="w-full flex flex-col gap-4">
        <Input
          size={'sm'}
          placeholder={'sm'}
          icon={<HiOutlineMail className="w-6 h-6" />}
          type="password"
        />
        <Input size={'sm'} placeholder={'sm'} maxLength={3} />
        <Input size={'md'} placeholder={'md'} />
        <Input size={'lg'} placeholder={'lg'} />
        <Input size={'xl'} placeholder={'xl'} />
      </div>
      {/* 디자인 시스템 테스트 */}
      <div className="p-1">
        <div className="text-body3 text-primary-100 bg-bk-90">primary100</div>
        <div className="text-body3 text-primary-200 bg-bk-90">primary200</div>
        <div className="text-body3 text-primary-300 bg-bk-90">primary300</div>
        <div className="text-body3 text-primary-400 bg-bk-90">primary400</div>
        <div className="text-body3 text-sub-100 bg-bk-90">sub100</div>
        <div className="text-body3 text-sub-200 bg-bk-90">sub200</div>
        <div className="text-body3 text-sub-300 bg-bk-90">sub300</div>
        <div className="text-body3 text-sub-400 bg-bk-90">sub400</div>
        <div className="text-body4 text-bk-10">bk-10</div>
        <div className="text-body4 text-bk-20">bk-20</div>
        <div className="text-body4 text-bk-30">bk-30</div>
        <div className="text-body4 text-bk-40">bk-40</div>
        <div className="text-body4 text-bk-50">bk-50</div>
        <div className="text-body4 text-bk-60">bk-60</div>
        <div className="text-body4 text-bk-70">bk-70</div>
        <div className="text-body4 text-bk-80">bk-80</div>
        <div className="text-body4 text-bk-90">bk-90</div>
        <div className="text-body4 text-bk-100">bk-100</div>
      </div>
      <div className="p-1">
        <div className="text-h1">h1</div>
        <div className="text-h2">h2</div>
        <div className="text-h3">h3</div>
        <div className="text-h4">h4</div>
        <div className="text-body1">body1</div>
        <div className="text-body2">body2</div>
        <div className="text-body3">body3</div>
        <div className="text-body4">body4</div>
        <div className="text-body5">body5</div>
        <div className="text-body6">body6</div>
        <div className="text-btn1">btn1</div>
        <div className="text-btn2">btn2</div>
        <div className="text-btn3">btn3</div>
        <div className="text-nav">nav</div>
      </div>
    </div>
  );
};

export default Seohyun;
