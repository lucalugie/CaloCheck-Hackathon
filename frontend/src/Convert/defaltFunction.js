let kcal_total = 0; // Cal
let gramsVeg = 0; // g
let gramsSodium = 0; // g
let gramsCarb = 0;
let gramsSugar = 0;
let gramsFat = 0;
let gramsProtein = 0;

function findDefaultInfo(gender, age) {
  if (isNaN(age)) {
    console.error("Invalid age:", age);
    return;
  }

  if (age <= 8) {
    gramsVeg = 175;
    gramsSodium = 1.2;
    console.log(gramsVeg, gramsSodium);

    if (age <= 3) {
      kcal_total = 1000;
    } else if (age > 3 && age <= 5) {
      kcal_total = 1250;
    } else if (age > 5) {
      kcal_total = 1400;
    }
  } else if (age >= 8) {
    if (age <= 13) {
      gramsVeg = 350;
      gramsSodium = 1.2;

      if (gender === "male") {
        kcal_total = 1800;
      } else if (gender === "female") {
        kcal_total = 1600;
      }
    } else if (age > 13) {
      gramsVeg = 400;
      if (age <= 50) {
        gramsSodium = 2;
        if (age <= 18) {
          if (gender === "male") {
            kcal_total = 2300;
          } else if (gender === "female") {
            kcal_total = 1900;
          }
        } else if (age > 18 && age <= 30) {
          if (gender === "male") {
            kcal_total = 2300;
          } else if (gender === "female") {
            kcal_total = 1800;
          }
        } else if (age > 30) {
          if (gender === "male") {
            kcal_total = 2200;
          } else if (gender === "female") {
            kcal_total = 1800;
          }
        }
      } else if (age > 50) {
        gramsSodium = 1.5;
        if (age <= 60) {
          if (gender === "male") {
            kcal_total = 2000;
          } else if (gender === "female") {
            kcal_total = 1800;
          }
        } else if (age > 60 && age <= 70) {
          if (gender === "male") {
            kcal_total = 1800;
          } else if (gender === "female") {
            kcal_total = 1600;
          }
        } else if (age > 70) {
          if (gender === "male") {
            kcal_total = 1700;
          } else if (gender === "female") {
            kcal_total = 1500;
          }
        }
      }
    }
  }
}

//findGramsfromtotal
function findGramsCarb(kcal_total) {
  const gCarb = ((kcal_total * 0.55) / 4).toFixed(2);
  return parseFloat(gCarb);
}
function findGramsSugar(kcal_total) {
  const gSugar = (kcal_total * 0.05) / 4;
  return gSugar;
}
function findGramsProtein(kcal_total) {
  const gProtein = (kcal_total * 0.1) / 4;
  return gProtein;
}
function findGramsFat(kcal_total) {
  const gFat = (kcal_total * 0.3) / 9;
  return gFat;
}

function findGramsTotal(gCarb, gSugar, gFat, gPro, gVeg, gSalt) {
  const gTotal = gCarb + gSugar + gFat + gPro + gVeg + gSalt;
  return gTotal;
}

export {
  kcal_total,
  gramsVeg,
  gramsSodium,
  gramsCarb,
  gramsSugar,
  gramsFat,
  gramsProtein,
  findDefaultInfo,
};
