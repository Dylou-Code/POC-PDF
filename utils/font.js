 const vfsFonts = require('pdfmake/build/vfs_fonts');
//  const pdfFont = require('../vfs_fonts.js');

//  var pdfMake = require('pdfmake/build/pdfmake.js');

//  pdfMake.vfs = pdfFont.pdfMake.vfs;

// const fonts = {
//     Roboto: {
//         normal: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
//         bold: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
//         italics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
//         bolditalics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-MediumItalic.ttf'], 'base64')
//     }
// };

// const pdfMake = require("pdfmake/build/pdfmake.js");
// const pdfFonts = require("pdfmake/build/vfs_fonts.js");

// pdfMake.fonts  = {
//     NotoSans: {
//         normal: "NotoSans-Regular.ttf",
//         bold: "NotoSans-Bold.ttf",
//         italics: "NotoSans-Italic.ttf",
//         bolditalics: "NotoSans-BoldItalic.ttf"
//     }
// }

// const fs = require("fs");
const fonts = {
  Roboto: {
    normal: Buffer.from(vfsFonts.pdfMake.vfs["NotoSans-Medium.ttf"],"base64"),
    bold: Buffer.from(vfsFonts.pdfMake.vfs["NotoSans-Bold.ttf"], "base64"),
    italics: Buffer.from(vfsFonts.pdfMake.vfs["NotoSans-Italic.ttf"], "base64"),
    boldItalics: Buffer.from(vfsFonts.pdfMake.vfs["NotoSans-BoldItalic.ttf"], "base64"),
  },
};

// "../node_modules/pdfmake/exemples/build-vfs.js"

module.exports = fonts;
