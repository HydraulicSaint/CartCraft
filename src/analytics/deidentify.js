// Remove personal identifiers from exported data.
// Replaces userId with hashed value and strips any extra PII fields.

const fs = require("fs");
const crypto = require("crypto");

const INPUT_PATH = './analytics/export.json';
const OUTPUT_PATH = './analytics/deidentified.json';

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function run() {
  try {
    const raw = fs.readFileSync(INPUT_PATH, 'utf8');
    const data = JSON.parse(raw);
    const cleaned = data.map((rec) => ({
      id: hash(String(rec.userId)),
      mealPlans: rec.mealPlans,
      preferences: rec.preferences,
    }));
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cleaned, null, 2));
    console.log('De-identified data saved to', OUTPUT_PATH);
  } catch (err) {
    console.error('De-identification failed', err);
    process.exit(1);
  }
}

run();
