import { CityCoords, CachedData } from '../types/weather';

// Open-Meteo API 설정 (API 키 불필요!)
// 도시명 -> 좌표 변환을 위한 간단한 매핑
export const cityCoords: Record<string, CityCoords> = {
  'seoul': { lat: 37.5665, lon: 126.9780, name: '서울' },
  'busan': { lat: 35.1796, lon: 129.0756, name: '부산' },
  'incheon': { lat: 37.4563, lon: 126.7052, name: '인천' },
  'daegu': { lat: 35.8714, lon: 128.6014, name: '대구' },
  'daejeon': { lat: 36.3504, lon: 127.3845, name: '대전' },
  'gwangju': { lat: 35.1595, lon: 126.8526, name: '광주' },
  'ulsan': { lat: 35.5384, lon: 129.3114, name: '울산' },
  'suwon': { lat: 37.2636, lon: 127.0286, name: '수원' },
  'jeju': { lat: 33.4996, lon: 126.5312, name: '제주' },
  'tokyo': { lat: 35.6762, lon: 139.6503, name: '도쿄' },
  'london': { lat: 51.5074, lon: -0.1278, name: '런던' },
  'paris': { lat: 48.8566, lon: 2.3522, name: '파리' },
  'new york': { lat: 40.7128, lon: -74.0060, name: '뉴욕' },
};

// 캐시 설정 (5분간 유효)
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5분

export function getCachedData(key: string): any {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('캐시에서 데이터 반환:', key);
    return cached.data;
  }
  return null;
}

export function setCachedData(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}
