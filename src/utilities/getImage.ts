import Jimp from 'jimp';
import path from 'path';

const getImage = async (filename: string, w?: number, h?: number) => {
  let img: Jimp;
  const filepath = path.join(
      __dirname, `../images/${w? 'thumb': 'full'}`, filename);
  img = await Jimp.read(filepath)
      .catch((err) => {
        if (!w && !h) throw (err);
      }).then();
  if (!img || (w && w != img.bitmap.width) || (h && h != img.bitmap.height)) {
    img = await Jimp.read(path.join(__dirname, '../images/full', filename))
        .catch((err) => {
          throw (err);
        }).then();
    await (w && h? img.resize(w as number, h as number):
            w? img.scaleToFit(w as number, Number.MAX_SAFE_INTEGER):
                img.scaleToFit(Number.MAX_SAFE_INTEGER, h as number))
        .writeAsync(path.join(__dirname, '../images/thumb', filename));
  }
  return await img.getBufferAsync(img.getMIME());
};

export default getImage;
