# Vercel Deployment Guide

## Fix for "Unexpected token '<'" Error

This error occurs when Vercel routes static files (JS/CSS) to `index.html` instead of serving them directly.

## Solution 1: Updated vercel.json (Already Applied)

The `vercel.json` file has been updated with proper routing. However, you also need to:

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:
   - `REACT_APP_VAPI_ASSISTANT_ID` = `4e33fffe-7a27-4a4e-a4f6-cae8ad6668eb`
   - `REACT_APP_VAPI_API_KEY` = `8aff7b94-0a49-4909-8831-69876a7f7e24`
4. Make sure to select **Production**, **Preview**, and **Development** environments
5. Click **Save**

### Step 2: Redeploy

After setting environment variables, trigger a new deployment:
- Go to **Deployments** tab
- Click the **⋯** (three dots) on the latest deployment
- Click **Redeploy**

## Solution 2: Alternative vercel.json (If Solution 1 doesn't work)

If the error persists, try this alternative `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Solution 3: Remove vercel.json (Let Vercel Auto-detect)

Sometimes the simplest solution is to let Vercel auto-detect Create React App:

1. Delete `vercel.json`
2. Make sure environment variables are set in Vercel dashboard
3. Redeploy

Vercel should automatically:
- Detect it's a Create React App
- Run `npm run build`
- Serve from the `build` directory
- Handle routing correctly

## Important Notes

1. **Environment Variables**: Must be set in Vercel dashboard, not just in `.env` file
2. **Build Output**: Make sure `npm run build` creates a `build` folder
3. **Redeploy**: Always redeploy after changing environment variables or configuration

## Verify Build Locally

Before deploying, test the build locally:

```bash
npm run build
npm install -g serve
serve -s build
```

Then visit `http://localhost:3000` to make sure everything works.

## Common Issues

### Issue: Still getting the error after fix
- **Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Solution**: Check Vercel deployment logs for build errors
- **Solution**: Verify environment variables are set correctly in Vercel

### Issue: Environment variables not working
- **Solution**: Make sure variable names start with `REACT_APP_`
- **Solution**: Redeploy after adding environment variables
- **Solution**: Check Vercel logs to see if variables are being injected

### Issue: Build fails
- **Solution**: Check `package.json` has correct build script
- **Solution**: Verify all dependencies are in `package.json`
- **Solution**: Check Vercel build logs for specific errors
