import getImage from '../../utilities/getImage';
import sharp from 'sharp';
import { join } from 'path';
import { rm } from 'fs/promises';

describe('getImage Module', () => {
  const full = join(__dirname, '../../images/full');
  const thumb = join(__dirname, '../../images/thumb');
  const mimg = 'fjord.jpg';
  const simg = ['0', '1', '2', '3', '4', '5'];
  let img: Buffer, exp1: number, exp2: number, exp3: number, exp4: number;
  const options = (w: number, h?: number): sharp.ResizeOptions => {
    let options = {} as sharp.ResizeOptions;
    options.fit = w && h ? sharp.fit.fill : sharp.fit.inside;
    if (w) options.width = w;
    if (h) options.height = h;
    return options;
  };
  const calc = async (img: Buffer) => {
    const imgMeta = await sharp(img).metadata();
    return (imgMeta.width as number) + (imgMeta.height as number);
  };
  beforeAll(async () => {
    img = await sharp(join(full, mimg)).resize(options(100)).toBuffer();
    await Promise.all(
      simg.map(async (x) => {
        await sharp(img)
          .toFile(join(full, x + '.jpg'))
          .catch((err) => {
            console.error(err);
          })
          .then();
      })
    );
    exp1 = await calc(img);
    exp2 = await calc(await sharp(img).resize(options(20)).toBuffer());
    exp3 = await calc(await sharp(img).resize(options(0, 20)).toBuffer());
    exp4 = await calc(await sharp(img).resize(options(20, 20)).toBuffer());
  });
  describe('Full-image Specs', () => {
    it('Non-exist image', async () => {
      let exp = false;
      await getImage('unknown.jpg')
        .catch(() => {
          exp = true;
        })
        .then();
      expect(exp).toBeTrue;
    });
    it('Exist image', async () => {
      const ret = await calc(await getImage(`${simg[0]}.jpg`));
      expect(exp1).toBe(ret);
    });
  });
  describe('Scaled-to-fit-width Specs', () => {
    it('Exist image without thumb', async () => {
      const ret = await calc(await getImage(`${simg[0]}.jpg`, 20));
      expect(exp2).toBe(ret);
      await rm(join(thumb, `${simg[0]}20w.jpg`));
    });
    it('Exist image with thumb', async () => {
      await sharp(img)
        .resize(options(20))
        .toFile(join(thumb, simg[1] + '20w.jpg'));
      const ret = await calc(await getImage(`${simg[1]}.jpg`, 20));
      expect(exp2).toBe(ret);
      await rm(join(thumb, `${simg[1]}20w.jpg`));
    });
  });
  describe('Scaled-to-fit-height Specs', () => {
    it('Exist image without thumb', async () => {
      const ret = await calc(await getImage(`${simg[2]}.jpg`, 0, 20));
      expect(exp3).toBe(ret);
      await rm(join(thumb, `${simg[2]}20h.jpg`));
    });
    it('Exist image with thumb', async () => {
      await sharp(img)
        .resize(options(0, 20))
        .toFile(join(thumb, simg[3] + '20h.jpg'));
      const ret = await calc(await getImage(`${simg[3]}.jpg`, 0, 20));
      expect(exp3).toBe(ret);
      await rm(join(thumb, `${simg[3]}20h.jpg`));
    });
  });
  describe('Resized Specs', async () => {
    it('Exist image without thumb', async () => {
      const ret = await calc(await getImage(`${simg[4]}.jpg`, 20, 20));
      expect(exp4).toBe(ret);
      await rm(join(thumb, `${simg[4]}20w20h.jpg`));
    });
    it('Exist image with thumb', async () => {
      await sharp(img)
        .resize(options(20, 20))
        .toFile(join(thumb, simg[5] + '20w20h.jpg'));
      const ret = await calc(await getImage(`${simg[5]}.jpg`, 20, 20));
      expect(exp4).toBe(ret);
      await rm(join(thumb, `${simg[5]}20w20h.jpg`));
    });
  });
  afterAll(async () => {
    await Promise.all(
      simg.map(async (x) => {
        await rm(join(full, x + '.jpg'))
          .catch(() => {})
          .then();
      })
    );
  });
});
