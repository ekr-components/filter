# filter

A client-side filtering options for a list of items that can then be filtered
based on a number of terms.

## How to use this component

There are two ways that you can filter using this component. A free-form text
box or a list of checkboxes.

The filter searches for items and clones them, storing them in an array. Each
item then has a list of the terms associated with it. Whichever terms match the
text form or the checked terms will then be shown.

The items are completely removed from the container and then re-added if they
match. The filter will change on every key entry or checkbox checked or
unchecked.

```html
<div data-component="filter">
    <!-- Searchbox style filtering -->
    <input type="text" data-filter-control="searchbox">

    <!-- Checkbox style filtering -->
    <input name="terms" data-filter-control="checkbox" value="term1" type="checkbox">Term 1
    <input name="terms" data-filter-control="checkbox" value="term2" type="checkbox">Term 2
    <input name="terms" data-filter-control="checkbox" value="term3" type="checkbox">Term 3
    <input name="terms" data-filter-control="checkbox" value="term4" type="checkbox">Term 4

    <div data-filter="container">
        <div
            data-filter="item"
            data-filter-terms="term1,term2,term3,term4">
        </div>
        <div
            data-filter="item"
            data-filter-terms="term1,term3,term4">
        </div>
        <div
            data-filter="item"
            data-filter-terms="term1,term4">
        </div>
        <div
            data-filter="item"
            data-filter-terms="term4">
        </div>
    </div>
</div>
```
