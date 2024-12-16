# Sorting

## Enabling/disabled sorting

Yeti table columns are sortable by default. Try to click the table headers in the example below.

You can disable sorting in any column by passing `@sortable={{false}}` to any column definition.

If you want to disable sorting on all columns, instead of doing it on each column, you can pass in
`@sortable={{false}}` to the parant `<YetiTable>` component.

In the following example we disabled sorting on the second column.

<DocsDemo as |demo|>
  <demo.example @name="sorting-simple.hbs">
    <YetiTable @data={{this.data}} as |table|>

      <table.header as |header|>
        <header.column @prop="firstName">
          First name
        </header.column>
        <header.column @prop="lastName" @sortable={{false}}>
          Last name
        </header.column>
        <header.column @prop="points">
          Points
        </header.column>
      </table.header>

      <table.body/>

    </YetiTable>
  </demo.example>

  <demo.snippet @name="sorting-simple.hbs" />
</DocsDemo>

## The `@sort` argument

If you need to specify a sort order, you can use the `@sort` argument on the column definitions, with a string of `asc` or `desc`.

Note that updating the `@sort` argument will also update the sorting of the table. 

If you update an object's property which the table is sorted on, the table sorting will update accordingly. This behaviour can be turned off with `@ignoreDataChanges={{true}}`.

<DocsDemo as |demo|>
  <demo.example @name="sorting-sort-property.hbs">
    <YetiTable @data={{this.data}} as |table|>

      <table.header as |header|>
        <header.column @prop="firstName">
          First name
        </header.column>
        <header.column @prop="lastName">
          Last name
        </header.column>
        <header.column @prop="points" @sort="asc">
          Points
        </header.column>
      </table.header>

      <table.body/>

    </YetiTable>
  </demo.example>

  <demo.snippet @name="sorting-sort-property.hbs" />
</DocsDemo>

## Customization

It is very common to customize the column header based on the sorting status of that column.
Yeti table provides two approaches for this customization:

- **css classes** - When a column is sorted ascending, it will have the `yeti-table-sorted-asc` class. When a column is sorted descending, it will have the `yeti-table-sorted-desc` class. You can use these to style according to your needs (if the default theme is applied).
- **yielded hash** - Every `<header.column>` component will yield a hash of booleans that contains: `isSorted`, `isAscSorted` and `isDescSorted`. You can use these to customize the rendering of the column itself.

In the following example we're showing `(sorted desc)` or `(sorted asc)` text depending on the sorting status of the column.

<DocsDemo as |demo|>
  <demo.example @name="sorting-custom.hbs">
    <YetiTable @data={{this.data}} as |table|>

      <table.header as |header|>
        <header.column @prop="firstName" as |column|>
          First name
          {{if column.isAscSorted "(sorted asc)"}} {{if column.isDescSorted "(sorted desc)"}}
        </header.column>
        <header.column @prop="lastName" as |column|>
          Last name
          {{if column.isAscSorted "(sorted asc)"}} {{if column.isDescSorted "(sorted desc)"}}
        </header.column>
        <header.column @prop="points" @sort="asc" as |column|>
          Points
          {{if column.isAscSorted "(sorted asc)"}} {{if column.isDescSorted "(sorted desc)"}}
        </header.column>
      </table.header>

      <table.body/>

    </YetiTable>
  </demo.example>

  <demo.snippet @name="sorting-custom.hbs" />
</DocsDemo>

## Multiple sorting

Sometimes we have slightly more advanced sorting requirements and need to sort on multiple columns.
In this case you can just use the `@sort` property on multiple columns.

Let's say we want to sort by `firstName` ascending and then by `lastName` descending. We could pass in `@sort="asc"`
to the first name column and `@sort="desc"` to the last name column.

<DocsDemo as |demo|>
  <demo.example @name="sorting-advanced.hbs">
    <YetiTable @data={{this.advancedSortingData}} as |table|>

      <table.header as |header|>
        <header.column @prop="firstName" @sort="asc">
          First name
        </header.column>
        <header.column @prop="lastName" @sort="desc">
          Last name
        </header.column>
        <header.column @prop="points">
          Points
        </header.column>
      </table.header>

      <table.body/>

    </YetiTable>
  </demo.example>

  <demo.snippet @name="sorting-advanced.hbs" />
</DocsDemo>

Notice that the last names are sorting descending for the same first name.

<aside>Bonus: you can shift+click on a header column to add a new sort to the existing ones!</aside>

## Advanced sorting

Yeti table allows you to pass in a `sortFunction` and a `compareFunction`. They do slightly different things.

Use the `sortFunction` if you want to completely customize how the row sorting is done. It will be invoked with two rows,
the current sortings that are applied and the compare function.

Use `compareFunction` if you just want to customize how two values relate to each other (not the entire row). It will be invoked with two values
and you just need to return `-1`, `0` or `1` depending on if first value is greater than the second or not. The default compare function used is [`compare` function](https://emberjs.com/api/ember/3.7/functions/@ember%2Futils/compare) from `@ember/utils`.

## Sort sequence

By default, clicking on a sortable column header will sort that column. But in what direction? The usual is for the column to sort ascending, then clicking it again changes it to descending. Further clicks toggle between ascending and descending. This is the default behavior.

However, Yeti Table allows you to customize this sequence using the `@sortSequence` argument. This can be either a comma-separated
string or an array of strings. Accepted values are `'asc'`, `'desc'` and `'unsorted'`.

So, for example, if you want the first click to sort descending, the second to sort ascending and the third to go back to unsorted,
you can use `<YetiTable @sortSequence="desc,asc,unsorted">`.

You can also use `@sortSequence` on columns instead of on the whole table. This allows you to fine tune your sequences per column. Each column's
sort sequence will default to whatever the value is for the global YetiTable component.
