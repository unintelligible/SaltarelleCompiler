///////////////////////////////////////////////////////////////////////////////
// Array Extensions

Array.__typeName = 'Array';
Array.__interfaces = [ ss.IEnumerable, ss.ICollection, ss.IList ];
Array.__class = true;

Array.prototype.get_item = function#? DEBUG Array$get_item##(index) {
	return this[index];
}

Array.prototype.set_item = function#? DEBUG Array$set_item##(index, value) {
	this[index] = value;
}

Array.prototype.get_count = function#? DEBUG Array$get_count##() {
	return this.length;
}

Array.prototype.getValue = function#? DEBUG Array$getValue##(indices) {
	if (indices.length != (this._sizes ? this._sizes.length : 1))
		throw 'Invalid number of indices';

	var idx = indices[0];
	if (this._sizes) {
		for (var i = 1; i < this._sizes.length; i++)
			idx = idx * this._sizes[i] + indices[i];
	}
	var r = this[idx];
	return typeof r !== 'undefined' ? r : this._defvalue;
}

Array.prototype.get = function#? DEBUG Array$get##() {
	return this.getValue(arguments);
}

Array.prototype.setValue = function#? DEBUG Array$setValue##(value, indices) {
	if (indices.length != (this._sizes ? this._sizes.length : 1))
		throw 'Invalid number of indices';

	var idx = indices[0];
	if (this._sizes) {
		for (var i = 1; i < this._sizes.length; i++)
			idx = idx * this._sizes[i] + indices[i];
	}
	this[idx] = value;
}

Array.prototype.set = function#? DEBUG Array$set##() {
	return this.setValue(arguments[arguments.length - 1], Array.prototype.slice.call(arguments, 0, arguments.length - 1));
}

Array.prototype.get_rank = function#? DEBUG Array$get_rank##() {
	return this._sizes ? this._sizes.length : 1;
}

Array.prototype.getLength = function#? DEBUG Array$getLength##(dimension) {
	if (dimension >= (this._sizes ? this._sizes.length : 1))
		throw 'Invalid dimension';
	return this._sizes ? this._sizes[dimension] : this.length;
}

Array.prototype.extract = function#? DEBUG Array$extract##(start, count) {
   if (!ss.isValue(count)) {
       return this.slice(start);
   }
   return this.slice(start, start + count);
}

Array.prototype.add = function#? DEBUG Array$add##(item) {
    this[this.length] = item;
}

Array.prototype.addRange = function#? DEBUG Array$addRange##(items) {
	if (items instanceof Array) {
		this.push.apply(this, items);
	}
	else {
		var e = items.getEnumerator();
		try {
			while (e.moveNext()) {
				this.add(e.get_current());
			}
		}
		finally {
			if (ss.IDisposable.isInstanceOfType(e)) {
				Type.cast(e, ss.IDisposable).dispose();
			}
		}
	}
}

Array.prototype.clear = function#? DEBUG Array$clear##() {
    this.length = 0;
}

Array.prototype.clone = function#? DEBUG Array$clone##() {
    if (this.length === 1) {
        return [this[0]];
    }
    else {
        return Array.apply(null, this);
    }
}

Array.prototype.contains = function#? DEBUG Array$contains##(item) {
    var index = this.indexOf(item);
    return (index >= 0);
}

Array.prototype.peekFront = function#? DEBUG Array$peekFront##(item) {
	if (this.length)
		return this[0];
	throw 'Array is empty';
}

Array.prototype.peekBack = function#? DEBUG Array$peekBack##(item) {
	if (this.length)
		return this[this.length - 1];
	throw 'Array is empty';
}

if (!Array.prototype.every) {
    Array.prototype.every = function#? DEBUG Array$every##(callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            if (i in this && !callback.call(instance, this[i], i, this)) {
                return false;
            }
        }
        return true;
    }
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function#? DEBUG Array$filter##(callback, instance) {
        var length = this.length;    
        var filtered = [];
        for (var i = 0; i < length; i++) {
            if (i in this) {
                var val = this[i];
                if (callback.call(instance, val, i, this)) {
                    filtered.push(val);
                }
            }
        }
        return filtered;
    }
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function#? DEBUG Array$forEach##(callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            if (i in this) {
                callback.call(instance, this[i], i, this);
            }
        }
    }
}

Array.prototype.getEnumerator = function#? DEBUG Array$getEnumerator##() {
    return new ss.ArrayEnumerator(this);
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function#? DEBUG Array$indexOf##(item, startIndex) {
        startIndex = startIndex || 0;
        var length = this.length;
        if (length) {
            for (var index = startIndex; index < length; index++) {
                if (this[index] === item) {
                    return index;
                }
            }
        }
        return -1;
    }
}

Array.prototype.insert = function#? DEBUG Array$insert##(index, item) {
    this.splice(index, 0, item);
}

Array.prototype.insertRange = function#? DEBUG Array$insertRange##(index, items) {
	if (items instanceof Array) {
		if (index === 0) {
			this.unshift.apply(this, items);
		}
		else {
			for (var i = 0; i < items.length; i++) {
				this.splice(index + i, 0, items[i]);
			}
		}
	}
	else {
		var e = items.getEnumerator();
		try {
			while (e.moveNext()) {
				this.insert(index, e.get_current());
				index++;
			}
		}
		finally {
			if (ss.IDisposable.isInstanceOfType(e)) {
				Type.cast(e, ss.IDisposable).dispose();
			}
		}
	}
}

if (!Array.prototype.map) {
    Array.prototype.map = function#? DEBUG Array$map##(callback, instance) {
        var length = this.length;
        var mapped = new Array(length);
        for (var i = 0; i < length; i++) {
            if (i in this) {
                mapped[i] = callback.call(instance, this[i], i, this);
            }
        }
        return mapped;
    }
}

Array.parse = function#? DEBUG Array$parse##(s) {
    return eval('(' + s + ')');
}

Array.prototype.remove = function#? DEBUG Array$remove##(item) {
    var index = this.indexOf(item);
    if (index >= 0) {
        this.splice(index, 1);
        return true;
    }
    return false;
}

Array.prototype.removeAt = function#? DEBUG Array$removeAt##(index) {
    this.splice(index, 1);
}

Array.prototype.removeRange = function#? DEBUG Array$removeRange##(index, count) {
    this.splice(index, count);
}

if (!Array.prototype.some) {
    Array.prototype.some = function#? DEBUG Array$some##(callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            if (i in this && callback.call(instance, this[i], i, this)) {
                return true;
            }
        }
        return false;
    }
}

Array.toArray = function#? DEBUG Array$toArray##(obj) {
    return Array.prototype.slice.call(obj);
}

Array.fromEnumerable = function#? DEBUG Array$fromEnumerable##(enm) {
	var e = enm.getEnumerator(), r = [];
	try {
		while (e.moveNext())
			r.push(e.get_current());
	}
	finally {
		e.dispose();
	}
	return r;
}

Array.multidim = function#? DEBUG Array$multidim##(defvalue, sizes) {
	var arr = [];
	arr._defvalue = defvalue;
	arr._sizes = [arguments[1]];
	var length = arguments[1];
	for (var i = 2; i < arguments.length; i++) {
		length *= arguments[i];
		arr._sizes[i - 1] = arguments[i];
	}
	arr.length = length;
	return arr;
}