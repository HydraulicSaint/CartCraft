// Script to export meal and preference data for analytics.
// In a real environment this would connect to your database.
// For the sample repo we read from a placeholder JSON file.

const fs = require("fs");

const INPUT_PATH = './analytics/sampleData.json'; // replace with real path
const OUTPUT_PATH = './analytics/export.json';

function run() {
  try {
    const raw = fs.readFileSync(INPUT_PATH, 'utf8');
    const data = JSON.parse(raw);
    // Filter only fields needed for analytics
    const exported = data.map(({ userId, mealPlans, preferences }) => ({
      userId, // will be pseudonymized later
      mealPlans,
      preferences,
    }));
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(exported, null, 2));
    console.log('Data exported to', OUTPUT_PATH);
  } catch (err) {
    console.error('Export failed', err);
    process.exit(1);
  }
}

run();
