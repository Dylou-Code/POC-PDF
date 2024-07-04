// module.exports = {
//     header: (currentPage, pageCount) => {
//         return {
//             text: `Header Template 1 - Page ${currentPage} of ${pageCount}`,
//             alignment: 'center',
//             margin: [10, 0, 0, 0]
//         };
//     },
//     footer: (currentPage, pageCount) => {
//         return {
//             text: `Footer Template 1 - Page ${currentPage} of ${pageCount}`,
//             alignment: 'center',
//             margin: [0, 0, 10, 0]
//         };
//     }
// };

function header() {
    return {
        text: 'Header Template 1',
        alignment: 'center',
        margin: [0, 0, 0, 0]
    };
}

function footer(currentPage, pageCount) {
    return {
        text: `Footer Template 1 - Page ${currentPage} of ${pageCount}`,
        alignment: 'center',
        margin: [0, 0, 0, 0]
    };
}

// Exporte les fonctions createCustomHeader et createCustomFooter
module.exports = {
    header,
    footer
};