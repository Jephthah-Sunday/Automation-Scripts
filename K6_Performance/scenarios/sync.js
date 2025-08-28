import http from 'k6/http';
import { check } from 'k6';
import { syncTime } from '../utils/metrics.js';

const BASE_URL = 'https://dev.duchenneukconnect.org';

export function syncAndDashboard() {
  const syncRes = http.post(`${BASE_URL}/sync`, null);
  syncTime.add(syncRes.timings.duration);

  const dashRes = http.get(`${BASE_URL}/dashboard`);

  check(syncRes, {
    'Sync success': (r) => r.status === 200,
    'Sync < 5s': (r) => r.timings.duration < 5000,
  });

  check(dashRes, {
    'Dashboard after sync': (r) => r.status === 200,
    'Dashboard load < 4s': (r) => r.timings.duration < 4000,
  });
}