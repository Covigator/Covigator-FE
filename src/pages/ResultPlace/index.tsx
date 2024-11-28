// import { useQuery } from 'react-query';
// import { useParams, useNavigate } from 'react-router-dom';

// import { getPlaces } from '../../api/places';
// import Chip from '../../components/common/chip';
// import CourseItem from '../../components/community/CourseItem';
// import { Topbar } from '../../layouts';
// import Map from '../Home/Map';

// const ResultPlace = () => {
//   const { name = '', address = '' } = useParams<{
//     name: string;
//     address: string;
//   }>();
//   const navigate = useNavigate();

//   let decodedName = '';
//   let decodedAddress = '';

//   try {
//     decodedName = decodeURIComponent(name);
//     decodedAddress = decodeURIComponent(address);
//   } catch (error) {
//     console.error('URI 디코딩 에러:', error);
//     navigate('/result');
//     return null;
//   }

//   const {
//     data: place,
//     isError,
//     isLoading,
//   } = useQuery(
//     ['place', decodedName, decodedAddress],
//     () => getPlaces({ name: decodedName, address: decodedAddress }),
//     {
//       enabled: !!decodedName && !!decodedAddress,
//       onError: () => {
//         alert('장소를 찾을 수 없습니다!');
//         navigate('/result');
//       },
//     },
//   );

//   if (isLoading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-400"></div>
//       </div>
//     );
//   }

//   if (!place || isError) return null;

//   // place 객체의 필수 속성 검증
//   const hasRequiredProps = place.latitude && place.longitude && place.name;
//   if (!hasRequiredProps) {
//     console.error('필수 장소 정보 누락');
//     navigate('/result');
//     return null;
//   }

//   return (
//     <div className="h-full w-full overflow-x-hidden">
//       <Topbar handleClick={() => navigate('/result')} />

//       <div className="mx-[30px] flex flex-col">
//         <div className="mt-[63px] flex gap-x-[11px] items-center">
//           <div className="text-h1">{place.name}</div>
//           <Chip size="sm" state="active">
//             {place.category || '기타'}
//           </Chip>
//         </div>
//         <div className="mt-[7px] text-body6 text-bk-80">
//           {place.address}
//           {place.floor && ` ${place.floor}`}
//           {place.dongName && ` ${place.dongName}`}
//           {place.buildingName && ` ${place.buildingName}`}
//         </div>

//         <div className="mt-[8px] w-full h-[114px]">
//           <Map lat={Number(place.latitude)} lng={Number(place.longitude)} />
//         </div>

//         <img
//           src={place.imageUrl || '/src/assets/image/placeholder.jpg'}
//           alt={place.name}
//           className="w-full h-[200px] object-cover mt-[20px]"
//           onError={(e) => {
//             e.currentTarget.src = '/src/assets/image/placeholder.jpg';
//           }}
//         />

//         <div className="mt-[26px] text-body3 text-bk-80">
//           이 장소가 마음에 드시나요?
//         </div>
//         <div className="mt-[2px] text-body6 text-bk-80">
//           관련된 코스를 둘러보세요
//         </div>

//         <div className="mt-[9px]">
//           <CourseItem
//             id={1}
//             title={'성수동 데이트'}
//             caption={'성수동에서 감각있는 장소들을 모아놓은 코스입니다'}
//             rate={4.5}
//             isLike={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPlace;
