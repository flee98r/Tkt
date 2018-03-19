Ext.define('Tkt.view.List', {
    extend: 'Ext.grid.Panel',
    alias: "widget.tktlist",
    requires: ["Tkt.view.Edit", "Tkt.model.Tkt", "Tkt.store.Tkts"],
    title: "Tickets",
    constrain: true,   
    closeAction: 'hide',
    
    closable: true,
    config: {
        tktStore: null
    },

    initComponent: function() {
        var me = this;
        me.initUI();
        me.callParent(arguments);
        me.on("beforedestroy", function() {
            return false;
        });
    },
            
    createWindow: function() {
        var me = this;
        me.title = null;
        me.closable = false;
        var window = Ext.create("Ext.window.Window",
            {
                title: "Tickets",
                layout: 'fit',
                items: me,
                height: 600,
                width: 800
            }
        );
        return window;
           
    },            
    
    
    initUI: function() {
        var me = this;
        me.store = Ext.getStore("Tkts");
        me.columns = [
                    {
                        dataIndex: "Id",
                        text: "Id",
                        width: 50
                    },
                    {
                        dataIndex: "Tool",
                        text: "Tool" 
                    },
                    {
                        dataIndex: "Priority",
                        text: "Priority" 
                    },
                    {
                        dataIndex: "Status",
                        text: "Status"
                    },
                    {
                        dataIndex: "Description",
                        text: "Description",
                        flex: 1
                    },
                    {
                        dataIndex: "CreatedBy",
                        text: "Created By" 
                    },
                    {
                        dataIndex: "CreatedOn",
                        text: "Created On",
                        xtype:'datecolumn', format:'m/d/Y H:i:s'
                    },
                    {
                        dataIndex: "ModifiedBy",
                        text: "Modified By" 
                    },
                    {
                        dataIndex: "ModifiedOn",
                        text: "Modified On",
                        xtype:'datecolumn', format:'m/d/Y H:i:s'
                    }

                ];
                           
        me.dockedItems = [
            {
                dock: "top",
                xtype: 'toolbar',
                items: [
                    {
                        text: 'New'
                    },{
                        text: 'Edit'
                    },{
                        text: 'Delete'
                    }
                ]    
                    
            }, {
                dock: "bottom"
            }
        ];
    }
    
    
});