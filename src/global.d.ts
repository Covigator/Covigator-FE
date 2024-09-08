// global.d.ts

interface KakaoMapOptions {
  center: kakao.maps.LatLng;
  level: number;
}

interface KakaoMaps {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => kakao.maps.LatLng;
  Map: new (container: HTMLElement, options: KakaoMapOptions) => kakao.maps.Map;
  Marker: new (options: kakao.maps.MarkerOptions) => kakao.maps.Marker;
  Circle: new (options: kakao.maps.CircleOptions) => kakao.maps.Circle;
  LatLngBounds: new () => kakao.maps.LatLngBounds;
  CustomOverlay: new (
    options: kakao.maps.CustomOverlayOptions,
  ) => kakao.maps.CustomOverlay;
  event: {
    addListener: (target: any, type: string, handler: Function) => void;
  };
  MapTypeId: {
    OVERLAY: number;
  };
}

interface KakaoAuth {
  authorize: (settings: { redirectUri: string }) => void;
}

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
}

declare namespace kakao {
  export namespace maps {
    export class LatLng {
      constructor(lat: number, lng: number);
    }
    export class Map {
      constructor(container: HTMLElement, options: KakaoMapOptions);
      setCenter(latlng: LatLng): void;
      setLevel(level: number, options?: { animate: boolean }): void;
      getLevel(): number;
      setBounds(bounds: LatLngBounds): void;
      removeOverlayMapTypeId(mapTypeId: number): void;
    }
    export class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
    }
    export class Circle {
      constructor(options: CircleOptions);
      setMap(map: Map | null): void;
    }
    export class LatLngBounds {
      constructor();
      extend(latlng: LatLng): void;
    }
    export class CustomOverlay {
      constructor(options: CustomOverlayOptions);
      setMap(map: Map | null): void;
    }
    export interface MarkerOptions {
      position: LatLng;
      map?: Map;
    }
    export interface CircleOptions {
      center: LatLng;
      radius: number;
      strokeWeight?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeStyle?: string;
      fillColor?: string;
      fillOpacity?: number;
      map?: Map;
    }
    export interface CustomOverlayOptions {
      position: LatLng;
      content: string | HTMLElement;
      map?: Map;
      clickable?: boolean;
    }
    export const MapTypeId: {
      OVERLAY: number;
    };
  }
}

// Window 객체에 카카오맵 API와 카카오 SDK를 추가하는 인터페이스 확장

interface Window {
  kakao: {
    maps: KakaoMaps;
  };
  Kakao: {
    init: (appKey: string) => void;
    isInitialized: () => boolean;
    Auth: KakaoAuth;
  };
}

// 전역 Kakao 객체 선언
declare const Kakao: {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
};
declare module 'clsx';
declare module 'react-datepicker';
