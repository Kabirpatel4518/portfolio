// Change this to 'true' when you want to use the live server,
// and 'false' when you are testing locally on your computer.
export const isLive = false;

// Set your live backend URL here (e.g., https://api.yourdomain.com)
const LIVE_URL = "https://your-live-backend-url.com";
const LOCAL_URL = "http://localhost:5000";

export const API_URL = isLive ? LIVE_URL : LOCAL_URL;
