Ext.define('Tkt.view.Edit', {
    extend: 'Ext.panel.Panel',
    alias: "widget.tktedit",
    modal: true,
    itemId: 'tktEdit',
    
    requires: ["Tkt.view.Comments", "Tkt.view.AttachForm"],
    
    initComponent: function() {
        var me = this;
        
        me.initUI();
        me.callParent(arguments);
        
    },
    
    
    openWindow: function() {
        var me = this;
        Ext.create("Ext.window.Window",
            {
                title: "New Ticket",
                layout: 'fit',
                items: me,
                height: 500,
                width: 1000
      
            }
        ).show();
        
    },        
            
            
    // user function/procedure goes here.
    
    openTkt: function( tkt ) {
        var me = this,
        attchForm = me.down("attachform");
        me.up("window").setTitle("Edit Ticket");
        me.tkt = tkt;
        
        var me = this,
        form = me.down("form").getForm();
        form.setValues(tkt.data);
        attchForm.setCurrentFiles( tkt.getId(), tkt.get("AttachFilename"));
        me.down("comments").open( tkt.getId() );
    },
    
    saveTkt: function() {
        var me = this.up("tktedit"),
        store = Ext.getStore("Tkts"),
        form = me.down("form").getForm(),
        attchForm = me.down("attachform");
        
        if ( !me.tkt ) {
            // new ticket
            me.tkt = new Ext.create("Tkt.model.Tkt", form.getValues());
            store.add( me.tkt );
        } else {
            // update ticket
            me.tkt.set(form.getValues());
        }
        
        me.tkt.set("AttachFilename", attchForm.getCurrentAttachFilename());
        
        
        if ( !Ext.Object.isEmpty(me.tkt.modified) ) {
            // ok its modified lets update.
            me.tkt.save({
                success: function(tkt) {
                    me.tkt.commit();
                    me.down("comments").TktId = tkt.getId();
                    me.down("comments").save();
                    attchForm.uploadFiles(tkt.getId());
                },
                failure: function() {
                    // to do: need a good message to tell the user if something fails.
                }
            });
        } else {
            me.down("comments").save();
        }
        
    },
      
    initUI: function() {
        var me = this;
        me.layout= {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        };
        me.items = [
            { xtype: 'panel',
              layout: "fit",
              flex: 1,
              margin: 5,
              border: false,
              bodyStyle: "background-color: transparent;",
            items: {
                xtype: "form",
                
                bodyStyle: "background-color: transparent;",
                
                border: false,
                items: [
                    {   
                        name: "Tool",
                        xtype: "textfield",
                        fieldLabel: 'Tool',
                        anchor: "65%"
                    },
                    {
                        xtype: "fieldcontainer",
                        anchor: "100%",
                        layout: 'hbox',
                        border: true,
                        items:[{
                            name: "Priority",
                            xtype: "combobox",
                            store: ["feature request","low", "high", "critical"],
                          
                            fieldLabel: 'Priority',
                            flex: 1
                        }, 
                        {
                            name: "Status",
                            xtype: "combobox",
                            store: ["started","under review", "defered", "rejected", "closed"],
                            fieldLabel: 'Status',
                            labelWidth: 85,
                            margin: "0 0 0 25",
                            value: "started",
                            flex: 1
                        }]
                    
                    },{
                        xtype: "fieldcontainer",
                        anchor: "100%",
                        layout: 'hbox',
                        border: true,
                        items:[{
                            name: "CreatedBy",
                            xtype: "textfield",
                            fieldLabel: 'Submitted By',
                            flex: 1
                        }, 
                        {
                            name: "CreatedOn",
                            xtype: "datefield",
                            fieldLabel: 'Submitted On',
                            labelWidth: 85,
                            format: 'm/d/Y H:i:s',
                            margin: "0 0 0 25",
                            readOnly: true,
                            flex: 1
                        }]
                    
                    },{
                        name: "Description",
                        xtype: "textarea",
                        labelAlign: "top",
                        fieldLabel: "Description",
                        anchor: "100%",
                        height: 175
                    },{  
            
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            fieldLabel: "File Attachment",
                            items: {
                                   xtype: 'attachform', 
                                   cls: 'x-check-group-alt',
                                   flex: 1,
                                   name: "fileattachments"
                            }  
                        }
                ]
              }
            },
            {
                xtype: "comments",
                margin: 5,
                flex: 1
            }
            
            
        ];
        
        me.buttons = [
            { xtype: "checkbox", boxLabel: "email updates"},
            { text: "apply", handler: me.saveTkt },
            { text: "close", handler: function() { this.up("window").close(); } }
        ];
    }
    
    
});