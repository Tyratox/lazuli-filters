import test from "ava";
const ValueFilter = require("../src/lazuli-filters.js");

test("ValueFilter.get() should get the complete filter map", t => {
	let valueFilter = new ValueFilter();
	const fn = x => x;

	valueFilter._filters = { filter: [fn] };
	t.deepEqual(valueFilter.get(), { filter: [fn] });
});
test("ValueFilter.get().add() should add a function to the filter map", t => {
	let valueFilter = new ValueFilter();
	const fn = x => x;

	valueFilter.add("filter", fn);
	t.deepEqual(valueFilter._filters, { filter: [fn] });
	valueFilter.add("filter", fn);
	t.deepEqual(valueFilter._filters, { filter: [fn, fn] });
});
test("ValueFilter.remove() should remove a function from the filter map", t => {
	let valueFilter = new ValueFilter();
	const fn = x => x;
	const fn2 = y => y;

	valueFilter._filters = { filter: [fn, fn, fn2] };
	valueFilter.remove("filter", fn);
	t.deepEqual(valueFilter._filters, { filter: [fn2] });
});
test("ValueFilter.filterable() should filter the value with all relevant filters", t => {
	let valueFilter = new ValueFilter();
	const fn = x => 1;
	const fn2 = y => y * 2;

	valueFilter._filters = { filter: [fn, fn2] };
	t.deepEqual(valueFilter.filterable("filter", 0), 2); //0 => 1 => 2
});
test("ValueFilter.filterable() should be able to pass additional arguments to the filters", t => {
	let valueFilter = new ValueFilter();
	const fn = (x, param1, param2, param3) => param3;

	valueFilter._filters = { filter: [fn] };
	t.deepEqual(
		valueFilter.filterable(
			"filter",
			0,
			"helpfulParameter1",
			"helpfulParameter2",
			"helpfulParameter3"
		),
		"helpfulParameter3"
	);
});

test("ValueFilter.filterable() should respect the optional context", t => {
	let valueFilter = new ValueFilter();

	class Filter {
		constructor(val) {
			this.val = val;
		}
	}
	Filter.prototype.fn = function(val) {
		return val * this.val;
	};

	let f1 = new Filter(2),
		f2 = new Filter(10);

	valueFilter._filters = { filter: [f1.fn.bind(f1), f2.fn.bind(f2)] };

	t.deepEqual(f1.fn(7), 14);
	t.deepEqual(f2.fn(14), 140);
	t.deepEqual(valueFilter.filterable("filter", 7), 140);
});
