Ext.define('ChartsKitchenSink.view.DescriptionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'descriptionPanel',
    id: 'description-panel',
    autoScroll: true,
    rtl: false,
    bodyPadding: 12,

    initComponent: function() {
        this.ui = (Ext.themeName === 'neptune') ? 'light' : 'default';
        this.callParent();
    }
});