jQuery(document).ready(function() {
    jQuery('[data-component="filter"]').each(function() {
        var filter = new components.Filter(this);
    });
});

var components = components || {};

components.Filter = function(el) {
    var self = this;
    self.el = jQuery(el);
    self.container = self.el.find('[data-filter="container"]');
    self.items = [];
    self.el.find('[data-filter="item"]').each(function() {
        var item = {};
        item.html = jQuery(this).clone();
        item.terms = jQuery(this).data('filter-terms');
        self.items.push(item);
    });
    self.init();
};
components.Filter.prototype = {
    init: function() {
        var self = this;
        jQuery('[data-filter-control="searchbox"]').on('keyup.filter', function() {
            self.filter();
        });
        jQuery('[data-filter-control="checkbox"]').on('change.filter', function() {
            self.filter();
        });
        self.filter();
    },
    filter: function() {
        var self = this;
        var filteredItems = [];

        var searchTerms = self.getTermsSearch();
        var checkedTerms = self.getTermsCheckbox();

        // Show all items if there are no terms
        if(searchTerms.length === 0 && checkedTerms.length === 0) {
            filteredItems = self.items;
        } else {
            // Check search terms
            if(searchTerms.length > 0) {
                for(var i = 0; i < searchTerms.length; i++) {
                    if(searchTerms[i] !== '') {
                        for(var j = 0; j < self.items.length; j++) {
                            if(self.items[j].terms.indexOf(searchTerms[i]) !== -1) {
                                filteredItems.push(self.items[j]);
                            }
                        }
                    }
                }
            }

            // Check checked terms
            if(checkedTerms.length > 0) {
                for(var i = 0; i < self.items.length; i++) {
                    var itemAdded = false;
                    for(var j = 0; j < checkedTerms.length; j++) {
                        var terms = self.items[i].terms.split(',');
                        for(var k = 0; k < terms.length; k++) {
                            if(terms[k] === checkedTerms[j]) {
                                filteredItems.push(self.items[i]);
                                itemAdded = true;
                            }
                        }
                        if(itemAdded) {
                            break;
                        }
                    }
                }
            }
        }

        self.container.empty();
        for(var i = 0; i < filteredItems.length; i++) {
            var html = filteredItems[i].html.clone();
            self.container.append(html);
        }
    },
    getTermsSearch: function() {
        var self = this;
        var searchTerms = [];
        jQuery('[data-filter-control="searchbox"]').each(function() {
            if(jQuery(this).val() !== '') {
                searchTerms.push(jQuery(this).val().toLowerCase());
            }
        });
        return searchTerms;
    },
    getTermsCheckbox: function() {
        var self = this;
        var checkedTerms = [];
        jQuery('[data-filter-control="checkbox"]').each(function() {
            if(jQuery(this).prop('checked') == true) {
                checkedTerms.push(jQuery(this).val());
            }
        });
        return checkedTerms;
    }
};
