function header() {
    return {
        text: 'Header Template 2',
        alignment: 'center',
        margin: [0, 0, 0, 0]
    };
}

function footer(currentPage, pageCount) {
    return {
        text: `Footer Template 2 - Page ${currentPage} of ${pageCount}`,
        alignment: 'center',
        margin: [0, 0, 0, 0]
    };
}

// Exporte les fonctions createCustomHeader et createCustomFooter
module.exports = {
    header,
    footer
};