var jwt = require('jsonwebtoken');

const user = {
  "user_acct": 'admin',
  "login_acct_no": '001',
  "token": '',
  "user_id": '0fd5709e-18cb-4832-aa60-037563c35fa3',
  "user_name": '系统管理员',
  "user_dept": '科技部',
  "limits": ['2ab592c3-eadc-4388-8cae-a7b0b94261ff', '529fb8de-de76-4afd-b128-bc97bea3270c', '710288b8-6551-4b38-8c69-955ade797979'],
}

// console.log(JSON.stringify(user));

const token = jwt.sign(user,
  'jstudio', {
    expiresIn: (60*60*24*30),
    noTimestamp:true,
    jwtid:'0fd5709e-18cb-4832-aa60-037563c35fa3'
  }
)

const vtoken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2FjY3QiOiJhZG1pbiIsImxvZ2luX2FjY3Rfbm8iOiIwMDEiLCJ0b2tlbiI6IiIsInVzZXJfaWQiOiIwZmQ1NzA5ZS0xOGNiLTQ4MzItYWE2MC0wMzc1NjNjMzVmYTMiLCJ1c2VyX25hbWUiOiLns7vnu5_nrqHnkIblkZgiLCJ1c2VyX2RlcHQiOiLnp5HmioDpg6giLCJsaW1pdHMiOlsiMmFiNTkyYzMtZWFkYy00Mzg4LThjYWUtYTdiMGI5NDI2MWZmIiwiNTI5ZmI4ZGUtZGU3Ni00YWZkLWIxMjgtYmM5N2JlYTMyNzBjIiwiNzEwMjg4YjgtNjU1MS00YjM4LThjNjktOTU1YWRlNzk3OTc5Il0sImV4cCI6MTUxNjQzMzE2NSwianRpIjoiMGZkNTcwOWUtMThjYi00ODMyLWFhNjAtMDM3NTYzYzM1ZmEzIn0.Hrl4p7AtC4ewh1-YfWgJiU0yomMozdbqv3krisAd9FA'
jwt.verify(vtoken,'jstudio',{jwtid:'0fd5709e-18cb-4832-aa60-037563c35fa3'},function(err,code){
  if(err){
    console.log(err.message);
  }
  console.log(code.limits);
  // console.log(JSON.parse(code));
})

console.log(token);
