/* -------------------------------------- */
/* MAIN JS – Interactive Features         */
/* -------------------------------------- */

/* ========== FOOTER YEAR ========== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ========== METRIC COUNTERS ========== */
function startCounters() {
  const counters = document.querySelectorAll(".metric-value");
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-count");
    let current = 0;
    const speed = Math.ceil(target / 40);

    const updateCount = () => {
      current += speed;
      if (current >= target) {
        counter.textContent = target + "%";
      } else {
        counter.textContent = current + "%";
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  });
}

// Run counters on scroll into view
let metricsStarted = false;
window.addEventListener("scroll", () => {
  const metrics = document.querySelector("#metrics");
  if (!metricsStarted && window.scrollY + window.innerHeight > metrics.offsetTop + 200) {
    metricsStarted = true;
    startCounters();
  }
});

/* ========== SKILLS RADAR CHART ========== */
const ctx = document.getElementById("skillsRadar");

if (ctx) {
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
          label: "Skill Level",
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
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          angleLines: {
            color: "rgba(255, 255, 255, 0.15)",
          },
          ticks: {
            display: false,
          },
          pointLabels: {
            color: "#cbd5e1",
            font: {
              size: 14,
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#e2e8f0",
          },
        },
      },
    },
  });
}

/* ========== CYBER LAB LOG ANALYZER ========== */
const sampleLog = `
INFO 2024-11-02 12:45:21 User login succeeded: user=John
WARN 2024-11-02 12:46:03 Failed login attempt: user=unknown IP=185.23.44.19
INFO 2024-11-02 12:46:50 Label generated successfully: order=32920
WARN 2024-11-02 12:47:33 Suspicious activity detected: multiple resets
ERROR 2024-11-02 12:48:10 Unauthorized access attempt: route=/admin IP=91.204.32.11
INFO 2024-11-02 12:49:02 Worker restarted automatically
ERROR 2024-11-02 12:49:22 Payment API timeout for user=Sarah
INFO 2024-11-02 12:50:00 Order processed: order=32921
`;

const logOutput = document.getElementById("log-output");
if (logOutput) {
  logOutput.textContent = sampleLog;
}

function highlightAnomalies() {
  const lines = sampleLog.split("\n");
  let result = "";

  lines.forEach((line) => {
    if (line.includes("ERROR") || line.includes("WARN") || line.includes("Unauthorized")) {
      result += `<span class="anomaly">${line}</span>\n`;
    } else {
      result += `${line}\n`;
    }
  });

  logOutput.innerHTML = result;
}

const btn = document.getElementById("run-detector");
if (btn) {
  btn.addEventListener("click", highlightAnomalies);
}