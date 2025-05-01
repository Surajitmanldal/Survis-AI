import { marked } from 'marked';
import DOMPurify from 'dompurify';

const main = async (input) => {
    const response = await fetch('https://survis-backend.onrender.com/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
    });
    const data = await response.json();
    if (typeof data.text === 'string') {
        const html = marked(data.text);
        return html;
    }
    else {
        console.error('Response was not a string:', data);
    }
}
export default main;
