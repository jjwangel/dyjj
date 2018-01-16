var Mock = require('mockjs');

var template = {
  'retrun_code': "000000",
  'token': 'aaaaaa',
  'result': {
    'column|20':[/\d{5,5}-\S{5,10}/],
    'values1|20':['@float(100, 1000, 2, 2)'],
    'values2|20':['@float(500, 10000, 2, 2)'],
  }
}
var data = Mock.mock(template)

console.log(data);
