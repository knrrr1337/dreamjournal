package mukodjman_backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;

//    private String username;
//    private String email;
//    private String password;
//    private String profile_picture;
//    private String bio;
//    private LocalDateTime created_at;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 255)
    private String profilePicture;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "user")
    private List<Dream> dreams;

    @OneToMany(mappedBy = "follower")
    private List<Followers> followers;

    @OneToMany(mappedBy = "followed")
    private List<Followers> following;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "userId")
    private List<Reaction> reactions;

    // Relationships for blocks
    @OneToMany(mappedBy = "blocked")
    private List<Block> blockedUsers;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", bio='" + bio + '\'' +
                ", created_at=" + created_at +
                ", dreams=" + dreams +
                ", followers=" + followers +
                ", following=" + following +
                ", comments=" + comments +
                ", reactions=" + reactions +
                ", blockedUsers=" + blockedUsers +
                '}';
    }
}
