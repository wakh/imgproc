import request from 'supertest';
import app from '../index';
import Jimp from 'jimp';
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
      .catch((err) => {
        console.error(err.toString());
      })
      .then();
  });
  describe('GET /api/images', async () => {
    const full = join(__dirname, '../images/full');
    const thumb = join(__dirname, '../images/thumb');
    const simg = ['11', '12', '13', '14'];
    let img: Jimp;
    beforeAll(async () => {
      img = (await Jimp.read(join(full, 'fjord.jpg'))).scaleToFit(
        100,
        Number.MAX_SAFE_INTEGER
      );
      await Promise.all(
        simg.map(async (x) => {
          await img
            .clone()
            .writeAsync(join(full, x + '.jpg'))
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
      const exp = img.hash();
      const ret = (
        await Jimp.read(
          (
            (await request(app)
              .get('/api/images')
              .query({
                filename: '11.jpg'
              })
              .expect(200)
              .expect('Content-Type', 'image/jpeg')
              .catch((err) => {
                console.error(err.toString());
              })
              .then()) as request.Response
          ).body as Buffer
        )
      ).hash();
      expect(exp).toBe(ret);
    });
    it('filename=exist.jpg, width=10', async () => {
      const exp = img.clone().scaleToFit(10, Number.MAX_SAFE_INTEGER).hash();
      const ret = (
        await Jimp.read(
          (
            (await request(app)
              .get('/api/images')
              .query({
                filename: '12.jpg',
                width: 10
              })
              .expect(200)
              .expect('Content-Type', 'image/jpeg')
              .catch((err) => {
                console.error(err.toString());
              })
              .then()) as request.Response
          ).body as Buffer
        )
      ).hash();
      expect(exp).toBe(ret);
    });
    it('filename=exist.jpg, height=10', async () => {
      const exp = img.clone().scaleToFit(Number.MAX_SAFE_INTEGER, 10).hash();
      const ret = (
        await Jimp.read(
          (
            (await request(app)
              .get('/api/images')
              .query({
                filename: '13.jpg',
                height: 10
              })
              .expect(200)
              .expect('Content-Type', 'image/jpeg')
              .catch((err) => {
                console.error(err.toString());
              })
              .then()) as request.Response
          ).body as Buffer
        )
      ).hash();
      expect(exp).toBe(ret);
    });
    it('filename=exist.jpg, width=10, height=10', async () => {
      const exp = img.clone().resize(10, 10).hash();
      const ret = (
        await Jimp.read(
          (
            (await request(app)
              .get('/api/images')
              .query({
                filename: '14.jpg',
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
        )
      ).hash();
      expect(exp).toBe(ret);
    });
    afterAll(async () => {
      await Promise.all(
        simg.map(async (x) => {
          await rm(join(full, x + '.jpg'))
            .catch(() => {})
            .then();
          await rm(join(thumb, x + '.jpg'))
            .catch(() => {})
            .then();
        })
      );
    });
  });
});
