package mukodjman_backend.dto.dream;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DreamEditRequest {

    private String title;
    private String content;
    private List<String> images;

}
