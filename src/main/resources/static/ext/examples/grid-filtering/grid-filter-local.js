Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

Ext.define('Product', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'company'
    }, {
        name: 'price',
        type: 'float'
    }, {
        name: 'date',
        type: 'date',
        dateFormat: 'Y-m-d'
    }, {
        name: 'visible',
        type: 'boolean'
    }, {
        name: 'size'
    }]
});

var operatorMap = {
    eq: '=',
    gt: '>',
    lt: '<'
};

var simData = [{
    "id":"1",
    "price":"71.72",
    "company":"3m Co",
    "date":"2007-09-01",
    "size":"large",
    "visible":"1"
}, {
    "id":"2",
    "price":"31.61",
    "company":"AT&T Inc.",
    "date":"2008-02-01",
    "size":"extra large",
    "visible":"0"
}, {
    "id":"3",
    "price":"29.01",
    "company":"Aloca Inc",
    "date":"2007-08-01",
    "size":"medium",
    "visible":"0"
}, {
    "id":"4",
    "price":"83.81",
    "company":"Altria Group Inc",
    "date":"2007-08-03",
    "size":"large",
    "visible":"0"
}, {
    "id":"5",
    "price":"52.55",
    "company":"American Express Company",
    "date":"2008-01-04",
    "size":"extra large",
    "visible":"1"
}, {
    "id":"6",
    "price":"64.13",
    "company":"American International Group Inc.",
    "date":"2008-03-04",
    "size":"small",
    "visible":"1"
}, {
    "id":"7",
    "price":"75.43",
    "company":"Boeing Co.",
    "date":"2008-01-01",
    "size":"large",
    "visible":"1"
}, {
    "id":"8",
    "price":"67.27",
    "company":"Caterpillar Inc.",
    "date":"2007-12-03",
    "size":"medium",
    "visible":"1"
}, {
    "id":"9",
    "price":"49.37",
    "company":"Citigroup, Inc.",
    "date":"2007-11-24",
    "size":"large",
    "visible":"1"
}, {
    "id":"10",
    "price":"40.48",
    "company":"E.I. du Pont de Nemours and Company",
    "date":"2007-05-09",
    "size":"extra large",
    "visible":"0"
}, {
    "id":"11",
    "price":"68.1",
    "company":"Exxon Mobile Corp",
    "date":"2007-12-12",
    "size":"large",
    "visible":"1"
}, {
    "id":"12",
    "price":"34.14",
    "company":"General Electric Company",
    "date":"2008-06-16",
    "size":"extra large",
    "visible":"1"
}, {
    "id":"13",
    "price":"30.27",
    "company":"General Motors Corporation",
    "date":"2006-12-07",
    "size":"medium",
    "visible":"1"
}, {
    "id":"14",
    "price":"36.53",
    "company":"Hewlett-Packard Co.",
    "date":"2007-05-13",
    "size":"large",
    "visible":"1"
}, {
    "id":"15",
    "price":"38.77",
    "company":"Honweywell Intl Inc",
    "date":"2006-11-07",
    "size":"medium",
    "visible":"0"
}, {
    "id":"16",
    "price":"19.88",
    "company":"Intel Corporation",
    "date":"2007-01-09",
    "size":"small",
    "visible":"1"
}, {
    "id":"17",
    "price":"81.41",
    "company":"International Business Machines",
    "date":"2005-01-21",
    "size":"extra large",
    "visible":"1"
}, {
    "id":"18",
    "price":"64.72",
    "company":"Johnson & Johnson",
    "date":"2008-01-10",
    "size":"extra large",
    "visible":"1"
}, {
    "id":"19",
    "price":"45.73",
    "company":"JP Morgan & Chase & Co",
    "date":"2008-02-20",
    "size":"large",
    "visible":"0"
}, {
    "id":"20",
    "price":"36.76",
    "company":"McDonald's Corporation",
    "date":"2007-06-12",
    "size":"large",
    "visible":"1"
}, {
    "id":"21",
    "price":"27.96",
    "company":"Pfizer Inc",
    "date":"2007-12-30",
    "size":"small",
    "visible":"0"
}, {
    "id":"22",
    "price":"45.07",
    "company":"The Coca-Cola Company",
    "date":"2007-01-30",
    "size":"medium",
    "visible":"0"
}, {
    "id":"23",
    "price":"34.64",
    "company":"The Home Depot, Inc",
    "date":"2006-12-31",
    "size":"small",
    "visible":"1"
}, {
    "id":"24",
    "price":"61.91",
    "company":"The Procter & Gamble Company",
    "date":"2007-04-08",
    "size":"extra large",
    "visible":"1"
}, {
    "id":"25",
    "price":"63.26",
    "company":"United Technologies Corporation",
    "date":"2006-06-04",
    "size":"medium",
    "visible":"1"
}, {
    "id":"26",
    "price":"35.57",
    "company":"Verizon Communications",
    "date":"2005-07-09",
    "size":"small",
    "visible":"0"
}, {
    "id":"27",
    "price":"45.45",
    "company":"Wal-Mart Stores, Inc",
    "date":"2006-09-09",
    "size":"large",
    "visible":"1"
}];

Ext.onReady(function() {
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var simletStore = new Ext.data.Store({
        model: 'Product',
        data: simData
    });

    Ext.ux.ajax.SimManager.init({
        delay: 300,
        defaultSimlet: null
    }).register({
        'myData': {
            data: [
                ['small', 'small'],
                ['medium', 'medium'],
                ['large', 'large'],
                ['extra large', 'extra large']
            ],
            stype: 'json'
        },
        'grid-filter': {
            getData: function (ctx) {
                // `this.data` will always be the same, it's the data with which the simlet was defined.
                // We need to filter this data based upon the filter params. It's easiest to get this
                // information by querying the filters feature rather than by getting the url params,
                // which may have been PHP encoded.
                //
                // Also, we'll use a simletStore to filter b/c it's much easier to use the store APIs
                // than it would be to roll our own.
                var data = [],
                    gridFilters = grid.filters,
                    filters = gridFilters.getFilterData(),
                    len = filters.length,
                    records, d;

                if (len && !gridFilters.local) {
                    f = [];

                    simletStore.clearFilter();

                    for (i = 0; i < len; i++) {
                        filter = filters[i];
                        property = filter.field;
                        data = filter.data;

                        f.push({
                            anyMatch: true,
                            property: property,
                            value: property === 'date' ? new Date(data.value) : data.value,
                            operator: operatorMap[data.comparison]
                        });
                    }

                    simletStore.filter(f);
                    records = simletStore.getRange();

                    d = [];

                    for (i = 0, len = records.length; i < len; i++) {
                        d.push(records[i].raw);
                    }

                    data = {
                        data: d,
                        length: d.length
                    };
                } else {
                    data = this.data;
                }

                return data;
            },
            data: {
               "total":"27",
               "data": simData
            },
            stype: 'json'
        }
    });

    var optionsStore = Ext.create('Ext.data.Store', {
        fields: ['id', 'text'],
        proxy: {
            type: 'ajax',
            url: 'myData',
            reader: 'array'
        }
    });

    Ext.QuickTips.init();

    // configure whether filter query is encoded or not (initially)
    var encode = false;

    // configure whether filtering is performed locally or remotely (initially)
    var local = true;

    var store = Ext.create('Ext.data.JsonStore', {
        // store configs
        autoDestroy: true,
        model: 'Product',
        proxy: {
            type: 'ajax',
            url: 'grid-filter',
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'company',
            direction: 'ASC'
        }],
        pageSize: 50
    });

    var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: encode, // json encode the filter query
        local: local,   // defaults to false (remote filtering)

        // Filters are most naturally placed in the column definition, but can also be
        // added here.
        filters: [{
            type: 'boolean',
            dataIndex: 'visible'
        }]
    };

    // use a factory method to reduce code while demonstrating
    // that the GridFilter plugin may be configured with or without
    // the filter types (the filters may be specified on the column model
    var createColumns = function (finish, start) {
        var columns = [{
            dataIndex: 'id',
            text: 'Id',
            // instead of specifying filter config just specify filterable=true
            // to use store's field's type property (if type property not
            // explicitly specified in store config it will be 'auto' which
            // GridFilters will assume to be 'StringFilter'
            filterable: true,
            width: 30
            //,filter: {type: 'numeric'}
        }, {
            dataIndex: 'company',
            text: 'Company',
            id: 'company',
            flex: 1,
            filter: {
                type: 'string'
                // specify disabled to disable the filter menu
                //, disabled: true
            }
        }, {
            dataIndex: 'price',
            text: 'Price',
            filter: {
                //type: 'numeric'  // specify type here or in store fields config
            },
            width: 70
        }, {
            dataIndex: 'size',
            text: 'Size',
            filter: {
                type: 'list',
                store: optionsStore
            }
        }, {
            dataIndex: 'date',
            text: 'Date',
            filter: true,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        }, {
            dataIndex: 'visible',
            text: 'Visible'
            // this column's filter is defined in the filters feature config
        }];

        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: createColumns(4),
        loadMask: true,
        features: [filters],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store
        })],
        emptyText: 'No Matching Records'
    });

    // add some buttons to bottom toolbar just for demonstration purposes
    grid.child('pagingtoolbar').add([
        '->',
        {
            text: 'Encode: ' + (encode ? 'On' : 'Off'),
            tooltip: 'Toggle Filter encoding on/off',
            enableToggle: true,
            handler: function (button, state) {
                var encode = (grid.filters.encode !== true);
                var text = 'Encode: ' + (encode ? 'On' : 'Off');
                grid.filters.encode = encode;
                grid.filters.reload();
                button.setText(text);
            }
        },
        {
            text: 'Local Filtering: ' + (local ? 'On' : 'Off'),
            tooltip: 'Toggle Filtering between remote/local',
            enableToggle: true,
            handler: function (button, state) {
                var local = (grid.filters.local !== true),
                    text = 'Local Filtering: ' + (local ? 'On' : 'Off');

                // Update the GridFilter setting.
                grid.filters.local = local;

                // Bind the store again so GridFilters is listening to appropriate store event.
                grid.filters.bindStore(store);

                button.setText(text);
                store.load();
            }
        },
        {
            text: 'All Filter Data',
            tooltip: 'Get Filter Data for Grid',
            handler: function () {
                var data = Ext.encode(grid.filters.getFilterData());
                Ext.Msg.alert('All Filter Data',data);
            }
        },{
            text: 'Clear Filter Data',
            handler: function () {
                grid.filters.clearFilters();
            }
        },{
            text: 'Add Columns',
            handler: function () {
                if (grid.headerCt.items.length < 6) {
                    grid.headerCt.add(createColumns(6, 4));
                    grid.view.refresh();
                    this.disable();
                }
            }
        }
    ]);

    var win = Ext.create('Ext.Window', {
        title: 'Grid Filters Example',
        height: 400,
        width: 875,
        layout: 'fit',
        items: grid
    }).show();

    store.load();
});

