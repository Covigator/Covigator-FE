import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import RefreshRecommend from '../../components/home/refreshRecommend/RefreshRecommend';
import { Topbar } from '../../layouts';

const index = () => {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <Topbar />
      <RefreshRecommend />
      <CoursePreview
        date="6월 15일"
        weather="맑을"
        companions="매우 혼잡할"
        locations={[
          { name: '마우스래빗', isSelected: false },
          { name: 'CGV 건대입구점', isSelected: false },
          { name: '스타벅스 건대점', isSelected: false },
        ]}
      />
    </div>
  );
};

export default index;
