# API Testing

In the `build-test.js` script there are a number of API tests. Most are basic right now and there are plans to expand them. If you have difficulty getting these tests to pass see troubleshooting below.

## Build Process

During the build process -- see package.json `build` step -- the files used to build the API are downloaded and processed before being copied over to the API directory (`./public/api/v1/`). This fetching and processing step is done before tests are run -- see `build:test`. 

## Troubleshooting 

Since many will not have the required permissions to pull down the required files during `build:fetch`, the local API tests will fail. If the tests fail, try the following commands in your shell:

```bash session
> cd {COVID_TRACKING_ROOT}
> mkdir -p ./public/api/v1/states
> curl https://covidtracking.com/api/v1/states/daily.json -o ./public/api/v1/states/daily.json
```

Ensure that there is a `daily.json` file inside the path `./public/api/v1/states/`.
