# NovelAI image wire fixtures

Retrieved on 2026-08-05 from NovelAI's first-party Swagger documents:

- Primary API and `/ai/generate-image`: https://api.novelai.net/docs
- Image Generation API: https://image.novelai.net/docs/index.html
- Machine-readable Image Generation schema: https://image.novelai.net/docs/doc.json

The API documents `application/zip` and `application/json` image responses and accepts a Persistent API token through the transport-owned Authorization header. TavernCanvas fixtures contain no token, account data, host override, or user prompt. Binary ZIP and multipart cases are represented as deterministic entry descriptors and assembled by tests.
