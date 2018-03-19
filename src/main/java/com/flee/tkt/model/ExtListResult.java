/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.flee.tkt.model;

import java.util.List;

public class ExtListResult {
    
    private int total = -1;
    private List<Object> data = null;
    private Boolean success= true;
 
    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        if ( total < 0 )
            total = data.size();
        this.data = data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
    
}
