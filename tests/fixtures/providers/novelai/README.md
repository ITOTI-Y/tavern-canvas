# NovelAI image wire fixtures

The response fixtures follow NovelAI's first-party Swagger documents:

- Image Generation API: https://image.novelai.net/docs/index.html
- Machine-readable Image Generation schema: https://image.novelai.net/docs/doc.json

`generate_request.json` is the routed payload `map_novelai_request` produces for the V4.5 Full request in `novelai_adapter.test.ts`. Its field set matches the request NovelAI's web client sends for `params_version` 4, and requests of this shape are accepted by `https://image.novelai.net/ai/generate-image`.

The API returns `application/zip` or `application/json` image responses and accepts a Persistent API token through the transport-owned Authorization header. The fixtures contain no token, account data, host override, or user prompt. Binary ZIP and multipart cases are represented as deterministic entry descriptors and assembled by tests.
