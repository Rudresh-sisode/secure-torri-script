# Django Profile App with Vapi Integration

A Django application featuring a profile component with Vapi SDK integration.

## Prerequisites

Before you start, make sure you have Python installed on your system. You can check by running:
```bash
python3 --version
```

If Python is not installed, download it from [python.org](https://www.python.org/downloads/).

## Step-by-Step Setup Guide (For Non-Python Developers)

### Step 1: Navigate to the Django App Folder
```bash
cd django-profile-app
```

### Step 2: Create a Virtual Environment (Recommended)

A virtual environment isolates your project dependencies. Create one:

**On Linux/Mac:**
```bash
python3 -m venv venv
```

**On Windows:**
```bash
python -m venv venv
```

### Step 3: Activate the Virtual Environment

**On Linux/Mac:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

You should see `(venv)` at the beginning of your command prompt when activated.

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs Django and python-dotenv (for environment variables).

### Step 5: Configure Environment Variables

The `.env` file is already created with your credentials. If you need to update it:

1. Open the `.env` file in the `django-profile-app` folder
2. Make sure it contains:
   ```
   VAPI_ASSISTANT_ID=4e33fffe-7a27-4a4e-a4f6-cae8ad6668eb
   VAPI_API_KEY=8aff7b94-0a49-4909-8831-69876a7f7e24
   ```

### Step 6: Run Database Migrations

Django needs to set up its database:
```bash
python manage.py migrate
```

### Step 7: Start the Development Server

```bash
python manage.py runserver
```

You should see output like:
```
Starting development server at http://127.0.0.1:8000/
```

### Step 8: Open in Browser

Open your web browser and go to:
```
http://127.0.0.1:8000/
```

You should see the profile page with Vapi integration!

## Running the App

Every time you want to run the app:

1. Navigate to the folder:
   ```bash
   cd django-profile-app
   ```

2. Activate virtual environment (if not already active):
   ```bash
   # Linux/Mac
   source venv/bin/activate
   
   # Windows
   venv\Scripts\activate
   ```

3. Start the server:
   ```bash
   python manage.py runserver
   ```

4. Open `http://127.0.0.1:8000/` in your browser

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

## Deactivating Virtual Environment

When you're done working, you can deactivate the virtual environment:
```bash
deactivate
```

## Troubleshooting

### "python3: command not found"
- Try using `python` instead of `python3`
- Make sure Python is installed and in your PATH

### "pip: command not found"
- Try `pip3` instead of `pip`
- On some systems, use `python -m pip` or `python3 -m pip`

### "ModuleNotFoundError: No module named 'django'"
- Make sure you activated the virtual environment
- Run `pip install -r requirements.txt` again

### Port Already in Use
If port 8000 is already in use, you can use a different port:
```bash
python manage.py runserver 8080
```
Then access it at `http://127.0.0.1:8080/`

## Project Structure

```
django-profile-app/
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (gitignored)
├── .env.example          # Template for environment variables
├── profileproject/        # Main project settings
│   ├── settings.py       # Django settings
│   ├── urls.py           # URL routing
│   └── wsgi.py           # WSGI configuration
└── profileapp/           # Main app
    ├── views.py          # View functions
    └── templates/        # HTML templates
        └── profileapp/
            └── profile.html
└── static/               # Static files (CSS, JS)
    └── css/
        └── style.css
```

## Security

- The `.env` file is gitignored to keep your credentials secure
- Never commit your `.env` file to version control
- Use `.env.example` as a template for other developers

## Features

- Beautiful profile component with modern UI
- Secure Vapi SDK integration using environment variables
- Responsive design
- Django framework for backend functionality
