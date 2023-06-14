# Deno Icon File Server

This is a simple file server written in TypeScript, powered by Deno, which provides access to SVG assets contained within a static directory.

## Installation

You must have Deno installed to run this project. See [their official docs for up-to-date instructions on setting up Deno](https://deno.com/manual@v1.34.2/getting_started/installation).

To install Deno on macOS and Linux, run:

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

## Usage

### Compiling an Executable

To compile the server into a self-contained executable file, run:

```bash
deno task compile
```

Then, you can run the compiled program from the `dist` folder.

### Launching the development server

To start this server directly with hot-reloading once cloned, simply run:

```bash
deno task dev
```

## Tips

I recommend you optimize SVGs with SVG Optimizer (CLI) or [SVGOMG](https://jakearchibald.github.io/svgomg/) (GUI).

## License

This project is not affiliated with Deno (the company/project/group).

Assets:

[Deer/Stag Icon](https://freesvg.org/stag-logo-vector-clip-art)

Project Code:

[MIT](https://choosealicense.com/licenses/mit/)
