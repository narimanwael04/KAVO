function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function safe(v) {
  var s = (v === undefined || v === null) ? "" : String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Server-side catalog: never trust prices or totals sent by the customer's browser.
var KAVO_CATALOG = {
  "101": {
    "sku": "KV001-M",
    "name": "Monochrome Graphic Slide Sandals",
    "price": 350,
    "sizes": [
      "41",
      "42",
      "43",
      "44",
      "45"
    ],
    "colors": [
      "black",
      "white",
      "white2"
    ]
  },
  "102": {
    "sku": "KV002-M",
    "name": "Bold Print Strap Slides",
    "price": 350,
    "sizes": [
      "41",
      "42",
      "43",
      "44",
      "45"
    ],
    "colors": [
      "black",
      "black2",
      "white"
    ]
  },
  "103": {
    "sku": "KV003-M",
    "name": "Sporty Blue Accent Slides",
    "price": 350,
    "sizes": [
      "41",
      "42",
      "43",
      "44",
      "45"
    ],
    "colors": [
      "black-blue",
      "black",
      "white-blue",
      "white-blue2",
      "white"
    ]
  },
  "201": {
    "sku": "KV001-K",
    "name": "Bear & Bunny Character Clogs",
    "price": 225,
    "sizes": [
      "21",
      "22",
      "23",
      "24"
    ],
    "colors": [
      "beige",
      "pink",
      "white"
    ]
  },
  "202": {
    "sku": "KV002-K",
    "name": "Cute Bear Character Clogs",
    "price": 200,
    "sizes": [
      "21",
      "22",
      "23",
      "24"
    ],
    "colors": [
      "beige",
      "pink",
      "white"
    ]
  },
  "203": {
    "sku": "KV003-K",
    "name": "Cartoon Character Kids Slides",
    "price": 200,
    "sizes": [
      "21",
      "22",
      "23",
      "24"
    ],
    "colors": [
      "beige",
      "black",
      "pink",
      "white"
    ]
  },
  "204": {
    "sku": "KV004-K",
    "name": "Flower Charm Kids Clogs",
    "price": 250,
    "sizes": [
      "21",
      "22",
      "23",
      "24"
    ],
    "colors": [
      "beige",
      "pink",
      "yellow"
    ]
  },
  "205": {
    "sku": "KV005-K",
    "name": "Colorful Graphic Kids Slides",
    "price": 225,
    "sizes": [
      "21",
      "22",
      "23",
      "24"
    ],
    "colors": [
      "black",
      "grey",
      "red"
    ]
  },
  "206": {
    "sku": "KV006-K",
    "name": "Cute Animal Face Kids Clogs",
    "price": 225,
    "sizes": [
      "21",
      "22",
      "23",
      "24"
    ],
    "colors": [
      "beige",
      "pink",
      "white"
    ]
  },
  "207": {
    "sku": "KV007-K",
    "name": "Sporty Graphic Kids Slides",
    "price": 225,
    "sizes": [
      "21",
      "22",
      "23",
      "24"
    ],
    "colors": [
      "black",
      "white",
      "red"
    ]
  },
  "301": {
    "sku": "KV001-WB",
    "name": "Buckle Strap Ankle Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "302": {
    "sku": "KV002-WB",
    "name": "Classic Ankle Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "303": {
    "sku": "KV003-WB",
    "name": "Side-Zip Ankle Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "304": {
    "sku": "KV004-WB",
    "name": "Chunky Sole Ankle Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "305": {
    "sku": "KV005-WB",
    "name": "Tall Strap Boots",
    "price": 1450,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "306": {
    "sku": "KV006-WB",
    "name": "Knee-High Riding Boots",
    "price": 1600,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel",
      "chocolatebrown"
    ]
  },
  "307": {
    "sku": "KV007-WB",
    "name": "Tall Buckle Boots",
    "price": 1500,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "chocolatebrown"
    ]
  },
  "308": {
    "sku": "KV008-WB",
    "name": "Suede Winter Ankle Boots",
    "price": 970,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel",
      "offwhite"
    ]
  },
  "309": {
    "sku": "KV009-WB",
    "name": "Cozy Suede Slip-On Boots",
    "price": 1050,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "offwhite",
      "camel"
    ]
  },
  "310": {
    "sku": "KV010-WB",
    "name": "Tall Heeled Buckle Boots",
    "price": 1700,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "311": {
    "sku": "KV011-WB",
    "name": "Knee-High Fashion Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "chocolatebrown"
    ]
  },
  "312": {
    "sku": "KV012-WB",
    "name": "Minimal Ankle Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "313": {
    "sku": "KV013-WB",
    "name": "Ruched Ankle Boots",
    "price": 1300,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "314": {
    "sku": "KV014-WB",
    "name": "Buckle Detail Ankle Boots",
    "price": 1300,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "315": {
    "sku": "KV015-WB",
    "name": "Pointed-Toe Heeled Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "316": {
    "sku": "KV016-WB",
    "name": "Tall Side-Zip Boots",
    "price": 1550,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "offwhite"
    ]
  },
  "317": {
    "sku": "KV017-WB",
    "name": "Classic Chelsea Ankle Boots",
    "price": 1300,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "318": {
    "sku": "KV018-WB",
    "name": "Pointed-Toe Ankle Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "grey"
    ]
  },
  "319": {
    "sku": "KV019-WB",
    "name": "Slouchy Mid-Calf Boots",
    "price": 1150,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "320": {
    "sku": "KV020-WB",
    "name": "Chunky Sole Winter Boots",
    "price": 1200,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "321": {
    "sku": "KV021-WB",
    "name": "Slouchy Knee-High Boots",
    "price": 1300,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "322": {
    "sku": "KV022-WB",
    "name": "Ruched Heeled Knee-High Boots",
    "price": 1600,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "323": {
    "sku": "KV023-WB",
    "name": "Block-Heel Ankle Boots",
    "price": 1150,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel",
      "chocolatebrown"
    ]
  },
  "324": {
    "sku": "KV024-WB",
    "name": "Minimal Chelsea Boots",
    "price": 1200,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "325": {
    "sku": "KV025-WB",
    "name": "Buckle Strap Ankle Boots",
    "price": 1450,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel"
    ]
  },
  "326": {
    "sku": "KV026-WB",
    "name": "Pointed Ankle Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "327": {
    "sku": "KV027-WB",
    "name": "Statement Knee-High Boots",
    "price": 2300,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "328": {
    "sku": "KV028-WB",
    "name": "Square-Toe Ankle Boots",
    "price": 1300,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "chocolatebrown"
    ]
  },
  "329": {
    "sku": "KV029-WB",
    "name": "Buckle Detail Ankle Boots",
    "price": 1300,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "330": {
    "sku": "KV030-WB",
    "name": "Padded Winter Boots",
    "price": 850,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "white"
    ]
  },
  "331": {
    "sku": "KV031-WB",
    "name": "Chunky Everyday Ankle Boots",
    "price": 1200,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "332": {
    "sku": "KV032-WB",
    "name": "Double-Buckle Ankle Boots",
    "price": 1200,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "333": {
    "sku": "KV033-WB",
    "name": "Tall Buckle Riding Boots",
    "price": 1750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel"
    ]
  },
  "334": {
    "sku": "KV034-WB",
    "name": "Classic Riding Boots",
    "price": 1650,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "335": {
    "sku": "KV035-WB",
    "name": "Soft Cuff Ankle Boots",
    "price": 1750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "336": {
    "sku": "KV036-WB",
    "name": "Buckle Cuff Ankle Boots",
    "price": 1600,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "337": {
    "sku": "KV037-WB",
    "name": "Lace-Up Ankle Boots",
    "price": 1550,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "338": {
    "sku": "KV038-WB",
    "name": "Classic Leather-Look Ankle Boots",
    "price": 1650,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown"
    ]
  },
  "339": {
    "sku": "KV039-WB",
    "name": "Low-Heel Ankle Boots",
    "price": 1550,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown"
    ]
  },
  "340": {
    "sku": "KV040-WB",
    "name": "Tall Equestrian Boots",
    "price": 1550,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown",
      "camel"
    ]
  },
  "341": {
    "sku": "KV041-WB",
    "name": "Grey Chelsea Ankle Boots",
    "price": 1850,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "grey"
    ]
  },
  "342": {
    "sku": "KV042-WB",
    "name": "Contrast-Trim Winter Boots",
    "price": 1400,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "offwhite"
    ]
  },
  "343": {
    "sku": "KV043-WB",
    "name": "Pointed-Toe Heeled Boots",
    "price": 1800,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown"
    ]
  },
  "344": {
    "sku": "KV044-WB",
    "name": "Block-Heel Ankle Boots",
    "price": 1800,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown"
    ]
  },
  "345": {
    "sku": "KV045-WB",
    "name": "Rounded-Toe Heeled Boots",
    "price": 1750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown"
    ]
  },
  "346": {
    "sku": "KV046-WB",
    "name": "Minimal Block-Heel Boots",
    "price": 1750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown"
    ]
  },
  "347": {
    "sku": "KV047-WB",
    "name": "Sleek Ankle Boots",
    "price": 870,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown",
      "black"
    ]
  },
  "348": {
    "sku": "KV048-WB",
    "name": "Tall Knee-High Boots",
    "price": 2100,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black"
    ]
  },
  "349": {
    "sku": "KV049-WB",
    "name": "Buckle Ankle Boots",
    "price": 950,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "350": {
    "sku": "KV050-WB",
    "name": "Multi-Style Winter Boots",
    "price": 1500,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel",
      "chocolatebrown"
    ]
  },
  "351": {
    "sku": "KV051-WB",
    "name": "Suede Ankle Boots",
    "price": 1350,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "352": {
    "sku": "KV052-WB",
    "name": "Casual Winter Boots",
    "price": 950,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "white",
      "brown"
    ]
  },
  "353": {
    "sku": "KV053-WB",
    "name": "Color-Block Ankle Boots",
    "price": 950,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown",
      "redcherry"
    ]
  },
  "354": {
    "sku": "KV054-WB",
    "name": "Tall Buckle Boots",
    "price": 1600,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "355": {
    "sku": "KV055-WB",
    "name": "Slouchy Tall Boots",
    "price": 1650,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "356": {
    "sku": "KV056-WB",
    "name": "Buckle Strap Ankle Boots",
    "price": 1150,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "357": {
    "sku": "KV057-WB",
    "name": "Ruched Ankle Boots",
    "price": 1150,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "358": {
    "sku": "KV058-WB",
    "name": "Quilted Casual Boots",
    "price": 950,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "grey",
      "lightbeige"
    ]
  },
  "359": {
    "sku": "KV059-WB",
    "name": "Fleece-Lined Winter Boots",
    "price": 950,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown",
      "beige"
    ]
  },
  "360": {
    "sku": "KV060-WB",
    "name": "Soft-Lined Winter Boots",
    "price": 1100,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown",
      "beige"
    ]
  },
  "401": {
    "sku": "KV001-WH",
    "name": "Classic Block-Heel Pumps",
    "price": 580,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "silver",
      "beige"
    ]
  },
  "402": {
    "sku": "KV002-WH",
    "name": "Slingback Block-Heel Pumps",
    "price": 580,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "white",
      "burgandyjpeg"
    ]
  },
  "403": {
    "sku": "KV003-WH",
    "name": "Pointed Slingback Heels",
    "price": 750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "404": {
    "sku": "KV004-WH",
    "name": "Elegant Court Heels",
    "price": 750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown",
      "burgandy",
      "offwhite"
    ]
  },
  "501": {
    "sku": "KV001-WS",
    "name": "Floral Applique Flat Slides",
    "price": 250,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink",
      "white"
    ]
  },
  "502": {
    "sku": "KV002-WS",
    "name": "Logo Strap Comfort Slides",
    "price": 250,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "503": {
    "sku": "KV003-WS",
    "name": "Double-Buckle Comfort Slides",
    "price": 270,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "pink"
    ]
  },
  "504": {
    "sku": "KV004-WS",
    "name": "Bow Detail Platform Slides",
    "price": 270,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "pink",
      "beige"
    ]
  },
  "505": {
    "sku": "KV005-WS",
    "name": "Flower Detail Flat Slides",
    "price": 260,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "506": {
    "sku": "KV006-WS",
    "name": "Double Bow Strap Slides",
    "price": 270,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "507": {
    "sku": "KV007-WS",
    "name": "Bow Accent Comfort Slides",
    "price": 260,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "pink",
      "beige"
    ]
  },
  "508": {
    "sku": "KV008-WS",
    "name": "Decorative Bow Flat Slides",
    "price": 260,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "509": {
    "sku": "KV009-WS",
    "name": "Triple Bow Strap Slides",
    "price": 260,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "510": {
    "sku": "KV010-WS",
    "name": "Color Pop Graphic Slides",
    "price": 250,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "511": {
    "sku": "KV011-WS",
    "name": "Logo Buckle Flat Slides",
    "price": 260,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "pink",
      "beige"
    ]
  },
  "512": {
    "sku": "KV012-WS",
    "name": "Double-Buckle Everyday Slides",
    "price": 250,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "513": {
    "sku": "KV013-WS",
    "name": "Minimalist Soft Flat Slides",
    "price": 260,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "pink",
      "beige"
    ]
  },
  "514": {
    "sku": "KV014-WS",
    "name": "Classic Two-Strap Slides",
    "price": 260,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "pink",
      "beige"
    ]
  },
  "515": {
    "sku": "KV015-WS",
    "name": "Cartoon Print Flat Slides",
    "price": 270,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "516": {
    "sku": "KV016-WS",
    "name": "Playful Graphic Strap Slides",
    "price": 250,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "601": {
    "sku": "KV001-WF",
    "name": "Classic Casual Moccasin Loafers",
    "price": 580,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "white",
      "brown"
    ]
  },
  "602": {
    "sku": "KV002-WF",
    "name": "Stitched Casual Moccasin Loafers",
    "price": 580,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "white",
      "brown"
    ]
  },
  "605": {
    "sku": "KV005-WF",
    "name": "Minimal Leather-Look Loafers",
    "price": 780,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "white",
      "beige"
    ]
  },
  "606": {
    "sku": "KV006-WF",
    "name": "Elegant Low-Heel Loafers",
    "price": 750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel",
      "chocolatebrown"
    ]
  },
  "607": {
    "sku": "KV007-WF",
    "name": "Casual Platform Sneakers",
    "price": 800,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "offwhite",
      "blue"
    ]
  },
  "608": {
    "sku": "KV008-WF",
    "name": "Chic Everyday Slip-On Shoes",
    "price": 800,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown",
      "beige"
    ]
  },
  "610": {
    "sku": "KV010-WF",
    "name": "Sporty Color-Block Sneakers",
    "price": 680,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "camel",
      "chocolatebrown"
    ]
  },
  "613": {
    "sku": "KV013-WF",
    "name": "Chunky Platform Casual Sneakers",
    "price": 780,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "chocolatebrown"
    ]
  },
  "104": {
    "sku": "KV001-MC",
    "name": "Classic Men’s Crocs – KV001",
    "price": 400,
    "sizes": [
      "41",
      "42",
      "43",
      "44",
      "45"
    ],
    "colors": [
      "beige",
      "black",
      "white&blue"
    ]
  },
  "105": {
    "sku": "KV002-MC",
    "name": "Classic Men’s Crocs – KV002",
    "price": 400,
    "sizes": [
      "41",
      "42",
      "43",
      "44",
      "45"
    ],
    "colors": [
      "white&black",
      "white&brown",
      "white&orange"
    ]
  },
  "208": {
    "sku": "KV008-K",
    "name": "Kids Crocs – KV008",
    "price": 300,
    "sizes": [
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28"
    ],
    "colors": [
      "black",
      "pink",
      "white"
    ]
  },
  "618": {
    "sku": "KV011-WF",
    "name": "Women’s Shoes & Footwear – KV011",
    "price": 780,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "blackl",
      "chocolatebrown"
    ]
  },
  "619": {
    "sku": "KV012-WF",
    "name": "Women’s Shoes & Footwear – KV012",
    "price": 780,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "chocolatebrown"
    ]
  },
  "621": {
    "sku": "KV014-WF",
    "name": "Women’s Shoes & Footwear – KV014",
    "price": 780,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "chocolatebrown"
    ]
  },
  "701": {
    "sku": "KV001-WBAG",
    "name": "Women’s Bag – KV001",
    "price": 890,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "darkgrey",
      "jeans"
    ]
  },
  "702": {
    "sku": "KV002-WBAG",
    "name": "Women’s Bag – KV002",
    "price": 780,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown",
      "beige"
    ]
  },
  "703": {
    "sku": "KV003-WBAG",
    "name": "Women’s Bag – KV003",
    "price": 870,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige"
    ]
  },
  "704": {
    "sku": "KV004-WBAG",
    "name": "Women’s Bag – KV004",
    "price": 750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "burgandy"
    ]
  },
  "705": {
    "sku": "KV005-WBAG",
    "name": "Women’s Bag – KV005",
    "price": 750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "silver"
    ]
  },
  "706": {
    "sku": "KV006-WBAG",
    "name": "Women’s Bag – KV006",
    "price": 780,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "white"
    ]
  },
  "707": {
    "sku": "KV007-WBAG",
    "name": "Women’s Bag – KV007",
    "price": 890,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "camel"
    ]
  },
  "708": {
    "sku": "KV008-WBAG",
    "name": "Women’s Bag – KV008",
    "price": 900,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "offwhite"
    ]
  },
  "709": {
    "sku": "KV009-WBAG",
    "name": "Women’s Bag – KV009",
    "price": 700,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "silver"
    ]
  },
  "710": {
    "sku": "KV010-WBAG",
    "name": "Women’s Bag – KV010",
    "price": 700,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "offwhite"
    ]
  },
  "711": {
    "sku": "KV011-WBAG",
    "name": "Women’s Bag – KV011",
    "price": 700,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "gold"
    ]
  },
  "712": {
    "sku": "KV012-WBAG",
    "name": "Women’s Bag – KV012",
    "price": 840,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown"
    ]
  },
  "713": {
    "sku": "KV013-WBAG",
    "name": "Women’s Bag – KV013",
    "price": 970,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "darkgrey",
      "offwhite"
    ]
  },
  "714": {
    "sku": "KV014-WBAG",
    "name": "Women’s Bag – KV014",
    "price": 940,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "brown",
      "offwhite"
    ]
  },
  "801": {
    "sku": "KV001-WC",
    "name": "Women’s Crocs – KV001",
    "price": 350,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "802": {
    "sku": "KV002-WC",
    "name": "Women’s Crocs – KV002",
    "price": 350,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "white"
    ]
  },
  "803": {
    "sku": "KV003-WC",
    "name": "Women’s Crocs – KV003",
    "price": 350,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "pink",
      "white&blue"
    ]
  },
  "804": {
    "sku": "KV004-WC",
    "name": "Women’s Crocs – KV004",
    "price": 350,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "pink"
    ]
  },
  "805": {
    "sku": "KV005-WC",
    "name": "Women’s Crocs – KV005",
    "price": 350,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "beige",
      "black",
      "white"
    ]
  },
  "603": {
    "sku": "KV003-WF",
    "name": "Women’s Shoes & Footwear – KV003",
    "price": 680,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "604": {
    "sku": "KV004-WF",
    "name": "Women’s Shoes & Footwear – KV004",
    "price": 750,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "black",
      "brown"
    ]
  },
  "609": {
    "sku": "KV009-WF",
    "name": "Women’s Shoes & Footwear – KV009",
    "price": 650,
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      "offwhite",
      "choccolatebrown",
      "camel"
    ]
  }
}

var KAVO_METRO_GOVS = ["Cairo", "Giza", "Alexandria", "Qalyubia"]; // Retained for compatibility; shipping uses the explicit governorate rules below.
var KAVO_GOVS = ["Cairo","Giza","Alexandria","Qalyubia","Sharqia","Dakahlia","Gharbia","Monufia","Beheira","Kafr El Sheikh","Damietta","Port Said","Ismailia","Suez","Fayoum","Beni Suef","Minya","Asyut","Sohag","Qena","Luxor","Aswan","Red Sea","New Valley","Matrouh","North Sinai","South Sinai"];
var KAVO_PHONE_RE = /^01[0125][0-9]{8}$/;

function doPost(e) {
  var lock = LockService.getScriptLock();
  var locked = false;
  try {
    lock.waitLock(20000);
    locked = true;
    if (!e || !e.postData || !e.postData.contents) throw new Error("Missing request body");
    var data = JSON.parse(e.postData.contents);
    var name = String(data.name || "").trim();
    var phone = String(data.phone || "").replace(/[\s-]/g, "");
    var phone2 = String(data.phone2 || "").replace(/[\s-]/g, "");
    var gov = String(data.gov || "");
    var city = String(data.city || "").trim();
    var address = String(data.addr || data.address || "").trim();
    var payment = String(data.pay || "");
    var ref = String(data.ref || "").trim();

    if (!name || name.length > 120) throw new Error("Invalid customer name");
    if (!KAVO_PHONE_RE.test(phone)) throw new Error("Invalid Egyptian mobile number");
    if (phone2 && !KAVO_PHONE_RE.test(phone2)) throw new Error("Invalid alternative mobile number");
    if (KAVO_GOVS.indexOf(gov) === -1) throw new Error("Invalid governorate");
    if (!city || city.length > 120 || !address || address.length > 500) throw new Error("Missing or invalid delivery address");
    if (["COD", "InstaPay", "Vodafone Cash"].indexOf(payment) === -1) throw new Error("Invalid payment method");
    if (!/^KV-[0-9]{6}-[A-HJ-NP-Z2-9]{6}$/.test(ref)) throw new Error("Invalid order reference");
    if (!Array.isArray(data.items) || data.items.length < 1 || data.items.length > 30) throw new Error("Invalid order items");

    var subtotal = 0;
    var lines = [];
    data.items.forEach(function(item) {
      var product = KAVO_CATALOG[String(item.productId)];
      var qty = Number(item.quantity);
      var size = String(item.size || "");
      var colorId = String(item.colorId || "");
      if (!product) throw new Error("Unknown product in order");
      if (!Number.isInteger(qty) || qty < 1 || qty > 50) throw new Error("Invalid item quantity");
      if (product.sizes.indexOf(size) === -1) throw new Error("Invalid product size");
      if (product.colors.indexOf(colorId) === -1) throw new Error("Invalid product color");
      subtotal += product.price * qty;
      lines.push(product.sku + " - " + product.name + " [Color: " + colorId + ", Size: " + size + ", Qty: " + qty + ", Unit: " + product.price + " EGP]");
    });

    var shipping = gov === "Alexandria" ? 120 : (["Fayoum", "Beni Suef", "Minya", "Asyut", "Sohag", "Qena", "Luxor"].indexOf(gov) !== -1 ? 140 : 100);
    var total = subtotal + shipping;
    if (Number(data.total) !== total) throw new Error("Order total does not match the server-calculated total");
    var summary = lines.join("; ");

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    // Keep the original 12-column layout intact so existing order sheets remain compatible.
    var headers = ["Timestamp", "Type", "Reference", "Name", "Phone", "Phone 2", "Gov", "Address", "Items Summary", "Total EGP", "Payment", "Notes", "City", "Subtotal EGP", "Shipping EGP", "Email Status"];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      var existingHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      headers.forEach(function(header, index) {
        if (!existingHeaders[index]) sheet.getRange(1, index + 1).setValue(header);
      });
    }

    // Idempotency: a retry with the same reference must not create a second row.
    if (sheet.getLastRow() > 1) {
      var duplicate = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).createTextFinder(ref).matchEntireCell(true).findNext();
      if (duplicate) return reply({ status: "success", ref: ref, duplicate: true, mailStatus: "not_retried" });
    }

    var timestamp = Utilities.formatDate(new Date(), "Africa/Cairo", "yyyy-MM-dd HH:mm:ss");
    var row = sheet.getLastRow() + 1;
    sheet.appendRow([
      timestamp, "Retail Order", safe(ref), safe(name), safe(phone), safe(phone2), safe(gov),
      safe(city + " - " + address), safe(summary), total, safe(payment), safe(data.notes || ""),
      safe(city), subtotal, shipping, "PENDING"
    ]);

    var mailStatus = "sent";
    try {
      MailApp.sendEmail({
        to: "Kavo9320@gmail.com",
        subject: "New KAVO Order #" + ref,
        body: "New order recorded in Google Sheets.\n\nReference: " + ref + "\nCustomer: " + name + "\nPhone: " + phone + " / " + (phone2 || "N/A") + "\nGovernorate: " + gov + "\nCity: " + city + "\nAddress: " + address + "\nPayment: " + payment + "\nSubtotal: " + subtotal + " EGP\nShipping: " + shipping + " EGP\nTotal: " + total + " EGP\n\nItems:\n" + summary + "\n\nNotes: " + (data.notes || "")
      });
    } catch (mailErr) {
      mailStatus = "failed: " + String(mailErr).slice(0, 250);
    }
    sheet.getRange(row, 16).setValue(mailStatus);
    return reply({ status: "success", ref: ref, mailStatus: mailStatus });
  } catch (err) {
    return reply({ status: "error", message: String(err) });
  } finally {
    if (locked) lock.releaseLock();
  }
}
