import http from 'k6/http';
import { check } from 'k6';
import { exportTime } from '../utils/metrics.js';

const BASE_URL = 'https://yourdomain.com';

export function exportData() {
  const res = http.get(`${BASE_URL}/export/registry`);
  exportTime.add(res.timings.duration);
  check(res, {
    'Export works': (r) => r.status === 200,
    'Export < 5s': (r) => r.timings.duration < 5000,
  });
}