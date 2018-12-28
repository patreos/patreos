import { ACCOUNT_ACTIONS, DEBUG_ACTIONS, PATREOS_ACTIONS, RECURRINGPAY_ACTIONS } from '../constants/action_types';
import fs from 'fs';
import util from 'util';


function generate(importedActionString, importedAction) {
  var fileBuffer = '';

  fileBuffer += "// THIS IS GENERATED BY generate_reducers.mjs.  DO NOT MAKE CHANGES.\n\n";
  fileBuffer += util.format("import { %s } from '../constants/action_types'\n\n", importedActionString);
  fileBuffer += "export default (\n";
  fileBuffer += "  state = {\n";


  Object.keys(importedAction).forEach(function(key) {
    var keySnake = importedAction[key];
    var keyCamelCaseFunction = keySnake.toLowerCase();
    keyCamelCaseFunction = keyCamelCaseFunction.replace(/_\w/g, (m) => m[1].toUpperCase())
    var keyCamelCaseVar = keySnake.replace('UPDATE_', '').toLowerCase();
    keyCamelCaseVar = keyCamelCaseVar.replace(/_\w/g, (m) => m[1].toUpperCase())

    var value = "undefined";
    switch(keySnake.slice(-4)) {
      case '_STR':
        value = "''";
        break;
      case '_AMT':
        value = "'0.0000'";
        break;
      case '_NUM':
        value = "0";
        break;
      case '_ARR':
        value = "[]";
        break;
      case '_OBJ':
        value = "{}";
        break;
      default:
        value = "undefined";
    }

    fileBuffer += util.format("    %s: %s,\n", keyCamelCaseVar, value);
  });

  fileBuffer += "  }, action) => {\n";
  fileBuffer += "  switch (action.type) {\n";

  Object.keys(importedAction).forEach(function(key) {
    var keySnake = importedAction[key];
    var keyCamelCaseFunction = keySnake.toLowerCase();
    keyCamelCaseFunction = keyCamelCaseFunction.replace(/_\w/g, (m) => m[1].toUpperCase())
    var keyCamelCaseVar = keySnake.replace('UPDATE_', '').toLowerCase();
    keyCamelCaseVar = keyCamelCaseVar.replace(/_\w/g, (m) => m[1].toUpperCase())

    fileBuffer += util.format("  case %s.%s:\n", importedActionString, keySnake);
    fileBuffer += util.format("    return { ...state, %s: action.data };\n", keyCamelCaseVar);

  });

  fileBuffer += "  default:\n";
  fileBuffer += "    return state;\n";
  fileBuffer += "  }\n";
  fileBuffer += "};\n";

  var currentPath = process.cwd();
  var fileName = importedActionString.replace('_ACTIONS', '').toLowerCase();
  fs.writeFile(util.format('%s/reducers/%s.js', currentPath, fileName), fileBuffer, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("File saved to %s/reducers/%s.js", currentPath, fileName);
  });

}

generate('ACCOUNT_ACTIONS', ACCOUNT_ACTIONS);
generate('DEBUG_ACTIONS', DEBUG_ACTIONS);
generate('PATREOS_ACTIONS', PATREOS_ACTIONS);
generate('RECURRINGPAY_ACTIONS', RECURRINGPAY_ACTIONS);
