## Data Jpa 

### What is Data jpa 

### Data base we will build 

1. Table Guardian

```
name: string,
email: string
phone: string
```

2. Table Student 

```
studentId: string
firstName: string
lastName: string
email: string
```

3. Table courses
```
courseId: string
title: string
credit: integer
```

4. Teacher 

````
teacher: long,
firstName: string
lastName: string
```

5. courseMaterial 
```
coursematerialId: string
url: string
```

### Models 

1. Student 

````
@Entity
@Data
@AllArgsConstructor 
@NoConstructor
@Builder
public class Student{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long studentId;
    private String firstName;
    private String lastName;
    private String email;
    private String gaurdianName;
    private String gaurdianPhone;
    private String gaurdianEmail;
}
``