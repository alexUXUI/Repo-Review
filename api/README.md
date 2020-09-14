# Github Search V3 proxy 

#### Up and Running:


**1) Node**
```shell
$ npm i && npm run build:dev && npm serve`
```
--- 

#### API:

**1)```GET /```**

example:
```shell
curl http://localhost:8080/
```

🟢 200 Response: 
```json
{ 
    "message": "Welcome to github search API app" 
}
```

**2) `GET /search/github/repos/:query`**

example:
```shell
curl http://localhost:8080/search/github/repos/query
```
> replace "query" with your search term

🟢 200 Response: 
```json
{
    "message": {
        "status": 200,
        "server": "GitHub.com",
        "data": {
            "total_count": 100713,
            "items": [
                {
                    "name": "rustlings",
                    "description": "🦀 Small exercises...",
                    "stars": 11581,
                    "language": "Rust",
                    "score": 1,
                    "owner": "rust-lang"
                }
            ]
        }
    }
}
```

🔴 500 response:
```json
{
    "message": "Could not fetch github repos",
    "error": "Error",
}
```
Requests to this endpoint return up to 100 github repos and are cached to improve performance and to short-circuit the github API when possible.  

---

#### Testing:

Tests are in the `src/test` folder. The tests have their own instance of the applicaiton and redis DB, allowing the developer to 
run the application and the tests at the same time, ensuring that the tests are not pointing to the applicaiton DB.

test server port: `3001`
test redis port: `6380`

Run this command from the root of the directory to run the tests:
```shell
$ npm run test
```

---

#### ENVs:

Only a development environment is supported at the moment. 

There is a `.env` in the root of the directory with the folloiwng envs:

```toml
APP_ENV=dev
PORT=3000
DEV_PORT=3000
DEV_TEST_PORT=3001
REDIS_URL=<Insert your own or ask repo owner>
DEV_REDIS_URL=redis://127.0.0.1:6379
GITHUB_APP_TOKEN=<Insert your own or ask repo owner>
```

These envs are needed to run the applicaiton in dev mode as well
as run the tests for the development env.

---

#### Code Quality:

```shell
$ npm run lint
```
