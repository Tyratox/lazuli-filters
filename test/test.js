import test from "ava";
import ValueFilter from "../src/lazuli-filters.mjs";

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
