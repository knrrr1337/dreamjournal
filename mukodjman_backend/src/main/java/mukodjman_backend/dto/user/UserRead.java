package mukodjman_backend.dto.user;

import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mukodjman_backend.model.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRead {

    private Long id;
    private String username;
    private String email;
    private String password;
    private String profilePicture;
    private String bio;
    private LocalDateTime created_at;
    private List<Dream> dreams;
    private List<Followers> followers;
    private List<Followers> following;
    private List<Comment> comments;
    private List<Reaction> reactions;
    private List<Block> blockedUsers;

}
