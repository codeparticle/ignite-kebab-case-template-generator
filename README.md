# ignite-kebab-case-template-generator #

> It generates templates based on a kebab case file system structure

[![NPM](https://img.shields.io/npm/v/ignite-kebab-case-template-generator.svg)](https://www.npmjs.com/package/ignite-kebab-case-template-generator)

Was created using [Ignite CLI](https://github.com/infinitered/ignite/blob/master/docs/advanced-guides/creating-generators.md)

## Install

```bash
npm install --save ignite-kebab-case-template-generator
```

## Usage
In your ignite.json file add generators
```json
{
  "generators": {
    "component": "ignite-kebab-case-template-generator",
    "container": "ignite-kebab-case-template-generator",
    "redux": "ignite-kebab-case-template-generator",
    "saga": "ignite-kebab-case-template-generator"
  },
}
```

## Generators
run `yarn global add ignite-cli` before using generators

### Containers
- `ignite g container New` - Will create a New class component in src/containers/new.
- `ignite g container New --nav` - Will create a New class component and insert it in the nav router

### Components
- `ignite g component New` - Will create a New class component and insert it in src/components/new
- `ignite g component New --func` - Will create a New function component and insert it in src/components/new

### Redux, Sagas
- `ignite g redux New` - Will generate and link the redux for New in srs/rdx.
- `ignite g saga New` - Will generate and link the saga for New in srs/saga.

## License

Copyright 2019 Code Particle Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
