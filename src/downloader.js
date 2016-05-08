'use strict';

/**
 * A small utility for downloading files.
 */

// Dependencies
var exec = require('child_process').exec,
    debug = require('debug')('openframe:downloader'),
    artworkDir = '/tmp',
    wget = require('wget-improved');

// unused at present
function _mkdirp(dir) {
    var mkdir = 'mkdir -p ' + dir;
    exec(mkdir, function(err) {
        if (err) {
            throw err;
        }
    });
}

/**
 * Download a file using HTTP get.
 *
 * @param  {String}   file_url
 * @param  {String}   file_output_name
 */
function downloadFile(file_url, file_output_name, cb) {
    return new Promise(function(resolve, reject) {
        var file_name = file_output_name,
            file_path = artworkDir + '/' + file_name;

        var download = wget.download(file_url, file_path, options);
        download.on('error', function(err) {
            reject(err);
        });
        // download.on('start', function(fileSize) {
        //     console.log(fileSize);
        // });
        download.on('end', function(output) {
            resolve(output);
        });
        download.on('progress', function(progress) {
            debug('downloaded %progress', progress);
        });
    });

}

exports.downloadFile = downloadFile;
