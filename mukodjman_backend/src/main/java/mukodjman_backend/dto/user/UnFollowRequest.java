package mukodjman_backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UnFollowRequest {

    private long userId;
    private long unfollowUserId;

}
