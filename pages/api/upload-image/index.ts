import { NextApiRequest, NextApiResponse } from 'next';
import * as firebase from '../../../src/lib/firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req?.method) {
    case 'GET': {
      res.status(200).json('GET');
      break;
    }
    case 'POST': {
      const data = JSON.parse(req.body);
      const blob = new Blob(data.image, { type: 'image/png' });
      const imageUrl = await firebase.uploadImage(blob);
      res.status(200).json({ imageUrl });
      break;
    }
  }
}
