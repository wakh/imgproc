import Jimp from 'jimp';
import path from 'path';

let img: Jimp | undefined;

const getImage = async (filename: string, w?: number | undefined, h?: number | undefined) => {
    img = await (w? Jimp.read(path.join(__dirname ,'../images/thumb', filename)):
        Jimp.read(path.join(__dirname, '../images/full', filename)))
        .catch(err => {
            if (!w) console.log(err.toString());
        }).then();
    if (!img || (w && img.bitmap.width) || (h && img.bitmap.height))
        if (w) img = await Jimp.read(path.join(__dirname ,'../images/full', filename))
            .catch(err => {
                console.log(err.toString());
            }).then();
    if (img) await (h? img.resize(w as number, h as number):
        img.scaleToFit(w as number, Number.MAX_SAFE_INTEGER))
        .writeAsync(path.join(__dirname, '../images/thumb', filename));
    return img? 
        await img.getBufferAsync(img.getMIME()):
        await (new Jimp(0, 0)).getBufferAsync(Jimp.MIME_JPEG);
};

export default getImage;