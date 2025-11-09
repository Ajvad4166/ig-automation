const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

// Instagram Graph API base URL
const INSTAGRAM_API_BASE = 'https://graph.instagram.com';

// Placeholder for Instagram access token - user needs to add their own
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN_HERE';

// Routes

// Get user profile info
app.get('/api/instagram/user', async (req, res) => {
    try {
        const response = await axios.get(`${INSTAGRAM_API_BASE}/me`, {
            params: {
                fields: 'id,username,account_type,media_count',
                access_token: ACCESS_TOKEN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data', details: error.message });
    }
});

// Get user's media (posts/reels)
app.get('/api/instagram/media', async (req, res) => {
    try {
        const response = await axios.get(`${INSTAGRAM_API_BASE}/me/media`, {
            params: {
                fields: 'id,media_type,media_url,permalink,caption,timestamp,like_count,comments_count',
                access_token: ACCESS_TOKEN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch media', details: error.message });
    }
});

// Get media insights (for business accounts)
app.get('/api/instagram/media/:mediaId/insights', async (req, res) => {
    try {
        const { mediaId } = req.params;
        const response = await axios.get(`${INSTAGRAM_API_BASE}/${mediaId}/insights`, {
            params: {
                metric: 'engagement,impressions,reach,saved',
                access_token: ACCESS_TOKEN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch insights', details: error.message });
    }
});

// Get comments on a media
app.get('/api/instagram/media/:mediaId/comments', async (req, res) => {
    try {
        const { mediaId } = req.params;
        const response = await axios.get(`${INSTAGRAM_API_BASE}/${mediaId}/comments`, {
            params: {
                access_token: ACCESS_TOKEN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments', details: error.message });
    }
});

// Reply to a comment (limited by API)
app.post('/api/instagram/comments/:commentId/replies', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { message } = req.body;
        const response = await axios.post(`${INSTAGRAM_API_BASE}/${commentId}/replies`, null, {
            params: {
                message: message,
                access_token: ACCESS_TOKEN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to reply to comment', details: error.message });
    }
});

// Get followers/following (limited data)
app.get('/api/instagram/followers', async (req, res) => {
    try {
        const response = await axios.get(`${INSTAGRAM_API_BASE}/me/followers`, {
            params: {
                access_token: ACCESS_TOKEN
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch followers', details: error.message });
    }
});

// Note: Instagram Graph API has limitations for automation:
// - Cannot send DMs directly
// - Cannot follow/unfollow users
// - Cannot post comments automatically
// - Limited to reading data and replying to comments

// Automation simulation endpoint (for demo purposes)
app.post('/api/automation/start', (req, res) => {
    const { reels, settings } = req.body;

    // Simulate automation process
    const results = reels.map(reel => {
        // Simulate checking for new comments, sending follow messages, etc.
        return {
            reelId: reel.url,
            status: 'processed',
            messagesSent: Math.floor(Math.random() * 5) + 1,
            followsGained: Math.floor(Math.random() * 3)
        };
    });

    res.json({ success: true, results });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
