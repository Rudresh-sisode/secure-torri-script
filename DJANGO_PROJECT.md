# Django Profile App - Complete Guide

A Django web application featuring a profile component with secure Vapi SDK integration using environment variables.

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

- **Python 3.8 or higher**
- **pip** (Python package manager)
- A code editor (VS Code recommended)
- Git (for version control)

### Check Installation

```bash
python3 --version
pip3 --version
```

**Note**: On some systems, use `python` instead of `python3`, and `pip` instead of `pip3`.

---

## Project Structure

```
django-profile-app/
├── manage.py                    # Django management script
├── requirements.txt             # Python dependencies
├── .env                         # Environment variables (SECRET - gitignored)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── profileproject/              # Main Django project
│   ├── settings.py              # Django settings (loads .env)
│   ├── urls.py                  # URL routing
│   ├── wsgi.py                  # WSGI configuration
│   └── asgi.py                  # ASGI configuration
├── profileapp/                  # Main Django app
│   ├── views.py                 # View functions
│   ├── apps.py                  # App configuration
│   └── templates/               # HTML templates
│       └── profileapp/
│           └── profile.html     # Profile template (Vapi script)
└── static/                      # Static files (CSS, JS, images)
    └── css/
        └── style.css            # Profile styles
```

---

## Installation & Setup

### Step 1: Navigate to Project Directory

```bash
cd /var/www/html/AI-Project/Script-/script-testing/django-profile-app
```

### Step 2: Create Virtual Environment

A virtual environment isolates your project's dependencies from other Python projects.

**Linux/Mac:**
```bash
python3 -m venv venv
```

**Windows:**
```bash
python -m venv venv
```

This creates a `venv` folder containing Python and pip.

### Step 3: Activate Virtual Environment

**Linux/Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

**You'll know it's activated when you see `(venv)` at the start of your terminal prompt.**

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `Django` - Web framework
- `python-dotenv` - Loads environment variables from `.env` file

### Step 5: Verify Installation

```bash
python manage.py --version
```

You should see the Django version number.

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
VAPI_ASSISTANT_ID=<Assistant ID>
VAPI_API_KEY=<API KEY>
```

**Important Notes:**
- No spaces around the `=` sign
- No quotes needed (unless the value contains special characters)
- Each variable on a new line
- No prefix needed (unlike React's `REACT_APP_`)

### Step 3: Verify `.env` is Gitignored

Check that `.env` is in `.gitignore`:

```bash
cat .gitignore | grep .env
```

You should see `.env` listed. This ensures your credentials are never committed to Git.

### Step 4: How Django Loads Environment Variables

Django loads environment variables in `profileproject/settings.py`:

```python
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access environment variables
VAPI_ASSISTANT_ID = os.getenv('VAPI_ASSISTANT_ID', '')
VAPI_API_KEY = os.getenv('VAPI_API_KEY', '')
```

The `load_dotenv()` function reads the `.env` file and makes variables available via `os.getenv()`.

---

## Running the Application

### Initial Setup (First Time Only)

#### Step 1: Run Database Migrations

Django uses a database to store information. Set it up:

```bash
python manage.py migrate
```

This creates the database file (`db.sqlite3`) and sets up necessary tables.

#### Step 2: (Optional) Create Superuser

For admin access (optional):

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### Development Mode

#### Start the Development Server

```bash
python manage.py runserver
```

**What happens:**
1. Django starts the development server
2. Server runs at `http://127.0.0.1:8000/`
3. You'll see output like:
   ```
   Starting development server at http://127.0.0.1:8000/
   Quit the server with CONTROL-C.
   ```

#### Access the Application

Open your browser and go to:
```
http://127.0.0.1:8000/
```

You should see the profile page with Vapi integration.

#### Stop the Server

Press `Ctrl + C` in the terminal to stop the development server.

### Running on Different Port

```bash
python manage.py runserver 8080
```

Access at `http://127.0.0.1:8080/`

### Running on All Interfaces

```bash
python manage.py runserver 0.0.0.0:8000
```

Access from other devices on your network.

---

## How Vapi Script Uses Environment Variables

### Code Location

The Vapi integration is in `profileapp/templates/profileapp/profile.html`. Here's how it works:

### Step-by-Step Process

1. **Django Loads Environment Variables**
   ```python
   # In profileproject/settings.py
   from dotenv import load_dotenv
   load_dotenv()
   VAPI_ASSISTANT_ID = os.getenv('VAPI_ASSISTANT_ID', '')
   VAPI_API_KEY = os.getenv('VAPI_API_KEY', '')
   ```
   - `python-dotenv` reads `.env` file
   - Variables stored in Django settings

2. **Pass Variables to Template**
   ```python
   # In profileapp/views.py
   def profile_view(request):
       context = {
           'vapi_assistant_id': settings.VAPI_ASSISTANT_ID,
           'vapi_api_key': settings.VAPI_API_KEY,
       }
       return render(request, 'profileapp/profile.html', context)
   ```
   - View function passes variables to template
   - Variables available in template context

3. **Template Receives Variables**
   ```html
   <!-- In profile.html -->
   <script>
       const assistant = "{{ vapi_assistant_id }}";
       const apiKey = "{{ vapi_api_key }}";
   ```
   - Django template engine replaces `{{ }}` with actual values
   - Variables injected into JavaScript

4. **Validation Check**
   ```javascript
   if (assistant && apiKey) {
       // Initialize Vapi
   } else {
       console.error('Vapi Assistant ID or API Key is missing...');
   }
   ```
   - Ensures credentials exist before proceeding
   - Prevents errors if variables are missing

5. **Script Loading**
   ```javascript
   var g = document.createElement("script");
   g.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
   g.defer = true;
   g.async = true;
   ```
   - Dynamically loads Vapi SDK from CDN
   - Uses `defer` and `async` for optimal loading

6. **SDK Initialization**
   ```javascript
   g.onload = function () {
       vapiInstance = window.vapiSDK.run({
           apiKey: apiKey,        // From environment variable
           assistant: assistant,   // From environment variable
           config: buttonConfig,
       });
   };
   ```
   - Initializes Vapi SDK when script loads
   - Uses secure credentials from environment variables
   - Stores instance in `vapiInstance` for use

### Complete Flow Diagram

```
.env file
    ↓
python-dotenv loads variables
    ↓
Django settings.py reads via os.getenv()
    ↓
View function passes to template context
    ↓
Template engine injects into HTML
    ↓
JavaScript receives values
    ↓
Validates credentials exist
    ↓
Loads Vapi SDK script
    ↓
Initializes SDK with credentials
    ↓
Vapi is ready to use
```

### Security Note

**Important**: The credentials are injected into the HTML template, which means they appear in the page source. However:
- This is necessary for client-side JavaScript to access them
- The values are only visible to users who view the page source
- For additional security, consider using server-side proxy endpoints

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
   - Production: Server environment variables or secure vaults

4. **Rotate credentials regularly**
   - Change API keys periodically
   - Revoke old keys when updating

5. **Limit access to `.env` file**
   - Only team members who need it
   - Use file permissions: `chmod 600 .env` (Linux/Mac)

6. **Use `python-dotenv` for local development**
   - Automatically loads `.env` file
   - No need to set system environment variables

7. **Never commit `.env` to version control**
   ```bash
   # Verify .env is not tracked
   git ls-files | grep .env
   # Should return nothing
   ```

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
   - Never `print(os.getenv('VAPI_API_KEY'))`
   - Be careful with error messages and debug output

4. **Don't use production keys in development**
   - Separate keys for each environment
   - Use test/development keys locally

5. **Don't hardcode credentials**
   ```python
   # ❌ BAD
   VAPI_API_KEY = "8aff7b94-0a49-4909-8831-69876a7f7e24"
   
   # ✅ GOOD
   VAPI_API_KEY = os.getenv('VAPI_API_KEY', '')
   ```

### Security Checklist

- [ ] `.env` file exists and contains credentials
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists (without real credentials)
- [ ] No credentials in source code
- [ ] `python-dotenv` installed and used
- [ ] `load_dotenv()` called in settings.py
- [ ] Production uses server environment variables (not `.env` file)

---

## Deployment

### Production Considerations

#### 1. Use Server Environment Variables

In production, don't rely on `.env` files. Instead, set environment variables on the server:

**Linux/Mac:**
```bash
export VAPI_ASSISTANT_ID="your-assistant-id"
export VAPI_API_KEY="your-api-key"
```

**Or use a process manager like systemd, supervisor, or gunicorn with environment variables.**

#### 2. Update settings.py for Production

```python
# In production, you can still use os.getenv() but load from system env
# python-dotenv will only load .env if it exists
VAPI_ASSISTANT_ID = os.getenv('VAPI_ASSISTANT_ID', '')
VAPI_API_KEY = os.getenv('VAPI_API_KEY', '')
```

#### 3. Common Deployment Platforms

**Heroku:**
```bash
heroku config:set VAPI_ASSISTANT_ID=your-id
heroku config:set VAPI_API_KEY=your-key
```

**AWS Elastic Beanstalk:**
- Set environment variables in EB Console → Configuration → Software

**DigitalOcean App Platform:**
- Set in App Settings → Environment Variables

**Docker:**
```dockerfile
ENV VAPI_ASSISTANT_ID=your-id
ENV VAPI_API_KEY=your-key
```

### Static Files in Production

For production, collect static files:

```bash
python manage.py collectstatic
```

This gathers all static files into a single directory for efficient serving.

---

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'django'"

**Cause**: Virtual environment not activated or dependencies not installed

**Solutions**:
```bash
# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt
```

### Issue: Environment variables not loading

**Cause**: `.env` file not found or `python-dotenv` not installed

**Solutions**:
1. Verify `.env` file exists in project root (same level as `manage.py`)
2. Check `python-dotenv` is installed: `pip list | grep dotenv`
3. Verify `load_dotenv()` is called in `settings.py`
4. Restart the development server

### Issue: "Vapi Assistant ID or API Key is missing" in browser console

**Cause**: Environment variables not passed to template

**Solutions**:
1. Check `.env` file has correct variable names
2. Verify `settings.py` loads variables correctly
3. Check `views.py` passes variables to template context
4. Restart the development server

### Issue: Port 8000 already in use

**Cause**: Another process using port 8000

**Solutions**:
```bash
# Use a different port
python manage.py runserver 8080

# Or kill the process (Linux/Mac)
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: "No such file or directory: 'manage.py'"

**Cause**: Not in the correct directory

**Solutions**:
```bash
# Navigate to Django app directory
cd django-profile-app

# Verify you're in the right place
ls manage.py
```

### Issue: Database errors

**Cause**: Migrations not run

**Solutions**:
```bash
# Run migrations
python manage.py migrate

# If that doesn't work, delete db.sqlite3 and migrate again
rm db.sqlite3  # Linux/Mac
del db.sqlite3  # Windows
python manage.py migrate
```

### Issue: Static files not loading (CSS not working)

**Cause**: Static files not configured correctly

**Solutions**:
1. Verify `STATIC_URL` and `STATICFILES_DIRS` in `settings.py`
2. Check `static/` folder exists
3. Restart the development server
4. Clear browser cache

---

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com)
- [python-dotenv Documentation](https://pypi.org/project/python-dotenv/)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [Vapi Documentation](https://docs.vapi.ai)

---

## Quick Reference Commands

```bash
# Activate virtual environment
source venv/bin/activate        # Linux/Mac
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver

# Create superuser
python manage.py createsuperuser

# Collect static files (production)
python manage.py collectstatic

# Deactivate virtual environment
deactivate
```

---

## Common Workflow

### Daily Development

```bash
# 1. Navigate to project
cd django-profile-app

# 2. Activate virtual environment
source venv/bin/activate

# 3. Start server
python manage.py runserver

# 4. Make changes to code

# 5. Refresh browser to see changes

# 6. When done, stop server (Ctrl+C) and deactivate
deactivate
```

---

## Support

If you encounter issues not covered here:
1. Check the browser console for JavaScript errors
2. Check terminal output for Django errors
3. Verify environment variables are set correctly
4. Review the code in `profileapp/templates/profileapp/profile.html` for Vapi integration
5. Check Django logs in terminal output

---

**Last Updated**: 2024
**Version**: 1.0.0
