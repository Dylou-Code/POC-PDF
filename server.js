const express = require("express");
const path = require("path");
const generatePdf = require("./utils/pdfGenerator");
const contentTemplate = require("./templates/contentTemplate");
const headerFooterTemplate1 = require("./templates/headerFooterTemplate1");
const headerFooterTemplate2 = require("./templates/headerFooterTemplate2");
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, "public")));

//-------------V2 ----------------
app.get("/generate-pdf", (req, res) => {
  // changement du template depuis l'url
  //
  const { template } = req.query;

  // Changement du template
  let headerFooterTemplate = headerFooterTemplate1;
  if (template === "2") {
    headerFooterTemplate = headerFooterTemplate2;
  }

  //const pageHeight = orientation === "landscape" ? 595 : 842;
  //A4	49,6 x 70,2	595 x 842
  // page height for A4 | A4 49,6 x 70,2	595 x 842
  //const pageHeight = 595;

  // gestion du contenu
  const content = contentTemplate();

  // génération du pdf
  generatePdf(content, headerFooterTemplate, res);

  return res.status(200);
});

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});


//-------------V1 WORK ----------------
// const fonts = {
//     Roboto: {
//         normal: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
//         bold: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
//         italics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
//         bolditalics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-MediumItalic.ttf'], 'base64')
//     }
// };

// Route API pour générer un PDF
// app.get('/generate-pdf', (req, res) => {
//     const docDefinition = {
//         pageOrientation: 'landscape',
//         content: [
//             { text: 'Bonjour, monde!', style: 'header' },
//             'Ceci est un exemple de document PDF généré avec pdfmake en utilisant Node.js et Express k bdsbkdkndkn.',
//             { text: 'Voici une autre ligne.', style: 'anotherStyle' }
//         ],
//         styles: {
//             header: {
//                 fontSize: 18,
//                 bold: true
//             },
//             anotherStyle: {
//                 italics: true,
//                 alignment: 'right'
//             }
//         }
//     };

//     const printer = new pdfmake(fonts);
//     const pdfDoc = printer.createPdfKitDocument(docDefinition);

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

//     pdfDoc.pipe(res);
//     pdfDoc.end();
// });



