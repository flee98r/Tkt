Ext.define("Tkt.view.AttachForm", {
    extend: "Ext.form.Panel",
    alias: "widget.attachform",
    bodyStyle: "padding: 5px; background: transparent;",
    border: false,
    
    currentFiles: [],
    removeFiles: [],
    
    
    getCurrentAttachFilename : function() {
        
        var attched = this.down("fieldcontainer[name=attached]");
        if ( attched )
            return attched.file;
        else
            return null;
        
    },
            
    uploadFiles : function( Id ) {
        var me = this;

        var file_key_map={};
        var files = [];
        Ext.Array.each( me.query("filefield"), function(ffield) {
            if( ffield.getValue()) {
                var file = ffield.getValue().split("fakepath\\")[1];
                files.push(file);
                file_key_map[file] =Id;
                
            } 
        });

        if ( !Ext.Object.isEmpty(file_key_map) ) {
            me.getForm().submit({
                url: 'FileUpDn/srvr/Up/Tkt',
                waitMsg: 'Uploading file...',
                params: { file_key_map: Ext.encode(file_key_map)},
                success: function(form, action){
                    //InfoBox.msg("File(s)", "Successfully uploaded to server.");
                    me.removeAll();
                    me.setCurrentFiles( Id, files );
                    me.insertEmptyForm();
                    
                }
            });
        }
        
    },
        
    
    setCurrentFiles: function( id, files ) {
        var me = this;
        me.removeFiles = [];
        if ( files === "" ) return;
        
        
        
        
        
        Ext.Array.each( files, function( file ){ 
            
            var urlfile = "FileUpDn/srvr/Dn/Tkt/" + id + "?fname=" + file;
            me.insert(0, 
            {   xtype: "fieldcontainer",
                layout: "hbox",
                name: "attached",
                file: file,
                items: [
                    { xtype: "label", html: "<a href='"+ urlfile + "'>" + file + "</a>", margin: "0 15 0 0" }, 
                    { xtype: "button", text: "Download",  
                        handler: function() {
                            window.location.assign(urlfile);
                        } 
                    }
                ]
            }
            );  
        } );
    },
    

    initComponent: function() {
        
        var me = this;
        me.items =[];
        me.callParent(arguments);
        me.insertEmptyForm();
    },
    
    insertEmptyForm: function() {
        var me = this;
        me.add(  {
            xtype: 'filefield',
            emptyText: 'Select a document to upload...',
            fieldLabel: 'File',
            buttonText: 'Browse',
            anchor: "85%",
            hideLabel: true,
            listeners: {
                change: function() {
                    var ffield = this;
                    
                    

                    var attched = me.down("fieldcontainer[name=attached]");
                    if ( attched ) {
                        Ext.Msg.show({
                            title:'Overwrite',
                            msg: 'Only one attachment is allowed per ticket, please click YES to overwrite existing file.',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function ( btn ) {
                                if ( btn === "yes" ) {
                                     me.remove(attched);
                                     ffield.setVisible( false );
                                     me.addNewlyAttached( ffield );
                                } else{
                                    ffield.reset();
                                }
                            }
                        });

                    } else {
                        ffield.setVisible( false );
                        me.addNewlyAttached( ffield );
                    }
                }
            } 
        });
    },
    
    addNewlyAttached: function(filefield) {
        
        var me = this,
            raw = filefield.getRawValue(),
            newfile = raw.split("fakepath\\")[1];

        me.add( {  
            
            xtype: "fieldcontainer",
            layout: "hbox",
            name: "attached",
            file: newfile,
            fileField: filefield,
            items: [{ xtype: "label", text: "..\\"+newfile, margin: "0 15 0 0" }, 
                    { xtype: "button", text: "delete", 
                        handler: function() {
                            this.up("fieldcontainer").fileField.destroy();
                            this.up("fieldcontainer").destroy();
                        } 
                    }
            ]
        });
        me.insertEmptyForm();
        
    }
    
    
});