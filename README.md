# DenoKV

Check this written tutorial [deno-docs](https://deno.com/blog/build-crud-api-oak-denokv)

Or

Watch this video [yt-video](https://youtu.be/XaZTGGnP6EU)

## Run the following code

> [!NOTE]
> This is the server

```bash
deno task dev
```

## Testing API

> [!NOTE]
> While running the server run command in another terminal tab

```bash
curl -X POST http://localhost:8000/users -H "Content-Type: application/json" -d '{ "id": 202008397, "name": "Nicolas Plaza", "email": "niplinig@espol.edu.ec" }'
```

## See the results

Watch the results in the WebViewer