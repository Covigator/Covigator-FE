interface KakaoMapOptions {
  center: kakao.maps.LatLng; // 지도의 중심 좌표
  level: number; // 지도의 확대 레벨
}

interface KakaoMaps {
  load: (callback: () => void) => void; // 카카오맵 API 로드 완료 후 실행될 콜백 함수
  LatLng: new (lat: number, lng: number) => kakao.maps.LatLng; // 위도와 경도로 LatLng 객체를 생성하는 생성자
  Map: new (container: HTMLElement, options: KakaoMapOptions) => kakao.maps.Map; // 지도 객체를 생성하는 생성자
}

declare namespace kakao {
  export namespace maps {
    // 위도와 경도 나타내는 클래스
    export class LatLng {
      constructor(lat: number, lng: number);
    }
    // 지도 객체 클래스
    export class Map {
      constructor(container: HTMLElement, options: KakaoMapOptions);
    }
  }
}

// Window 객체에 카카오맵 API를 추가하는 인터페이스 확장
interface Window {
  kakao: {
    maps: KakaoMaps; // window 객체에 카카오맵 API 추가
  };
}
