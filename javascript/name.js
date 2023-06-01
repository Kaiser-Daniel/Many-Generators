var masculineNames = ["James", "David", "Michael", "John", "Robert", "William", "Daniel", 
"Thomas", "Charles", "Matthew", "Joseph", "Richard", "Mark", "Anthony", "Andrew", "Paul", 
"Steven", "Christopher", "Kevin", "Brian", "Edward", "Peter", "George", "Ryan", "Eric", 
"Jacob", "Adam", "Patrick", "Henry", "Nathan"];

var feminineNames = ["Emma", "Olivia", "Ava", "Isabella", "Sophia", "Charlotte", "Mia", 
"Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Ella", "Elizabeth", "Camila", "Luna", 
"Sofia", "Avery", "Mila", "Aria", "Scarlett", "Penelope", "Layla", "Chloe", "Victoria", 
"Madison", "Eleanor", "Grace", "Nora", "Riley"];

function randomName(sex) {
  if(sex=="M") {
    var index = Math.floor(Math.random()*masculineNames.length);
    return masculineNames[index];
  }
  if(sex=="F") {
    var index = Math.floor(Math.random()*feminineNames.length);
    return feminineNames[index];
  }
}

class Dynasty {

}

function arabicToRoman(num) {
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  let roman = '';
  
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  
  return roman;
}