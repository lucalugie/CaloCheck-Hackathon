function gramsCarbToCal(type, grams) {
  let kcal = 0;
  switch (type) {
    case "whiterice":
      kcal = grams * (80 / 60);
      break;
    case "stickyrice":
      kcal = grams * (160 / 70);
      break;
    case "brownrice":
      kcal = grams * (85 / 76);
      break;
    case "eggNoodles":
      kcal = grams * (178 / 60);
      break;
    case "riceNoodles":
      kcal = grams * (77 / 100);
      break;
    case "widericeNoodles":
      kcal = grams * (132 / 60);
      break;
    case "vermicelli":
      kcal = grams * (53 / 56);
      break;
    case "glassNoodles":
      kcal = grams * (108 / 60);
      break;
    case "yam":
      kcal = grams * (75 / 60);
      break;
    case "taro":
      kcal = grams * (74 / 60);
      break;
    case "pasta":
      kcal = grams * (79 / 60);
      break;
    case "chineseNoodles":
      kcal = grams * (76 / 83);
      break;
    default:
      break;
  }
  return kcal;
}

function gramsProteinToCal(type, grams) {
  let kcal = 0;
  switch (type) {
    case "shrimp":
    case "fish":
    case "eggwhite":
    case "mackerel":
      kcal = grams * 18;
      break;
    case "cbreast":
    case "redpork":
    case "sadine":
    case "meatballs":
    case "meat":
      kcal = grams * 28;
      break;
    case "wegg":
    case "tofu":
    case "soymilk":
      kcal = grams * 38;
      break;
    case "sausage":
    case "bacon":
    case "psausage":
      kcal = grams * 50;
      break;
    default:
      break;
  }
  return kcal;
}

function gramsSugarToCal(grams) {
  let kcal = 0;
  kcal = grams * 16;
  return kcal;
}

function gramsFatToCal(grams) {
  let kcal = 0;
  kcal = grams * 45;
  return kcal;
}

function findGramsCarbFromAdd(type, amount) {
  let grams = 0;
  switch (type) {
    case "whiterice":
    case "eggNoodles":
    case "widericeNoodles":
    case "glassNoodles":
    case "yam":
    case "taro":
    case "pasta":
      grams = 60 * amount;
      break;
    case "stickyrice":
      grams = 70 * amount;
      break;
    case "brownrice":
      grams = 76 * amount;
      break;
    case "riceNoodles":
      grams = 100 * amount;
      break;
    case "vermicelli":
      grams = 56 * amount;
      break;
    case "chineseNoodles":
      grams = 83 * amount;
      break;
    default:
      break;
  }
  return grams;
}

function findGramsProteinFromAdd(amount) {
  let grams = 0;
  grams = 7 * amount;
  return grams;
}

function findGramsFatFromAdd(amount) {
  let grams = 0;
  grams = 5 * amount;
  return grams;
}
function findGramsSugarFromAdd(amount) {
  let grams = 0;
  grams = 4 * amount;
  return grams;
}
function findGramsSaltFromAdd(amount) {
  let grams = 0;
  grams = 2 * amount;
  return grams;
}

function findGramsVegFromAdd(type, amount) {
  let grams = 0;
  switch (type) {
    case "cookveg":
      grams = 60 * amount;
      break;
    case "rawveg":
      grams = 35 * amount;
      break;

    default:
      break;
  }
  return grams;
}

function findKcalDailyTotal(kcal_Carb, kcal_Sugar, kcal_Fat, kcal_Pro) {
  let kcal_daily_total = kcal_Carb + kcal_Sugar + kcal_Fat + kcal_Pro;
  return kcal_daily_total;
}

function findKcalDailyShop(kcal_Carb, kcal_Pro) {
  let kcal_daily_total = kcal_Carb + kcal_Pro;
  return kcal_daily_total;
}

function findGramsTotal(gCarb, gSugar, gFat, gPro, gVeg, gSalt) {
  let g_daily_total = gCarb + gSugar + gFat + gPro + gVeg + gSalt;
  return g_daily_total;
}
function findGramsTotalShop(gCarb, gPro, gVeg) {
  let g_daily_total = gCarb + gPro + gVeg;
  return g_daily_total;
}

export {
  gramsCarbToCal,
  gramsProteinToCal,
  gramsFatToCal,
  gramsSugarToCal,
  findGramsCarbFromAdd,
  findGramsFatFromAdd,
  findGramsProteinFromAdd,
  findGramsSaltFromAdd,
  findGramsSugarFromAdd,
  findGramsVegFromAdd,
  findKcalDailyTotal,
  findGramsTotal,
  findGramsTotalShop,
  findKcalDailyShop
};
