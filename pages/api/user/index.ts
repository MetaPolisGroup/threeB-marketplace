import { NextApiRequest, NextApiResponse } from 'next';
import * as firebase from '../../../src/lib/firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req?.method) {
    case 'GET': {
      const data = await firebase.getCollection('user', []);
      console.log(data);
      res.status(200).json('GET');
      break;
    }
    case 'POST': {
      const { data } = JSON.parse(req.body);
      if (data) {
        if (!data.wallet_address || !data.name || !data.email || !data.phone) {
          res.status(400).json('Wallet Address | Name | Email | Phone is undefined');
        } else {
          const result = await firebase.upsert('user', data.wallet_address, data);
          res.status(200).json({ result });
        }
      }
      break;
    }
  }
}
