'use strict';

/**
 * @ngdoc function
 * @name loader
 * @description
 * # Loader
 * Loader for apps
 */
 
 var requireFromFile;
 
 (function(){
 
	function getAllElementsWithAttribute(attribute)
	{
	  var matchingElements = [];
	  var allElements = document.getElementsByTagName('*');
	  for (var i = 0, n = allElements.length; i < n; i++)
	  {
		if (allElements[i].getAttribute(attribute))
		{
		  // Element exists with attribute. Add to array.
		  matchingElements.push(allElements[i]);
		}
	  }
	  return matchingElements;
	}
	
	function loadJson(file, callback)
	{
		var xmlhttp;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else{// code for IE6, IE5
			xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState===4 && xmlhttp.status===200){
				callback(JSON.parse(xmlhttp.responseText));
			}
		}
		xmlhttp.open('GET',file,true);
		xmlhttp.send();
	}
	
	var loader = function(){
		this.count = 0;
	};
	
	loader.prototype.loadDeps = function(deps, loaded, callback){
		var that = this;
		this.count += deps.length;
		for(var i in deps){
			require(deps[i].files, function(){
				that.count--;
				if(deps[i].names){
					for(var j in deps[i].names){
						loaded[deps[i].names] = arguments[j];
					}
				}
				if(deps[i].deps){
					that.loadDeps(deps[i].deps, loaded, callback);
				}
				if(that.count == 0){
					callback();
				}
			});
		}
		if(this.count == 0){
			callback();
		}
	}
	
	var loadedFiles ={};
	
	requireFromFile = function(file, callback){
		var loaded = {};
		if(!loadedFiles[file]){
			loadJson(file + ".deps.json", function(deps){
				(new loader()).loadDeps(deps, loaded, function(){
					loadedFiles[file] = loaded;
					callback(loaded);
				});
			});
		}
		else{
			loaded = loadedFiles[file];
			setTimeout(function(){
				callback(loaded);
			},0);
		}
		return loaded;
	};
	
	var elements = getAllElementsWithAttribute('data-loader');
	for(var ie in elements){
		var element = elements[ie];
		var file = element.getAttribute('data-loader');
		(function(file, element){
			requireFromFile(file, function(modules){
				modules["app"](angular, element);
			});
		})(file,element);
	}
	

 })();