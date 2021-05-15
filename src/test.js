import getImage from './utilities/getImage';

getImage(`${__dirname}/images/full/fjord.jpg`, 20, 20).catch(err => {
    console.error(err.toString());
}).then(ret => {
    console.log(ret);
})