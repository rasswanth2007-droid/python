@echo off
echo ============================================
echo   HireSense - Setup Script (Windows)
echo ============================================

echo.
echo [1/5] Setting up Python backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm

echo.
echo [2/5] Setting up React frontend...
cd ..\frontend
npm install

echo.
echo ============================================
echo   Setup complete!
echo ============================================
echo.
echo To run the app:
echo   Terminal 1: cd backend ^&^& venv\Scripts\activate ^&^& python app.py
echo   Terminal 2: cd frontend ^&^& npm start
echo.
pause
