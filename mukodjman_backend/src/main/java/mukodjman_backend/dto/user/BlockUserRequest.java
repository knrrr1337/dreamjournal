package mukodjman_backend.dto.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BlockUserRequest {

    private Long userId;
    private Long authorId;

    @Override
    public String toString() {
        return "BlockUserRequest{" +
                "userId=" + userId +
                ", authorId=" + authorId +
                '}';
    }
}
