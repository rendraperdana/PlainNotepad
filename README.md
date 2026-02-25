# Plain Notepad

Minimal notepad-like web app that strips all formatting from pasted content.

Quick use
- Open [index.html](index.html) in your browser and paste into the editor.

Run a local server (optional)
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000/index.html
```

Behavior
- Any pasted content into the editable area is inserted as plain text (no formatting, no images).

- Press Ctrl+S (or Cmd+S on macOS) to save the current contents as a .txt file.
