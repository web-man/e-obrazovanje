package vp.spring.rcs.model;



import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import vp.spring.rcs.model.user.Student;


@Entity
public class Student_documents {
	
	
	@Id
	@GeneratedValue
	private Long id;
		
	private String imageURL;
	
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	private Student student;
	
	
	public Student_documents(String imageURL, Student student) {
		super();
		this.imageURL = imageURL;
		this.student = student;
	}
		
	public Student_documents() {
			
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

}
