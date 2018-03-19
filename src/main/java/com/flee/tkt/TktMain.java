package com.flee.tkt;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.Map.Entry;

import javax.sound.midi.Soundbank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
public class TktMain {

	@RequestMapping("/")
	public String app() {
		return "index";
	}

	@RequestMapping("/login")
	public String login() {
		return "login";
	}
	public static void main(String[] args) {

		class base extends Object {
			String name;
			int size;
		}

		Set<Map> set = new HashSet();

		Map m = new HashMap();
		m.put("name", "abc");
		// m.put("size", 2);
		System.out.println("hash 1 " + m.hashCode() );
		set.add(m);

		m = new HashMap();
		m.put("name", "abc");
		//m.put("size", 3);
		System.out.println("hash 2 " + m.hashCode() );
		set.add(m);

		Set a = m.entrySet();
		for ( Object o : a) {
		    System.out.println( o.toString() );
			System.out.println( o.hashCode() );
		}

	
		System.out.println( set.size());
		

		//SpringApplication.run(TktMain.class, args);
	}
}
