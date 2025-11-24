# API Configuration

## ⚠️ IMPORTANT: API Key Required

The app currently shows a **400 Bad Request** error because the API key needs to be updated.

## API Ninjas Exercise API Setup

This app uses the **API Ninjas Exercise API** to fetch real exercise data.

### 🚀 Quick Setup (2 minutes)

1. **Get your FREE API Key**
   - Visit: https://api-ninjas.com/
   - Click "Sign Up" (top right)
   - Verify your email
   - Go to your dashboard and copy your API key

2. **Add API Key to the App**
   - Open: `src/features/exercises/exerciseApi.ts`
   - Find line 7: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace with your key: `const API_KEY = 'your-actual-api-key-here';`
   - Save the file

3. **Restart the App** 
   - Stop Metro (Ctrl+C in terminal)
   - Run: `npm start`
   - Press `w` to open in browser
   - Exercises should now load! ✅

### Free Tier Limits
- ✅ 50,000 requests/month (plenty for development!)
- ✅ No credit card required
- ✅ Perfect for this assignment

### Current Status
❌ **Error:** 400 Bad Request  
📝 **Reason:** API key in the code is invalid/expired  
✅ **Solution:** Follow the setup steps above

### API Documentation
- Full docs: https://api-ninjas.com/api/exercises
- Available muscle groups: chest, back, biceps, triceps, quadriceps, hamstrings, glutes, abdominals
- Difficulty levels: beginner, intermediate, expert

### Troubleshooting

**Still getting 400 error?**
- Make sure you copied the ENTIRE API key (no spaces)
- Check the key is between quotes: `'your-key-here'`
- Verify your account is active at api-ninjas.com
- Try generating a new API key

**No exercises loading?**
- Check browser console (F12) for errors
- Verify internet connection
- Try a different category (click different muscle group)

**Authentication works fine!**
- Auth uses DummyJSON (already configured)
- Username: `emilys` / Password: `emilyspass`
- Or any user from: https://dummyjson.com/users

