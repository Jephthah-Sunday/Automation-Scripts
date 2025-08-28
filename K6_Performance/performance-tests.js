import { loadDashboard, stressDashboard } from './scenarios/dashboard.js';
import { loadRegistryForm, submitForm } from './scenarios/registry.js';
// import { exportData } from './scenarios/export.js';
// import { syncAndDashboard } from './scenarios/sync.js';

export let options = {
  scenarios: {
    //dashboard_load: { executor: 'constant-vus', exec: 'loadDashboard', vus: 50, duration: '1m' },
    // dashboard_stress: { executor: 'constant-vus', exec: 'stressDashboard', vus: 150, duration: '30s', startTime: '1m' },
    registry_form_load: { executor: 'constant-vus', exec: 'loadRegistryForm', vus: 10, duration: '1m',},
    // concurrent_submission: { executor: 'per-vu-iterations', exec: 'submitForm', vus: 30, iterations: 1, startTime: '0s' },
    // export_module: { executor: 'constant-vus', exec: 'exportData', vus: 30, duration: '30s', startTime: '2m30s' },
    // spike_export: {
    //   executor: 'ramping-arrival-rate',
    //   exec: 'exportData',
    //   startRate: 0,
    //   timeUnit: '1s',
    //   preAllocatedVUs: 100,
    //   stages: [{ target: 100, duration: '10s' }, { target: 0, duration: '20s' }],
    //   startTime: '3m',
    // },
    // offline_sync: { executor: 'per-vu-iterations', exec: 'syncAndDashboard', vus: 60, iterations: 1, startTime: '3m30s' }
  },
  thresholds: {
    'http_req_duration': ['p(95)<5000'],
    'dashboard_load_time': ['avg<3000'],
    'form_load_time': ['avg<2500'],
    'export_time': ['avg<5000'],
    'sync_time': ['avg<5000'],
  }
};

export {loadRegistryForm}; // Exporting these functions for use in the scenarios
// Uncomment the exportData and syncAndDashboard when those scenarios are ready to be included
// export { loadDashboard, stressDashboard}; 
//, loadRegistryForm, submitForm, exportData, syncAndDashboard // Add these to the export data when it is ready
// Note: Uncomment the exportData and syncAndDashboard when those scenarios are ready to be included