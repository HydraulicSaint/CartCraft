// Generate aggregated statistics from de-identified data.

const fs = require("fs");

const INPUT_PATH = './analytics/deidentified.json';
const OUTPUT_PATH = './analytics/insights.json';

function run() {
  try {
    const raw = fs.readFileSync(INPUT_PATH, 'utf8');
    const data = JSON.parse(raw);

    // Example insight: count of meal plans per preference type
    const counts = {};
    for (const rec of data) {
      for (const pref of rec.preferences || []) {
        counts[pref] = (counts[pref] || 0) + 1;
      }
    }

    const insights = {
      preferenceCounts: counts,
      totalRecords: data.length,
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(insights, null, 2));
    console.log('Insights written to', OUTPUT_PATH);
  } catch (err) {
    console.error('Insight generation failed', err);
    process.exit(1);
  }
}

run();
