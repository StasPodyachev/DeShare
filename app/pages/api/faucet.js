const axios = require('axios');
export default function handler(req, res) {
  var config = {
    method: 'post',
    url: 'http://195.201.21.44:3000/v1/faucet',
    headers: {
      'Cache-Control' : 'max-age=0',
      'Accept': '*/*',
    },
    data: JSON.stringify(req.body)
  };
  return axios(config).then(response =>  {
    res.status(200).json(response.data);
  }).catch();
}