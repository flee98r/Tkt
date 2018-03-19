Ext.define("Tkt.store.Cmts", {
    extend: "Ext.data.Store",
    storeId: "Cmts",
    model: "Tkt.model.Cmt",
    pageSize: -1,
    autoLoad: false,
    remoteSort: false
});