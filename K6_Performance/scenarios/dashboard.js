import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { dashboardLoadTime } from '../utils/metrics.js';

const BASE_URL = 'https://dev.duchenneukconnect.org';
const AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBMzBicldXblY0T0Y2eFJpVkFZSTBmQW1xRmtJaWUyanBZODdxR1ZUQzRjIn0.eyJleHAiOjE3NTMzNzA0MzIsImlhdCI6MTc1MzM2OTUzMiwianRpIjoib25ydHJvOjUxMmZiOWY4LWE0OGMtMDExMS0xOTc5LWQxNGNmMmIxM2VjMSIsImlzcyI6Imh0dHBzOi8vZGV2LmR1Y2hlbm5ldWtjb25uZWN0Lm9yZy9rZXljbG9hay9yZWFsbXMvZHVjaGVubmUtdWsiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDlmNzA0N2EtYzIxMy00NmUyLTk2ZjItZWNhMDg4YzllNTA1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZHVjaGVubmUtdWstY2xpZW50Iiwic2lkIjoiMmRlOGIwY2EtZjU1OC00ZWIwLWFiYjItYTdhNWUyMGRiNTViIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2Rldi5kdWNoZW5uZXVrY29ubmVjdC5vcmciLCJodHRwczovL2Vjcy1hcHAtYWxiLWRldmVsb3AtMTQ0OTg3NTYwNS5ldS13ZXN0LTIuZWxiLmFtYXpvbmF3cy5jb20iLCIqIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJjYXJlZ2l2ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1kdWNoZW5uZS11ayJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGRlc2NlbmRhbnRzIGNvbnNlbnQtb3B0aW9ucyBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImRlc2NlbmRhbnRzX2lkcyI6WyJlOTBjYmViNS1hMzJhLTQ0OTktYTY5Ny04MzE5NzY0ZTlhMDQiLCI0NGQwNjNkMi1jYzg1LTRkNWItOTdiNS1kOGQ0ZjFiMGVmMjUiLCI2ZTQ5NzMxZi1lMmZiLTQ3YmYtYWEyZi0zZWUwNDZiNDY0YjUiXSwibmFtZSI6Ikx5ZGlhIENhbXBiZWxsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYmlyYWphQHlvcG1haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ikx5ZGlhIiwiZmFtaWx5X25hbWUiOiJDYW1wYmVsbCIsImVtYWlsIjoiYmlyYWphQHlvcG1haWwuY29tIiwiY29uc2VudE9wdGlvbklkcyI6WyIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTUiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTIiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTMiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTEiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTQiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmZTIiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmZTEiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmZjIiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmZjEiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYzUiLCIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYzYiXX0.iKCbTfANR54Lwn6u4aUFZWEv_Ntq3oObU5IfX7QB4DsIqrAZ7dQAKzAbIRzvSEtGzzV-agXkyzIw5BkxsL4sLlNAurGE1lUFf2rPeaRxx-6aziMUCVI1HwBT3DwCU23cJhfmHyTSvgqGQozYcmrbTcyiFMPrq8EBkiSENoynBuWenCp1pwrENIhVfclzYd-1jRtJgYyCVvLxWiwXxHUiCi8GR9d1FmSLbste95_EUt5gAI81Mt3Jikvmksq_5oJY1MwU_M-Afp6E5F4CColOiOigzfYIpjqgCvmASUWFC2nKcXhubXRLJbvXhpheIw8iq4I4IRMB1aBwJTk6DtV05g" ;

// const PATIENT_ID = __ENV.PATIENT_ID;

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

export function loadDashboard() {
  group('Dashboard API Load', () => {
    const apis = [
      { name: 'Get Profile Info', url: `${BASE_URL}/api/User/profile-info` },
      { name: 'Get Available Patients', url: `${BASE_URL}/api/patient-switcher/available-patients` },
      { name: 'Get Documents', url: `${BASE_URL}/api/Documents?pageNumber=1&pageSize=10` },
      { name: 'Get Care Articles', url: `${BASE_URL}/api/CareArticle?pageNumber=1&pageSize=3` },
    ];

    for (const api of apis) {
      const res = http.get(api.url, { headers });
      dashboardLoadTime.add(res.timings.duration);
      check(res, {
        [`${api.name} returns 200`]: (r) => r.status === 200,
        [`${api.name} < 3s`]: (r) => r.timings.duration < 3000,
      });
    }
  });
  sleep(1);
}

export function stressDashboard() {
  const res = http.get(`${BASE_URL}/dashboard`, { headers });
  check(res, {
    'Stress - Dashboard loaded': (r) => r.status === 200,
    'Stress - Time < 5s': (r) => r.timings.duration < 5000,
  });
}