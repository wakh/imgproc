import sharp from 'sharp';
import { join } from 'path';

const getImage = async (
  filename: string,
  w?: number,
  h?: number
): Promise<Buffer> => {
  const filepath = join(
    __dirname,
    `../images/${w || h ? 'thumb' : 'full'}`,
    filename.substr(0, filename.length - 4) +
      (w ? w.toString() + 'w' : '') +
      (h ? h.toString() + 'h' : '') +
      '.jpg'
  );

  const imgMeta = await sharp(filepath)
    .metadata()
    .catch((err) => {
      if (!w && !h) throw err;
    })
    .then();

  if (!imgMeta) {
    const img = sharp(join(__dirname, '../images/full', filename));
    await img.metadata().then();
    const options = {} as sharp.ResizeOptions;
    options.fit = w && h ? sharp.fit.fill : sharp.fit.inside;
    if (w) options.width = w;
    if (h) options.height = h;
    await img
      .resize(options)
      .toFile(filepath)
      .catch((err) => {
        console.error(err);
      })
      .then();
  }

  return await sharp(filepath).toBuffer();
};

export default getImage;
