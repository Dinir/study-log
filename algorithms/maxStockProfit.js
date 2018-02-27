/**
 * @param {number[]} pricesArr array of prices during a day
 *
 * @return {number} max possible profit of the day
 */
function maxStockProfit(pricesArr) {

  /*/ // uhh...

  const diff = [];
  pricesArr.forEach((price, index, array) => {
    if(!array[index+1]) return;
    diff.push(array[index+1] - price);
  });
  const profits = [];
  let currentMaxProfit = 0;
  let currentProfit = 0;
  diff.forEach(d => {
    if(d < 0 && currentProfit > currentMaxProfit) {
      currentMaxProfit = currentProfit;
    }
    currentProfit += d;
    if(currentProfit < 0) {
      profits.push(currentMaxProfit);
      currentMaxProfit = -1;
      currentProfit = 0;
    }
  });
  profits.push(Math.max(currentProfit, currentMaxProfit));
  const maxProfit = profits.reduce((a, b) => Math.max(a, b));

  /*/

  let maxProfit = -1;
  let buyPrice = 0;
  let sellPrice = 0;

  let changeBuyPrice = true;

  for (let i = 0; i < pricesArr.length; i++) {
    if (changeBuyPrice) buyPrice = pricesArr[i];
    sellPrice = pricesArr[i + 1];

    if (sellPrice < buyPrice) {
      changeBuyPrice = true;
    }
    else {
      let tempProfit = sellPrice - buyPrice;
      if (tempProfit > maxProfit) maxProfit = tempProfit;
      changeBuyPrice = false;
    }
  }

  //*/

  return maxProfit;
}

console.log(maxStockProfit([32,46,26,38,40,48,42])); // 22
console.log(maxStockProfit([10,18,4,5,9,6,16,12])); // 12
console.log(maxStockProfit([30,31,32,15,16,18,20,17,26,12,14])); // 11
console.log(maxStockProfit([20, 25, 30, 21, 31])); // 11
console.log(maxStockProfit([30,19,24,28,17,23,20,26,11,14,16])); // 9
console.log(maxStockProfit([30,19,24,28,23,20,26,29,11,14,16])); // 10