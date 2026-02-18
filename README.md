# Profile Apps with Vapi Integration

This repository contains two implementations of a profile application with Vapi SDK integration:
1. **React App** - Frontend React application
2. **Django App** - Python Django web application

Both apps feature the same profile component with secure Vapi SDK integration using environment variables.

---

## 📁 Project Structure

```
script-testing/
├── src/                    # React app source files
├── public/                 # React app public files
├── package.json            # React dependencies
├── .env                    # React environment variables
├── django-profile-app/     # Django application
│   ├── profileapp/         # Django app
│   ├── profileproject/     # Django project settings
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Django environment variables
└── README.md               # This file
```

---

## ⚛️ React App

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - The `.env` file is already created with your credentials
   - If needed, update `.env` with:
     ```
     REACT_APP_VAPI_ASSISTANT_ID=your-assistant-id-here
     REACT_APP_VAPI_API_KEY=your-api-key-here
     ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - The app will automatically open at [http://localhost:3000](http://localhost:3000)

---

## 🐍 Django App

### Quick Start (For Non-Python Developers)

#### Step 1: Navigate to Django App Folder
```bash
cd django-profile-app
```

#### Step 2: Create Virtual Environment
```bash
python3 -m venv venv
```

#### Step 3: Activate Virtual Environment

**Linux/Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt.

#### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 5: Run Database Migrations
```bash
python manage.py migrate
```

#### Step 6: Start the Server
```bash
python manage.py runserver
```

#### Step 7: Open in Browser
Go to [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Detailed Instructions

For more detailed setup instructions, troubleshooting, and explanations, see the [Django App README](django-profile-app/README.md).

---

## 🔒 Security

- Both `.env` files are gitignored to keep your credentials secure
- Never commit `.env` files to version control
- Use `.env.example` files as templates for other developers

## ✨ Features

Both apps include:
- Beautiful profile component with modern UI
- Secure Vapi SDK integration using environment variables
- Responsive design
- Same visual design and functionality

## 🚀 Running Both Apps

You can run both apps simultaneously:

1. **Terminal 1 - React App:**
   ```bash
   npm start
   ```
   Runs on http://localhost:3000

2. **Terminal 2 - Django App:**
   ```bash
   cd django-profile-app
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python manage.py runserver
   ```
   Runs on http://127.0.0.1:8000