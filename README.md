# lazuli-filters
A simple wordpress like filtering system

    import ValueFilter from 'lazuli-filter'
    const valueFilter = new ValueFilter();

    const filter = () => 2;

    valueFilter.add("my-filterable-value", filter);
    console.log(valueFilter.filterable("my-filterable-value", 0)); //2
    console.log(valueFilter.filterable("my-filterable-value", 0)); //2

    valueFilter.remove("my-filterable-value", filter);
    console.log(valueFilter.filterable("my-filterable-value", 0)); //0
