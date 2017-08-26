const assert = require("assert");

import ValueFilter from "../src/lazuli-filters.mjs";

describe("ValueFilter", () => {
	describe("#get()", () => {
		it("should get the complete filter map", () => {
			let valueFilter = new ValueFilter();
			const fn = x => x;

			valueFilter._filters = { filter: [fn] };
			assert.deepEqual(valueFilter.get(), { filter: [fn] });
		});
	});
	describe("#add()", () => {
		it("should add a function to the filter map", () => {
			let valueFilter = new ValueFilter();
			const fn = x => x;

			valueFilter.add("filter", fn);
			assert.deepEqual(valueFilter._filters, { filter: [fn] });
			valueFilter.add("filter", fn);
			assert.deepEqual(valueFilter._filters, { filter: [fn, fn] });
		});
	});
	describe("#remove()", () => {
		it("should remove a function from the filter map", () => {
			let valueFilter = new ValueFilter();
			const fn = x => x;
			const fn2 = y => y;

			valueFilter._filters = { filter: [fn, fn, fn2] };
			valueFilter.remove("filter", fn);
			assert.deepEqual(valueFilter._filters, { filter: [fn2] });
		});
	});
	describe("#filterable()", () => {
		it("should filter the value with all relevant filters", () => {
			let valueFilter = new ValueFilter();
			const fn = x => 1;
			const fn2 = y => y * 2;

			valueFilter._filters = { filter: [fn, fn2] };
			assert.deepEqual(valueFilter.filterable("filter", 0), 2); //0 => 1 => 2
		});
	});
});
