export function formatCurrency(currencyCentns){
    return ((Math.round(currencyCentns)/100).toFixed(2));
}

console.log('test suite:formatCurrency');

console.log('Converts cents into dollars');

if(formatCurrency(2095)==='20.95'){
  console.log('Passed');
}else{
  console.log('Failed');
}

console.log('works with o');

if(formatCurrency(0)==='0.00'){
  console.log('Passed');
}else{
  console.log('Failed');
}


console.log('round up to the nearest cent');

if(formatCurrency(2000.5)==='20.01'){
  console.log('Passed');
}else{
  console.log('Failed');
}