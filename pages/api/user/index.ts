import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req?.method) {
    case 'GET': {
      res.status(200).json('');
      break;
    }
  }
  const body = req.body;
  // const { index } = req.query;
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
