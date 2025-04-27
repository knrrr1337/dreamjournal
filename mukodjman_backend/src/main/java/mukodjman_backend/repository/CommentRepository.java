package mukodjman_backend.repository;

import mukodjman_backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

        List<Comment> findByDreamId(Long id);

}
