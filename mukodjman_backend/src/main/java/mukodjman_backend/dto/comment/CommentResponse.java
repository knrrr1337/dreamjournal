package mukodjman_backend.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import mukodjman_backend.dto.user.CommentUser;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private Long dreamId;
    private CommentUser user;
    private String content;
    private LocalDateTime created_at;
}