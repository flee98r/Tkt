Ext.define('Tkt.model.Cmt', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        "Id", 
        "Type",
        "KeyId",
        "Comment",
        "CreatedBy", 
        { name:"CreatedOn", type: "date"}
    ],
    proxy: {
        type: 'rest',
        baseurl: 'srvr/Tkt/Comment',
        
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json'
        }
    }
    
});