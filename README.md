# DoorDash AM Growth Copilot

An internal, source-grounded decision-support MVP for Account Managers. It helps an AM move from merchant goal to a focused campaign recommendation, talk track, objection response, and next action.

## What it does

- Uses a deterministic rule engine - not an LLM - to recommend one primary campaign.
- Keeps campaign content, objection flows, source metadata, and time-sensitive offers in maintainable data files.
- Distinguishes Order Again & Save from Store Loyalty.
- Blocks historical and confidential special-program records from normal recommendations.
- Includes a local mock provider for future AI integration without requiring an API key.
- Provides dedicated browser routes for Campaigns, Objections, Playbook, Local Activity, and Settings.

## Web application routes

- `/` and `/copilot`: merchant-context, recommendation, talk-track, and live-call workflow.
- `/campaigns`: source-referenced campaign library and detail view.
- `/objections`: six-step consultative objection playbooks.
- `/playbook`: discovery framework and source-control guidance.
- `/analytics`: clearly-labelled demo/local activity dashboard.
- `/settings`: browser-local display and data-mode controls.

## Source safety

Every record is source-tagged. The UI treats performance examples, pricing, eligibility, and time-sensitive programs as verification-required where appropriate. It does not expose confidential special-program details.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Test

```bash
npm test
npm run build
```

## Key folders

- `data/`: source-grounded campaigns, objections, sample merchants, time-sensitive offer controls.
- `lib/`: deterministic recommendation and objection engines plus the mock provider.
- `types/`: shared data contracts.
- `tests/`: focused rule and source-control tests.

## Adding content safely

1. Add a structured record in `data/` with source document, section, page, and confidence.
2. Put rule mappings in `lib/recommendation-engine.ts`, never in UI components.
3. Add tests for the new mapping or exception.
4. Put dated offers in `data/time-sensitive-offers.ts` with `active: false` until independently verified.

## Future integrations

`MockCopilotProvider` implements the provider boundary. A future approved provider must run server-side, use structured outputs, and never override the deterministic business rules. No keys belong in client code.
