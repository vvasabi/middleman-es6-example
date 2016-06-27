(function(global) {
  global.define = function(moduleId, importIds, body) {
    var resolveRelativeModuleId = function(targetId) {
      var targetParts = targetId.split(/\//),
        basename = targetParts.pop();
      if ((targetParts.length == 0) || (targetParts[0] != '.' && targetParts[0] != '..')) {
        return targetId;
      }
      if (targetParts[0] == '.') {
        targetParts.shift();
      }

      var fromParts = moduleId.split(/\//);
      fromParts.pop();
      while (targetParts.length > 0 && targetParts[0] == '..') {
        targetParts.shift();
        if (fromParts.length > 0) {
          fromParts.pop();
        }
      }
      var parts = fromParts.concat(targetParts);
      return (parts.length == 0) ? basename : parts.join('/') + '/' + basename;
    };
    var toVariableName = function(moduleId) {
      return '$__' + encodeURIComponent(moduleId.replace(/^\.\//, ''))
          .replace(/%|-/, '') + '__';
    };

    importIds.shift();
    var exports = {},
      imports = [exports],
      module = {exports: null};
    for (var i = 0; i < importIds.length; i++) {
      if (importIds[i] == 'module') {
        imports.push(module);
        continue;
      }

      var varName = toVariableName(resolveRelativeModuleId(importIds[i]));
      imports.push(global[varName]);
    }
    body.apply(global, imports);
    if (module.exports != null) {
      exports = module.exports;
    }
    global[toVariableName(moduleId)] = exports;
  };
})(this);
