const axios = require('axios');
require('dotenv').config();

const NEYNAR_API_URL = "https://api.neynar.com/v2";
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || "MOCK_KEY";
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID || "developer";

class NeynarChannelBot {
    /**
     * Polls or streams recent casting data inside a specified channel envelope.
     */
    async monitoringPipeline() {
        console.log(`--- Farcaster Channel Bot Engaged ---`);
        console.log(`Target Feed: /${TARGET_CHANNEL_ID}`);

        try {
            // Configuration payload requesting latest activity items
            const response = await axios.get(`${NEYNAR_API_URL}/feed/channel?channel_id=${TARGET_CHANNEL_ID}&limit=5`, {
                headers: { 'api_key': NEYNAR_API_KEY }
            });

            if (response.data && response.data.casts) {
                const recentCasts = response.data.casts;
                console.log(`[Sync] Ingested ${recentCasts.length} recent community entries.`);
                
                for (const cast of recentCasts) {
                    await this.evaluateCastContent(cast);
                }
            }
        } catch (error) {
            console.error(`[Connection Error] Failed to fetch channel assets:`, error.message);
        }
    }

    /**
     * Inspects cast syntax patterns to flag issues or authorize rewards.
     */
    async evaluateCastContent(cast) {
        const text = cast.text;
        const authorFid = cast.author.fid;
        console.log(` -> Parsing entry from FID [${authorFid}]: "${text.slice(0, 40)}..."`);

        // Example structural filter: flag suspicious or automated spam vectors
        if (text.includes("airdrop-claim-now") || text.includes("free-tokens-link")) {
            console.log(` [Moderation Action] Flagged high-risk pattern from user account.`);
            // In production, execute a POST call to Neynar's /v2/cast endpoint to report/hide
        }
    }
}

const activeBot = new NeynarChannelBot();
// Periodic worker thread loop simulation
setInterval(() => activeBot.monitoringPipeline(), 10000);

module.exports = NeynarChannelBot;
