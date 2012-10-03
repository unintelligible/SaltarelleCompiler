///////////////////////////////////////////////////////////////////////////////
// ObjectEnumerator

ss.ObjectEnumerator = function#? DEBUG ObjectEnumerator$##(o) {
    this._keys = Object.keys(o);
    this._index = -1;
	this._object = o;
};
ss.ObjectEnumerator.prototype = {
    moveNext: function#? DEBUG ObjectEnumerator$moveNext##() {
        this._index++;
        return (this._index < this._keys.length);
    },
    reset: function#? DEBUG ObjectEnumerator$reset##() {
        this._index = -1;
    },
	get_current: function#? DEBUG ObjectEnumerator$get_current##() {
		if (this._index < 0 || this._index >= this._keys.length)
			throw 'Invalid operation';
		var k = this._keys[this._index];
		return { Key: k, Value: this._object[k] };
	},
    dispose: function#? DEBUG ObjectEnumerator$dispose##() {
    }
};

ss.ObjectEnumerator.registerClass('ss.ObjectEnumerator', null, [ss.IEnumerator, ss.IDisposable]);
