import express from 'express';
import getImage from '../../utilities/getImage';

const images = express.Router();

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const n = req.query.filename as string;
    const w = parseInt(req.query.width as string);
    const h = parseInt(req.query.height as string);
    let errmsg = '';
    if (!n) errmsg += 'Please provide filename. ';
    if (req.query.width && isNaN(w))
      errmsg += `Unknown width=${req.query.width}. `;
    if (req.query.height && isNaN(h))
      errmsg += `Unknwon height=${req.query.height}.`;
    if (errmsg) res.status(400).send(errmsg);
    else {
      let img: Buffer | undefined;
      img = await (w && h
        ? getImage(n, w, h)
        : w
        ? getImage(n, w)
        : h
        ? getImage(n, 0, h)
        : getImage(n)
      )
        .catch(() => {
          img = undefined;
        })
        .then();
      if (img) res.type('jpg').send(img);
      else res.status(404).send(`${n} does not exist!`);
    }
  }
);

export default images;
