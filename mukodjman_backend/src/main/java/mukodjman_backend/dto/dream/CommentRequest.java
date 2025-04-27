package mukodjman_backend.dto.dream;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentRequest {

    private String comment;
    private long userId;

}
