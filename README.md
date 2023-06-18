
[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Requirements 
  Mongodb 4.6

## Running the app

```bash
# run sample docker-compose
services:
  mongo:
    container_name: mongo
    image: mongo:4.4.6
    network_mode: "host"
    ports:
      - 27017:21017
    restart: always

  backend:
    container_name: backend
    image: aliabdi709/honey-backend:0.0.1
    network_mode: "host"
    env_file: .env
    ports:
      - 3000:3000
    restart: always

```

## env file value

```bash
  # admin jwt secret example
  ADMIN_JWT_SECRET=4dBnSKvg7xPi76piJp9Bq2cTbJKLhLg7J

  # user jwt secret example
  USER_JWT_SECRET=UxP6piJJhshh

  # jwt secret example
  JWT_SECRET=UxPi7@J7ohoM

  # admin token expire time example
  ADMIN_TOKEN_EXPIRE_TIME=365d

  # user token expire time example
  USER_TOKEN_EXPIRE_TIME=36d

  # link transaction site for payment
  CREATE_TRANSACTION_URL=https://example.com

  # if x sandbax is 1, all transaction is test.
  X_SANDBOX=1

  # api key for create transaction
  X_API_KEY=your api key(example xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx)

  # callback your sit for verify payment
  TRANSACTION_CALLBACK=http://serverAddress/xxxxx/xxxx

  # verify payment 
  VERIFY_PAYMENT_URL=https://api.idpay.ir/v1.1/payment/verify

  # if transaction is success user redirect below address
  VERIFY_ORDER_FRONT_URL=http://frontAddress/profile/orders/current

  # if transaction verify is faild user redirect below address
  FAILD_VERIFY_DB_FRONT_URL=http://frontAddress/profile/orders/canceled

  # if transaction is faild user redirect below address
  FAILD_PAYMENT_FRONT_URL=http://localhost:5173/profile/orders/canceled

  # mongodb connection config
  DATABASE_URL=mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
```
