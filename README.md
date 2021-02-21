# ForShop 購物網站 BackEnd
![logo](https://github.com/Austindrum/forshop_backend/blob/master/logo.jpg)  
ForShop_BackNode 使用 Node.js + Express + MySQL 建立之購物網站後端專案，部署於 Heroku，以 RESTFul API 提供資料互動需求，搭配 [ForShop_FrontEnd](https://github.com/Austindrum/forshop_frontend) 達成前後端分離購物網站。

## 使用技術

- 利用 [Node.js](https://nodejs.org/en/) [Express](https://expressjs.com/zh-tw/) 框架製作。
- 利用 [Sequelize](https://sequelize.org/) ORM 實作資料庫串接、Model 建立、Seed 種子資料製作、Migrations 簡化資料庫操作。
- 利用 [Imgur](https://imgur.com/) API，實作上傳圖片功能
- 利用 [JWT](https://jwt.io/) 實作跨域認證
- 利用 [bcrypt](https://www.npmjs.com/package/bcrypt) 處理使用者密碼
- 利用 [cors](https://www.npmjs.com/package/cors) 實作前後端分離跨域 session，訪客不需要登入即可完成購物


## API 格式範例

- [所有商品](https://murmuring-headland-35646.herokuapp.com/products)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
