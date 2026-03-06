#!/bin/bash
echo "============================================"
echo "  HireSense - Setup Script (Mac/Linux)"
echo "============================================"

echo ""
echo "[1/4] Setting up Python backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
cd ..

echo ""
echo "[2/4] Setting up React frontend..."
cd frontend
npm install
cd ..

echo ""
echo "============================================"
echo "  Setup complete!"
echo "============================================"
echo ""
echo "To run the app:"
echo "  Terminal 1: cd backend && source venv/bin/activate && python app.py"
echo "  Terminal 2: cd frontend && npm start"
