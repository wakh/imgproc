import getImage from '../utilities/getImage';
import Jimp from 'jimp';
import path from 'path';
import {rm} from 'fs/promises';

const full = path.join(__dirname, '../images/full');
const thumb = path.join(__dirname, '../images/thumb');
const simg = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const mimg = Jimp.read(path.join(full, 'fjord.jpg'));
let exp1: string, exp2: string, exp3: string, exp4: string;

describe("getImage Module", () => {
    beforeAll(async () => {
        const img = (await mimg).scaleToFit(100, Number.MAX_SAFE_INTEGER);
        await Promise.all(simg.map(async x => {
            await img.clone().writeAsync(path.join(full, x + '.jpg')).then();
        }));
        exp1 = img.hash();
        exp2 = img.clone().scaleToFit(20, Number.MAX_SAFE_INTEGER).hash();
        exp3 = img.clone().scaleToFit(Number.MAX_SAFE_INTEGER, 20).hash();
        exp4 = img.clone().resize(20, 20).hash();
        await img.clone().scaleToFit(20, Number.MAX_SAFE_INTEGER)
            .writeAsync(path.join(thumb, simg[2] + '.jpg'));
        await img.clone().scaleToFit(10, Number.MAX_SAFE_INTEGER)
            .writeAsync(path.join(thumb, simg[3] + '.jpg'));
        await img.clone().resize(20, 20)
            .writeAsync(path.join(thumb, simg[5] + '.jpg'));
        await img.clone().resize(10, 10)
            .writeAsync(path.join(thumb, simg[6] + '.jpg'));
        await img.clone().resize(10, 20)
            .writeAsync(path.join(thumb, simg[7] + '.jpg'));
        await img.clone().resize(20, 10)
            .writeAsync(path.join(thumb, simg[8] + '.jpg'));
    });
    describe("Full-image Specs", () => {
        it("Non-exist image", async () => {
            let exp = false;
            await getImage('unknown.jpg').catch(() => {
                exp = true;
            }).then()
            expect(exp).toBeTrue;
        });
        it("Exist image", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[0]}.jpg`))).hash();
            expect(exp1).toBe(ret);
        });
    });
    describe("Scaled-to-fit-width Specs", () => {
        it("Exist image with no thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[0]}.jpg`, 20))).hash();
            expect(exp2).toBe(ret);
        });
        it("Exist image with size-matched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[1]}.jpg`, 20))).hash();
            expect(exp2).toBe(ret);
        });
        it("Exist image with size-unmatched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[2]}.jpg`, 20))).hash();
            expect(exp2).toBe(ret);
        });
    });
    describe("Scaled-to-fit-height Specs", () => {
        it("Exist image with no thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[3]}.jpg`, 0, 20))).hash();
            expect(exp3).toBe(ret);
        });
        it("Exist image with size-matched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[4]}.jpg`, 0, 20))).hash();
            expect(exp3).toBe(ret);
        });
        it("Exist image with size-unmatched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[5]}.jpg`, 0, 20))).hash();
            expect(exp3).toBe(ret);
        });
    });
    describe("Resized Specs", async () => {
        it("Exist image with no thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[6]}.jpg`, 20, 20))).hash();
            expect(exp4).toBe(ret);
        });
        it("Exist image with size-matched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[7]}.jpg`, 20, 20))).hash();
            expect(exp4).toBe(ret);
        });
        it("Exist image with size-unmatched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[8]}.jpg`, 20, 20))).hash();
            expect(exp4).toBe(ret);
        });
        it("Exist image with width-unmatched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[9]}.jpg`, 20, 20))).hash();
            expect(exp4).toBe(ret);
        });
        it("Exist image with height-unmatched thumb", async () => {
            const ret = (await Jimp.read(await getImage(`${simg[10]}.jpg`, 20, 20))).hash();
            expect(exp4).toBe(ret);
        });
    });
    afterAll(async () => {
        await Promise.all(simg.map(async x => {
            await rm(path.join(full, x + '.jpg')).catch(() => {}).then();
            await rm(path.join(thumb, x + '.jpg')).catch(() => {}).then();
        }));
    });
});