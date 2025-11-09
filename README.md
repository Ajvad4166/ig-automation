# Instagram Automation Dashboard

A web-based dashboard for Instagram automation using the official Instagram Graph API.

## Features

- **Dashboard Overview**: Stats and analytics for your Instagram account
- **Reels Management**: Add and manage reels with custom messages
- **Message Templates**: Create reusable message templates
- **Automation Settings**: Configure follow messages, delays, and retry logic
- **Real-time Analytics**: View engagement metrics and performance data
- **API Integration**: Connects to Instagram Graph API for real data

## Setup Instructions

### 1. Instagram API Access

To use this application, you need Instagram Graph API access:

1. **Create a Facebook Developer Account**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app or use an existing one

2. **Add Instagram Basic Display Product**
   - In your app dashboard, click "Add Product"
   - Select "Instagram Basic Display"

3. **Configure Instagram Basic Display**
   - Add your Instagram account as a tester
   - Set up OAuth redirect URIs (can use localhost for development)

4. **Generate Access Token**
   - Use the Graph API Explorer to generate a short-lived access token
   - Exchange it for a long-lived token (valid for 60 days)

5. **For Business Features** (optional)
   - Apply for Instagram Graph API access
   - This provides more advanced features like insights

### 2. Environment Setup

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Instagram access token:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_actual_access_token_here
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000`

## API Limitations

Instagram's official API has strict limitations for automation:

- ✅ **Reading data**: Profile info, media, comments, insights
- ✅ **Replying to comments**: Limited to your own posts
- ❌ **Sending DMs**: Not available via API
- ❌ **Following/unfollowing users**: Not available
- ❌ **Posting comments**: Not available for automation
- ❌ **Automated interactions**: Against Instagram's terms

## Deployment

### Option 1: Traditional Hosting
Deploy `server.js` to any Node.js hosting provider (Heroku, DigitalOcean, etc.)

### Option 2: Serverless (Recommended)
Convert to Netlify Functions or Vercel Functions for serverless deployment.

## Important Notes

- **Terms of Service**: Ensure your automation complies with Instagram's terms
- **Rate Limits**: Instagram API has rate limits - respect them to avoid blocks
- **Token Refresh**: Long-lived tokens expire every 60 days
- **Security**: Never commit your access token to version control

## Support

This application uses Instagram's official Graph API. For API-specific issues, refer to:
- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api/)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api/)

## License

MIT License - see LICENSE file for details.
