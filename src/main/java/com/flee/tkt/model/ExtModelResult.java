/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.flee.tkt.model;


import java.util.Map;

public class ExtModelResult {
    

    private Map data = null;
    private Boolean success= true;
 
    public ExtModelResult( Map data) {
        this.data = data;
    }
    
    public Map getData() {
        return data;
    }

    public void setData(Map data) {
        this.data = data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
    
}
