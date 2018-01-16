var _ = require('lodash');

var users = [{
    'user': 'barney',
    'age': 36,
    'active': true
  },
  {
    'user': 'fred',
    'age': 40,
    'active': false
  },
  {
    'user': 'a',
    'age': 40,
    'active': false
  },
  {
    'user': 'b',
    'age': 40,
    'active': false
  }
];

var arr = ['barney', 'fred'];

var v = _.filter(users,(o)=>{

  return _.indexOf(arr,o.user)<0;
});

// console.log(v);

console.log(_.multiply(79, 70.68));

console.log(Math.fround(79*70.68));
