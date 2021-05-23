# Noodoe Work Api Project

- Please use any kind of backend package (node.js is particularly good) to create a backend service and meet the following requirements
    - Every hour, grab the real-time weather information of Taipei City,
      New Taipei City, and Taoyuan City from the open data platform of the Central Meteorological Bureau,
      and save it to the DB
        - https://opendata.cwb.gov.tw/index
    - Provide a API, so that legitimate users can query these three cities weather information, 
      the weather information is read directly from the DB.
    - A legal user is currently defined as a user who has an API key.

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A database of [MongoDB](https://www.mongodb.com/). 
  You may also use [MongoAtlas](https://www.mongodb.com/cloud/atlas) service.

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/cesnow/noodoe-work NoodoeWork
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./NoodoeWork
npm install
```

Once the dependencies are installed, you can configure MongoDB environment by editing the "mongoose.provider.ts" file.

```
vim ./src/database/mongoose.provider.ts
```

```typescript
const MONGODB_USERNAME: string = '[your mongodb username]';
const MONGODB_PASSWORD: string = '[your mongodb password]';
const MONGODB_CONNECTION_URI: string = '[your mongodb connection uri with database name]';
// mongo uri like mongodb+srv://liquid.t0knb.mongodb.net/noodoe-work
```

### 1.3 Launch and discover

You are now ready to launch the Noodoe-Work application using the command below.

```sh
npm run start
```

After the server starts, you may see a similar message.
```shell
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [NestFactory] Starting Nest application...
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] MongooseModule dependencies initialized +17ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] DatabaseModule dependencies initialized +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] DiscoveryModule dependencies initialized +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] AppModule dependencies initialized +1ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] ScheduleModule dependencies initialized +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] MongooseCoreModule dependencies initialized +311ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] MongooseModule dependencies initialized +8ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] MongooseModelsModule dependencies initialized +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] UserApikeyModule dependencies initialized +1ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [InstanceLoader] WeatherTransactionModule dependencies initialized +1ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RoutesResolver] AppHealthController {/health}: +11ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RouterExplorer] Mapped {/health/readiness, GET} route +2ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RouterExplorer] Mapped {/health/ping, GET} route +1ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RoutesResolver] WeatherTransactionController {/weather}: +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RouterExplorer] Mapped {/weather/manual-refresh, GET} route +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RouterExplorer] Mapped {/weather/info, GET} route +1ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RoutesResolver] UserApikeyController {/user}: +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RouterExplorer] Mapped {/user/gen-apikey, GET} route +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [UserAuthKeyModule] Module Init +4ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [RemoteTransaction] Module Init +0ms
[Nest] 32306   - 05/24/2021, 2:36:12 AM   [NestApplication] Nest application successfully started +5ms
```

You can now head to `http://localhost:8080/` and refer api below. 

- Generate user apikey `http://localhost:8080/user/gen-apikey`
    - Response: ```{"apikey":"ea80afef-e9af-41f1-8af0-ae217b4ea534","new":true}```
- Get weather info with apikey `http://localhost:8080/weather/info?apikey={user-apikey}`
    - eg: `http://localhost:8080/weather/info?apikey=ea80afef-e9af-41f1-8af0-ae217b4ea534`
    - Response ``` {"count":60,"data":[{"stationId":"C0A560","time":"2021-05-23T19:00:00.000Z","lat":"24.778333","locationName":"福山","lon":"121.494583","parameter":{"CITY":"新北市","CITY_SN":"06","TOWN":"烏來區","TOWN_SN":"061"},"weatherElement":{"ELEV":"405.0","WDIR":"0","WDSD":"0.0","TEMP":"20.9","HUMD":"1","PRES":"965.0","H_24R":"0.0","H_FX":"-99","H_XD":"-99","H_FXT":"-99","D_TX":"22.20","D_TXT":"2021-05-24T00:10:00+08:00","D_TN":"20.90","D_TNT":"2021-05-24T03:00:00+08:00"}}, .........```
- Manual refresh weather open data `http://localhost:8080/weather/manual-refresh`
    - Response ```{"updateResult":60}``` (updated result count from open data)

### 1.3 Testing

You are now ready to testing the Noodoe-Work application using the command below.

```sh
# testing *.spec.ts files
npm run test

PASS  src/weather-transaction/weather-transaction.module.spec.ts
PASS  src/user-apikey/user-apikey.module.spec.ts

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.263 s, estimated 4 s
Ran all test suites.
```

```sh
# testing coverage
npm run test:cov

PASS  src/weather-transaction/weather-transaction.module.spec.ts
PASS  src/user-apikey/user-apikey.module.spec.ts
------------------------------------|---------|----------|---------|---------|-------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |   66.18 |        0 |   34.62 |   63.33 |
 database                           |   90.91 |      100 |      50 |   88.89 |
  database.module.ts                |    87.5 |      100 |      50 |   83.33 | 18
  mongoose.provider.ts              |     100 |      100 |     100 |     100 |
 models                             |     100 |      100 |     100 |     100 |
  mongoose.models.module.ts         |     100 |      100 |     100 |     100 |
 models/user                        |   66.67 |        0 |   33.33 |   63.16 |
  apikey.schema.ts                  |     100 |      100 |     100 |     100 |
  apikey.service.ts                 |   56.25 |        0 |   33.33 |      50 | 17-32
 models/weather                     |   48.39 |        0 |   14.29 |   48.15 |
  weather.schema.ts                 |     100 |      100 |     100 |     100 |
  weather.service.ts                |      36 |        0 |   14.29 |   33.33 | 18-48
 user-apikey                        |     100 |      100 |     100 |     100 |
  user-apikey.controller.ts         |     100 |      100 |     100 |     100 |
 weather-transaction                |   59.26 |        0 |   33.33 |      56 |
  weather-transaction.controller.ts |   73.33 |        0 |      60 |   71.43 | 19,42-49
  weather-transaction.service.ts    |   41.67 |      100 |   14.29 |   36.36 | 25-58
------------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.925 s, estimated 3 s
Ran all test suites.
```
