const path = require("path");

const logoPath = path.resolve(
  __dirname,
  "../public/images/logo-valee-aulps.png"
);

function header() {
  return {
    // text: 'Agenda ',
    // alignment: 'center',
    // margin: [10, 10, 10, 10],
    // image: imagePath,
    columns: [
      {
        width: "20%",
        stack: [
          {
            image: logoPath,
            width: 30,
            height: 30,
            margin: [10, 10, 10, 10],
          },
        ],
      },
      {
        width: "80%",
        stack: [
          {
            columns: [
              {
                width: "55%",
                margin: [10, 15, 0, 0],
                stack: [
                  {
                    text: "AGENDA",
                    bold: true,
                    fontSize: 15,
                  },
                ],
              },
              {
                width: "35%",
                margin: [10, 15, 0, 0],
                stack: [
                  {
                    text: "Du 10/07/2024 au 13/07/2024",
                    bold: false,
                    fontSize: 11,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    // columns: [
    //   {
    //     image: logoPath,
    //     width: 30,
    //     height: 30,
    //     margin: [10, 10, 10, 10],
    //   },
    //   {
    //     text: "Agenda",
    //     alignment: "center",
    //     margin: [10, 10, 10, 10],
    //   },
    // ],
    margin: [30, 0],
  };
}
// current page et page count sont auto-géré par pdfMake
// function footer(currentPage, pageCount) {
//   return {
//     columns: [
//       {
//         width: "25%",
//         text: "AgendaWX DWF WDFHJBGBDFBGVHJ Q QVEQBHEGJES SEBHJSF HBQJFJQ",

//         margin: [10, 10, 0, 10],
//       },
//       {
//         width: "75%",
//         text: "hjgjbhkndscjhvjb;nj;,ezrfdhjv;,sf n ,vnb;,,:=fcqvs xblkh eqrfvjgqfydjshfgnqldicblgyucsyjfdhq,chnqykthdsgvx<cb liyuujqgvckiluh",

//         margin: [10, 10, 0, 10],
//       },
//       {
//         width: "15%",
//         text: `Page ${currentPage} of ${pageCount} `,

//         margin: [10, 10, 0, 10],
//       },
//     ],
//     //             {
//     //                 width: '20%',
//     //                 stack: [
//     //                     {
//     //                         image: logoPath,
//     //                         width: 50,
//     //                         height: 50,
//     //                         margin: [10, 0, 10, 0]
//     //                     },
//     //                     {
//     //                         text: "Vallée d'Aulps\nTourisme",
//     //                         bold: true,
//     //                         margin: [10, 0, 10, 0]
//     //                     }
//     //                 ]
//     //             },
//     // {
//     //     text: `Test -  Ouvert de 9h-12h30 et 14h30-18h -  Page ${currentPage} of ${pageCount}`,
//     //     alignment: 'center',
//     //     margin: [10, 10, 10, 10]
//     // },
//     // {
//     //     text: 'Agenda',
//     //     alignment: 'center',
//     //     margin: [10, 5, 10, 10]
//     // },
//   };
// }

function footer(currentPage, pageCount) {
  return {
    columns: [
      {
        width: "20%",
        stack: [
          {
            text: "Vallée d'Aulps Tourisme",
            bold: true,
            margin: [10, 0, 10, 0],
            fontSize: 14,
          },
        ],
      },
      {
        width: "80%",
        stack: [
          {
            columns: [
              {
                width: "85%",
                stack: [
                  {
                    text: [
                      { text: "Montriond", bold: true, fontSize: 10 },
                      {
                        text: "  Ouverture prévue le 24 juin",
                        bold: false,
                        fontSize: 10,
                      },
                      { text: "  06 49 48 96 76", bold: true, fontSize: 10 },
                      {
                        text: "  36 route de Morzine, 74110, Montriond",
                        bold: false,
                        fontSize: 10,
                      },
                    ],
                  },
                  {
                    text: [
                      { text: "St Jean d’Aulps", bold: true, fontSize: 10 },
                      {
                        text: "  Du lundi au vendredi, 9h-12h et 13h30-17h30",
                        bold: false,
                        fontSize: 10,
                      },
                      { text: "  06 49 48 96 76", bold: true, fontSize: 10 },
                      {
                        text: "  36 route de Morzine, 74110, Montriond",
                        bold: false,
                        fontSize: 10,
                      },
                    ],
                  },
                ],
              },
              {
                width: "15%",
                margin: [10, 0, 0, 0],
                stack: [
                  {
                    text: `Page ${currentPage} of ${pageCount}`,
                    bold: false,
                    fontSize: 11,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    margin: [30, 0],
  };
}

module.exports = {
  header,
  footer,
};
