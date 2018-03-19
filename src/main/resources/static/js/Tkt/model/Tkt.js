Ext.define('Tkt.model.Tkt', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        "Id", 
        "Tool",
        "Priority",
        "Status",
        "Description",
        "AttachFilename",
        "CreatedBy", 
        { name:"CreatedOn", type: "date"},
        "ModifiedBy", 
        { name:"ModifiedOn", type: "date"}
    ],
    proxy: {
        type: 'rest',
        url: 'srvr/Tkt',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json'
        }
    }
    
});