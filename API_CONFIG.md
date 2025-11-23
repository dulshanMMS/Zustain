# API Configuration

## API Ninjas Exercise API Setup

This app uses the **API Ninjas Exercise API** to fetch real exercise data.

### Quick Setup (2 minutes)

1. **Get your FREE API Key**
   - Visit: https://api-ninjas.com/
   - Click "Sign Up" (top right)
   - Verify your email
   - Copy your API key from the dashboard

2. **Add API Key to the App**
   - Open: `src/features/exercises/exerciseApi.ts`
   - Find line 7: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace with your key: `const API_KEY = 'abc123xyz456';`
   - Save the file

3. **That's it!** 
   - Restart the app: `npm start`
   - Exercises will now load from the real API

### Free Tier Limits
- ✅ 10,000 requests/month
- ✅ No credit card required
- ✅ Perfect for this assignment

### API Documentation
- Full docs: https://api-ninjas.com/api/exercises
- Available muscle groups: biceps, triceps, chest, back, legs, shoulders, abs
- Difficulty levels: beginner, intermediate, expert

### Troubleshooting

**No exercises loading?**
- Check you added the API key correctly
- Verify key at: https://api-ninjas.com/profile
- Check internet connection

**Want to test without API key?**
- Use DummyJSON for auth (already configured)
- Auth works with: username `emilys`, password `emilyspass`
