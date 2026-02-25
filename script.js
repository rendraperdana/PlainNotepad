const editor = document.getElementById('editor');

// Paste handler: always insert plain text, discarding formatting
if (editor) {
  editor.addEventListener('paste', (e) => {
    e.preventDefault();
    const clipboard = (e.clipboardData || window.clipboardData);
    const text = clipboard.getData('text/plain');
    if (!text) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) {
      editor.appendChild(document.createTextNode(text));
      return;
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // Move caret after inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  });

  // Ctrl/Cmd+S handler: download current plain text as a .txt file
  window.addEventListener('keydown', (e) => {
    const isSave = (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S');
    if (!isSave) return;
    e.preventDefault();

    const text = editor.innerText || '';
    const timestamp = new Date().toISOString().slice(0,19).replace(/[:T]/g, '-');
    const filename = `note-${timestamp}.txt`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
