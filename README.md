# Middleman ES6 Demo

This project shows how you can use ES6 in a Middleman 4 project.

## Gotchas

* I wrote `babel-inline-module-loader.js` myself, and it is a lightweight *imitation* of an AMD-style module loader. It
  only tries to make Babel modules work when compiled as AMD modules; it does not try to be or replace a real AMD module
  loader, such as Require.JS. In addition, my module loader will not likely work for AMD modules not produced by Babel.
  If you use Require.JS already, then you don’t need and should’t use my hack.
* Sprocket require directives work, but scripts need to be included in the correct order, or there will be cryptic
  errors. For example, if class Child extends class Parent, then Parent needs to be loaded first, or Child won’t be able
  to find Parent. Likewise, if module App imports from module Utility, then Utility needs to be loaded first.
* This demo uses the `sprockets-es6` gem, which uses Babel 5. Therefore, Babel 6 features are not available.

## Configurations

You can tweak the `::Sprockets::ES6.configure` block to configure Babel’s behaviours. For example, to enable ES7
decorators, you can do:

```
::Sprockets::ES6.configure do |config|
  config.marshal_load({
    modules: 'amd',
    moduleIds: true,
    stage: 1
  })
end
```
