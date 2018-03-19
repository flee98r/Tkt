Ext.define('ChartsKitchenSink.view.charts.other.CustomTheme', {
    extend: 'Ext.Panel',
    xtype: 'theme-chart',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },

    exampleDescription: [
        'This example demonstrates how easy it is to change the colors of a chart\'s series using a custom theme.'
    ],

    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    // </example>

    initComponent: function() {
        var me = this;

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['month', 'data1', 'data2', 'data3', 'data4',
                { name: 'other', convert: function(value, record) {
                    var total = 0;
                    Ext.Object.each(record.data, function(key, value) {
                        total += Ext.isNumber(value) ? value : 0;
                    });
                    return Math.max(0, 100 - total);
                } }
            ],
            data: [
                { month: 'Jan', data1: 20, data2: 37, data3: 35, data4: 4 },
                { month: 'Feb', data1: 20, data2: 37, data3: 36, data4: 5 },
                { month: 'Mar', data1: 19, data2: 36, data3: 37, data4: 4 },
                { month: 'Apr', data1: 18, data2: 36, data3: 38, data4: 5 },
                { month: 'May', data1: 18, data2: 35, data3: 39, data4: 4 },
                { month: 'Jun', data1: 17, data2: 34, data3: 42, data4: 4 },
                { month: 'Jul', data1: 16, data2: 34, data3: 43, data4: 4 },
                { month: 'Aug', data1: 16, data2: 33, data3: 44, data4: 4 },
                { month: 'Sep', data1: 16, data2: 32, data3: 44, data4: 4 },
                { month: 'Oct', data1: 16, data2: 32, data3: 45, data4: 4 },
                { month: 'Nov', data1: 15, data2: 31, data3: 46, data4: 4 },
                { month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4 }
            ]
        });
        //<example>
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',

            items: [
                '->',
                {
                    text: 'Save Chart',
                    handler: function() {
                        Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                            if(choice == 'yes'){
                                me.down('chart').save({
                                    type: 'image/png'
                                });
                            }
                        });

                    }
                }]
        }];
        //</example>

        me.items = [{
            xtype: 'chart',
            height: 410,
            padding: '10 0 0 0',
            animate: true,
            shadow: false,
            style: 'background: #fff;',
            legend: {
                position: 'bottom',
                boxStrokeWidth: 0,
                labelFont: '12px Helvetica'
            },
            theme: 'CustomCharts',
            store: this.myDataStore,
            insetPadding: 40,
            items: [{
                type  : 'text',
                text  : 'Column Charts - 100% Stacked Columns',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }, {
                type: 'text',
                text: 'Data: Browser Stats 2012',
                font: '10px Helvetica',
                x: 12,
                y: 380
            }, {
                type: 'text',
                text: 'Source: http://www.w3schools.com/',
                font: '10px Helvetica',
                x: 12,
                y: 390
            }],
            axes: [{
                type: 'Numeric',
                position: 'left',
                grid: true,
                fields: ['data1', 'data2', 'data3', 'data4', 'other' ],
                label: {
                    renderer: function(v) { return v + '%'; }
                },
                minimum: 0,
                maximum: 100
            }, {
                type: 'Category',
                position: 'bottom',
                grid: true,
                fields: ['month'],
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'column',
                axis: 'left',
                title: [ 'IE', 'Firefox', 'Chrome', 'Safari', 'Others' ],
                xField: 'month',
                yField: [ 'data1', 'data2', 'data3', 'data4', 'other' ],
                stacked: true,
                style: {
                    opacity: 0.80
                },
                highlightCfg: {
                    fill: '#000',
                    'stroke-width': 1,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function(storeItem, item) {
                        var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                        this.setTitle(browser + ' for ' + storeItem.get('month') + ': ' + storeItem.get(item.yField) + '%');
                    }
                }
            }]
            //<example>
        }, {
            style: 'margin-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: function(v) { return v + '%'; }
                },
                items: [
                    { text: 'Month', dataIndex: 'month', renderer: function(v) { return v; } },
                    { text: 'IE', dataIndex: 'data1' },
                    { text: 'Firefox', dataIndex: 'data2' },
                    { text: 'Chrome', dataIndex: 'data3' },
                    { text: 'Safari', dataIndex: 'data4' },
                    { text: 'Other', dataIndex: 'other' }
                ]
            },
            store: this.myDataStore
            //</example>
        }];

        this.callParent();
    }
});

Ext.define('Ext.chart.theme.CustomCharts', {
    extend: 'Ext.chart.theme.Base',

    config: {
        axis: {
            stroke: '#7F8C8D'
        },
        colors: [ '#1ABC9C', '#F1C40F', '#3498DB', '#C0392B', '#9B59B6' ]
    },

    constructor: function(config) {
        var titleLabel = {
                font: 'bold 18px Helvetica'
            },
            axisLabel = {
                fill: '#7F8C8D',
                font: '12px Helvetica',
                spacing: 2,
                padding: 5
            };

        this.callParent([Ext.apply(this.config, config,  {
            axisLabelLeft: axisLabel,
            axisLabelBottom: axisLabel,
            axisTitleLeft: titleLabel,
            axisTitleBottom: titleLabel
        })]);
    }
});
