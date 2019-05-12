const { isObjectExpression, isObjectProperty } = require('@babel/types');
const recast = require('recast');
const parseDocblock = require('vue-docgen-api/dist/utils/getDocblock').parseDocblock;
const getDoclets = require('vue-docgen-api/dist/utils/getDoclets').default;

module.exports = (documentation, path, a) => {
  // console.log(
  //   path.get('properties')
  //   .filter(p => isObjectProperty(p.node) && p.node.key.name === 'methods')
  // );
  recast.visit(path.node, {
    visitComment(pathExpression) {
      const comment = pathExpression.node.comments.filter(
        ({ type }) => type === 'CommentBlock'
      )[0];

      if (!comment) return false;

      const docblock = parseDocblock(comment.value);
      const doclets = getDoclets(docblock || '');
      const syscallDoc = doclets.tags.find(
        ({ title }) => title === 'syscall'
      );

      if (!syscallDoc) return false;

      documentation.syscallsMap = documentation.syscallsMap || {};

      const syscallsMap = documentation.syscallsMap;
      const syscallName = syscallDoc.content;
      const syscallTags = doclets.tags.reduce(
        (acc, tag) => Object.assign(acc, { [tag.title]: [tag] }),
        {}
      );

      syscallsMap[syscallName] = {
        description: doclets.description,
        tags: syscallTags
      };

      const toObject = documentation.toObject.bind(documentation);

      documentation.toObject = function() {
        const documentationObj = toObject();

        documentationObj.syscalls = this.syscallsMap;

        return documentationObj;
      };

      return false;
    }
  });
};
