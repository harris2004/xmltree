/* ==============
The MIT License (MIT)

Copyright (c) 2011-2013 Mitya <mitya@mitya.co.uk>
Copyright (c) 2013 Oliver Kopp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

| @author: Mitya <mitya@mitya.co.uk>
| Updated by Harris2004 http://github.com/harris2004/xmltree
| @Docs & demo: http://www.mitya.co.uk/scripts/XML-Tree---visualise-and-traverse-your-XML-186
|
| github page: http://www.github.com/koppor/xmltree
============== */

// AMD and non-AMD compatibility inspired by http://tkareine.org/blog/2012/08/11/why-javascript-needs-module-definitions/ and https://github.com/blueimp/jQuery-File-Upload/blob/9.5.0/js/jquery.fileupload.js


"use strict";

function XMLTree(input) {
    //ensure was instantiated, not merely called

    if (!(this instanceof XMLTree)) {
      if (window.console && console.log) console.log("XMLTree was called but not instantiated");
      return;
    }

    //validate some params
    var error;
  
if(!input) {
   error = "No Input found";   
}
    if (error) {
      console.log('XMLTree error - ' + error);
      return;
    }

    //some vars

    this.rand = Math.floor(Math.random() * 10000000);
    //load file

   if (typeof input.xml == 'string') {
	   
      //rename tags
      var xml = input.xml.replace(/<\?xml[^>]+>\s*/, '');
      var parse = this.actOnXML(xml);
      return parse;

    } else {
        console.log('Input is not in string format');
    }
 }
  //parse XML
XMLTree.prototype.parseXML = function(XMLStr) {

  if (window.DOMParser) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(XMLStr, "text/xml");
  } else {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(XMLStr);
  }
  return xmlDoc;
}

XMLTree.prototype.actOnXML = function(xml) {

  //establish XML (parsing as required) as a jQuery object
  this.xml = this.parseXML(xml);
  var childnodes = this.xml.children;
  //start delving. Since JS seems to add another, outer root element, our (real) root it is child			


  if (childnodes)
    var map = this.delve(childnodes, 0);

  return map;

}

XMLTree.prototype.recurchild = function(kids) {

  var childarray = [];
  childarray['elems'] = [];

  for (var s = 0; s < kids.length; s++) {

    countchildren = kids[s].children;

    if (countchildren.length == 0) {

      ///reached the bottom node

    } else {

      for (var z = 0; z < countchildren.length; z++) {

      }

    }



  }

  return childarray;

}

XMLTree.prototype.delve = function(node, curindex) {

  var curnode = {};
  curnode["@attr"] = [];
  curnode['children'] = [];
  curnode["data"] = [];
  curnode["TagName"] = '';
  curnode["Tagvalue"] = '';
  curnode["CurIndex"] = curindex;
  var attrvalue;
  var attrname;
  ////edit this 
 
  //what's this node's tag name?
  var tagName = node[0].tagName.replace(new RegExp('_' + this.rand + '$', 'i'), '');
  curnode["TagName"] = tagName;

  //attributes...
  var attrs = node[0].attributes;

  if (attrs.length > 0) {
    for (var i = 0; i < attrs.length; i++) {
      attrvalue = attrs[i].value;
      attrname = attrs[i].name;
      curnode["@attr"].push({
        "name": attrname,
        "value": attrvalue
      });
    }
  }

  var kids = node[0].children;

  if (kids.length > 0) {
    curnode["haschildren"] = kids.length;
    for (var i = 0; i < kids.length; i++) {
      var chilofchild = this.delve([kids[i]], curindex + '.' + i);
      curnode['children'].push(chilofchild);
    }
  } else {
    curnode["haschildren"] = 0;
    curnode["Tagvalue"] = node[0].innerHTML;
  }

  return curnode;

}
