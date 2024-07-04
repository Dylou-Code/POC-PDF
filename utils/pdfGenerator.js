

const pdfmake = require('pdfmake');
const fonts = require('./font');
const styles = require('./pdfStyles');
const generatePdf = (content, headerFooterTemplate, res) => {
    const docDefinition = {
        content: content,
        styles: styles,
        pageOrientation: 'landscape', // ou 'landscape' pour paysage
        header: headerFooterTemplate.header,
        footer: headerFooterTemplate.footer,
        pageMargins: [40, 50, 40, 60],
    };

    // instance de pdfmake avec la polices
    const printer = new pdfmake(fonts);
    // création du pdf avec toutes les valeurs de docDefinition
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

    // envoi du pdf dans la réponse
    pdfDoc.pipe(res);
    // fin du pdf
    pdfDoc.end();
};

module.exports = generatePdf;