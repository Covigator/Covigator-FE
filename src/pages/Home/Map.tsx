import { useEffect, useRef } from 'react';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY}&autoload=false`;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      // kakao.maps API가 로드된 후 지도 생성
      kakao.maps.load(() => {
        if (mapRef.current) {
          const container = mapRef.current;
          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          new kakao.maps.Map(container, options);
        }
      });
    };
    return () => {
      document.body.removeChild(script);
    };
  });

  return (
    <div className="h-screen w-screen">
      <div id="map" ref={mapRef} className="w-full h-4/5"></div>
    </div>
  );
};

export default Map;
