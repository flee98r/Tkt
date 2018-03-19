Ext.define("Tkt.store.Tkts", {
    extend: "Ext.data.Store",
    storeId: "Tkts",
    model: "Tkt.model.Tkt",
    pageSize: -1,
    autoLoad: true,
    remoteSort: false
});