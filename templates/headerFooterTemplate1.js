const path = require('path');

function header() {
    const imagePath = path.resolve(__dirname, '../public/images/cookies.jpg');
    return {
        // text: 'Agenda ',
        // alignment: 'center',
        // margin: [10, 10, 10, 10], 
        // image: imagePath,
        columns: [
            {
                image: imagePath,
                width: 50,
                height: 50,
                margin: [10, 10, 10, 10]
            },
            {
                text: 'Agenda',
                alignment: 'center',
                margin: [10, 10, 10, 10]
            }
        ]
        
    }
}
// current page et page count sont auto-géré par pdfMake
function footer(currentPage, pageCount) {
    return {
        text: `Test -  Ouvert de 9h-12h30 et 14h30-18h -  Page ${currentPage} of ${pageCount}`,
        alignment: 'center',
        margin: [10, 10, 10, 10] 
    }
}

module.exports = {
    header,
    footer
};