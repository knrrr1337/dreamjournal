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
public class DrogosUser {

    private long id;
    private String username;
    private String bio;
    private String profilePicture;
    private LocalDateTime created_at;


}
