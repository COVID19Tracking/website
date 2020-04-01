`npm run build`

You'll need to add a Google API key to your env vars as `GOOGLE_API_KEY`.

There is a general flow of `fetch` -> `parseResponse` -> `fixItems` -> `save`.

- `fetch` makes an API request to load data from a resource.
- `parseResponse` will convert strings (XML, YAML) to native json objects.
- `fixItems` will modify the data.
- `save` will serialize and save the various files in the various formats.
