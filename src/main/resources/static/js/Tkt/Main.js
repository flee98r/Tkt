Ext.define("Tkt.Main", {
    id: "TktMain",
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
    config: {
        selectedTkt: null,
        tktList: null,
        statusPortal: null,
        mainTabPanel: null
    },

    constructor: function (config) {
        
        var me = this;
        this.mixins.observable.constructor.call(this, config);

        me.control = {
            'main' : {
                openList: function( arg1, arg2, arg3 ) {
                    me.openList();
                },
                openTkt: function( container, tkt ) {
                    me.openTkt( tkt );
                },
                openStatus: function( comp, container ) {
                    me.openStatus( container );
                }
            },

            'tktlist': {
                itemdblclick: function(grid, selected) {
                    me.openTkt(selected);
                },
                selectionChange: function(grid, selected) {
                    me.setSelectedTkt(selected[0]);
                }
            },
            'tktlist toolbar button': {
                click: function( btn ) {
                    if ( btn.text === 'New')
                        me.openTkt();
                    else if( btn.text === 'Edit')
                        me.openTkt(me.getSelectedTkt() );
                    
                }
             },
             'tktedit button' : {
                click: function() {
                    console.log("click");
                }
             },
             'tktstatus dataview' : {
                    itemclick: function( dataview, record, item, index, e, eOpts ) {
                        me.openList();
                        var filterAttr = item.getAttribute("keytype").split(":");
                        var tktStore = Ext.getStore("Tkts");
                        tktStore.clearFilter();
                        if ( filterAttr[1].indexOf("total") < 0)
                        tktStore.filter(filterAttr[0], filterAttr[1]); 
                    }
             }        
        };
        
        // add a control for itself.
        this.on( this.control['main']);

        
    },
    

    start: function( ) {
        var me = this;
        Ext.create("Tkt.store.Tkts");
        
        if ( me.statusPortal )
            me.setStatusPortal(Ext.getCmp(me.statusPortal));
        if ( me.mainPanel )
            me.setMainTabPanel(Ext.getCmp(me.mainPanel));
        return me;
    },
    
    openList: function( container ) {
        
        var me = this, list = me.getTktList();
        if ( !list ) {
             list = Ext.create("Tkt.view.List");
             me.setTktList( list ); 
        }
        
        container = container?container:me.getMainTabPanel();
        
        if ( container ) { 
            container.addOrActivate( list );
        } else {
            
            if ( list.up("window") )
                list.up("window").show();
            else 
                list.createWindow().show();
        }
     
        me.trackEvents();
        
    },
    
    openStatus: function( container ) {
        
        var me = this;
        if ( !me.statusPanel ) {
            me.statusPanel = Ext.create("Tkt.view.StatusPanel");
        }
        container = container ? container : me.getStatusPortal();
        if ( container ) { 
            me.statusPanel.setTitle(null);
            container.addItem( "Tickets", me.statusPanel );
        } else {
            me.statusPanel.createWindow().show();
        }

        me.trackEvents();

    },        
            
    
    openTkt:function( tkt ) {
        var me = this,
            edit = Ext.create("Tkt.view.Edit");
        edit.openWindow( me );
        if ( tkt ) {
            edit.openTkt( tkt );
        }
        me.trackEvents();
    },   
    
    deleteTkt: function( tkt ) {
  
        var store = Ext.getStore("Tkts");
        
        var deleteRecord = function(btn) {
        if ( btn==='no') return;
            tkt.destroy({
                success: function() {
                    store.remove(tkt);
                }
            });
        };
        if(tkt) {
            Ext.MessageBox.confirm('Confirm deletion', 
                'Are you sure you want to delete Tkt with Id "' + tkt.getId() + '"', deleteRecord);
        } else {
            Ext.Msg.alert("Warning", "Please select record to delete");
        }

    }, 
    
    trackEvents: function() {
        var me = this;
        for ( k in me.control ) {
            var cmps = Ext.ComponentQuery.query(k);
            Ext.each( cmps, function( cmp ) {
                cmp.on( me.control[k]);
            });
        }
    }   
    
    
});
