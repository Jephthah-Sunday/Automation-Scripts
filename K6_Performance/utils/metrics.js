import { Trend } from 'k6/metrics';

export let dashboardLoadTime = new Trend('dashboard_load_time');
export let formLoadTime = new Trend('form_load_time');
export let exportTime = new Trend('export_time');
export let syncTime = new Trend('sync_time');