const { isObjectExpression, isObjectProperty } = require('@babel/types');
const recast = require('recast');
const transformTagsIntoObject = require('vue-docgen-api/dist/utils/transformTagsIntoObject').default;
const doctrine = require('doctrine');


module.exports = (documentation, path, a) => {
  recast.visit(path.node, {
    visitComment(pathExpression) {
      const comment = pathExpression.node.comments.find(
        ({ type }) => type === 'CommentBlock'
      );

      if (!comment) return false;

      const doclets = doctrine.parse(comment.value, {
        unwrap: true,
        recoverable: true,
      });
      const syscallDoc = doclets.tags.find(
        ({ title }) => title === 'syscall'
      );

      if (!syscallDoc) return false;

      documentation.syscallsMap = documentation.syscallsMap || {};

      const syscallsMap = documentation.syscallsMap;
      const syscallName = syscallDoc.description;
      const syscallTags = transformTagsIntoObject(doclets.tags);

      syscallsMap[syscallName] = {
        description: doclets.description,
        tags: syscallTags,
        params: doclets.tags.filter(tag => tag.title === 'param'),
        returns: syscallTags.returns && syscallTags.returns[0]
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
