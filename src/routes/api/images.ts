import {Router as rt} from 'express';
import getImage from '../../utilities/getImage';

const images = rt();

images.get('/', async (req, res) => {
  const n = req.query.filename as string;
  const w = parseInt(req.query.width as string);
  const h = parseInt(req.query.height as string);
  if (!n) res.status(400).send('Missing filename!');
  else {
    let img: Buffer | undefined;
    img = await (w && h? getImage(n, w, h):
            w? getImage(n, w):
                h? getImage(n, 0, h):
                    getImage(n)).catch(() => {
      img = undefined;
    }).then();
    if (img) res.type('jpg').send(img);
    else res.status(404).send(`${n} does not exist!`);
  }
});

export default images;
