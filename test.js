transform: function(content) {
          const stringToMatch = '{{stringToMatch}}';
          const contentToAdd = '{{contentToAdd}}';
          const index = content.indexOf(stringToMatch);
          if (index === -1) {
            throw new Error(`String "${stringToMatch}" not found in file`);
          }
          return content.slice(0, index + stringToMatch.length) +
            '\n' + contentToAdd +
            '\n' + content.slice(index + stringToMatch.length);
        }
