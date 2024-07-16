const fs = require('fs');
const path = require('path');

const fontsDir = path.resolve(__dirname, 'fonts');
const output = path.resolve(__dirname, 'vfs_fonts.js');

let vfs = {};

fs.readdirSync(fontsDir).forEach(file => {
    const filePath = path.join(fontsDir, file);
    const fileData = fs.readFileSync(filePath, 'base64');
    vfs[file] = fileData;
});

const vfsContent = `var pdfMake = pdfMake || {}; pdfMake.vfs = ${JSON.stringify(vfs)};`;
fs.writeFileSync(output, vfsContent, 'utf8');

console.log('vfs_fonts.js generated successfully!');
