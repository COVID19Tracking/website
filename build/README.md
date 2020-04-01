External resources are listed in array within datasources/index.js

Resource definitions have these fields
- `fetch` function that returns a promise optional. Not used if `app` and `url` are defined.
- `app` string that defines how to fetch and parse resource
- `url` url of item to fetch
- `fixItems` function that converts parsed data
- `path` string that defines the path where the file should be saved. Omit file extensions.
- `createPages` function alternative that allows creating many pages. Should return an array of `{ path, value }`

`npm run build`

You'll need to add a Google API key to your env vars as `GOOGLE_API_KEY`.

There is a general flow of `fetch` -> `parseResponse` -> `fixItems` -> `save`.

- `fetch` makes an API request to load data from a resource.
- `parseResponse` will convert strings (XML, YAML) to native json objects.
- `fixItems` will modify the data.
- `save` will serialize and save the various files in the various formats.
