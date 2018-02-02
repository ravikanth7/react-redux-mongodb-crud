'use strict';

import * as log4js from 'log4js';

function logger() {
  var logDir = process.env.NODE_LOG_DIR !== undefined ? process.env.NODE_LOG_DIR : __dirname +'/../../log/';

  var config = {
    "appenders": [
      {
        "type": "file",
        "filename": logDir + "/" + "application.log",
        "pattern": "-yyyy-MM-dd",
        "layout": {
          "type": "pattern",
          "pattern": "%d (PID: %x{pid}) [%p] [%c] - %m",
          "tokens": {
            "pid" : function() { return process.pid; }
          }
        }
      }
    ]
  };

  log4js.configure(config, {});

  return {
    getLogger: function(category) {
      return log4js.getLogger(category);
    }
  };
}

module.exports = logger;