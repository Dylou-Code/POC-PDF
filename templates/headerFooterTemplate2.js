module.exports = {
    header: (currentPage, pageCount) => {
        return {
            text: `Header Template 2 - Page ${currentPage} of ${pageCount}`,
            alignment: 'left',
            margin: [20, 20, 0, 0]
        };
    },
    footer: (currentPage, pageCount) => {
        return {
            text: `Footer Template 2 - Page ${currentPage} of ${pageCount}`,
            alignment: 'right',
            margin: [0, 0, 20, 20]
        };
    }
};