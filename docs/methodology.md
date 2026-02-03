# Methodology (Draft)

This project is an evidence-first, human-rights documentation interface.

## Principles
- **Source transparency:** Every metric should link to a citation (URL + publisher + date).
- **Verification status:** Each record/metric is labeled as `Verified` or `Reported` (or equivalent).
- **Non-incendiary framing:** Present facts and sources; avoid calls for violence or harassment.
- **Change log:** When numbers change, keep the previous value and the update timestamp.

## Suggested Data Model
- `id`, `category`, `location`, `date_range`, `value`
- `status`: verified | reported
- `sources`: [{ title, publisher, url, published_at, accessed_at }]
- `notes`: short context and limitations
