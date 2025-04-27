package mukodjman_backend.dto.user;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostUser {

    private Long id;
    private String username;
    private String profilePicture;
    private LocalDateTime created_at;
    private String bio;


}
