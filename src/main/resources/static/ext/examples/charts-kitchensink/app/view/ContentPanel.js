
Ext.define('ChartsKitchenSink.view.ContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentPanel',
    id: 'content-panel',
    title: '&nbsp;',
    bodyPadding: 20,

    dockedItems: [{
		dock: 'top',
		xtype: 'descriptionPanel',
        minHeight: 50
    }],
    autoScroll: true,
    layout: 'anchor'
});