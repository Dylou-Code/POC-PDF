const express = require("express");
const path = require("path");
const pdfmake = require("pdfmake");
const vfsFonts = require("pdfmake/build/vfs_fonts");
const generatePdf = require("./utils/pdfGenerator");
const contentTemplate = require("./templates/contentTemplate");
const headerFooterTemplate1 = require("./templates/headerFooterTemplate1");
const headerFooterTemplate2 = require("./templates/headerFooterTemplate2");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

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

const contentData = [
  {
    title: "Explorez les merveilles du Parc National des Calanques",
    description:
      "Découvrez la beauté préservée des calanques de Marseille à Cassis, idéal pour la randonnée et la baignade. ,",
    image: "./public/images/cookies.jpg",
  },
  {
    title: "Guide complet pour visiter le Château de Versailles",
    description:
      "Plongez dans l'histoire de la royauté française en visitant le majestueux Château de Versailles et ses jardins à couper le souffle.",
  },
  {
    title: "Top 10 des spécialités culinaires à déguster à Lyon",
    description:
      "Explorez la gastronomie lyonnaise avec ses célèbres bouchons, sa charcuterie et ses délices sucrés comme les pralines roses.",
  },
  {
    title: "Conseils pour réussir votre escapade à Nice",
    description:
      "Découvrez les plages ensoleillées, les marchés provençaux et l'art de vivre méditerranéen lors de votre séjour à Nice.",
  },
  {
    title: "Guide ultime pour découvrir la Provence en été",
    description:
      "Explorez les champs de lavande violette, les villages perchés et les marchés animés de la Provence pendant la saison estivale.",
  },
  {
    title: "Excursions incontournables autour du Mont Blanc",
    description:
      "Découvrez les meilleures randonnées, stations de ski et vues panoramiques autour du majestueux Mont Blanc.",
  },
  {
    title: "Les meilleurs festivals d'été à ne pas manquer en France",
    description:
      "Plongez dans l'ambiance festive avec notre sélection des meilleurs festivals de musique, arts et traditions en France cet été.",
  },
  {
    title: "Visite guidée des châteaux de la Loire",
    description:
      "Explorez l'élégance architecturale et l'histoire des châteaux de la Loire, témoins du raffinement de la Renaissance française.",
  },
  {
    title: "Découvrez les secrets cachés de Montmartre à Paris",
    description:
      "Parcourez les ruelles pittoresques, les artistes de rue et les cafés historiques du quartier bohème de Montmartre à Paris.",
  },
  {
    title: "Guide pratique pour visiter les gorges du Verdon",
    description:
      "Explorez les plus grandes gorges d'Europe avec ses eaux turquoises, ses activités nautiques et ses paysages spectaculaires.",
  },
  {
    title: "Les plus beaux marchés de Noël à découvrir en Alsace",
    description:
      "Plongez dans l'ambiance féerique des marchés de Noël alsaciens avec leurs illuminations, artisanat et spécialités gastronomiques.",
  },
  {
    title: "Découvrez la Route des Vins d'Alsace",
    description:
      "Explorez les vignobles pittoresques, les villages médiévaux et les caves à vin de la célèbre Route des Vins d'Alsace.",
  },
  {
    title: "Guide pour une escapade romantique à Bordeaux",
    description:
      "Découvrez la richesse culturelle, les vins prestigieux et l'architecture élégante lors d'une escapade romantique à Bordeaux.",
  },
  {
    title: "Les trésors cachés de la Côte d'Azur à découvrir",
    description:
      "Explorez les villages perchés, les criques isolées et les jardins exotiques de la magnifique Côte d'Azur.",
  },
  {
    title: "Week-end à Strasbourg : que voir et que faire",
    description:
      "Découvrez l'architecture gothique, la gastronomie alsacienne et l'ambiance festive de Strasbourg lors d'un week-end inoubliable.",
  },
  {
    title: "Guide pour visiter le Louvre à Paris",
    description:
      "Explorez les œuvres d'art emblématiques, l'histoire fascinante et les secrets du plus grand musée du monde, le Louvre à Paris.",
  },
  {
    title: "Les meilleures stations de ski des Alpes françaises",
    description:
      "Découvrez nos recommandations pour des vacances de ski parfaites dans les Alpes françaises, avec des pistes variées et des panoramas à couper le souffle.",
  },
  {
    title: "Escapade gourmande à Lyon : itinéraire et délices",
    description:
      "Découvrez les saveurs de la capitale gastronomique française avec notre guide pour une escapade gourmande à Lyon.",
  },
  {
    title: "Guide pour visiter le Mont Saint-Michel",
    description:
      "Explorez l'abbaye historique, les marées spectaculaires et le charme intemporel du Mont Saint-Michel en Normandie.",
  },
  {
    title: "Découvrez les secrets de la gastronomie française à Paris",
    description:
      "Explorez les boulangeries, les bistrots et les marchés de rue parisiens pour découvrir les délices de la cuisine française.",
  },
  {
    title: "Top 10 des activités à faire en famille à Disneyland Paris",
    description:
      "Découvrez nos recommandations pour des vacances magiques en famille à Disneyland Paris, avec des attractions, des spectacles et des rencontres avec les personnages.",
  },
  {
    title: "Guide pour une escapade culturelle à Avignon",
    description:
      "Explorez le patrimoine historique, le festival d'Avignon et les délices provençaux lors d'une escapade culturelle à Avignon.",
  },
  {
    title: "Les plus belles plages de la Côte d'Azur à découvrir",
    description:
      "Découvrez nos recommandations pour des vacances balnéaires idylliques le long de la magnifique Côte d'Azur.",
  },
  {
    title: "Week-end à Lille : que voir et que faire",
    description:
      "Découvrez l'architecture flamande, la gastronomie locale et l'ambiance chaleureuse de Lille lors d'un week-end enrichissant.",
  },
  {
    title: "Guide pour visiter les châteaux cathares en Occitanie",
    description:
      "Explorez les châteaux médiévaux perchés, l'histoire fascinante et les paysages majestueux des châteaux cathares en Occitanie.",
  },
  {
    title: "Découvrez la magie de Noël à Colmar",
    description:
      "Plongez dans l'ambiance féérique des marchés de Noël de Colmar avec ses illuminations, artisanat et spécialités alsaciennes.",
  },
  {
    title: "Guide pour une escapade nature dans les Vosges",
    description:
      "Explorez les sentiers de randonnée, les lacs cristallins et la faune sauvage des majestueuses montagnes des Vosges.",
  },
  {
    title: "Les meilleures caves à vin à visiter en Bourgogne",
    description:
      "Découvrez nos recommandations pour des dégustations de vins mémorables dans les caves renommées de Bourgogne.",
  },
  {
    title: "Excursions incontournables à faire en Bretagne",
    description:
      "Explorez les côtes sauvages, les cités médiévales et les phares emblématiques lors d'excursions inoubliables en Bretagne.",
  },
  {
    title: "Guide pour une escapade romantique à Aix-en-Provence",
    description:
      "Découvrez l'architecture élégante, les jardins luxuriants et l'art de vivre provençal lors d'une escapade romantique à Aix-en-Provence.",
  },
  {
    title: "Découvrez les plus beaux jardins de France",
    description:
      "Explorez nos recommandations pour découvrir les plus beaux jardins historiques et botaniques à travers la France.",
  },
  {
    title: "Guide pour visiter les sites historiques de Normandie",
    description:
      "Explorez les plages du Débarquement, les abbayes médiévales et les villages pittoresques de la Normandie historique.",
  },
  {
    title: "Les plus beaux villages de Provence à découvrir",
    description:
      "Découvrez nos recommandations pour explorer les villages perchés, les champs de lavande et les marchés provenç",
  },
];

//-------------V2 ----------------
app.get("/generate-pdf", (req, res) => {
  // changement du template
  const { orientation, template } = req.query;

  // Changement du template
  let headerFooterTemplate = headerFooterTemplate1;
  if (template === "2") {
    headerFooterTemplate = headerFooterTemplate2;
  }

  //const pageHeight = orientation === "landscape" ? 595 : 842;
  //A4	49,6 x 70,2	595 x 842
  // page height for A4 | A4 49,6 x 70,2	595 x 842
  const pageHeight = 595;

  // gestion du contenurrrr
  const content = contentTemplate(contentData, pageHeight, 60, 60);

  // génération du pdf
  generatePdf(content, headerFooterTemplate, res, orientation);

  return res.status(200);
});

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});
