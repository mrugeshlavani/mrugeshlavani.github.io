/* -------------------------------------- */
/* MAIN JS – Interactive Features         */
/* -------------------------------------- */

/* ========== FOOTER YEAR ========== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ========== METRIC COUNTERS ========== */
let metricsStarted = false;

function startCounters() {
  const counters = document.querySelectorAll(".metric-value");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count") || "0", 10);
    let current = 0;
    const speed = Math.max(1, Math.ceil(target / 40));

    function updateCount() {
      current += speed;
      if (current >= target) {
        counter.textContent = target + "%";
      } else {
        counter.textContent = current + "%";
        requestAnimationFrame(updateCount);
      }
    }

    updateCount();
  });
}

function maybeStartCounters() {
  if (metricsStarted) return;
  const metricsSection = document.getElementById("metrics");
  if (!metricsSection) return;

  const rect = metricsSection.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.8;

  if (rect.top < triggerPoint) {
    metricsStarted = true;
    startCounters();
  }
}

window.addEventListener("scroll", maybeStartCounters);
window.addEventListener("load", maybeStartCounters);

/* ========== SKILLS RADAR CHART ========== */
(function initRadarChart() {
  const canvas = document.getElementById("skillsRadar");
  if (!canvas) return;
  if (typeof Chart === "undefined") return; // avoid breaking if CDN fails

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Security",
        "Automation",
        "Backend Dev",
        "Linux/Systems",
        "Cloud Concepts",
        "UX / HCD",
      ],
      datasets: [
        {
          label: "Current Focus",
          data: [85, 80, 75, 70, 65, 60],
          fill: true,
          backgroundColor: "rgba(56, 189, 248, 0.2)",
          borderColor: "#38bdf8",
          pointBackgroundColor: "#38bdf8",
          pointBorderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          angleLines: { color: "rgba(255, 255, 255, 0.15)" },
          ticks: { display: false },
          pointLabels: {
            color: "#cbd5e1",
            font: { size: 12 },
          },
        },
      },
      plugins: {
        legend: {
          labels: { color: "#e2e8f0" },
        },
      },
    },
  });
})();

/* ========== CYBER LAB LOG ANALYZER ========== */
(function initCyberLab() {
  const logOutput = document.getElementById("log-output");
  const button = document.getElementById("run-detector");
  if (!logOutput || !button) return;

  const sampleLog = `
INFO 2025-12-09T13:02:11Z api-gateway 200 /labels/create user=104 latency=142ms
INFO 2025-12-09T13:02:12Z auth        200 /login user=104 ip=10.0.0.5
WARN 2025-12-09T13:02:13Z auth        401 /login user=unknown ip=198.51.100.23
INFO 2025-12-09T13:02:14Z worker      job=shipment_sync status=ok duration=532ms
INFO 2025-12-09T13:02:19Z api-gateway 200 /labels/create user=104 latency=151ms
INFO 2025-12-09T13:02:21Z db          connection_pool size=15 used=7
WARN 2025-12-09T13:02:25Z auth        401 /login user=unknown ip=198.51.100.23
WARN 2025-12-09T13:02:26Z auth        401 /login user=unknown ip=198.51.100.23
WARN 2025-12-09T13:02:27Z auth        401 /login user=unknown ip=198.51.100.23
ERROR 2025-12-09T13:02:28Z auth        lockout ip=198.51.100.23 reason=too_many_failed_logins
INFO 2025-12-09T13:02:30Z api-gateway 200 /healthz
`.trim();

  function renderInitialLog() {
    logOutput.textContent = sampleLog;
  }

  function highlightAnomalies() {
    const lines = sampleLog.split("\n");
    let html = "";

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (
        trimmed.includes("ERROR") ||
        trimmed.includes("401") ||
        trimmed.includes("lockout")
      ) {
        html += `<span class="anomaly">${trimmed}</span>\n`;
      } else {
        html += `${trimmed}\n`;
      }
    });

    logOutput.innerHTML = html;
  }

  // Initial render
  renderInitialLog();

  button.addEventListener("click", (e) => {
    e.preventDefault();
    highlightAnomalies();
  });
})();