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
        img = await (h && w? getImage(n, w, h):
            w? getImage(n, w):
                getImage(n)).catch(() => {
                    res.status(404).send(`${n} does not exist!`)
                }).then();
        res.contentType('jpg').send(img);
    }
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});