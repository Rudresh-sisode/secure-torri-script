# Quick Setup Guide for Django App

## 🚀 Fastest Way to Get Started

Copy and paste these commands one by one:

### 1. Go to the Django app folder
```bash
cd django-profile-app
```

### 2. Create virtual environment
```bash
python3 -m venv venv
```

### 3. Activate virtual environment

**If you're on Linux or Mac:**
```bash
source venv/bin/activate
```

**If you're on Windows:**
```bash
venv\Scripts\activate
```

You should see `(venv)` appear in your terminal.

### 4. Install packages
```bash
pip install -r requirements.txt
```

### 5. Set up database
```bash
python manage.py migrate
```

### 6. Start the server
```bash
python manage.py runserver
```

### 7. Open your browser
Go to: **http://127.0.0.1:8000/**

---

## ✅ That's it!

You should now see the profile page with Vapi integration.

## 🛑 To Stop the Server

Press `Ctrl + C` in the terminal.

## 🔄 To Run Again Later

1. `cd django-profile-app`
2. `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
3. `python manage.py runserver`

## ❓ Having Issues?

Check the main [README.md](README.md) for detailed troubleshooting.
