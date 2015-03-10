var fs = require('fs')
var path = require('path')
var test = require('tape')

var parse = require('../')
var expected = require('./Test.json')

test('should parse fnt as object', function(t) {
  t.plan(5)
  var file = path.join(__dirname, 'Nexa Light-32.fnt')
  fs.readFile(file, function(err, data) {
    if (err)
      t.fail(err)

    var result = parse(data)
    t.deepEqual(result, expected, 'should handle Buffer')
    t.deepEqual(parse(data.toString('utf8')), expected, 'should handle string')
    t.equal(result.info.face, 'Nexa Light', 'face parsed')
    t.equal(result.chars.length, 96, 'chars parsed')
    t.equal(result.kernings.length, 487, 'kernings parsed')  
  })
})

test('should handle multipage fonts correctly', function(t) {
  t.plan(4)
  var file = path.join(__dirname, 'Nexa Light-32-Multi.fnt')
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