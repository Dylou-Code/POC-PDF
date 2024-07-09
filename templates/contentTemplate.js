// const fs = require("fs");
// function imageToBase64(filePath) {
//     if (!filePath) {
//       console.error("image undefined");
//       return "";
//     }
//     const image = fs.readFileSync(filePath);
//     return `data:image/jpeg;base64,${image.toString("base64")}`;
//   }


// ----------Work V2

function generateColumns() {
  const maxColumns = 4;
  const pageHeight = 520; // hauteur contenu reel disponible (théorique 475)
  const itemHeight = 40; // Taille item 
  const contentData = Array.from({ length: 70 }, (v, i) => ({
      title: `Titre ${i + 1}`,
      description: `Description ${i + 1}`
  }));

  const pages = [];
  let currentPage = [];
  let currentColumn = [];
  let currentHeight = 0;

  contentData.forEach((item) => {
      const itemContent = [
          { text: item.title, style: 'header' },
          item.description
      ];

      // Si l'ajout de l'élément dépasse la hauteur de la colonne actuelle
      if (currentHeight + itemHeight > pageHeight) {
          // Ajoute la colonne à la page actuelle
          currentPage.push({ stack: currentColumn, width: '25%' });
          currentColumn = [];
          currentHeight = 0;

          // Si le nombre de colonnes atteint le maximum autorisé
          if (currentPage.length === maxColumns) {
              // Ajoute la page actuelle aux pages et réinitialise pour une nouvelle page
              pages.push({ columns: currentPage, columnGap: 10 });
              currentPage = [];
          }
      }

      // Ajoute l'élément à la colonne actuelle
      currentColumn.push(...itemContent);
      currentHeight += itemHeight;
  });


  if (currentColumn.length > 0) {
      currentPage.push({ stack: currentColumn, width: '25%' });
  }

  // Ajoute la dernière page si elle contient des colonnes
  if (currentPage.length > 0) {
      pages.push({ columns: currentPage, columnGap: 10 });
  }

  return pages;
}

module.exports = generateColumns;












// function generateColumns() {
//   const maxColumns = 4;
//   const columnGap = 10;
//   const pageHeight = 460; // Hauteur maximale de contenu pour chaque colonne
//   const contentData = Array.from({ length: 70 }, (v, i) => ({
//       title: `Titre ${i + 1}`,
//       description: `Description ${i + 1}`
//   }));

//   let columns = [];
//   let currentColumn = [];
//   let currentHeight = 0;
//   const pages = [];

//   contentData.forEach((item) => {
//       const itemHeight = 40; // Hauteur approximative d'un item (à ajuster selon le style réel)

//       // Si l'ajout de l'élément dépasse la hauteur de la colonne actuelle
//       if (currentHeight + itemHeight > pageHeight) {
//           columns.push({ stack: currentColumn, width: "25%" });
//           currentColumn = [];
//           currentHeight = 0;

//           // Si le nombre de colonnes atteint le maximum autorisé, ajouter à la page et réinitialiser les colonnes
//           if (columns.length === maxColumns) {
//               pages.push({ columns: columns, columnGap: columnGap });
//               columns = [];
//           }
//       }

//       // Ajouter titre et description à la colonne actuelle
//       currentColumn.push({ text: item.title, style: "header" });
//       currentColumn.push(item.description);

//       // Incrémente la hauteur actuelle de la colonne
//       currentHeight += itemHeight;
//   });

//   // Ajouter la dernière colonne si elle contient des éléments
//   if (currentColumn.length > 0) {
//       columns.push({ stack: currentColumn, width: "25%" });
//   }

//   // Ajouter les colonnes restantes à la dernière page
//   if (columns.length > 0) {
//       pages.push({ columns: columns, columnGap: columnGap });
//   }

//   return pages;
// }




// -----WORKING CODE-----
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



// --------------------

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
