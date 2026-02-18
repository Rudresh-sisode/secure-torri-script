# React Profile App - Complete Guide

A React application featuring a profile component with secure Vapi SDK integration using environment variables.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Installation & Setup](#installation--setup)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Running the Application](#running-the-application)
6. [How Vapi Script Uses Environment Variables](#how-vapi-script-uses-environment-variables)
7. [Security Best Practices](#security-best-practices)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)
- Git (for version control)

### Check Installation

```bash
node --version
npm --version
```

---

## Project Structure

```
script-testing/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Profile.js          # Profile component
│   │   └── Profile.css         # Profile styles
│   ├── App.js                  # Main app component (Vapi integration)
│   ├── App.css                 # App styles
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables (SECRET - gitignored)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

---

## Installation & Setup

### Step 1: Navigate to Project Directory

```bash
cd /var/www/html/AI-Project/Script-/script-testing
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- `react` - React library
- `react-dom` - React DOM rendering
- `react-scripts` - Create React App scripts

### Step 3: Verify Installation

After installation, you should see a `node_modules` folder created. This contains all dependencies.

---

## Environment Variables Setup

### Why Environment Variables?

Environment variables keep sensitive information (like API keys) out of your code. This is crucial for:
- **Security**: Prevents exposing credentials in version control
- **Flexibility**: Different values for development, staging, and production
- **Best Practices**: Industry standard for handling secrets

### Step 1: Create `.env` File

The `.env` file is already created, but if you need to recreate it:

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Add Your Credentials

Open the `.env` file and add your Vapi credentials:

```env
REACT_APP_VAPI_ASSISTANT_ID=4e33fffe-7a27-4a4e-a4f6-cae8ad6668eb
REACT_APP_VAPI_API_KEY=8aff7b94-0a49-4909-8831-69876a7f7e24
```

**Important Notes:**
- Variable names **MUST** start with `REACT_APP_` for Create React App to expose them
- No spaces around the `=` sign
- No quotes needed (unless the value contains special characters)
- Each variable on a new line

### Step 3: Verify `.env` is Gitignored

Check that `.env` is in `.gitignore`:

```bash
cat .gitignore | grep .env
```

You should see `.env` listed. This ensures your credentials are never committed to Git.

---

## Running the Application

### Development Mode

#### Start the Development Server

```bash
npm start
```

This command will:
1. Start the React development server
2. Open your browser automatically at `http://localhost:3000`
3. Enable hot-reloading (changes appear instantly)

#### What You'll See

- The development server starts
- Your browser opens to `http://localhost:3000`
- The profile component displays with Vapi integration
- Console shows "Vapi SDK loaded" (if credentials are correct)

### Stop the Server

Press `Ctrl + C` in the terminal to stop the development server.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Preview Production Build Locally

```bash
# Install serve globally (one time)
npm install -g serve

# Serve the build
serve -s build
```

Visit `http://localhost:3000` to see the production build.

---

## How Vapi Script Uses Environment Variables

### Code Location

The Vapi integration is in `src/App.js`. Here's how it works:

### Step-by-Step Process

1. **Environment Variables Loaded**
   ```javascript
   const assistant = process.env.REACT_APP_VAPI_ASSISTANT_ID;
   const apiKey = process.env.REACT_APP_VAPI_API_KEY;
   ```
   - React reads variables from `.env` file
   - Only variables starting with `REACT_APP_` are exposed
   - Variables are available at build time

2. **Validation Check**
   ```javascript
   if (!assistant || !apiKey) {
       console.error('Vapi Assistant ID or API Key is missing...');
       return;
   }
   ```
   - Ensures credentials exist before proceeding
   - Prevents errors if variables are missing

3. **Script Loading**
   ```javascript
   const script = document.createElement('script');
   script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
   script.defer = true;
   script.async = true;
   ```
   - Dynamically loads Vapi SDK from CDN
   - Uses `defer` and `async` for optimal loading

4. **SDK Initialization**
   ```javascript
   script.onload = () => {
       window.vapiInstance = window.vapiSDK.run({
           apiKey: apiKey,        // From environment variable
           assistant: assistant,   // From environment variable
           config: buttonConfig,
       });
   };
   ```
   - Initializes Vapi SDK when script loads
   - Uses secure credentials from environment variables
   - Stores instance in `window.vapiInstance` for global access

### Complete Flow Diagram

```
.env file
    ↓
React reads REACT_APP_* variables
    ↓
App.js extracts values
    ↓
Validates credentials exist
    ↓
Loads Vapi SDK script
    ↓
Initializes SDK with credentials
    ↓
Vapi is ready to use
```

---

## Security Best Practices

### ✅ DO's

1. **Always use `.env` for secrets**
   - Never hardcode credentials in source code
   - Use environment variables for all sensitive data

2. **Keep `.env` in `.gitignore`**
   - Verify it's never committed to Git
   - Use `.env.example` as a template

3. **Use different credentials for environments**
   - Development: Local `.env`
   - Production: Platform environment variables (Vercel, Netlify, etc.)

4. **Rotate credentials regularly**
   - Change API keys periodically
   - Revoke old keys when updating

5. **Limit access to `.env` file**
   - Only team members who need it
   - Use file permissions: `chmod 600 .env` (Linux/Mac)

### ❌ DON'Ts

1. **Never commit `.env` to Git**
   ```bash
   # Check if .env is tracked (should return nothing)
   git ls-files | grep .env
   ```

2. **Don't share `.env` files**
   - Use secure channels for sharing credentials
   - Use password managers for team sharing

3. **Don't log environment variables**
   - Never `console.log(process.env.REACT_APP_VAPI_API_KEY)`
   - Be careful with error messages

4. **Don't use production keys in development**
   - Separate keys for each environment
   - Use test/development keys locally

### Security Checklist

- [ ] `.env` file exists and contains credentials
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists (without real credentials)
- [ ] No credentials in source code
- [ ] Environment variables use `REACT_APP_` prefix
- [ ] Production deployment uses platform environment variables

---

## Deployment

### Vercel Deployment

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Add React profile app"
   git push
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel auto-detects Create React App

3. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add:
     - `REACT_APP_VAPI_ASSISTANT_ID`
     - `REACT_APP_VAPI_API_KEY`
   - Select all environments (Production, Preview, Development)
   - Click Save

4. **Deploy**
   - Vercel will automatically deploy
   - Or trigger manual deployment

### Other Platforms

#### Netlify
- Set environment variables in Site Settings → Environment Variables
- Build command: `npm run build`
- Publish directory: `build`

#### AWS Amplify
- Set environment variables in App Settings → Environment Variables
- Build settings: Use default Create React App settings

---

## Troubleshooting

### Issue: "Vapi Assistant ID or API Key is missing"

**Cause**: Environment variables not loaded

**Solutions**:
1. Check `.env` file exists in project root
2. Verify variable names start with `REACT_APP_`
3. Restart development server (`Ctrl+C` then `npm start`)
4. Check for typos in variable names

### Issue: Environment variables not updating

**Cause**: React caches environment variables at build time

**Solutions**:
1. Restart the development server
2. Clear browser cache
3. For production builds, rebuild: `npm run build`

### Issue: "Module not found" errors

**Cause**: Dependencies not installed

**Solutions**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Cause**: Another process using port 3000

**Solutions**:
```bash
# Use a different port
PORT=3001 npm start

# Or kill the process using port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Build fails

**Cause**: Various (syntax errors, missing dependencies, etc.)

**Solutions**:
1. Check error message in terminal
2. Verify all dependencies installed: `npm install`
3. Check for syntax errors in code
4. Clear build folder: `rm -rf build` then `npm run build`

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Create React App Documentation](https://create-react-app.dev)
- [Environment Variables in Create React App](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Vapi Documentation](https://docs.vapi.ai)

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for issues
npm run build
```

---

## Support

If you encounter issues not covered here:
1. Check the browser console for errors
2. Check terminal output for build errors
3. Verify environment variables are set correctly
4. Review the code in `src/App.js` for Vapi integration

---

**Last Updated**: 2024
**Version**: 1.0.0
