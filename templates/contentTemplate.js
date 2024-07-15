const path = require("path");

/**
 *
 * @returns {Array} - Tableau de pages contenant les colonnes
 */

//const path = require("path");

function generateColumns() {
  const maxColumns = 4;
  const pageHeight = 490; // Hauteur contenu réel disponible
  const qrCodeHeight = 50; // Hauteur du QR code
  const qrCodeMargin = 10; // Marge pour le QR code
  const reservedHeightForQrCode = qrCodeHeight + qrCodeMargin;

  const imagePath = path.resolve(__dirname, "../public/images/cookies.jpg");

  const contentData = Array.from({ length: 96 }, (v, i) => ({
    title: `Plage du lac de Montriond ${i + 1}`,
    description: `Le lac de Montriond se situe dans un cadre grandiose, Le lac de Montriond se situe dans un cadre grandiose ${i + 1}`,
    // image: imagePath
  }));

  const pages = [];
  let currentPage = [];
  let currentColumn = [];
  let currentHeight = 0;

  const measureHeight = (item) => {
    // Estimation basique de la hauteur en fonction du nombre de lignes de texte
    const titleHeight = item.title ? 10 : 0; // hauteur pour le titre
    const descriptionHeight = item.description ? Math.ceil(item.description.length / 50) * 8 : 0; // hauteur pour la description
    const imageHeight = item.image ? 32 : 0; // hauteur pour l'image
    return titleHeight + descriptionHeight + imageHeight + 20; // ajustement pour les marges
  };

  contentData.forEach((item, index) => {
    const itemContent = [
      { text: item.title, margin: [0, 0, 0, 2], fontSize: 10, bold: true },
      { text: item.description, margin: [0, 0, 0, 10], fontSize: 8, color: "#585f66" },
      // { image: item.image, width: 50, height: 32, margin: [0, 0, 0, 5] },
    ];

    const itemHeight = measureHeight(item);

    const isLastColumn = currentPage.length === maxColumns - 1;

    // Vérifiez si l'élément peut être ajouté à la dernière colonne avec l'espace réservé pour le QR code
    if (isLastColumn && currentHeight + itemHeight > pageHeight - reservedHeightForQrCode) {
      // Ajoute la colonne à la page actuelle
      currentPage.push({ stack: currentColumn, width: "25%" });
      currentColumn = [];
      currentHeight = 0;

      // Si le nombre de colonnes atteint le maximum autorisé
      if (currentPage.length === maxColumns) {
        // Ajoute un QR code avec texte à la dernière colonne
        currentPage[maxColumns - 1].stack.push({
          columns: [
            {
              width: "auto",
              qr: "Text for QR code",
              fit: 50,
              margin: [0, 0, 0, 5],
            },
            {
              width: "*",
              text: {
                text: "Retrouvez l'agenda complet\n en ligne",
                bold: false,
                fontSize: 8,
              },
            },
          ],
          columnGap: 5,
        });

        // Ajoute la page actuelle aux pages et réinitialise pour une nouvelle page
        pages.push({ columns: currentPage, columnGap: 10 });
        currentPage = [];
      }
    } else if (!isLastColumn && currentHeight + itemHeight > pageHeight) {
      // Ajoute la colonne à la page actuelle
      currentPage.push({ stack: currentColumn, width: "25%" });
      currentColumn = [];
      currentHeight = 0;

      // Si le nombre de colonnes atteint le maximum autorisé
      if (currentPage.length === maxColumns) {
        // Ajoute une nouvelle page
        pages.push({ columns: currentPage, columnGap: 10 });
        currentPage = [];
      }
    }

    // Ajoute l'élément à la colonne actuelle
    currentColumn.push(...itemContent);
    currentHeight += itemHeight;
  });

  if (currentColumn.length > 0) {
    currentPage.push({ stack: currentColumn, width: "25%" });
  }

  // Ajoute la dernière page si elle contient des colonnes
  if (currentPage.length > 0) {
    // Ajoute un QR code avec texte à la dernière colonne si c'est la dernière colonne
    if (currentPage.length === maxColumns) {
      currentPage[maxColumns - 1].stack.push({
        columns: [
          {
            qr: "Text for QR code",
            fit: 50,
            margin: [0, 0, 0, 0],
          },
          {
            text: "Retrouvez l'agenda complet en ligne",
            fontSize: 8,
            bold: true,
            margin: [5, 0, 0, 0],
          },
        ],
      });
    }
    pages.push({ columns: currentPage, columnGap: 10 });
  }

  return pages;
}


// function generateColumns() {
//   const maxColumns = 4;
//   const pageHeight = 490; // Hauteur contenu réel disponible
//   const qrCodeHeight = 60; // Hauteur du QR code
//   const qrCodeMargin = 10; // Marge pour le QR code
//   const reservedHeightForQrCode = qrCodeHeight;

//   const imagePath = path.resolve(__dirname, "../public/images/cookies.jpg");
//   const decoTitle = `<svg width="169" height="10" viewBox="0 0 169 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <rect width="169" height="10" fill="#EEF1F5"/>
//   </svg>`;

//   const contentData = Array.from({ length: 96 }, (v, i) => ({
//     day: `Lundi 15 juillet | ${i + 1}`,
//     title: `Plage du lac de Montriond ${i + 1}`,
//     description: `Le lac de Montriond se situe dans un cadre grandiose, Le lac de Montriond se situe dans un cadre grandiose ${
//       i + 1
//     }`,
//     // image: imagePath
//   }));

//   const pages = [];
//   let currentPage = [];
//   let currentColumn = [];
//   let currentHeight = 0;

//   const measureHeight = (item) => {
//     // Estimation basique de la hauteur en fonction du nombre de lignes de texte
//     const dayHeight = 10;
//     const decoTitleHeight = 10;
//     const titleHeight = item.title ? 10 : 0;
//     const descriptionHeight = item.description
//       ? Math.ceil(item.description.length / 50) * 8
//       : 0; // hauteur pour la description
//     const imageHeight = item.image ? 32 : 0; // hauteur pour l'image
//     return (
//       titleHeight +
//       descriptionHeight +
//       imageHeight +
//       dayHeight +
//       decoTitleHeight +
//       20
//     ); // ajustement pour les marges
//   };

//   contentData.forEach((item, index) => {
//     const itemContent = [
//       // titre + decoration
//       { svg: decoTitle, width: 65, height: 10, margin: [0, 0, 0, 0] },
//       { text: item.day, margin: [0, -18, 0, 0], fontSize: 8, bold: true },
//       { text: item.title, margin: [0, 0, 0, 2], fontSize: 10, bold: true },
//       {
//         text: item.description,
//         margin: [0, 0, 0, 10],
//         fontSize: 8,
//         color: "#585f66",
//       },
//       // { image: item.image, width: 50, height: 32, margin: [0, 0, 0, 5] },
//     ];

//     const itemHeight = measureHeight(item);

//     const isLastColumn = currentPage.length === maxColumns - 1;

//     // Vérifiez si l'élément peut être ajouté à la dernière colonne avec l'espace réservé pour le QR code
//     if (
//       isLastColumn &&
//       currentHeight + itemHeight > pageHeight - reservedHeightForQrCode
//     ) {
//       // Ajoute la colonne à la page actuelle
//       currentPage.push({ stack: currentColumn, width: "25%" });
//       currentColumn = [];
//       currentHeight = 0;

//       // Si le nombre de colonnes atteint le maximum autorisé
//       if (currentPage.length === maxColumns) {
//         // Ajoute un QR code avec texte à la dernière colonne
//         currentPage[maxColumns - 1].stack.push({
//           columns: [
//             {
//               width: "auto",
//               qr: "Text for QR code",
//               fit: qrCodeHeight,
//               margin: [0, 0, 0, 5],
//             },
//             {
//               width: "*",
//               text: {
//                 text: "Retrouvez l'agenda complet\n en ligne",
//                 bold: false,
//                 fontSize: 8,
//               },
//               margin: [0, 10, 0, 0],
//             },
//           ],
//           columnGap: 5,
//         });

//         // Ajoute la page actuelle aux pages et réinitialise pour une nouvelle page
//         pages.push({ columns: currentPage, columnGap: 10 });
//         currentPage = [];
//       }
//     } else if (!isLastColumn && currentHeight + itemHeight > pageHeight) {
//       // Ajoute la colonne à la page actuelle
//       currentPage.push({ stack: currentColumn, width: "25%" });
//       currentColumn = [];
//       currentHeight = 0;

//       // Si le nombre de colonnes atteint le maximum autorisé
//       if (currentPage.length === maxColumns) {
//         // Ajoute une nouvelle page
//         pages.push({ columns: currentPage, columnGap: 10 });
//         currentPage = [];
//       }
//     }

//     // Ajoute l'élément à la colonne actuelle
//     currentColumn.push(...itemContent);
//     currentHeight += itemHeight;
//   });

//   if (currentColumn.length > 0) {
//     currentPage.push({ stack: currentColumn, width: "25%" });
//   }

//   // Ajoute la dernière page si elle contient des colonnes
//   if (currentPage.length > 0) {
//     // Ajoute un QR code avec texte à la dernière colonne si c'est la dernière colonne
//     if (currentPage.length === maxColumns) {
//       currentPage[maxColumns - 1].stack.push({
//         columns: [
//           {
//             width: "auto",
//             qr: "Text for QR code",
//             fit: qrCodeHeight,
//             margin: [0, 0, 0, 5],
//           },
//           {
//             width: "*",
//             text: {
//               text: "Retrouvez l'agenda complet\n en ligne",
//               bold: false,
//               fontSize: 8,
//               margin: [0, 10, 0, 0],
//             },
//           },
//         ],
//         columnGap: 5,
//       });
//     }
//     pages.push({ columns: currentPage, columnGap: 10 });
//   }

//   return pages;
// }

// function generateColumns() {
//   const maxColumns = 4;
//   const pageHeight = 475; // hauteur contenu reel disponible
//   const itemHeight = 65; // Taille item (titre + description)
//   // ajout de l'image (prendre en compte la taille de l'image dans le calcul de la hauteur de l'item)
//   const imagePath = path.resolve(__dirname, "../public/images/cookies.jpg");
//   // ajout d'un svg (prendre en compte la taille de l'image dans le calcul de la hauteur de l'item)
//   const decoTitle = `<svg width="169" height="10" viewBox="0 0 169 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <rect width="169" height="10" fill="#EEF1F5"/>
//   </svg>`;

//   const contentData = Array.from({ length: 96 }, (v, i) => ({
//     title: `Plage du lac de Montriond ${i + 1}`,
//     description: `Le lac de Montriond se situe dans un cadre grandiose, Le lac de Montriond se situe dans un cadre grandiose ${
//       i + 1
//     }`,
//     // image: imagePath
//   }));

//   const pages = [];
//   let currentPage = [];
//   let currentColumn = [];
//   let currentHeight = 0;

//   contentData.forEach((item, index) => {
//     const itemContent = [
//       { text: item.title, margin: [0, 0, 0, 2], fontSize: 10, bold: true,  },
//       { text: item.description, margin: [0, 0, 0, 10], fontSize: 8, color: "#585f66" },
//       // { image: item.image, width: 50, height: 32, margin: [0, 0, 0, 5] },
//     ];

//     // Si l'ajout de l'élément dépasse la hauteur de la colonne actuelle
//     if (currentHeight + itemHeight > pageHeight) {
//       // Ajoute la colonne à la page actuelle
//       currentPage.push({ stack: currentColumn, width: "25%" });
//       currentColumn = [];
//       currentHeight = 0;

//       // Si le nombre de colonnes atteint le maximum autorisé
//       if (currentPage.length === maxColumns) {
//         // Ajoute un QR code avec texte à la dernière colonne
//         currentPage[maxColumns - 1].stack.push({
//           columns: [
//             {
//               width: "auto",
//               qr: "Text for QR code",
//               fit: 40,
//               margin: [0, 0, 0, 5],
//             },
//             {
//               width: "*",
//               text: {
//                 text: "Retrouvez l'agenda complet\n en ligne",
//                 bold: true,
//                 fontSize: 8,
//               },
//             },
//           ],
//           columnGap: 5,
//         });

//         // Ajoute la page actuelle aux pages et réinitialise pour une nouvelle page
//         pages.push({ columns: currentPage, columnGap: 10 });
//         currentPage = [];
//       }
//     }

//     // Ajoute l'élément à la colonne actuelle
//     currentColumn.push(...itemContent);
//     currentHeight += itemHeight;
//     console.log('height', currentHeight)
//   });

//   if (currentColumn.length > 0) {
//     currentPage.push({ stack: currentColumn, width: "25%" });
//   }

//   // Ajoute la dernière page si elle contient des colonnes
//   if (currentPage.length > 0) {
//     // Ajoute un QR code avec texte à la dernière colonne
//     if (currentPage.length === maxColumns) {
//       currentPage[maxColumns - 1].stack.push({
//         columns: [
//           {
//             qr: "Text for QR code",
//             fit: 50,
//             margin: [0, 0, 0, 0],
//           },
//           {
//             text: "Retrouvez l'agenda complet en ligne",
//             //margin: [2, 15, 0, 0]
//           },
//         ],
//       });
//     }
//     pages.push({ columns: currentPage, columnGap: 10 });
//   }
//   console.log(pages)

//   return pages;
// }

module.exports = generateColumns;

// ----------Work V2 ------------
// function generateColumns() {
//     const maxColumns = 4
//     const pageHeight = 520 // hauteur contenu reel disponible (théorique 475)
//     const lastColumns = 475
//     const itemHeight = 80 // Taille item
//     const imagePath = path.resolve(__dirname, '../public/images/cookies.jpg');
//     const contentData = Array.from({ length: 70 }, (v, i) => ({
//       title: `Titre ${i + 1}`,
//       description: `Description ${i + 1}`,
//        image: imagePath
//     }));

//     const pages = []
//     let currentPage = []
//     let currentColumn = []
//     let currentHeight = 0

//     contentData.forEach((item) => {
//       const itemContent = [
//         { text: item.title, style: "header", margin: [0, 0, 0, 5] }, //  style header: 18,  Marge bottom de 5
//         item.description,
//         { image: item.image, width: 50, height: 32, margin: [0, 0, 0, 5] }
//       ];

//       // Si l'ajout de l'élément dépasse la hauteur de la colonne actuelle
//       if (currentHeight + itemHeight > pageHeight) {
//         // Ajoute la colonne à la page actuelle
//         currentPage.push({ stack: currentColumn, width: "25%" })
//         currentColumn = []
//         currentHeight = 0

//         // Si le nombre de colonnes atteint le maximum autorisé
//         if (currentPage.length === maxColumns) {
//           // Ajoute la page actuelle aux pages et réinitialise pour une nouvelle page
//           pages.push({ columns: currentPage, columnGap: 10 })
//           currentPage = [];
//         }
//       }

//       // Ajoute l'élément à la colonne actuelle
//       currentColumn.push(...itemContent);
//       currentHeight += itemHeight;
//     });

//     if (currentColumn.length > 0) {
//       currentPage.push({ stack: currentColumn, width: "25%" })
//     }

//     // Ajoute la dernière page si elle contient des colonnes
//     if (currentPage.length > 0) {
//       pages.push({ columns: currentPage, columnGap: 10 })
//     }

//     return pages
//   }
// module.exports = generateColumns

// function generateColumns() {
//   const maxColumns = 4;
//   const pageHeight = 555; // hauteur contenu reel disponible (théorique 475)
//   const headerFooterHeight = 60; // Hauteur totale de l'entête et pied de page
//   const contentData = Array.from({ length: 70 }, (v, i) => ({
//     title: `Titre ${i + 1}`,
//     description: `Description ${i + 1}`,
//     image: i % 2 === 0 ? path.resolve(__dirname, '../public/images/cookies.jpg') : null,
//   }));

//   const pages = [];
//   let currentPage = [];
//   let currentColumn = [];
//   let currentHeight = 0;
//   let currentItemIndex = 0;

//   const addColumnToPage = () => {
//     if (currentColumn.length > 0) {
//       currentPage.push({ stack: currentColumn, width: "25%" });
//       currentColumn = [];
//       currentHeight = 0;

//       if (currentPage.length === maxColumns) {
//         pages.push({ columns: currentPage, columnGap: 10 });
//         currentPage = [];
//       }
//     }
//   };

//   contentData.forEach((item, index) => {
//     let itemHeight = 48; // Taille de base pour titre + description

//     if (item.image) {
//       itemHeight += 52; // Taille supplémentaire pour l'image
//     }

//     const itemContent = [
//       { text: item.title, style: "header", margin: [0, 0, 0, 5] },
//       item.description,
//     ];

//     if (item.image) {
//       itemContent.push({ image: item.image, width: 50, height: 32, margin: [0, 10, 0, 10] });
//     }

//     if (currentHeight + itemHeight > pageHeight) {
//       addColumnToPage();
//     }

//     currentColumn.push(...itemContent);
//     currentHeight += itemHeight;

//     currentItemIndex = index;
//   });

//   addColumnToPage();

//   if (currentPage.length > 0) {
//     pages.push({ columns: currentPage, columnGap: 10 });
//   }

//   return pages;
// }

// function generateColumns(numberOfColumns) {
//     const maxColumns = Math.min(numberOfColumns, 4); // Limite le nombre de colonnes à 4
//     const pageHeight = 595  // Hauteur de la page avec les marges déduites
//     const pageWidth = 842 - 60 * 2; // Largeur de la page avec les marges déduites
//     const columnWidth = pageWidth / maxColumns; // Largeur de chaque colonne
//     const itemHeight = 148; // Taille de base pour chaque item
//     const contentData = Array.from({ length: 140 }, (v, i) => ({
//       title: `Titre ${i + 1}`,
//       description: `Description ${i + 1}`,
//     }));

//     const pages = [];
//     let currentPage = [];
//     let currentColumn = [];
//     let currentHeight = 0;

//     const addColumnToPage = () => {
//       if (currentColumn.length > 0) {
//         currentPage.push({
//           stack: currentColumn,
//           width: "25%",
//           height: 300, // Hauteur de la colonne
//         });
//         currentColumn = [];
//         currentHeight = 0;

//         if (currentPage.length === maxColumns) {
//           pages.push({ columns: currentPage, columnGap: 10 });
//           currentPage = [];
//         }
//       }
//     };

//     contentData.forEach((item, index) => {
//       const itemContent = [
//         { text: item.title, style: "header", margin: [0, 0, 0, 5] },
//         item.description,
//       ];

//       if (currentHeight + itemHeight > pageHeight) {
//         addColumnToPage();
//       }

//       currentColumn.push(...itemContent);
//       currentHeight += itemHeight;
//     });

//     addColumnToPage();

//     if (currentPage.length > 0) {
//       pages.push({ columns: currentPage, columnGap: 10 });
//     }

//     return pages;
//   }

//   // Exemple d'utilisation de la fonction
//   const content = generateColumns(9); // Nombre de colonnes ajustable ici
//   console.log(content);

//   module.exports = generateColumns;

// Exemple d'utilisation de la fonction
// const content = generateColumns();
// console.log(content);

// module.exports = generateColumns;

// -----WORKING CODE V1-----
// function generateColumns(contentData, pageHeight) {
//   const maxColumns = 4;
//   const columnGap = 10;
//   // tailole contenu à calvculer avec le header et footer
//   const contentHeight = pageHeight;

//   let columns = [];
//   // tableau pour les colonne qui seront ensuite distribvuer dans les pages
//   let currentColumn = [];
//   let currentHeight = 0;
//   // page dans un tableau
//   const pages = [];

//   contentData.forEach((item, index) => {
//     const itemHeight = 100; // Hauteur d'un item en fixe

//     //si la hauteur de mes element sont sont
//     // checker la hauteur de l'element rajouté
//     if (currentHeight + itemHeight > contentHeight) {
//       //j'ajoute la colonne
//       columns.push({ stack: currentColumn, width: "25%" });

//       currentColumn = []; // Réinitialise le tableau de la colonne actuelle
//       currentHeight = 0; // Réinitialise la hauteur de la colonne actuelle

//       // Vérifie si le nombre de colonnes atteint le maximum autorisé
//       if (columns.length === maxColumns) {
//         pages.push({ columns: columns, columnGap: columnGap }); // Ajoute les colonnes à une nouvelle page
//         columns = []; // Réinitialise le tableau des colonnes pour la prochaine page
//       }
//     }

//     //titre et description
//     currentColumn.push({ text: item.title });
//     currentColumn.push(item.description);

//     // const imageBase64 = imageToBase64(item.image);

//     // Incrémente la hauteur actuelle de la colonne avec la hauteur de l'élément
//     currentHeight += itemHeight;
//   });

//   // Vérifie si la dernière colonne contient des éléments
//   if (currentColumn.length > 0) {
//     columns.push({ stack: currentColumn, width: "25%" }); // Ajoute la dernière colonne au tableau des colonnes
//   }

//   // Vérifie si des colonnes ont été créées mais pas encore ajoutées à une page
//   if (columns.length > 0) {
//     pages.push({ columns: columns, columnGap: columnGap }); // Ajoute les colonnes restantes à une nouvelle page
//   }

//   return pages;
// }

// -------------------- PREMIER ESSAI --------------------

// module.exports = [
//     { text: 'Bonjour, monde!', style: 'header' },
//     'Ceci est un exemple de document PDF généré avec pdfmake en utilisant Node.js et Express.',
//     { text: 'Voici une autre ligne.', style: 'anotherStyle' }
// ];

// module.exports = [
//     {
//         columns: [
//             // {
//             //     width: '25%',

//             //     stack: [
//             //         { text: 'Elise Radio 88.3 FM', style: 'header', image: },
//             //         'Elise radio : une radio française lancée en 2019 par Eric Feig...',
//             //         { text: 'Sentier pédestre : à la découverte du village de la Vernaz', style: 'header' },
//             //         'Une balade facile à faire seul, entre amis ou en famille pour les amoureux de la nature...',
//             //         { text: 'Laverie du Roc', style: 'header' },
//             //         'Laverie automatique, au cœur de la station du Roc d\'enfer...',
//             //         { text: 'Spectacle : "Mais, on est où là ?', style: 'header' },
//             //         'La troupe "La Baume en scène" présente son tout premier spectacle...',
//             //         { text: 'Elise Radio 88.3 FM', style: 'header' },
//             //         'Elise radio : une radio française lancée en 2019 par Eric Feig...',
//             //         { text: 'Sentier pédestre : à la découverte du village de la Vernaz'},
//             //         'Une balade facile à faire seul, entre amis ou en famille pour les amoureux de la nature...',
//             //         'Une balade facile à faire seul, entre amis ou en famille pour les amoureux de la nature...'
//             //     ],
//             //     pageBreak: 'auto'
//             // },
//             // genérer à partir de ce texte 1 ou 2 columns
//             // generateColumns(text) {return 1 ou 2 columns}
//             {
//                 width: '25%',
//                 stack: [
//                     { text: 'Eglise de La Forclaz', width: 'auto', },
//                     'L\'église Saint-Pierre de La Forclaz, de style néoclassique sarde...',
//                     { text: 'Carrefour Market', width: 'auto', },
//                     'Alimentation - Supermarché - Vente de produits régionaux...',
//                     { text: 'Alpes Services Immobilier', width: 'auto', },
//                     'Alpes Services Immobilier, une agence immobilière à votre service au Col du Corbier...',
//                     { text: 'Initiation et sortie escalade',  width: 'auto', },
//                     'L\'escalade vous intéresse ? Débutant ou expert...',
//                     { text: 'Eglise de La Forclaz', width: 'auto', },
//                     'L\'église Saint-Pierre de La Forclaz, de style néoclassique sarde...',
//                     { text: 'Carrefour Market', width: 'auto', },
//                     'Alimentation - Supermarché - Vente de produits régionaux...',
//                     { text: 'Alpes Services Immobilier', width: 'auto', },
//                     'Alpes Services Immobilier, une agence immobilière à votre service au Col du Corbier...',
//                     { text: 'Initiation et sortie escalade',  width: 'auto', },
//                     'L\'escalade vous intéresse ? Débutant ou expert...',
//                     { text: 'Eglise de La Forclaz', width: 'auto', },
//                     'L\'église Saint-Pierre de La Forclaz, de style néoclassique sarde...',
//                     { text: 'Carrefour Market', width: 'auto', },
//                     'Alimentation - Supermarché - Vente de produits régionaux...',
//                     { text: 'Alpes Services Immobilier', width: 'auto', },
//                     'Alpes Services Immobilier, une agence immobilière à votre service au Col du Corbier...',
//                     { text: 'Initiation et sortie escalade',  width: 'auto', },
//                     'L\'escalade vous intéresse ? Débutant ou expert...',
//                     { text: 'Carrefour Market', width: 'auto', },
//                     'Alimentation - Supermarché - Vente de produits régionaux...',
//                     { text: 'Alpes Services Immobilier', width: 'auto', },
//                     'Alpes Services Immobilier, une agence immobilière à votre service au Col du Corbier...',
//                     { text: 'Initiation et sortie escalade',  width: 'auto', },
//                     'L\'escalade vous intéresse ? Débutant ou expert...'
//                 ],
//                 pageBreak: 'auto'
//             },
//             // {
//             //     width: '25%',
//             //     height: '80%',
//             //     stack: [
//             //         { text: 'Elise Radio 88.3 FM', style: 'header' },
//             //         'Elise radio : une radio française lancée en 2019 par Eric Feig...',
//             //         { text: 'Sentier pédestre : à la découverte du village de la Vernaz', style: 'header' },
//             //         'Une balade facile à faire seul, entre amis ou en famille pour les amoureux de la nature...',
//             //         { text: 'Laverie du Roc', style: 'header' },
//             //         'Laverie automatique, au cœur de la station du Roc d\'enfer...',
//             //         { text: 'Spectacle : "Mais, on est où là ?', style: 'header' },
//             //         'La troupe "La Baume en scène" présente son tout premier spectacle...',
//             //         { text: 'Elise Radio 88.3 FM', style: 'header' },
//             //         'Elise radio : une radio française lancée en 2019 par Eric Feig...',
//             //         { text: 'Sentier pédestre : à la découverte du village de la Vernaz', style: 'header' },
//             //         'Une balade facile à faire seul, entre amis ou en famille pour les amoureux de la nature...',
//             //         { text: 'Laverie du Roc', style: 'header' },
//             //         'Laverie automatique, au cœur de la station du Roc d\'enfer...',
//             //         { text: 'Spectacle : "Mais, on est où là ?', style: 'header' },
//             //         'La troupe "La Baume en scène" présente son tout premier spectacle...'
//             //     ],
//             //     pageBreak: 'auto'
//             // },
//             // {
//             //     width: '25%',
//             //     stack: [
//             //         { text: 'Elise Radio 88.3 FM', style: 'header' },
//             //         'Elise radio : une radio française lancée en 2019 par Eric Feig...',
//             //         { text: 'Sentier pédestre : à la découverte du village de la Vernaz', style: 'header' },
//             //         'Une balade facile à faire seul, entre amis ou en famille pour les amoureux de la nature...',
//             //         { text: 'Laverie du Roc', style: 'header' },
//             //         'Laverie automatique, au cœur de la station du Roc d\'enfer...',
//             //         { text: 'Spectacle : "Mais, on est où là ?', style: 'header' },
//             //         'La troupe "La Baume en scène" présente son tout premier spectacle...',
//             //         { text: 'Elise Radio 88.3 FM', style: 'header' },
//             //         'Elise radio : une radio française lancée en 2019 par Eric Feig...',
//             //         { text: 'Sentier pédestre : à la découverte du village de la Vernaz', style: 'header' },
//             //         'Une balade facile à faire seul, entre amis ou en famille pour les amoureux de la nature...',
//             //         { text: 'Laverie du Roc', style: 'header' },
//             //         'Laverie automatique, au cœur de la station du Roc d\'enfer...',
//             //         { text: 'Spectacle : "Mais, on est où là ?', style: 'header' },
//             //         'La troupe "La Baume en scène" présente son tout premier spectacle...'
//             //     ],
//             //     pageBreak: 'auto'
//             // },
//         ],
//         columnGap: 20,
//     }
// ];
