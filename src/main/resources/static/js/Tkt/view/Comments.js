Ext.define('Tkt.view.Comments', {
    extend: 'Ext.panel.Panel',
    alias: "widget.comments",

    modal: true,
   
    title: "Comments",

    initComponent: function() {
        var me = this;
 
        me.store = Ext.create("Tkt.store.Cmts");
        me.initUI();
        me.callParent(arguments);

    },
    // user function/procedure goes here.
    
    open: function( tktId ) {
        var me = this, store = me.store;
        me.TktId = tktId;
        store.getProxy().url = store.getProxy().baseurl+"/"+ tktId;
        store.load();
    },
    
    save: function(callbackFn) {
        
        var me = this, store=me.store, txtArea = me.down("textarea"), desc = Ext.String.trim(txtArea.getValue());
        
        
        
        if ( desc.length===0  ||  !me.TktId  ) return;
     
        var cmt = Ext.create("Tkt.model.Cmt", 
            {   
                KeyId: me.TktId, 
                Comment: txtArea.getValue(), 
                Type: 'Tkt'
            });
        cmt.save( { 
            success: function ( r1, r2 ) {
               store.add(cmt);
               txtArea.setValue(null);
               if ( callbackFn )
               callbackFn( cmt.getId() );
            }
        });
    },
   
    
    initUI: function() {
        var me = this;
        
        me.layout= {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        };
        var resultTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="comment-view">',
            '<table width="100%">',
            '<tr class="last-row"><td colSpan=2></td>',
            '<td width="175"><b>{CreatedBy}</b> {CreatedOn:this.formatDate}</td></tr>',
            '</table>',
            '{Comment:this.NoteMarkup}',
            '</div>',
            '</tpl>',     
             {
                    getNameType: function(value) {
                        return me.storeCmtType.findRecord("val",value).get("name");
                    },
           
                    formatDate: function(value){
                        return Ext.Date.format(value, 'M j, Y H:i');
                    },
                    
                    number: function(value) {
                        var func = number(0);
                        return func(value);
                    },
                    NoteMarkup: function(value) {
                        if ( value ) {
                            return '<p>'+value+'</p>';
                        }
                        return "";
                    }
             }
        );
        me.items = [ 
            {
                xtype: 'panel',
                flex: 1, 
                width: "100%",
                overflowY: 'auto',
                frame: true,
                margin: '5 5 0 5',
                bodyStyle: "background-color: white;",
                border: true,
               
                items:[
                    {
                    xtype: 'dataview',
                    tpl: resultTpl,
                    store: me.store,
                    
                    style: "background-color: white;",
                    itemSelector: 'div.comment-view'
                    //margin: '5 5 0 5'
                }]
            },
            
            {   
                xtype: 'panel',
                frame: true,
                margin: 5,
                height: 75,
                width: "100%",
                layout: "fit",
                items: [
                    {
                       
                        xtype: 'textarea',
                        emptyText: "Please enter your notes here...",                  
                        margin: 0,
                        maxLength: 500,
                        enforceMaxLength: true,
                        listeners: {
                            "change": function( comp, val ) {
                                    var lbl = me.down("label");
                                    lbl.setText( "["+ val.length + " characters]");
                                }
                        }
                        
                    }
                ]
            }, { xtype: 'label', text: "[0 characters]", margin: '0 10 5 10' }
                          

        ];
      
    }
    
    
});