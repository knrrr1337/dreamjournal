package mukodjman_backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlockedUser {

    private Long id;
    private String username;
    private String profilePicture;
    private String bio;
    private LocalDateTime created_at;
}
