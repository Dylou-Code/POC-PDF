module.exports = {
    header: (currentPage, pageCount) => {
        return {
            text: `Header Template 2 - Page ${currentPage} of ${pageCount}`,
            alignment: 'left',
            margin: [20, 20, 20, 20]
        };
    },
    footer: (currentPage, pageCount) => {
        return {
            text: `Footer Template 2 - Page ${currentPage} of ${pageCount}`,
            alignment: 'right',
            margin: [20, 20, 20, 20]
        };
    }
};