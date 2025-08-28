import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const token = __ENV.AUTH_TOKEN;
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const res = http.get('https://dev.duchenneukconnect.org/api/User/profile-info', { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0
  });

  console.log("Response status:", res.status);
  console.log("Body:", res.body);
}
