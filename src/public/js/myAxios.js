import axios from 'axios';
const promise;


export default async function({method, url, data}) {
  const res = await axios[method](url,data);
  const response = new Promise((resolve, reject)=>{
    // 成功
    if(res.data.status === 200){
      resolve(res.data)
    }
  })

}