# Farcaster Neynar Channel Bot

In the 2026 decentralized social stack, **Farcaster Channels** function as community hubs. Managing engagement, content moderation, and algorithmic reward routing requires real-time monitoring infrastructure. This repository provides a professional-grade Node.js architecture for an automated Channel Bot powered by the **Neynar API**.

The bot processes casting logs, parses user engagement metrics (recasts, likes, and replies), and hooks directly into automated LLM workflows or on-chain reward criteria based on community interactions.

## Core Features
- **Stream Ingestion Loop:** Leverages Neynar WebSocket/Event protocols to watch specific Farcaster channels with ultra-low latency.
- **Engagement Rank Algorithms:** Quantifies user reputation instantly by mapping cast quality using social graph indexes.
- **Automated Interaction Rules:** Programmatically posts replies, registers reactions, or triggers on-chain actions via integrated wallet primitives.
- **Flat Layout:** All processing loops, webhook configurations, and rule files reside collectively in the root path.

## Setup & Execution
1. Install project structures: `npm install`
2. Configure your Neynar credentials and signer keys inside `.env`.
3. Launch the worker bot daemon: `node channelBot.js`
