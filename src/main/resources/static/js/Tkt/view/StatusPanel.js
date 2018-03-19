Ext.define("Tkt.view.StatusPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.tktstatus",
    layout: 'fit',
    title: 'Tickets',
  
    
    targetContainer: null,
   
    initComponent: function() {
        var me = this,
        mtemplate = new Ext.XTemplate( 
            '<div class="rec-display"><table width="100%">',
            '<tpl for=".">',
                '<tr">',
                    '<td>{Key}:</td>',
                    '<td style="height:20px;width:20px" align="center">',
                       '<a class="tktopen" style="cursor:pointer;color:#0000FF" keytype="Priority:{Key}">{Value}</a>',
                    '</td>',
                 '</tr>',
            '</tpl></table></div>'
        );
        
        
        me.store = Ext.create( "Ext.data.Store", {
           id: "TktPriorityCntStore",
           fields: ["Key", "Value"],
           autoLoad: true,
           proxy: {
                type: 'rest',
                url: 'srvr/Tkt/Priority',
                reader: {
                    type: 'json',
                    root: 'data'
                }
                
            }
        });
        
            
        me.items = {
                xtype: 'dataview',
                tpl: mtemplate,
                store: me.store,
                style: "background-color: white;",
                itemSelector: 'a.tktopen',
                //margin: '5 5 0 5',
                listeners : {
                    refresh: function(dataview) {
                        me.setHeight(dataview.el.down("table").getHeight()+25);
                    },
                    itemclick: function( dataview, record, item, index, e, eOpts ) {
                        dataview.el.select(".status-clicked").removeCls("status-clicked");
                        Ext.fly(item).parent().addCls("status-clicked");
                    }
                }
        };
        
        
        this.callParent(arguments);
       
        

    },
            

            
    startup: function() {
        
//         var me = this, statusObj = {}, statusArr = [],
//            tktStore = Ext.getStore("Tkts");
//        
//
//            
//            tktStore.each( function(val) {
//                var status = val.get("Priority");
//                statusObj[status] = !statusObj[status]?1:statusObj[status]+1;
//            });
//
//
//            for ( k in statusObj ) {
//                me.store.add( { Key: k, Value: statusObj[k] } );
//            }
//            me.mtemplate.overwrite(displayArea.body, statusArr);
//            var h = displayArea.el.down("table").getHeight();
//            me.setHeight( h+25 );
//            
//            if ( me.targetContainer && typeof me.targetContainer === 'string' ) {
//                me.targetContainer = Ext.getCmp(me.targetContainer);
//            }
//               
//            Ext.Array.each( displayArea.el.select(".tktopen").elements, function( link ) {
//                Ext.fly(link).on("click", function() {
//
//                    // show selected.
//                    displayArea.el.select(".status-clicked").removeCls("status-clicked");
//                    Ext.fly(link).parent().addCls("status-clicked");
//                    
//                    // filter selected priority.
//                    var filterAttr = link.getAttribute("keytype").split(":");
//                    tktStore.clearFilter();
//                    tktStore.filter(filterAttr[0], filterAttr[1]); 
//                    
//                    if ( !me.List ) {
//                         me.List = Ext.create("Tkt.view.List");
//                         if ( !me.targetContainer ) {
//                             me.ListWindow = me.List.createWindow();
//                         }
//                    }
//                    if ( me.targetContainer ) { 
//                        me.targetContainer.addOrActivate( me.List );
//                    } else {
//                        me.ListWindow.show();
//                    }
//                    
//                });
//            });

    },        
            
            
    createWindow: function() {
        var me = this;
        me.title = null;
        var win = Ext.create("Ext.window.Window",
            {
                title: "Tickets",
                layout: 'fit',
                items: me,
                width: 250
            }
        );
        return win;
    }
    

    
});