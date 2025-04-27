package mukodjman_backend.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowRequest {

    private long userId;
    private long userToBeFollowedId;

}
