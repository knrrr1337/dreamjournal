package mukodjman_backend.model;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mukodjman_backend.dto.user.PostUser;
import mukodjman_backend.enums.Privacy;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dreams")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Dream {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @JsonProperty("postUser")
    public PostUser getPostUser() {
        PostUser postUser = new PostUser();
        postUser.setId(user.getId());
        postUser.setUsername(user.getUsername());
        postUser.setProfilePicture(user.getProfilePicture());
        return postUser;
    }

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(length = 255)
    private String tags;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length=20)
    private Privacy privacy;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "dreamId")
    private List<Comment> comments;

    @OneToMany(mappedBy = "dreamId")
    private List<Reaction> reactions;

    @OneToMany(mappedBy = "dreamId", cascade = CascadeType.ALL)
    List<DreamImage> images;


}