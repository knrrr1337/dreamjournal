package mukodjman_backend.dto;

import lombok.Getter;
import lombok.Setter;
import mukodjman_backend.dto.user.PostUser;
import mukodjman_backend.enums.Privacy;
import mukodjman_backend.model.Comment;
import mukodjman_backend.model.DreamImage;
import mukodjman_backend.model.Reaction;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class customDream {

    private Long id;
    private PostUser user;
    private String title;
    private String content;
    private String tags;
    private Privacy privacy;
    private List<Comment> comments;
    private List<Reaction> reactions;
    private LocalDateTime createdAt;
    private List<DreamImage> images;

}