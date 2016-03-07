var dropNormalizer = {
  isAboutUrl: function (dataTransfer) {
    var types = dataTransfer.types;
    for (var i = 0; i<types.length; i++) {
      if (types[i].match(/uri-list/)) {
        return true;
      }
    }
    return false;
  },
  isAboutFile: function (dataTransfer) {
    var types = dataTransfer.types;
    return types[0] && types[0]==='Files';
  },
  normalize: function (dataTransfer) {
    var res;

    if (dropNormalizer.isAboutFile(dataTransfer)) {
      dataTransfer.files.forEach(function (f) {
        res = [{
          type: 'file',
          data: f
        }];
      })
    } else if(dropNormalizer.isAboutUrl(dataTransfer)) {
      res = [{
        type: 'text/uri-list',
        data: dataTransfer.getData('Text')
      }];
    } else {
      res = [{
        type: 'text/plain',
        data: dataTransfer.getData('Text')
      }];
    }

    return res;
  }
};

module.exports = dropNormalizer;
