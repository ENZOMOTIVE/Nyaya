# Nyaya

> Nyaya is an e-FIR system prototype with World ID integration for identity-aware complaint workflows.

## The Story

Nyaya starts with a simple goal: connect a user-facing product experience with protocol logic that can be inspected and evolved. Its shape tells the same story: the product interface, the service layer, and the protocol or smart-contract layer live close enough together that a maintainer can see the project as a whole before diving into individual folders.

## Detailed Description

Nyaya is an e-FIR system prototype with World ID integration for identity-aware complaint workflows. This README is meant to explain the project like a handoff note: what the idea is, why the repository exists, and how someone can start working with it without opening every file first.

The repository is most useful when the frontend and contract layer are documented together. The UI explains the user journey, while the protocol files explain the rules, assets, or verification model behind that journey.

At the top level, the most important entry points are `backend`, `contracts`, `hardhat.config.js`, `ignition`, `package.json`, and `police-frontend`. Together they show the current boundary of the project and make it easier to separate product code, support files, documentation, and experiments.

The declared Node surfaces include `backend` (scripts: `test`), the root package (no scripts declared), `police-frontend` (scripts: `start`, `build`, `test`, `eject`), and `user-frontend` (scripts: `start`, `build`, `test`, `eject`). Those package files are the best starting points for understanding how the app runs, builds, or validates itself.

The visible stack currently points to `React`, `Express`, `Hardhat`, `Node.js`, `JavaScript`, `Solidity`, `HTML`, and `CSS`. Keep this list honest as the project changes so the README remains useful as a first technical map.

## What It Includes

- A user-facing surface for the product, demo, dashboard, or static experience.
- A service layer for APIs, realtime behavior, bot logic, or server-side workflows.
- Protocol or smart-contract files that anchor the Web3 side of the project.

## How It Is Put Together

| Path | Role |
| --- | --- |
| `.gitignore` | ignored local, dependency, and build files |
| `backend` | service, bot, API, or realtime layer |
| `contracts` | smart-contract source |
| `hardhat.config.js` | JavaScript source |
| `ignition` | project file or folder |
| `package-lock.json` | locked dependency versions |
| `package.json` | Node package scripts and dependencies |
| `police-frontend` | frontend or dashboard application |
| `test` | project file or folder |
| `user-frontend` | frontend or dashboard application |

## Local Development

```bash
git clone https://github.com/ENZOMOTIVE/Nyaya.git
cd Nyaya
```

```bash
cd backend
npm install
```

```bash
npm install
```

```bash
cd police-frontend
npm install
npm start
```

```bash
cd user-frontend
npm install
npm start
```

## Command Surface

| Area | Commands |
| --- | --- |
| `backend/package.json` | `test` |
| `police-frontend/package.json` | `start`, `build`, `test`, `eject` |
| `user-frontend/package.json` | `start`, `build`, `test`, `eject` |
| Smart contracts | `npx hardhat compile`, `npx hardhat test` |

## Configuration

- Document API ports, database URLs, third-party credentials, and service endpoints in `.env.example` before deployment.
- Keep wallet private keys, RPC URLs, mnemonics, and contract secrets outside version control.

## Quality Checks

- From `backend`, run `npm test`.
- From `police-frontend`, run `npm test`.
- From `police-frontend`, run `npm run build`.
- From `user-frontend`, run `npm test`.
- From `user-frontend`, run `npm run build`.
- Run the Hardhat test suite before deploying or changing contract behavior.

## Where To Take It Next

- Add screenshots or a short user flow so visitors can see the interface before running it.
- Document the main API routes, bot events, or service responsibilities with example inputs and outputs.
- Record supported networks, deployment addresses, and contract verification steps when they exist.
- Keep setup commands current whenever dependencies, scripts, or deployment targets change.
- Record important product decisions here so the repository keeps its story as the code evolves.

## Project Metadata

| Field | Details |
| --- | --- |
| Repository | `ENZOMOTIVE/Nyaya` |
| Categories | `Full Stack`, `Protocol` |
| Primary stack | React, Express, Hardhat, Node.js, JavaScript, Solidity, HTML, CSS |


## License

No license file is currently committed. Add one before distributing this project publicly.
