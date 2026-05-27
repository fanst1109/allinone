// script.js — k6 load test cho URL Shortener (redirect endpoint, read-heavy).
//
// CÀI k6: https://k6.io/docs/get-started/installation/
// CHẠY  : k6 run script.js
//         k6 run -e BASE=http://localhost:8080 script.js
//
// Scenario: ramp lên 1000 req/s, giữ, rồi ramp xuống — đo p50/p99 + error rate.
// thresholds = SLO: nếu vi phạm, k6 exit code != 0 (dùng được trong CI gate).

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const BASE = __ENV.BASE || 'http://localhost:8080';

// Custom metrics để theo dõi riêng redirect.
const redirectErrors = new Rate('redirect_errors');
const redirectLatency = new Trend('redirect_latency_ms', true);

export const options = {
  // arrival-rate executor: giữ TỐC ĐỘ request cố định (không phụ thuộc latency),
  // giống traffic thật hơn so với "N VU lặp" (VU chậm -> giảm RPS, sai lệch đo).
  scenarios: {
    redirect_load: {
      executor: 'ramping-arrival-rate',
      startRate: 100,           // bắt đầu 100 req/s
      timeUnit: '1s',
      preAllocatedVUs: 200,     // pool VU sẵn sàng
      maxVUs: 500,
      stages: [
        { target: 1000, duration: '30s' }, // ramp lên 1000 req/s
        { target: 1000, duration: '1m' },  // giữ tải đỉnh
        { target: 0, duration: '15s' },     // ramp xuống
      ],
    },
  },
  // SLO threshold — vi phạm -> test FAIL (CI chặn deploy).
  thresholds: {
    http_req_duration: ['p(50)<10', 'p(99)<50'], // p50<10ms, p99<50ms
    http_req_failed: ['rate<0.01'],               // error rate < 1%
    redirect_errors: ['rate<0.01'],
  },
};

// Danh sách short code mẫu (production: đọc từ file CSV qua SharedArray).
const codes = ['abcd', 'wxyz', 'go123', 'k8s99', 'redis1'];

export default function () {
  const code = codes[Math.floor(Math.random() * codes.length)];
  // redirects: 0 -> KHÔNG follow redirect, đo đúng latency của endpoint redirect.
  const res = http.get(`${BASE}/r/${code}`, { redirects: 0 });

  redirectLatency.add(res.timings.duration);
  const ok = check(res, {
    'status is 302': (r) => r.status === 302,
  });
  redirectErrors.add(!ok);

  sleep(0.001);
}

// Tóm tắt in ra cuối run (k6 tự in summary; đây là handler tuỳ chọn).
export function handleSummary(data) {
  const p99 = data.metrics.http_req_duration.values['p(99)'].toFixed(2);
  const p50 = data.metrics.http_req_duration.values['p(50)'].toFixed(2);
  const errRate = (data.metrics.http_req_failed.values.rate * 100).toFixed(2);
  return {
    stdout: `\n==== TÓM TẮT ====\n p50=${p50}ms  p99=${p99}ms  error=${errRate}%\n`,
  };
}
