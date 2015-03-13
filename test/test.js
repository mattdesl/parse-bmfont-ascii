var fs = require('fs')
var path = require('path')
var test = require('tape')

var parse = require('../')
var ExpectedNexa = require('./NexaLight32.json')
var ExpectedGlyphite = require('./Glyphite.json')

test('should parse fnt as object', function(t) {
  t.plan(5)
  var file = path.join(__dirname, 'NexaLight32.fnt')
  fs.readFile(file, function(err, data) {
    if (err)
      t.fail(err)

    var result = parse(data)
    t.deepEqual(result, ExpectedNexa, 'should handle Buffer')
    t.deepEqual(parse(data.toString('utf8')), ExpectedNexa, 'should handle string')
    t.equal(result.info.face, 'Nexa Light', 'face parsed')
    t.equal(result.chars.length, 96, 'chars parsed')
    t.equal(result.kernings.length, 487, 'kernings parsed')  
  })
})

test('should handle multipage fonts correctly', function(t) {
  t.plan(4)
  var file = path.join(__dirname, 'NexaLight32Multi.fnt')
  fs.readFile(file, function(err, data) {
    if (err)
      t.fail(err)

    var result = parse(data)
    t.equal(result.info.face, 'Nexa Light', 'face parsed')
    t.equal(result.chars.length, 96, 'chars parsed')
    t.equal(result.kernings.length, 487, 'kernings parsed')  
    t.deepEqual(result.pages, [ 'sheet_0.png', 'sheet_1.png' ], 'parses pages')  
  })
})

test('should handle tab chars from Glyphite', function(t) {
  t.plan(1)
  var file = path.join(__dirname, 'Glyphite.fnt')
  fs.readFile(file, function(err, data) {
    if (err)
      t.fail(err)

    var result = parse(data)
    t.deepEqual(result, ExpectedGlyphite, 'parses tab and Glyphite output')
  })
})