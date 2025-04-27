package mukodjman_backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mukodjman_backend.dto.user.CommentUser;
import mukodjman_backend.dto.user.PostUser;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JoinColumn(name = "dream_id", nullable = false)
    private Long dreamId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @JsonProperty("commentUser")
    public CommentUser getCommentUser() {
//        PostUser postUser = new PostUser();
        CommentUser commentUser = new CommentUser();
        commentUser.setId(user.getId());
        commentUser.setUsername(user.getUsername());
        commentUser.setProfilePicture(user.getProfilePicture());
        commentUser.setCreated_at(user.getCreated_at());
        return commentUser;
    }

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;
}