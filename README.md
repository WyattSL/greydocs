## GreyDocs
Unoffical documentation for various aspects of GreyHack, including the scripting API.\
Pull requests are welcome.

[Scripting API](https://wyattsl.github.io/greydocs/api) \
[Default Ports](https://wyattsl.github.io/greydocs/ref/ports)

## TypeScript definitions
Type declarations for the scripting API are generated into `/types/greyscript.d.ts` from the JSON files in `/_data`.

To regenerate:
```sh
python generate_types.py
```
