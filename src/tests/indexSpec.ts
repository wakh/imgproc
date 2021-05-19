import request from 'supertest';
import app from '../index';
import sharp from 'sharp';
import { join } from 'path';
import { rm } from 'fs/promises';

describe('SuperTest', () => {
  it('GET /', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .catch((err) => {
        console.error(err.toString());
      })
      .then();
  });
  it('GET /api', async () => {
    await request(app)
      .get('/api')
      .expect(200)
      .catch((err) => {
        console.error(err.toString());
      })
      .then();
  });
  describe('GET /api/images', async () => {
    const full = join(__dirname, '../images/full');
    const thumb = join(__dirname, '../images/thumb');
    const simg = ['6', '7', '8', '9'];
    let img: Buffer;
    const options = (w: number, h?: number): sharp.ResizeOptions => {
      const options = {} as sharp.ResizeOptions;
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
      img = await sharp(join(full, 'fjord.jpg'))
        .resize(options(100))
        .toBuffer();
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
    });
    it('w/o parameters', async () => {
      await request(app)
        .get('/api/images')
        .expect(400)
        .catch((err) => {
          console.error(err.toString());
        })
        .then();
    });
    it('filename=unknown.jpg', async () => {
      await request(app)
        .get('/api/images')
        .query({
          filename: 'unknown.jpg'
        })
        .expect(404)
        .catch((err) => {
          console.error(err.toString());
        })
        .then();
    });
    it('filename=exist.jpg', async () => {
      const exp = await calc(img);
      const ret = await calc(
        (
          (await request(app)
            .get('/api/images')
            .query({
              filename: simg[0] + '.jpg'
            })
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
            .catch((err) => {
              console.error(err.toString());
            })
            .then()) as request.Response
        ).body as Buffer
      );
      expect(exp).toBe(ret);
    });
    it('filename=exist.jpg, width=10', async () => {
      const exp = await calc(await sharp(img).resize(options(10)).toBuffer());
      const ret = await calc(
        (
          (await request(app)
            .get('/api/images')
            .query({
              filename: simg[1] + '.jpg',
              width: 10
            })
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
            .catch((err) => {
              console.error(err.toString());
            })
            .then()) as request.Response
        ).body as Buffer
      );
      expect(exp).toBe(ret);
      await rm(join(thumb, simg[1] + '10w.jpg'));
    });
    it('filename=exist.jpg, height=10', async () => {
      const exp = await calc(
        await sharp(img).resize(options(0, 10)).toBuffer()
      );
      const ret = await calc(
        (
          (await request(app)
            .get('/api/images')
            .query({
              filename: simg[2] + '.jpg',
              height: 10
            })
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
            .catch((err) => {
              console.error(err.toString());
            })
            .then()) as request.Response
        ).body as Buffer
      );
      expect(exp).toBe(ret);
      await rm(join(thumb, simg[2] + '10h.jpg'));
    });
    it('filename=exist.jpg, width=10, height=10', async () => {
      const exp = await calc(
        await sharp(img).resize(options(10, 10)).toBuffer()
      );
      const ret = await calc(
        (
          (await request(app)
            .get('/api/images')
            .query({
              filename: simg[3] + '.jpg',
              width: 10,
              height: 10
            })
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
            .catch((err) => {
              console.error(err.toString());
            })
            .then()) as request.Response
        ).body as Buffer
      );
      expect(exp).toBe(ret);
      await rm(join(thumb, simg[3] + '10w10h.jpg'));
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
});
