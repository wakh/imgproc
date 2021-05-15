# imgproc
A simple placeholder API, it allows you to place images into your frontend with the size set via URL parameters, 
with a library that serve properly scaled versions of your images to the front end to reduce page load size. 
Rather than needing to resize and upload multiple copies of the same image to be used throughout your site.
## The scripts needed
**test:** `npm run test`<br />
**start:** `npm run start`<br />
**build:** `npm run build`<br />
## Endpoints
`GET /`
>No params

`GET /api`
>No params

`GET /api/images`
>Params: filename, width, height
>>Example<br />
>>Get full-size image: `/api/images?filename=img.jpg`<br />
>>Get scaled-to-fit-width image (fixed ratio): `/api/images?filename=img.jpg&width=100`<br />
>>Get scaled-to-fit-height image (fixed ratio): `/api/images?filename=img.jpg&height=100`<br />
>>Get custom-size image: `/api/images?filename=img.jpg&width=100&height=100`<br />
