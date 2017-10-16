const map:{[key:string]:number} = {
  'y' : 1000 * 60 * 60 * 24 * 365,
  'w' : 1000 * 60 * 60 * 24 * 7,
  'd' : 1000 * 60 * 60 * 24,
  'h' : 1000 * 60 * 60,
  'm' : 1000 * 60,
  's' : 1000,
  'i' : 1
};

export default (amount:string) : number => {

  amount = amount.replace(/ /g,'');

  const segments:Array<string> = [];
  let digit:string = '';
  let value:''|'y'|'w'|'d'|'h'|'m'|'s'|'i' = '';
  let mode:'d'|'v' = 'd';

    amount.split('').forEach((c) => {
    if (('0123456789.').indexOf(c) > -1) {
      if (mode == 'v') {
        segments.push(digit + value);
        digit = '';
        value = '';
        mode = 'd';
      }
      digit += c;
    } else {
      value += c;
      if (mode == 'd') {
        mode = 'v';
      }
    }
  });
  segments.push(digit + value);

  let total = 0;

  segments.forEach((segment) => {
    const numbers:number = parseFloat(segment.match(/\d/g).join(''));
    const letters:string = segment.match(/\D/g).join('');
    total += numbers * map[letters];
  });

  return total;
};
