# Project 10: Manage-events Back End

## _Rock The Code_

## Description

Rest API that manages the database to handle user and event data. It is realized using express and mongoose. This application will be used together with a frontend from which all the data will be registered.

## Index

- [Deployment](#Deployment)
- [Structure](#Structure)
- [API Reference](#API-Reference)
- [Environment Variables](#Environment-Variables)
- [Dependencies](#Dependencies)
- [Authors](#Authors)

## Deployment

To deploy this project run

```
  npm run start
```

To start the API in developer mode and restart the API with every change in local:

```
npm run dev
```

## Structure

```
Proyecto10_Back_End
├─ .env
├─ index.js
├─ package-lock.json
├─ package.json
└─ src
   ├─ api
   │  ├─ controllers
   │  │  ├─ event.js
   │  │  └─ user.js
   │  ├─ models
   │  │  ├─ event.js
   │  │  └─ user.js
   │  └─ routes
   │     ├─ event.js
   │     └─ user.js
   ├─ config
   │  ├─ db.js
   │  └─ jwt.js
   ├─ middlewares
   │  ├─ auth.js
   │  └─ files.js
   └─ utils
      └─ deleteFile.js
```

## API Reference

### EndPoints users

|        Name         | Method |    Endpoint    |  Middlewares   |                                  Body                                   |    Content-type     |    Response     |
| :-----------------: | :----: | :------------: | :------------: | :---------------------------------------------------------------------: | :-----------------: | :-------------: |
|     Create user     |  POST  | /user/register |     upload     | { **username**, **password**, **img**, **name**, **surname**, **mail**} | multipart/form-data |    { user }     |
|     Login user      |  POST  |  /user/login   |     -----      |                                  -----                                  |        -----        | { user, token } |
|      Get users      |  GET   |     /user/     |    isAdmin     |                                  -----                                  |        -----        |    [ users ]    |
|     Get my user     |  GET   |    /user/me    |     isAuth     |                                  -----                                  |        -----        |    { user }     |
|  Update user info   |  PUT   | /user/:userId  | isAdmin,upload | { **username**, **password**, **img**, **name**, **surname**, **mail**} | multipart/form-data |    { user }     |
| Update my user info |  PUT   |     /user/     | isAuth,upload  | { **username**, **password**, **img**, **name**, **surname**, **mail**} | multipart/form-data |    { user }     |
|     Delete user     | DELETE | /user/:userId  |    isAdmin     |                                  -----                                  |        -----        |    { user }     |
|   Delete my user    | DELETE |     /user/     |     isAuth     |                                  -----                                  |        -----        |    { user }     |

### EndPoints events

|         Name          | Method |       Endpoint       |  Middlewares   |                                      Body                                       |    Content-type     |  Response  |
| :-------------------: | :----: | :------------------: | :------------: | :-----------------------------------------------------------------------------: | :-----------------: | :--------: |
|     Create event      |  POST  |    /event/create     | isAuth, upload | { **title**, **img**, **date**, **ubication**, **description**, **assistants**} | multipart/form-data | { event }  |
|      Get events       |  GET   |       /event/        |     -----      |                                      -----                                      |        :---:        | [ events ] |
|   Get events by id    |  GET   |   /event/:eventId    |     isAuth     |                                      -----                                      |        :---:        | { event }  |
| Get events order near |  GET   |     /event/near      |     -----      |                                      -----                                      |        :---:        | [ events ] |
|   Update event info   |  PUT   |   /event/:eventId    | isAuth, upload | { **title**, **img**, **date**, **ubication**, **description**, **assistants**} | multipart/form-data | { event }  |
| Add/Remove assistant  |  PUT   | /event/join/:eventId |     isAuth     |                                      -----                                      |        :---:        | { event }  |
|     Delete event      | DELETE |   /event/:eventId    |     isAuth     |                                      -----                                      |        :---:        | { event }  |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL` = With the URL of your database in MongoDB.
`JWT_SIGN` = Key to be able to sign tokens

To configure clodinary you need:

`CLOUDINARY_API_KEY` = Key to your cloudinary
`CLOUDINARY_API_SECRET` = Secret key to your cloudinary
`CLOUDINARY_CLOUD_NAME` = Name of your cloudinary

## Dependencies

- Node.js
- Express
- Dotenv
- Mongoose
- Cloudinary
- Multer
- Multer-storage-cloudinary
- JsonWebToken
- Cors

### Dev-Dependencies

- Nodemon

## Authors

- [@jesuseliasalba](https://www.github.com/jesuseliasalba)
