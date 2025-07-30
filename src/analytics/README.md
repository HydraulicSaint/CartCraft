# Analytics Tasks

This directory contains sample scripts that demonstrate how to extract,
de-identify and generate aggregated insights from user meal data.

The data in `sampleData.json` is placeholder data for demonstration only.

## Task 1: Export raw data
Run the extraction script which would normally connect to your database
and fetch user records.

```bash
node analytics/extractData.js
```

The script outputs `analytics/export.json`.

## Task 2: De-identify records
Remove personal identifiers and pseudonymize user IDs.

```bash
node analytics/deidentify.js
```

This produces `analytics/deidentified.json` containing sanitized data.

## Task 3: Generate insights
Create aggregated statistics from the de-identified data that can be
shared with retailers.

```bash
node analytics/generateInsights.js
```

Aggregated results are written to `analytics/insights.json`.

## Notes
Ensure that you have the rights to process this data and that the
resulting output meets the legal definition of anonymized or
aggregated information in your jurisdiction before sharing it externally.
