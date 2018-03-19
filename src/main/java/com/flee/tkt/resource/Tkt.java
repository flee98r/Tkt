package com.flee.tkt.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flee.tkt.WebSecurityConfig;
import com.flee.tkt.model.ExtListResult;
import com.flee.tkt.model.ExtModelResult;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;


@RestController
@RequestMapping("/srvr/Tkt")
public class Tkt {


    @Autowired
    WebSecurityConfig webSecurityConfig;

    @Autowired
	private SqlSession sqlSessionTkt;

    public Tkt() {
        System.out.println("Tkt init");
    }

    public String getUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return currentPrincipalName;

    }

    @GetMapping
    public ExtListResult getTickets() {
        
    

        ExtListResult r = new ExtListResult();
        List l = sqlSessionTkt.selectList("Tkt.select");
        r.setData(l);
        return r;
    }
    
    @GetMapping("/Priority")
    public ExtListResult getPriorityCnt() {
        
        ExtListResult r = new ExtListResult();
        List<Object> l = sqlSessionTkt.selectList("Tkt.selectPriority");
        r.setData(l);
        return r;
    }
    
    

    @PutMapping("/{Id}")
    public ExtModelResult updTkt(@PathVariable("Id") Integer Id, 
        @RequestBody Map m ) {
  
        m.put("CdId", getUser());

        sqlSessionTkt.update("Tkt.update", m );
        
        // lets requery the table so we can update the audit table
        Map tkt = (Map)sqlSessionTkt.selectOne("Tkt.selectById", m.get("Id"));
        return new ExtModelResult(tkt);
    }
    
    @PostMapping
    public ExtModelResult addTkt(@RequestBody Map m ) {
    
        m.put("CdId", getUser());
        sqlSessionTkt.insert("Tkt.insert", m );
        
        // lets requery the table so we can update the audit table
        Map tkt = (Map)sqlSessionTkt.selectOne("Tkt.selectById", m.get("Id"));
        return new ExtModelResult(tkt);
        
    }
    
    
    @DeleteMapping("/{Id}")
    public ExtModelResult rmTkt( @PathVariable("Id") Integer Id   ) {
        
        Map tkt = (Map)sqlSessionTkt.selectOne("Tkt.selectById", Id);
        sqlSessionTkt.delete("Tkt.delete", Id );
        return new ExtModelResult(tkt);
        
    }

    @GetMapping("/Comment/{TktId}")
    public ExtListResult TkComments( @PathVariable("TktId") Integer tktId ) {
        
        ExtListResult r = new ExtListResult();
        List l = sqlSessionTkt.selectList("Cmt.selectByKey", tktId);
        r.setData(l);
        return r;
        
    }

    @PostMapping("/Comment/{TktId}")
    public ExtModelResult insCmt( @PathVariable("TktId") Integer tktId, Map inMap ) {
       
        inMap.put("CdId", getUser());
        sqlSessionTkt.insert("Cmt.insert", inMap );
        
        Map outMap = (Map)sqlSessionTkt.selectOne("Cmt.selectById", inMap.get("Id"));
        return new ExtModelResult(outMap);
    }
    
   
    @GetMapping("/{TktId}")
    public ExtModelResult getById( @PathVariable("TktId") Integer tktId ) {
        
        ExtListResult r = new ExtListResult();
        Map paramMap = new java.util.HashMap();
        paramMap.put("Id", tktId);
        Map outMap = (Map)sqlSessionTkt.selectOne("Tkt.select", paramMap);
     
        return new ExtModelResult(outMap);
        
    }

}
