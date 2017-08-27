/**
 * The ValueFilter class
 * @type {Object}
 */
class ValueFilter {
	/**
	 * Creates a new instance of the ValueFilter class
	 * @return {ValueFilter} The new class instance
	 */
	constructor() {}
}

/**
 * An object mapping a filter name to an array of filter functions
 * @memberof ValueFilter
 * @instance
 * @private
 * @type {Object}
 */
ValueFilter.prototype._filters = {};

/**
 * Retrieves the complete filter map
 * @memberof ValueFilter
 * @instance
 * @return {Object} The filter map
 */
ValueFilter.prototype.get = function() {
	return this._filters;
};

/**
 * Adds a new filter for a specific value
 * @memberof ValueFilter
 * @instance
 * @param {String}   name The name of the value filter
 * @param {Function} fn   The filter function
 */
ValueFilter.prototype.add = function(name, fn) {
	if (name in this._filters) {
		this._filters[name].push(fn);
	} else {
		this._filters[name] = [fn];
	}
};

/**
 * Removes a filter for a specific value
 * @memberof ValueFilter
 * @instance
 * @param {String}   name The name of the value filter
 * @param {Function} fn   The previously attached filter function
 */
ValueFilter.prototype.remove = function(name, fn) {
	if (this._filters.hasOwnProperty(name)) {
		this._filters[name] = this._filters[name].filter(f => f !== fn);
	}
};

/**
 * Makes a value filterable by giving it a unique name
 * @memberof ValueFilter
 * @instance
 * @param  {String} name  The unique value filter name
 * @param  {*} value      The value to filter
 * @return {*}            The value after all registered filters ran
 */
ValueFilter.prototype.filterable = function(name, value) {
	const filters = this._filters[name];

	for (let i = 0; i < filters.length; i++) {
		value = filters[i](value);
	}

	return value;
};

module.exports = ValueFilter;
