# Third party notices

This file lists third party software and data distributed with TavernCanvas 3.0.0, together with
their licenses. It covers the release archive `tavern-canvas.zip` and the repository as published.
The license notice in `README.md` applies to first party TavernCanvas source code only and does not
apply to anything listed here.

## Libraries compiled into the extension runtime

These are the third party libraries whose code is present in the shipped `dist/` bundle.

| Package                 | Version | License      |
| ----------------------- | ------- | ------------ |
| `vue`                   | 3.5.40  | MIT          |
| `vue-i18n`              | 11.4.8  | MIT          |
| `reka-ui`               | 2.10.1  | MIT          |
| `lucide-vue-next`       | 1.0.0   | ISC          |
| `@tanstack/vue-virtual` | 3.13.35 | MIT          |
| `zod`                   | 4.4.3   | MIT          |
| `@noble/hashes`         | 2.2.0   | MIT          |
| `idb`                   | 8.0.3   | ISC          |
| `@zip.js/zip.js`        | 2.8.34  | BSD-3-Clause |
| `@msgpack/msgpack`      | 3.1.3   | ISC          |

### Declared dependencies absent from this release's bundle

`apps/extension/package.json` also declares `marked` 18.0.9 (MIT), `dompurify` 3.4.13
(MPL-2.0 OR Apache-2.0), and `@huggingface/transformers` 4.2.0 (Apache-2.0). All three are reached
only through dynamic imports from modules that the 3.0.0 entry point does not pull in, and none of
their code appears in the built `dist/` tree. They are listed here because they are declared
dependencies a source build resolves, not because they ship in the archive.

## Gateway service dependencies

The Gateway in `apps/gateway` is not part of the extension release archive. It is published in this
repository and depends on:

| Package              | Version | License    |
| -------------------- | ------- | ---------- |
| `express`            | 5.2.1   | MIT        |
| `express-rate-limit` | 8.6.2   | MIT        |
| `helmet`             | 8.3.0   | MIT        |
| `better-sqlite3`     | 13.0.2  | MIT        |
| `pino`               | 10.3.1  | MIT        |
| `file-type`          | 22.0.1  | MIT        |
| `sharp`              | 0.35.3  | Apache-2.0 |
| `zod`                | 4.4.3   | MIT        |

## Geist font

`dist/geist_variable.woff2` is Geist Variable, self hosted so the extension never fetches a font from
a content delivery network at runtime.

- Copyright 2024 The Geist Project Authors, https://github.com/vercel/geist-font
- Licensed under the SIL Open Font License, Version 1.1

OFL clause 2 requires every copy of the Font Software to carry the copyright notice and the license,
so the full text is reproduced below rather than only referenced. It is also retained in the
repository at `apps/extension/src/ui/assets/fonts/OFL.txt`.

```text
Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```

## NovelAI prompt tokenizer

`dist/tokenizers/novelai/` contains tokenizer data files used for NovelAI prompt token budget
counting. NovelAI has never published tokenizer weights for local use, so the legacy v2.8.1 code
approximated the 512 token budget with a public T5 tokenizer. This release pins the same tokenizer
and loads it from these bundled local assets rather than fetching it at runtime.

| Field     | Value                                      |
| --------- | ------------------------------------------ |
| Model     | `Xenova/t5-small`                          |
| Source    | https://huggingface.co/Xenova/t5-small     |
| Revision  | `4e0d91096b13cb313b43a14f35fdbb311a6d9728` |
| Retrieved | 2026-08-07                                 |
| Contents  | `tokenizer.json`, `tokenizer_config.json`  |

Model weights are deliberately excluded; only the tokenizer vocabulary and configuration ship.

Recorded checksums:

| File                    | Bytes     | SHA-256                                                            |
| ----------------------- | --------- | ------------------------------------------------------------------ |
| `tokenizer.json`        | 2,422,095 | `5f0ed8ab5b8cfa9812bb73752f1d80c292e52bcf5a87a144dc9ab2d251056cbb` |
| `tokenizer_config.json` | 2,324     | `d1e7146101aa96282057f374aa9c3b260fba2109e5990edb1775d6efc70ffa3c` |

The provenance record captured at download time, `apps/extension/public/tokenizers/novelai/SOURCE.json`,
does not carry a license declaration for these files. Consult the upstream model card before reusing
them outside this project.

## Vocabulary data

`dist/vocabulary/baseline/` contains the `tavern-canvas-baseline` package, data version 1.1.0,
50,000 records. It is derived from the sources below. Full provenance, transformation notes, and
per source redistribution decisions are recorded in `data/vocabulary/LICENSES.json`; this section
summarises the sources that are actually redistributed.

### Tag universe and categories

- Source: `JayxMay95/danbooru-tags-JayMay` on Hugging Face, whose row count is identical to
  `qdlabs/danbooru-tags`; both are cited.
- License: Apache-2.0, which permits redistribution and modification.
- Attribution: JayxMay95 and qdlabs on Hugging Face. The underlying facts originate from Danbooru,
  https://danbooru.donmai.us.
- Use: tag names and categories only. This source's own post counts are stale and are not used.

### Popularity counts

- Source: `u-haru/danbooru-tags-20260518` on Hugging Face, a post level snapshot dated 2026-05-18,
  aggregated into posts per tag excluding deleted posts.
- License: not explicitly declared on the dataset card. Treated as factual, derived Danbooru post
  metadata rather than creative content, consistent with the treatment of the tag table above.
- Attribution: u-haru on Hugging Face. The underlying facts originate from Danbooru.

### Live popularity supplement

- Source: `https://danbooru.donmai.us/tags.json`, fetched 2026-08-06, top 60,000 tags ordered by post
  count.
- License: factual data obtained through Danbooru's public API, comprising tag name and post count.
- Attribution: Danbooru, https://danbooru.donmai.us.

### Chinese translations

- Source: the `translate` field in the legacy st-chatu8 v2.8.1 tag data, community contributed
  translations of Danbooru tag names, roughly 2023 vintage.
- License: **unknown**. No license or attribution trail was found for the translation strings
  themselves, which are distinct from the license governing the surrounding legacy repository.
- Attribution: unknown upstream community contributors; not traceable from the archived repository.
- Redistribution: included by an explicit decision of the repository owner, who has accepted
  responsibility for resolving any upstream translation licensing questions. **This is an acceptance
  of risk, not a license clearance.** If upstream provenance is established, or a complaint is
  received, this entry and the shipped artifacts should be revisited.

### Not redistributed

The legacy st-chatu8 v2.8.1 tag data itself is governed by the Aladdin Free Public License v9, a non
commercial, non OSI license. Neither the decrypted archive nor the full local seed is committed or
distributed. It contributes only the translation strings described above.
