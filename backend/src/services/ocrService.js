const pdf = require('pdf-parse');
const Tesseract = require('tesseract.js');

exports.processDocument = async (file) => {
  const mimetype = file.mimetype;
  let text = '';

  try {
    if (mimetype === 'application/pdf') {
      const data = await pdf(file.buffer);
      text = data.text;
    } else if (mimetype.startsWith('image/')) {
      const { data: { text: imageText } } = await Tesseract.recognize(file.buffer, 'eng');
      text = imageText;
    }
    return text.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from document');
  }
};