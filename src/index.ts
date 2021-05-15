import getImage from './utilities/getImage';
import express from 'express';

const app = express();
const port = 3000;

app.get('/api/images', async (req, res) => {
    const n = req.query.filename as string;
    const w = parseInt(req.query.width as string);
    const h = parseInt(req.query.height as string);
    let img: Buffer;
    if (!n) res.status(400).send('Missing filename!')
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

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});